import React, { useState } from 'react';
import { StyleSheet, Image } from "react-native";
import { DatePicker, Form, Input, Provider, View } from "@ant-design/react-native";
import { launchImageLibrary } from "react-native-image-picker";
import AntdWithStyleButton from "./AntdWithStyleButton";

interface TransactionHistoryWithdrawCreateProps {
  clubId: string,
  eventId: string,
}

const TransactionHistoryWithdrawCreate: React.FC<TransactionHistoryWithdrawCreateProps> = ({
  clubId, eventId
}) => {
  const [form] = Form.useForm();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const showPicker = () => {
    launchImageLibrary({}, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorMessage) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else if (res.assets && res.assets.length > 0) {
        const selectedImage = res.assets[0];
        const formdata = new FormData();
        formdata.append('file', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
        console.log(res);
        setImageUri(selectedImage.uri);
      }
    })
  }

  return (
    <Provider>
      <Form
        name="event"
        form={form}
        layout="vertical"
        style={styles.form}
      >
        <Form.Item
          label="영수증 이미지"
          name="checkedMemberList"
          style={styles.formItem}
        > 
          <View style={styles.uploadedImageContainer}>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.uploadedImage}
              />
            )}
          </View>
          <AntdWithStyleButton onPress={showPicker}>
            추가하기
          </AntdWithStyleButton>
        </Form.Item>
        <Form.Item
          label="금액"
          name="eventName"
          rules={[
            { pattern: /^.{2,30}$/, message: '필수 항목입니다. ' },
            { required: true, message: '필수 항목입니다.' },
          ]}
          style={styles.formItem}
        >
          <Input keyboardType="numeric" placeholder="입금 금액을 입력하세요." style={styles.input} />
        </Form.Item>
        <Form.Item
          label="날짜"
          name="paymentDeadline"
          rules={[{ required: true, message: '필수 항목입니다.' }]}
          style={styles.formItem}
        >
          <DatePicker
            maxDate={new Date()}
            okText="선택"
            dismissText="취소"
            picker
            format="YYYY-MM-DD"
            locale={{
              DatePickerLocale: {
                year: '년',
                month: '월',
                day: '일',
                hour: '시',
                minute: '분',
              },
            }}
          >
            {({ extra, value, toggle }) => (
              <Input
                value={value?.length ? extra : undefined}
                onFocus={toggle}
                style={styles.input}
              />
            )}
          </DatePicker>
        </Form.Item>
        <Form.Item
          label="상세 내역"
          name="eventName"
          rules={[
            { pattern: /^.{0,30}$/, message: '300글자 이하로 입력해주세요.' },
            { required: true, message: '필수 항목입니다.' },
          ]}
          style={styles.formItem}
        >
          <Input type="text" placeholder="300글자 이하" style={styles.input} />
        </Form.Item>
        <Form.Item style={styles.formItem}>
          <AntdWithStyleButton onPress={form.submit}>
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