import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Form, Input, Provider, Radio, View } from '@ant-design/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AntdWithStyleButton from './AntdWithStyleButton';
import { MemberGetListRes } from '../types/member/response/MemberGetListRes';
import DateTimePickerWithAntdDInput from './DateTimePickerWithAntDInput';
import { createFee } from '../api/fee';
import { useMutateCreateFee } from '../hooks/useFee';
import { FeeCreateReq } from '../types/fee/request/feeCreateReq';
import { EventMemberGetListRes } from '../types/eventMember/response/EventMemberGetListRes';

interface TransactionHistoryDepositCreateProps {
  clubId: string;
  eventId: string;
  eventMemberGetListRes: EventMemberGetListRes | undefined;
  navigateGoBack: () => void;
}

const TransactionHistoryDepositCreate: React.FC<TransactionHistoryDepositCreateProps> = ({
  clubId,
  eventId,
  eventMemberGetListRes,
  navigateGoBack,
}) => {
  const [form] = Form.useForm();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const createFee = useMutateCreateFee();

  console.log(clubId, eventId);
  console.log(eventMemberGetListRes);

  const onFinish = (data: any) => {
    const values: FeeCreateReq = {
      eventMemberId: form.getFieldValue("eventMemberId"),
      paidAmount: form.getFieldValue("paidAmount"),
      paidAt: form.getFieldValue("paidAt"),
      name: form.getFieldValue("name"),
      explanation: form.getFieldValue("explanation"),
    };
    const queryParams = {
      eventId: eventId,
    }

    createFee.mutate(
      { body: values, queryParams },
      {
        onSuccess: navigateGoBack,
        onError: (error) => {
          console.error('Error creating fee:', error,
            error.message, error.name, error.response?.data);
        }
      }
    );
  }

  const setFormFieldsValue = (data: string) => {
    form.setFieldsValue({paidAt: data});
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
          label="할당할 인원"
          name="eventMemberId"
          rules={[{ required: true, message: '필수 항목입니다.' }]}
          style={styles.formItem}
        >
          <Radio.Group>
            <View style={styles.checkboxGroup}>
              <ScrollView style={styles.checkboxSelectGroup}>
                {eventMemberGetListRes
                  ? eventMemberGetListRes.eventMemberList.map((eventMember) => (
                      <Radio key={eventMember.eventMemberId} value={eventMember.eventMemberId} style={styles.checkbox}>
                        {eventMember.eventMemberId}
                      </Radio>
                    ))
                  : undefined}
              </ScrollView>
            </View>
          </Radio.Group>
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
          <AntdWithStyleButton onPress={() => {
            form.submit();
           }}>추가하기</AntdWithStyleButton>
        </Form.Item>
      </Form>
    </Provider>
  );
};

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

export default TransactionHistoryDepositCreate;