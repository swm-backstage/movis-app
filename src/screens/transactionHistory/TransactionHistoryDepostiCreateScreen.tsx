import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ExpandedButton from '../../components/Button/ExpandedButton';
import CustomLoader from '../../components/Loader';
import CustomInput from '../../components/customInput/CustomInput';
import DateTimePickerInput from '../../components/select/DateTimePickerInput';
import ItemListRadio from '../../components/select/ItemListRadio';
import { mainNavigations } from '../../constants/navigations';
import useCustomInput from '../../hooks/useCustomInput';
import useDateTimePickerInput from '../../hooks/useDateTimePickerInput';
import { useQueryGetEventMemberList } from '../../hooks/useEventMember';
import { useMutateCreateFee } from '../../hooks/useFee';
import useItemListRadio, { Item } from '../../hooks/useItemListRadio';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { FeeCreateReq } from '../../types/fee/request/feeCreateReq';
import { BalanceFormat } from '../../utils/formator';

type TransactionHistoryDepositCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.TRANSACTIONHISTORY_DEPOSIT_CREATE
>;

const TransactionHistoryDepositCreateScreen = ({ route, navigation }: TransactionHistoryDepositCreateScreenProps) => {
  const { clubId, eventId } = route.params;
  const { data, isLoading, isError } = useQueryGetEventMemberList(eventId);

  const createFee = useMutateCreateFee();
  const nameInput = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
  });
  const explanationInput = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
  });
  const paidAmountInput = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
    formator: BalanceFormat,
  });
  const paidAtInput = useDateTimePickerInput();
  const eventMemberRadio = useItemListRadio({
    required: true,
    requiredMessage: '필수 항목',
  });

  const itemList: Item[] = data?.eventMemberList.map(member => ({
    id: member.eventMemberId,
    name: member.name,
  })) || [];

  const handlOnpress = () => {
    const nameIsValid = nameInput.validate();
    const explanationInputIsValid = explanationInput.validate();
    const paidAmountInputIsValid = paidAmountInput.validate();
    const paidAtInputIsValid = paidAtInput.validate();
    const eventMemberIsValid = eventMemberRadio.validate();

    if (!nameIsValid || !explanationInputIsValid || !paidAmountInputIsValid || !paidAtInputIsValid || !eventMemberIsValid) {
      return;
    }
    const values: FeeCreateReq = {
      name: nameInput.value,
      explanation: explanationInput.value,
      paidAmount: Number(paidAmountInput.value.replace(/\D+/g, '')),
      paidAt: paidAtInput.value || '',
      eventMemberId: eventMemberRadio.value || '',
    };
    const queryParams = {
      eventId: eventId,
    };

    createFee.mutate(
      { body: values, queryParams },
      {
        onSuccess: navigation.goBack,
        onError: (error) => {
          console.error('Error creating fee:', error,
            error.message, error.name, error.response?.data);
        }
      }
    );
  };

  if (isLoading) {
    return <CustomLoader />;
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.bodyContainer}>
        <CustomInput
          value={nameInput.value}
          isValid={nameInput.isValid}
          errorMessage={nameInput.errorMessage}
          onChangeText={nameInput.onChangeText}
          onBlur={nameInput.onBlur}
          clearInput={nameInput.clearInput}
          label='이름'
        />
        <CustomInput
          value={explanationInput.value}
          isValid={explanationInput.isValid}
          errorMessage={explanationInput.errorMessage}
          onChangeText={explanationInput.onChangeText}
          onBlur={explanationInput.onBlur}
          clearInput={explanationInput.clearInput}
          label='상세 내역'
        />
        <CustomInput
          value={paidAmountInput.value}
          isValid={paidAmountInput.isValid}
          errorMessage={paidAmountInput.errorMessage}
          onChangeText={paidAmountInput.onChangeText}
          onBlur={paidAmountInput.onBlur}
          clearInput={paidAmountInput.clearInput}
          label='금액'
          keyboardType='numeric'
        />
        <DateTimePickerInput
          isValid={paidAtInput.isValid}
          onBlur={paidAtInput.onBlur}
          handleTouched={paidAtInput.handleTouched}
          selectedDate={paidAtInput.selectedDateTime}
          setSelectedDateTime={paidAtInput.setSelectedDateTime}
          label='날짜'
          mode='datetime'
        />
        <ItemListRadio
          items={itemList}
          selectedId={eventMemberRadio.value}
          isSelected={eventMemberRadio.isSelected}
          selectItem={eventMemberRadio.selectItem}
          deselectItem={eventMemberRadio.deselectItem}
          isValid={eventMemberRadio.isValid}
          errorMessage={eventMemberRadio.errorMessage}
          label="할당할 인원"
        />
        <View style={{ marginTop: 40 }} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <ExpandedButton onPress={() => handlOnpress()} buttonText='입금 내역 추가' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bodyContainer: {
  },
  footerContainer: {
    marginTop: 12,
    marginBottom: 36,
  },
});

export default TransactionHistoryDepositCreateScreen;