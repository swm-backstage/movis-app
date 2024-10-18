import { Icon } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import queryClient from '../../api/queryClient';
import AntdWithStyleButton from '../../components/AntdWithStyleButton';
import CustomLoader from '../../components/Loader';
import { queryKeys } from '../../constants/key';
import { mainNavigations } from '../../constants/navigations';
import useAuth from '../../hooks/useAuth';
import { useGetClubList } from '../../hooks/useClub';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { ClubGetRes } from '../../types/club/response/ClubGetRes';

type ClubHomeScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_LIST
>;

function ClubListScreen({ navigation }: ClubHomeScreenProps) {
  const { data: data, isLoading, isError } = useGetClubList();
  const { logoutMutation } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handlePressClubDetailScreen = (club: ClubGetRes) => {
    navigation.navigate(mainNavigations.CLUB_DETAIL, { club });
  };

  const showLogoutAlert = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "아니오",
          style: "cancel"
        },
        {
          text: "예",
          onPress: () => logoutMutation.mutate()
        }
      ],
      { cancelable: false }
    );
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.CLUB, queryKeys.GET_CLUBLIST],
      });
    } catch (error) {
      console.error('Error refreshing club list:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return <CustomLoader />
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          name="alert"
          style={styles.alertIcon}
          onPress={() => {
            navigation.navigate(mainNavigations.NOTIFICATION);
          }}
        />
        <AntDesign
          name="logout"
          style={styles.logoutIcon}
          onPress={showLogoutAlert}
        />
      </View>

      <ScrollView
        style={styles.clubListContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />}
      >
        {data ? data.clubGetListDto.map((club: ClubGetRes) => (
          <TouchableOpacity
            key={club.clubId}
            onPress={() => navigation.navigate(mainNavigations.WEBVIEW, { clubId: club.clubId })}
          >
            <View style={styles.clubContainer}>
              <View style={styles.clubSettingContainer}>
                <View style={styles.iconView}>
                  <AntDesign
                    name="setting"
                    onPress={() => handlePressClubDetailScreen(club)}
                    style={styles.settingIcon}
                  />
                </View>
              </View>
              <View style={styles.clubInfoContainer}>
                <View style={styles.clubMainInfo}>
                  <Text style={styles.name}>
                    {club.name}
                  </Text>
                  <Text style={styles.description}>
                    {club.description}
                  </Text>
                </View>
                <View style={styles.clubSubInfo}>
                  <View style={styles.memberInfo}>
                    <AntDesign
                      name="user"
                      style={styles.memberIcon}
                    />
                    <Text style={styles.memberNum}>
                      {club.memberCnt}
                    </Text>
                  </View>
                  <View style={styles.balanceInfo}>
                    <Text style={styles.balance}>{new Intl.NumberFormat('ko-KR').format(club.balance) + '원'}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )) : undefined}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AntdWithStyleButton onPress={() => navigation.navigate(mainNavigations.UNCLASSIFIED)}>
          <AntDesign name="book" style={styles.submitButtonIcon} />
        </AntdWithStyleButton>
      </View>
      <View style={styles.buttonContainer}>
        <AntdWithStyleButton onPress={() => navigation.navigate(mainNavigations.CLUB_CREATE)}>
          <AntDesign name="plus" style={styles.submitButtonIcon} />
        </AntdWithStyleButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
  alertIcon: {
    fontSize: 30,
    color: 'rgba(153, 102, 255, 1)',
  },
  logoutIcon: {
    fontSize: 30,
    color: 'rgba(153, 102, 255, 1)',
  },
  clubListContainer: {
    flex: 0.92,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  clubContainer: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: 30,
    padding: 6,
    height: 220,
    justifyContent: 'space-between',
  },
  clubSettingContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-end',
  },
  iconView: {
    position: 'absolute',
  },
  settingIcon: {
    fontSize: 25,
    padding: 5,
    color: 'rgba(153, 102, 255, 1)',
  },
  clubInfoContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    height: 100,
    borderRadius: 5,
    flexDirection: 'row',
  },
  clubMainInfo: {
    flex: 0.7,
    marginVertical: 18,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: "800",
  },
  description: {
    fontSize: 14,
  },
  clubSubInfo: {
    flex: 0.3,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  memberInfo: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  memberIcon: {
    paddingTop: 4,
    color: 'rgba(153, 102, 255, 1)',
    fontSize: 15,
  },
  memberNum: {
    marginLeft: 4,
    fontSize: 17,
  },
  balanceInfo: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  balance: {
    fontSize: 13,
  },
  buttonContainer: {
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  submitButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
});

export default ClubListScreen;