import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form, Input, DatePicker, Button, Provider, Checkbox, ActivityIndicator } from '@ant-design/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetMemberList } from '../../hooks/useMember';
import { useMutateCreateEvent } from '../../hooks/useEvent';
import { EventCreateReq, GatherFeeInfo } from '../../types/event/request/EventCreateReq';

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
  const [feeError, setFeeError] = useState<string | null>(null);
  const { clubId } = route.params;
  const { data: data, isLoading, isError } = useGetMemberList(clubId);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const createEvent = useMutateCreateEvent();

  useEffect(() => {
    form.setFieldsValue({ checkedMemberList: selectedMembers });
  }, [selectedMembers]);

  useEffect(() => {
    if (data) {
      setSelectAll(selectedMembers.length === data.members.length);
    }
  }, [selectedMembers, data]);

  const handleCheckboxChange = (member: string) => {
    setSelectedMembers(prev =>
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(data.members.map(member => member.name));
    }
    setSelectAll(!selectAll);
  };

  const onFieldsChange = (changedFields: any) => {
    const totalPaymentAmount = form.getFieldValue('totalPaymentAmount');
    const paymentDeadline = form.getFieldValue('paymentDeadline');

    if (!(totalPaymentAmount && paymentDeadline)) {
      setFeeError('납부 금액, 마감일을 모두 입력해주세요. ');
    } else {
      setFeeError(null);
    }
  };

  const onFinish = async (data: any) => {
    const values: EventCreateReq = {
      clubId: clubId,
      eventName: data['eventName'],
      gatherFeeInfo: null,
      eventMemberIdList: data['checkedMemberList'],
    };
    if (data['totalPaymentAmount'] && data['paymentDeadline']) {
      const gatherFeeInfo: GatherFeeInfo = {
        totalPaymentAmount: data['totalPaymentAmount'],
        paymentDeadline: data['paymentDeadline'].toISOString().split('T')[0],
      };

      values['gatherFeeInfo'] = gatherFeeInfo;
    }

    createEvent.mutate(
      values,
      {
        onSuccess: () => navigation.goBack(),
        onError: (error) => {
          console.error('Error creating event:', error, error.message, error.name);
        }
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
              onFieldsChange={onFieldsChange}
              style={styles.form}
            >
              <Form.Item
                label="이벤트 이름"
                name="eventName"
                rules={[
                  { pattern: /^.{2,30}$/, message: '이벤트 이름은 2글자 이상, 30글자 이하로 입력해주세요.' },
                  { required: true, message: '필수 항목입니다. ' },
                ]}
                style={styles.formItem}
              >
                <Input type="text" placeholder="2글자 이상 30글자 이하" style={styles.input} />
              </Form.Item>
              <Form.Item
                label="이벤트 참가 회원"
                name="checkedMemberList"
                style={styles.formItem}
              >
                <View style={styles.checkboxGroup}>
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    style={styles.checkbox}
                  >
                    전체 선택
                  </Checkbox>
                  <ScrollView style={styles.checkboxSelectGroup}>
                    {data ? data.members.map(member => (
                      <Checkbox
                        key={member.name}
                        checked={selectedMembers.includes(member.name)}
                        onChange={() => handleCheckboxChange(member.name)}
                        style={styles.checkbox}
                      >
                        {member.name}
                      </Checkbox>
                    )) : undefined}
                  </ScrollView>
                </View>
              </Form.Item>
              <View style={styles.gatherFeeInfoContainer}>
                <Text style={styles.gatherFeeInfoTitle}>
                  회비 설정
                </Text>
                <View style={styles.gatherFeeInfo}>
                  <Form.Item
                    label="납부 금액"
                    name="totalPaymentAmount"
                    style={styles.formItem}
                  >
                    <Input type="number" style={styles.input} />
                  </Form.Item>
                  <Form.Item
                    label="납부 마감일"
                    name="paymentDeadline"
                    style={styles.formItem}
                  >
                    <DatePicker
                      minDate={new Date(new Date().setDate(new Date().getDate()))}
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
                </View>
                  {feeError && <Text style={styles.errorText}>{feeError}</Text>}
              </View>
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
    padding: 7,
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  checkboxSelectGroup: {
    height: 120,
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
  gatherFeeInfoContainer: {
    padding: 14,
  },
  gatherFeeInfoTitle: {
    color: 'black',
    fontSize: 18,
  },
  gatherFeeInfo: {
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default EventCreateScreen;