import { Checkbox, DatePicker, Form, Input, Provider, View } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AntdWithStyleButton from '../../components/AntdWithStyleButton';
import CustomLoader from '../../components/Loader';
import { mainNavigations } from '../../constants/navigations';
import { useMutateCreateEvent } from '../../hooks/useEvent';
import { useGetMemberList } from '../../hooks/useMember';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
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
  const { clubId } = route.params;
  const { data: data, isLoading, isError } = useGetMemberList(clubId);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showGatherFeeInfo, setShowGatherFeeInfo] = useState(false);
  const createEvent = useMutateCreateEvent();

  useEffect(() => {
    form.setFieldsValue({ checkedMemberList: selectedMembers });
  }, [selectedMembers]);

  useEffect(() => {
    if (data) {
      setSelectAll(selectedMembers.length === data.members.length);
    }
  }, [selectedMembers, data]);

  const handleCheckboxChange = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId) ? prev.filter(m => m !== memberId) : [...prev, memberId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(data.members.map(member => member.memberId));
    }
    setSelectAll(!selectAll);
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
          console.error('Error creating event:', error,
            error.message, error.name);
        }
      }
    );
  };

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>이벤트 생성을 도와드려요!!</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Provider>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.formScrollContrainer}>
            <Form
              name="event"
              form={form}
              layout="vertical"
              onFinish={onFinish}
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
                        key={member.memberId}
                        checked={selectedMembers.includes(member.memberId)}
                        onChange={() => handleCheckboxChange(member.memberId)}
                        style={styles.checkbox}
                      >
                        {member.name}
                      </Checkbox>
                    )) : undefined}
                  </ScrollView>
                </View>
              </Form.Item>

              {showGatherFeeInfo ? (
                <View style={styles.getherFeeInfoContainer}>
                  <View style={styles.gatherFeeInfoHeader}>
                    <AntDesign
                      name='close'
                      onPress={() => setShowGatherFeeInfo(false)}
                      style={styles.closeButton}
                    />
                  </View>
                  <View style={styles.gatherFeeInfoForm}>
                    <Form.Item
                      label="납부 금액"
                      name="totalPaymentAmount"
                      rules={[{ required: true, message: '필수 항목입니다. ' }]}
                      style={styles.formItem}
                    >
                      <Input type="number" style={styles.input} />
                    </Form.Item>
                    <Form.Item
                      label="납부 마감일"
                      name="paymentDeadline"
                      rules={[{ required: true, message: '필수 항목입니다. ' }]}
                      style={styles.formItem}
                    >
                      <DatePicker
                        minDate={new Date(new Date().setDate(new Date().getDate()))}
                        maxDate={new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate())}
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
                </View>
              ) : (
                <View style={styles.feeSettingButtonContainer}>
                  <AntdWithStyleButton onPress={() => setShowGatherFeeInfo(true)}>
                    회비 설정
                  </AntdWithStyleButton>
                </View>
              )
              }
              <Form.Item style={styles.formItem}>
                <AntdWithStyleButton onPress={form.submit}>
                이벤트 생성
                </AntdWithStyleButton>
              </Form.Item>
            </Form>
          </ScrollView>
        </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bodyContainer: {
    flexGrow: 0.8,
    marginBottom: 20,
  },
  formScrollContrainer: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
  },
  form: {
    paddingBottom: 50,
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
  getherFeeInfoContainer: {
    padding: 14.5
  },
  gatherFeeInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gatherFeeInfoForm: {
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginTop: 5,
  },
  feeSettingButtonContainer: {
    paddingHorizontal: 15.5,
  },
  closeButton: {
    fontSize: 25,
    color: 'rgba(153, 102, 255, 1)',
  },
});

export default EventCreateScreen;