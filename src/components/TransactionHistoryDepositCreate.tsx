import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Form, Input, Provider, Radio, View } from '@ant-design/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AntdWithStyleButton from './AntdWithStyleButton';
import { MemberGetListRes } from '../types/member/response/MemberGetListRes';
import DateTimePickerWithAntdDInput from './DateTimePickerWithAntDInput';

interface TransactionHistoryDepositCreateProps {
  clubId: string;
  eventId: string;
  memberGetListRes: MemberGetListRes | undefined;
}

const TransactionHistoryDepositCreate: React.FC<TransactionHistoryDepositCreateProps> = ({
  clubId,
  eventId,
  memberGetListRes,
}) => {
  const [form] = Form.useForm();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onFinish = (data: any) => {
    // TODO: API연결
    console.log('API를 연결하세요. ');
  }

  const setFormFieldsValue = (data: string) => {
    console.log(data);
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
                {memberGetListRes
                  ? memberGetListRes.members.map((member) => (
                      <Radio key={member.memberId} value={member.memberId} style={styles.checkbox}>
                        {member.name}
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
            console.log(form.getFieldsValue())
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