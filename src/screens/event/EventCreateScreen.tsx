import { View } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import CustomLoader from '../../components/Loader';
import CustomInput from '../../components/customInput/CustomInput';
import DateTimePickerInput from '../../components/select/DateTimePickerInput';
import { mainNavigations } from '../../constants/navigations';
import useCustomInput from '../../hooks/useCustomInput';
import { useMutateCreateEvent } from '../../hooks/useEvent';
import { useGetMemberList } from '../../hooks/useMember';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { BalanceFormat } from '../../utils/formator';
import { EventNameValidator } from '../../utils/validator';
import useDateTimePickerInput from '../../hooks/useDateTimePickerInput';
import ExpandedButton from '../../components/Button/ExpandedButton';

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

  const dateTimePickerInput = useDateTimePickerInput();

  const onFinish = useCallback(() => {
    const isEventNameValid = eventNameInput.validate();
    const isTotalPaymentValid = totalPaymentAmountInput.validate();
    const isDateValid = dateTimePickerInput.validate();

    if (!isEventNameValid || !isTotalPaymentValid || !isDateValid) {
      Alert.alert('오류', '모든 필드를 올바르게 입력해주세요.');
      return;
    }

    createEvent.mutate(
      {
        eventName: eventNameInput.value,
        totalPaymentAmount: totalPaymentAmountInput.value,
        deadline: dateTimePickerInput.selectedDateTime,
        clubId,
      },
      {
        onSuccess: () => navigation.goBack(),
        onError: (error) => {
          console.error('Error creating event:', error, error.message, error.name);
        },
      }
    );
  }, [
    eventNameInput,
    totalPaymentAmountInput,
    dateTimePickerInput,
    createEvent,
    clubId,
    navigation,
  ]);

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
          isValid={dateTimePickerInput.isValid}
          onBlur={dateTimePickerInput.onBlur}
          handleTouched={dateTimePickerInput.handleTouched}
          selectedDate={dateTimePickerInput.selectedDateTime}
          setSelectedDateTime={dateTimePickerInput.setSelectedDateTime}
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
    paddingVertical: 44,
    paddingHorizontal: 24,
  },
  bodyContainer: {

  },
  footerContainer: {

  },
});

export default EventCreateScreen;