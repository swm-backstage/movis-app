import { Form, Input, Provider, View } from "@ant-design/react-native";
import React, { useState } from 'react';
import { Image, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { getPresignedUrl } from "../api/aws";
import { useMutateCreateEventBill, useMutateUpdateEventBill } from '../hooks/useEventBill';
import { EventBillCreateReq } from '../types/eventBill/EventBillCreateReq';
import AntdWithStyleButton from "./AntdWithStyleButton";
import DateTimePickerWithAntdDInput from './DateTimePickerWithAntDInput';

interface TransactionHistoryWithdrawCreateProps {
  clubId: string,
  eventId: string,
  navigateGoBack: () => void,
}

const TransactionHistoryWithdrawCreate: React.FC<TransactionHistoryWithdrawCreateProps> = ({
  clubId,
  eventId,
  navigateGoBack,
}) => {
  const [form] = Form.useForm();
  const createEventBill = useMutateCreateEventBill();
  const updateEventBill = useMutateUpdateEventBill();
  const [image, setImage] = useState<any>(null);

  const onFinish = async () => {
    const eventBillCreateReqData: EventBillCreateReq = {
      paidAmount: -form.getFieldValue("paidAmount"),
      paidAt: form.getFieldValue("paidAt"),
      name: form.getFieldValue("name"),
      explanation: form.getFieldValue("explanation"),
    };
    const queryParams = {
      eventId: eventId,
    }

    try {
      // 1. 이벤트 빌 생성
      const eventBill = await createEventBill.mutateAsync(
        { body: eventBillCreateReqData, queryParams }
      );
  
      // 2. Presigned URL 요청
      const extension = image.type.split('/')[1];
      const url = await getPresignedUrl({
        billUid: eventBill.eventBillId, 
        extension: extension,
      });
  
      // 3. 이미지 URI를 Blob으로 변환
      const response = await fetch(image.uri);
      const imageBlob = await response.blob();
  
      // 4. Presigned URL로 이미지 업로드
      await fetch(url.toString(), {
        method: 'PUT',
        body: imageBlob,
        headers: {
          'Content-Type': image.type,
        },
      });
  
      // 5. EventBill의 image를 presigendUrl로 업데이트
      updateEventBill.mutate({
        body: {image: url, ...eventBillCreateReqData}, 
        queryParams: {eventBillId: eventBill.eventBillId},
      });

      // 6. 웹 페이지로 이동
      navigateGoBack();
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  }

  const setFormFieldsValue = (data: string) => {
    form.setFieldsValue({ paidAt: data });
  }

  const showPicker = () => {
    launchImageLibrary({}, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorMessage) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else if (res.assets && res.assets.length > 0) {
        const selectedImage = res.assets[0];
        setImage(selectedImage);
      }
    })
  }

  return (
    <Provider>
      <Form
        name="event"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={styles.form}
      >
        <Form.Item
          label="영수증 이미지"
          name="image"
          style={styles.formItem}
        >
          <View>
            <View style={styles.uploadedImageContainer}>
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={styles.uploadedImage}
                />
              )}
            </View>
            <AntdWithStyleButton onPress={showPicker}>
              추가하기
            </AntdWithStyleButton>
          </View>
        </Form.Item>
        <Form.Item
          label="금액"
          name="paidAmount"
          rules={[
            { pattern: /^.{2,30}$/, message: '필수 항목입니다.' },
            { required: true, message: '필수 항목입니다.' },
          ]}
          style={styles.formItem}
        >
          <Input keyboardType="numeric" placeholder="입금 금액을 입력하세요." style={styles.input} />
        </Form.Item>
        <Form.Item
          label="날짜"
          name="paidAt"
          rules={[{ required: true, message: '필수 항목입니다.' }]}
          style={styles.formItem}
        >
          <DateTimePickerWithAntdDInput setFormFieldsValue={setFormFieldsValue} />
        </Form.Item>
        <Form.Item
          label="내역 이름"
          name="name"
          rules={[
            { pattern: /^.{0,30}$/, message: '30글자 이하로 입력해주세요.' },
            { required: true, message: '필수 항목입니다.' },
          ]}
          style={styles.formItem}
        >
          <Input type="text" placeholder="30글자 이하" style={styles.input} />
        </Form.Item>
        <Form.Item
          label="상세 내역"
          name="explanation"
          rules={[
            { pattern: /^.{0,300}$/, message: '300글자 이하로 입력해주세요.' },
            { required: true, message: '필수 항목입니다.' },
          ]}
          style={styles.formItem}
        >
          <Input type="text" placeholder="300글자 이하" style={styles.input} />
        </Form.Item>
        <Form.Item style={styles.formItem}>
          <AntdWithStyleButton onPress={() => { form.submit(); }}>
            추가하기
          </AntdWithStyleButton>
        </Form.Item>
      </Form>
    </Provider>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
  },
  formItem: {
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    paddingHorizontal: 0,
    position: 'relative',
    color: 'black',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    color: 'black',
  },
  uploadedImageContainer: {
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
    marginVertical: 10,
    width: 300,
    height: 300,
  },
  uploadedImage: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 300,
    height: 300,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 5,
  },
  checkboxGroup: {
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    padding: 7,
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  checkboxSelectGroup: {
    height: 120,
  },
  checkbox: {
    marginVertical: 5,
  },
});

export default TransactionHistoryWithdrawCreate;