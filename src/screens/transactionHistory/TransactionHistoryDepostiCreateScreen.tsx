import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import ItemListCheckBox from '../../components/select/ItemListCheckBox';
import useCustomInput from '../../hooks/useCustomInput';
import useDateTimePickerInput from '../../hooks/useDateTimePickerInput';
import { BalanceFormat } from '../../utils/formator';
import CustomInput from '../../components/customInput/CustomInput';
import DateTimePickerInput from '../../components/select/DateTimePickerInput';
import ExpandedButton from '../../components/Button/ExpandedButton';
import { useMutateCreateFee } from '../../hooks/useFee';
import { FeeCreateReq } from '../../types/fee/request/feeCreateReq';

type TransactionHistoryDepositCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.TRANSACTIONHISTORY_DEPOSIT_CREATE
>;

const TransactionHistoryDepositCreateScreen = ({ route, navigation }: TransactionHistoryDepositCreateScreenProps) => {
  const { clubId, eventId } = route.params;
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

  const handlOnpress = () => {
    const nameIsValid = nameInput.validate();
    const explanationInputIsValid = explanationInput.validate();
    const paidAmountInputIsValid = paidAmountInput.validate();
    const paidAtInputIsValid = paidAtInput.validate();

    if (!nameIsValid || !explanationInputIsValid || !paidAmountInputIsValid || !paidAtInputIsValid) {
        return;
    }
    const values: FeeCreateReq = {
      name: nameInput.value,
      explanation: explanationInput.value,
      paidAmount: Number(paidAmountInput.value),
      paidAt: paidAtInput.value || '',
      eventMemberId: '',
    };
    const queryParams = {
      eventId: eventId,
    }

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

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
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
        />
      </View>
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
    justifyContent: 'space-between',
  },
  bodyContainer: {
  },
  footerContainer: {
    marginBottom: 36,
  },
});

export default TransactionHistoryDepositCreateScreen;