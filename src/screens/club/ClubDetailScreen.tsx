import { Form, Input } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AntdWithStyleButton from '../../components/AntdWithStyleButton';
import ClubMemberCreateForm from '../../components/ClubMemberCreateForm';
import ClubUserScrollView from '../../components/ClubUserScrollView';
import MemberScrollView from '../../components/MemberScrollView';
import { bankMap } from '../../constants/mockData';
import { mainNavigations } from '../../constants/navigations';
import { useMutateCreateClubUser } from '../../hooks/useClubUser';
import { useMutateCreateMemberList } from '../../hooks/useMember';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { MemberCreateListReq } from '../../types/member/request/MemberCreateReq';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import ClubDetailSettingEntry from '../../components/customBottomSheet/ClubDetailSettingEntry';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import colors from '../../assets/colors/defaultColors';
import { useMutateDeleteClub } from '../../hooks/useClub';

type ClubDetailScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_DETAIL
>;

const ClubDetailScreen = ({ route, navigation }: ClubDetailScreenProps) => {
  const [clubUserForm] = Form.useForm();
  const [memberForm] = Form.useForm();
  const { club } = route.params;
  const createMemberList = useMutateCreateMemberList();
  const createClubUser = useMutateCreateClubUser();
  const deleteClub = useMutateDeleteClub();
  const [isAddMemberVisible, setIsAddMemberVisible] = useState<boolean>(false);
  const [isAddClubUserVisible, setIsAddClubUserVisible] = useState<boolean>(false);
  const addMemberHeight = useSharedValue(0);
  const addClubUserHeight = useSharedValue(0);
  const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
    snapPoints: useMemo(() => ['80%'], []),
  });

  const handleToggleAddClubUser = () => {
    setIsAddClubUserVisible(!isAddClubUserVisible);

    addClubUserHeight.value = withTiming(isAddClubUserVisible ? 0 : 200, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  };
  const handleToggleAddMember = () => {
    setIsAddMemberVisible(!isAddMemberVisible);

    addMemberHeight.value = withTiming(isAddMemberVisible ? 0 : 320, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  };
  const addClubUserAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: addClubUserHeight.value,
    };
  });
  const addMemberAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: addMemberHeight.value,
    };
  });

  const handleAddClubUser = async (values: string) => {
    setIsAddClubUserVisible(false);
    addClubUserHeight.value = withTiming(0, {
      duration: 0,
      easing: Easing.inOut(Easing.ease),
    });

    createClubUser.mutate(
      { 'clubId': club.clubId, 'identifier': values.identifier },
      {
        onError: (error) => {
          console.error(error, error.response?.data);
        }
      }
    );

    clubUserForm.resetFields();
  };
  const handleAddMember = async (values: MemberCreateListReq) => {
    if (values.memberList === null)
      return;

    setIsAddMemberVisible(false);
    addMemberHeight.value = withTiming(0, {
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

    memberForm.resetFields();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text 
          style={styles.clubName}
          numberOfLines={1}
          ellipsizeMode="tail">
          {club.name}
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={openCustomBottomSheet}
          >
            <AntDesign
              name="setting"
              style={styles.settingIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer} nestedScrollEnabled={true}>
        <View style={styles.clubInfoContainer}>
          <View style={styles.clubInfoHeaderContainer}>
            <Text style={styles.clubInfoLabel}>
              운영진 목록
            </Text>
            <AntDesign
              name={isAddClubUserVisible ? "up" : "adduser"}
              onPress={handleToggleAddClubUser}
              style={styles.clubSettingIcon}
            />
          </View>
          <Animated.View style={[styles.addClubUserContainer, addClubUserAnimatedStyle]}>
            <Form
              name="clubUserForm"
              form={clubUserForm}
              layout="vertical"
              style={styles.form}
              onFinish={handleAddClubUser}
            >
              <Form.Item
                label="운영진 등록"
                name="identifier"
                rules={[
                  { required: true, message: '필수 항목입니다. ' }
                ]}
                style={styles.formItem}
              >
                <Input type="text" placeholder="아이디를 입력하세요. " style={styles.input} />
              </Form.Item>
            </Form>
            <AntdWithStyleButton onPress={clubUserForm.submit}>
              운영진 등록
            </AntdWithStyleButton>
          </Animated.View>
          <View>
            <ClubUserScrollView clubId={club.clubId} />
          </View>
          <AntdWithStyleButton onPress={() => navigation.navigate(mainNavigations.CLUB_USER_UPDATE, { clubId: club.clubId })}>
            운영진 수정
          </AntdWithStyleButton>
        </View>
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
          <Animated.View style={[styles.addMemberContainer, addMemberAnimatedStyle]}>
            <Form
              name="memberForm"
              form={memberForm}
              layout="vertical"
              style={styles.form}
              onFinish={handleAddMember}
            >
              <ClubMemberCreateForm />
            </Form>
            <AntdWithStyleButton onPress={memberForm.submit}>
              회원 추가
            </AntdWithStyleButton>
          </Animated.View>
          <View>
            <MemberScrollView clubId={club.clubId} />
          </View>
        </View>
        <View style={styles.clubInfoContainer}>
          <Text style={styles.clubInfoLabel}>
            연동된 계좌
          </Text>
          <View style={styles.clubInfoBankData}>
            <View style={styles.bankData}>
              <Text style={styles.bankName}>
                {bankMap.get(club.bankCode)}
              </Text>
              <Text style={styles.bankCode}>
                (은행 코드:  {club.bankCode})
              </Text>
            </View>
            <Text style={styles.accountNumber}>
              계좌번호(뒤 4자리){club.accountNumber}
            </Text>
          </View>
        </View>
        <AntdWithStyleButton onPress={() => navigation.navigate(mainNavigations.EVENT_CREATE, { clubId: club.clubId })}>
          이벤트 생성(테스트)
        </AntdWithStyleButton>
        <AntdWithStyleButton onPress={() => navigation.navigate(mainNavigations.TRANSACTIONHISTORY_CREATE, { clubId: club.clubId, eventId: 'dbe9803f-b0cc-4f68-8176-d035d9032fc9' })}>
          거래내역 생성(테스트)
        </AntdWithStyleButton>
      </ScrollView>
      <CustomBottomSheet>
        <ClubDetailSettingEntry
          clubId={club.clubId}
          navigationGoBack={navigation.goBack}
          deleteClub={deleteClub}
        />
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.White,
    padding: 25,
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: colors.White,
  },
  clubName: {
    flex: 0.7,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.Black,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  settingButton: {
    padding: 8,
    backgroundColor: colors.Gray100,
    borderRadius: 20,
  },
  settingIcon: {
    fontSize: 25,
    color: colors.Black,
  },
  scrollContainer: {
    flex: 0.9,
  },
  form: {
    backgroundColor: colors.Black,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
  },
  formItem: {
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    position: 'relative',
    height: 150,
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
    color: 'black',
  },
  clubSettingIcon: {
    fontSize: 30,
    color: 'rgba(153, 102, 255, 1)',
  },
  addClubUserContainer: {
    overflow: 'hidden',
    marginBottom: 10,
  },
  addMemberContainer: {
    overflow: 'hidden',
    marginBottom: 10,
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
    color: 'black',
  },
  accountNumber: {
    fontSize: 16,
    color: 'black',
  },
});

export default ClubDetailScreen;