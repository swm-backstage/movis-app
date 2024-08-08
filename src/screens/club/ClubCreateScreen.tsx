import {
  Button,
  Form,
  Input,
  Picker,
  Provider,
} from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { mainNavigations } from '../../constants/navigations';
import { useMutateCreateClub } from '../../hooks/useClub';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { ClubCreateReq } from '../../types/club/request/ClubCreateReq';
import AntdWithStyleButton from '../../components/AntdWithStyleButton';
import { bankList } from '../../constants/mockData';


type ClubCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_CREATE
>;

type PickerRenderProps = {
  extra: string;
  value: string[];
  toggle: () => void;
};

function ClubCreateScreen({ navigation }: ClubCreateScreenProps) {
  const [form] = Form.useForm();
  const createClub = useMutateCreateClub();

  type PickerColumnItem = {
    label: string | ReactNode
    value: string | number
    key?: string | number
    children?: PickerColumnItem[]
  }

  type PickerColumn = PickerColumnItem[];


  const data: PickerColumn = bankList.map(bank => ({
    label: bank.name,
    value: bank.code,
  }));

  const onFinish = async (values: ClubCreateReq) => {
    values.bankCode = values.bankCode[0];

    createClub.mutate(
      values,
      {
        onSuccess: () => navigation.goBack(),
        onError: (error) => {
          console.error('Error creating club:', error, error.message, error.name);
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          모임 생성을 도와드려요!!
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Provider>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.formScrollContrainer}>
            <Form
              name="club"
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={() => { }}
              style={styles.form}
            >
              <Form.Item
                label="모임 이름"
                name="name"
                rules={[
                  { pattern: /^.{2,30}$/, message: '모임 이름은 2글자 이상, 30글자 이하로 입력해주세요.' },
                  { required: true, message: '필수 항목입니다. ' }
                ]}
                style={styles.formItem}
              >
                <Input type="text" placeholder="2글자 이상 30글자 이하" style={styles.input} />
              </Form.Item>
              <Form.Item
                label="모임 소개"
                name="description"
                rules={[
                  { pattern: /^.{1,200}$/, message: '200자 이하로 입력해주세요.' },
                  { required: true, message: '필수 항목입니다. ' }
                ]}
                style={styles.formItem}
              >
                <Input.TextArea
                  placeholder="자신의 모임을 간단하게 소개해보세요."
                  maxLength={200}
                  showCount
                  rows={3}
                  style={styles.textarea}
                />
              </Form.Item>
              <Form.Item
                label="잔고"
                name="balance"
                rules={[{ required: true, message: '필수 항목입니다. ' }]}
                style={styles.formItem}
              >
                <Input type="number" placeholder="현재 모임 장부의 잔액을 입력하세요." style={styles.input} />
              </Form.Item>
              <Form.Item
                label="은행"
                name="bankCode"
                rules={[{ required: true, message: '필수 항목입니다. ' }]}
                style={styles.formItem}
              >
                <Picker
                  data={data}
                  cols={1}
                  okText="선택"
                  dismissText="취소"
                >
                  {({ extra, value, toggle }: PickerRenderProps) => (
                    <Input
                      value={value?.length ? extra : undefined}
                      onFocus={toggle}
                      style={styles.input}
                    />
                  )}
                </Picker>
              </Form.Item>
              <Form.Item
                label="계좌 번호"
                name="accountNumber"
                rules={[
                  { pattern: /^.{4}$/, message: '4자리만 입력해주세요. ' },
                  { required: true, message: '필수 항목입니다. ' }
                ]} validateDebounce={500}
                style={styles.formItem}
              >
                <Input type="number" placeholder="계좌번호 뒤 4자리를 입력해주세요." style={styles.input} />
              </Form.Item>
              <Form.Item>
                <AntdWithStyleButton onPress={form.submit}>
                  모임 생성
                </AntdWithStyleButton>
              </Form.Item>
            </Form>
          </ScrollView>
        </Provider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 0.8,
    flexGrow: 0.8,
    marginBottom: 40,
    justifyContent: 'center',
  },
  formScrollContrainer: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  formItem: {
    marginBottom: 15,
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    position: 'relative',
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginBottom: 5,
    color: 'black',
  },
  textarea: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    textAlignVertical: 'top',
    color: 'black',
  },
});

export default ClubCreateScreen;