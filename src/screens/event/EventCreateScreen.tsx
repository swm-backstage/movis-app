import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form, Input, DatePicker, Button, Provider, Checkbox, ActivityIndicator } from '@ant-design/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetMemberList } from '../../hooks/useMember';

type EventCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.EVENT_CREATE
>;

type PickerRenderProps = {
  extra: string;
  value: string[];
  toggle: () => void;
};

function EventCreateScreen({ route, navigation }: EventCreateScreenProps) {
  const [form] = Form.useForm();
  const { clubId } = route.params;
  const { data: memberList, isLoading, isError } = useGetMemberList(clubId);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    form.setFieldsValue({ checkedMemberList: selectedMembers });
  }, [selectedMembers]);

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const handleCheckboxChange = (member: string) => {
    setSelectedMembers(prev =>
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>이벤트 생성을 도와드려요!!</Text>
      </View>
      <View style={styles.formContainer}>
        <Provider>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.formScrollContrainer}>
            <Form
              name="event"
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={() => { }}
              style={styles.form}
            >
              <Form.Item
                label="이벤트 이름"
                name="name"
                rules={[
                  { pattern: /^.{2,30}$/, message: '이벤트 이름은 2글자 이상, 30글자 이하로 입력해주세요.' },
                  { required: true, message: '필수 항목입니다. ' },
                ]}
                style={styles.formItem}
              >
                <Input type="text" placeholder="2글자 이상 30글자 이하" style={styles.input} />
              </Form.Item>

              <Form.Item
                label="납부 기간"
                name="paymentDeadline"
                rules={[{ required: true, message: '필수 항목입니다. ' }]}
                style={styles.formItem}
              >
                <DatePicker
                  initialValue={new Date(new Date().setDate(new Date().getDate() + 1))}
                  minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                  maxDate={new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate())}
                  format="YYYY-MM-DD"
                  okText="선택"
                  dismissText="취소"
                  locale={{
                    DatePickerLocale: {
                      year: '년',
                      month: '월',
                      day: '일',
                      hour: '시',
                      minute: '분',
                      am: '오전',
                      pm: '오후',
                    },
                  }}
                >
                  {({ extra, value, toggle }: PickerRenderProps) => (
                    <Input
                      value={value?.length ? extra : undefined}
                      onFocus={toggle}
                      style={styles.input}
                    />
                  )}
                </DatePicker>
              </Form.Item>

              <Form.Item
                label="이벤트 참가 회원"
                name="checkedMemberList"
                rules={[{ required: true, message: '필수 항목입니다. ' }]}
                style={styles.formItem}
              >
                  <ScrollView style={styles.checkboxGroup}>
                    {memberList.members.map(member => (
                      <Checkbox
                        key={member.name}
                        checked={selectedMembers.includes(member.name)}
                        onChange={() => handleCheckboxChange(member.name)}
                        style={styles.checkbox}
                      >
                        {member.name}
                      </Checkbox>
                    ))}
                  </ScrollView>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" onPress={form.submit} style={styles.submitButton}>
                  이벤트 생성
                </Button>
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
    marginBottom: 10,
    paddingHorizontal: 10,
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
  submitButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
  },
  checkboxGroup: {
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginBottom: 15,
    height: 150,
    paddingHorizontal: 10,
  },
  checkboxGroupLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    marginVertical: 5,
  },
  hiddenFormItem: {
    display: 'none',
  },
  hiddenInput: {
    display: 'none',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default EventCreateScreen;