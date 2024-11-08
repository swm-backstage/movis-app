import { View } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ExpandedButton from '../../components/Button/ExpandedButton';
import CustomLoader from '../../components/Loader';
import CustomInput from '../../components/customInput/CustomInput';
import DateTimePickerInput from '../../components/select/DateTimePickerInput';
import ItemListCheckBox from '../../components/select/ItemListCheckBox';
import { mainNavigations } from '../../constants/navigations';
import useCustomInput from '../../hooks/useCustomInput';
import useDateTimePickerInput from '../../hooks/useDateTimePickerInput';
import { useMutateCreateEvent } from '../../hooks/useEvent';
import useItemListCheckBox, { Item } from '../../hooks/useItemListCheckBox';
import { useGetMemberList } from '../../hooks/useMember';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { EventCreateReq, GatherFeeInfo } from '../../types/event/request/EventCreateReq';
import { BalanceFormat } from '../../utils/formator';
import { EventNameValidator } from '../../utils/validator';

type EventCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.EVENT_CREATE
>;

function EventCreateScreen({ route, navigation }: EventCreateScreenProps) {
  const { clubId } = route.params;
  const { data, isLoading, isError } = useGetMemberList(clubId);
  const createEvent = useMutateCreateEvent();

  const eventNameInput = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
    validator: EventNameValidator,
  });
  const totalPaymentAmountInput = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
    formator: BalanceFormat,
  });
  const paymentDeadlineInput = useDateTimePickerInput();
  const memberListSelector = useItemListCheckBox({
    required: true,
    requiredMessage: '필수 항목',
  });

  const itemList: Item[] = data?.members.map(member => ({
    id: member.memberId,
    name: member.name,
  })) || [];
  const onFinish = () => {
    const isEventNameValid = eventNameInput.validate();
    const isTotalPaymentValid = totalPaymentAmountInput.validate();
    const isDateValid = paymentDeadlineInput.validate();
    const isMemberListvalid = memberListSelector.validate();

    if (!isEventNameValid || !isTotalPaymentValid || !isDateValid || !isMemberListvalid) {
      return;
    }

    const values: EventCreateReq = {
      clubId: clubId,
      eventName: eventNameInput.value,
      gatherFeeInfo: null,
      eventMemberIdList: memberListSelector.selectedIds || [],
    };
    if (totalPaymentAmountInput.value && paymentDeadlineInput.value) {
      const gatherFeeInfo: GatherFeeInfo = {
        totalPaymentAmount: Number(totalPaymentAmountInput.value.replace(/\D+/g, '')),
        paymentDeadline: paymentDeadlineInput.value,
      };

      values['gatherFeeInfo'] = gatherFeeInfo;
    }
    createEvent.mutate(
      values,
      {
        onSuccess: () => navigation.goBack(),
        onError: (error) => {
          console.error('Error creating event:', error, error.message, error.name);
        },
      }
    );
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <CustomInput
          value={eventNameInput.value}
          isValid={eventNameInput.isValid}
          errorMessage={eventNameInput.errorMessage}
          onChangeText={eventNameInput.onChangeText}
          onBlur={eventNameInput.onBlur}
          clearInput={eventNameInput.clearInput}
          label='이름'
          placeholder="이벤트명"
          autoCapitalize="none"
        />
        <CustomInput
          value={totalPaymentAmountInput.value}
          isValid={totalPaymentAmountInput.isValid}
          errorMessage={totalPaymentAmountInput.errorMessage}
          onChangeText={totalPaymentAmountInput.onChangeText}
          onBlur={totalPaymentAmountInput.onBlur}
          clearInput={totalPaymentAmountInput.clearInput}
          label='납부 금액'
          placeholder="납부 금액"
          keyboardType='numeric'
          autoCapitalize="none"
        />
        <DateTimePickerInput
          label='납부 마감일'
          isValid={paymentDeadlineInput.isValid}
          onBlur={paymentDeadlineInput.onBlur}
          handleTouched={paymentDeadlineInput.handleTouched}
          selectedDate={paymentDeadlineInput.selectedDateTime}
          setSelectedDateTime={paymentDeadlineInput.setSelectedDateTime}
        />
        <ItemListCheckBox
          items={itemList}
          isValid={memberListSelector.isValid}
          errorMessage={memberListSelector.errorMessage}
          selectedIds={memberListSelector.selectedIds}
          isSelected={memberListSelector.isSelected}
          toggleSelectItem={memberListSelector.toggleSelectItem}
          selectAll={memberListSelector.selectAll}
          deselectAll={memberListSelector.deselectAll}
          selectedCount={memberListSelector.selectedCount}
          label='참가 회원'
        />
      </View>
      <View style={styles.footerContainer}>
        <ExpandedButton onPress={onFinish} buttonText='저장' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  bodyContainer: {
  },
  footerContainer: {
  },
});

export default EventCreateScreen;