import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ExpandedButton from '../../components/Button/ExpandedButton';
import CustomInput from '../../components/customInput/CustomInput';
import DateTimePickerInput from '../../components/select/DateTimePickerInput';
import { mainNavigations } from '../../constants/navigations';
import useCustomInput from '../../hooks/useCustomInput';
import useDateTimePickerInput from '../../hooks/useDateTimePickerInput';
import useImagePickerInput from '../../hooks/useImagePickerInput';
import { useMutateCreateEventBill, useMutateUpdateEventBill } from '../../hooks/useEventBill';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { EventBillCreateReq } from '../../types/eventBill/EventBillCreateReq';
import { BalanceFormat } from '../../utils/formator';
import { getPresignedUrl } from '../../api/aws';
import ImagePickerInput from '../../components/customInput/ImagePickerInput';

type TransactionHistoryWithdrawCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.TRANSACTIONHISTORY_WITHDRAW_CREATE
>;

const TransactionHistoryWithdrawCreateScreen = ({ route, navigation }: TransactionHistoryWithdrawCreateScreenProps) => {
  const { clubId, eventId } = route.params;
  const createEventBill = useMutateCreateEventBill();
  const updateEventBill = useMutateUpdateEventBill();

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
  const imageInput = useImagePickerInput();

  const handleOnPress = async () => {
    const nameIsValid = nameInput.validate();
    const explanationInputIsValid = explanationInput.validate();
    const paidAmountInputIsValid = paidAmountInput.validate();
    const paidAtInputIsValid = paidAtInput.validate();
    const imageInputisValid = imageInput.validate();

    if (!nameIsValid || !explanationInputIsValid || !paidAmountInputIsValid || !paidAtInputIsValid || !imageInputisValid) {
      return;
    }

    const values: EventBillCreateReq = {
      name: nameInput.value,
      explanation: explanationInput.value,
      paidAmount: -Number(paidAmountInput.value.replace(/\D+/g, '')),
      paidAt: paidAtInput.value || '',
    };
    const queryParams = {
      eventId: eventId,
    };


    try {
      // 1. 이벤트 빌 생성
      const eventBill = await createEventBill.mutateAsync(
        { body: values, queryParams }
      );

      // 2. Presigned URL 요청
      const extension = imageInput.image?.type?.split('/')[1];
      const url = await getPresignedUrl({
        billUid: eventBill.eventBillId,
        extension: extension || 'jpg',
      });

      // 3. 이미지 URI를 Blob으로 변환
      const response = await fetch(imageInput.image?.uri || '');
      const imageBlob = await response.blob();

      // 4. Presigned URL로 이미지 업로드
      await fetch(url.toString(), {
        method: 'PUT',
        body: imageBlob,
        headers: {
          'Content-Type': imageInput.image?.type || 'image/jpeg',
        },
      });

      // 5. EventBill의 image를 presignedUrl로 업데이트
      updateEventBill.mutate({
        body: { image: url, ...values },
        queryParams: { eventBillId: eventBill.eventBillId },
      });

      // 6. 이전 화면으로 이동
      navigation.goBack();
    } catch (error) {
      console.error('Error creating fee:', error, error.message, error.name, error.response?.data);
    }
  };

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
        <ImagePickerInput
          image={imageInput.image}
          selectImage={imageInput.selectImage}
          isValid={imageInput.isValid}
          clearImage={imageInput.clearImage}
          errorMessage={imageInput.errorMessage}
          label='영수증 이미지'
        />
        <View style={{ marginTop: 40 }} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <ExpandedButton onPress={handleOnPress} buttonText='출금 내역 추가' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bodyContainer: {},
  footerContainer: {
    marginTop: 12,
    marginBottom: 36,
  },
});

export default TransactionHistoryWithdrawCreateScreen;