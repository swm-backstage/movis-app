import { Button, Form } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ClubMemberCreateForm from '../../components/ClubMemberCreateForm';
import MemberScrollView from '../../components/MemberScrollView';
import { mainNavigations } from '../../constants/navigations';
import { useGetMemberList, useMutateCreateMemberList } from '../../hooks/useMember';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { MemberCreateListReq } from '../../types/member/request/MemberCreateReq';

type ClubDetailScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_DETAIL
>;

const ClubDetailScreen = ({ route, navigation }: ClubDetailScreenProps) => {
  const [form] = Form.useForm();
  const { club } = route.params;
  const { data: memberList, isLoading, isError } = useGetMemberList(club.clubId);
  const createMemberList = useMutateCreateMemberList();

  const [isAddMemberVisible, setIsAddMemberVisible] = useState<boolean>(false);

  const height = useSharedValue(0);

  const handleToggleAddMember = () => {
    setIsAddMemberVisible(!isAddMemberVisible);

    height.value = withTiming(isAddMemberVisible ? 0 : 320, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const handleAddMember = async (values: MemberCreateListReq) => {
    if (values.memberList === null)
      return;

    setIsAddMemberVisible(false);
    height.value = withTiming(0, {
      duration: 0,
      easing: Easing.inOut(Easing.ease),
    });

    values.clubId = club.clubId;

    createMemberList.mutate(
      values,
      {
        onError: (error) => {
          console.error(error, error.response?.data);
        }
      }
    );

    form.resetFields();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.clubName}>
          {club.name}
        </Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.clubInfoContainer}>
          <View style={styles.clubInfoHeaderContainer}>
            <Text style={styles.clubInfoLabel}>
              회원 목록
            </Text>
            <AntDesign
              name={isAddMemberVisible ? "up" : "adduser"}
              onPress={handleToggleAddMember}
              style={styles.clubSettingIcon}
            />
          </View>
          <Animated.View style={[styles.addMemberContainer, animatedStyle]}>
            <Form
              name="basic"
              form={form}
              layout="vertical"
              style={styles.form}
              onFinish={handleAddMember}
            >
              <ClubMemberCreateForm />
              <Form.Item
                style={styles.formItem}>
                <Button type="primary" onPress={form.submit} style={styles.submitButton}>
                  회원 추가
                </Button>
              </Form.Item>
            </Form>
          </Animated.View>
          <View style={styles.clubInfoMemberData}>
            <MemberScrollView memberList={memberList.members} />
          </View>
        </View>
        <View style={styles.clubInfoContainer}>
          <Text style={styles.clubInfoLabel}>
            연동된 계좌
          </Text>
          <View style={styles.clubInfoBankData}>
            <View style={styles.bankData}>
              <Text style={styles.bankName}>
                토스 뱅크
              </Text>
              <Text style={styles.bankCode}>
                (은행 코드:  {club.bankCode})
              </Text>
            </View>
            <Text style={styles.accountNumber}>
              계좌번호(뒤 4자리){club.accountNumber}
            </Text>
          </View>
          <Button 
            onPress={() => 
              navigation.navigate(mainNavigations.EVENT_CREATE, { clubId: club.clubId })
            }
          >
            <Text>
              이벤트 생성(테스트)
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 20,
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  scrollContainer: {
    flex: 0.9,
    paddingHorizontal: 30,
  },
  form: {
    backgroundColor: 'white',
  },
  formItem: {

  },
  submitButton: {
    width: '100%',
    borderRadius: 5,
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  clubSettingIcon: {
    fontSize: 30,
    color: 'rgba(153, 102, 255, 1)',
  },
  clubInfoContainer: {
    marginTop: 20,
  },
  clubInfoHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clubInfoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  clubInfoMemberData: {

  },
  clubInfoBankData: {
    marginTop: 12,
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 12,
    marginBottom: 100,
  },
  bankData: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bankName: {
    fontSize: 20,
    color: 'black',
  },
  bankCode: {
    fontSize: 12,
  },
  accountNumber: {
    fontSize: 16,
    color: 'black',
  },
  addMemberContainer: {
    overflow: 'hidden',
    marginBottom: 10,
  },
});

export default ClubDetailScreen;