import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import queryClient from '../../api/queryClient';
import CustomLoader from '../../components/Loader';
import SettingEntry from '../../components/SettingEntry';
import { queryKeys } from '../../constants/key';
import { mainNavigations } from '../../constants/navigations';
import useAuth from '../../hooks/useAuth';
import { useGetClubList } from '../../hooks/useClub';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { ClubGetRes } from '../../types/club/response/ClubGetRes';
import { useGetUser } from '../../hooks/useUser';

type ClubHomeScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_LIST
>;

function ClubListScreen({ navigation }: ClubHomeScreenProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: clubList, isLoading: clubListIsLoading } = useGetClubList();
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const { logoutMutation } = useAuth();
  const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
    snapPoints: useMemo(() => ['80%'], []),
  });

  const handlePressClubDetailScreen = (club: ClubGetRes) => {
    navigation.navigate(mainNavigations.CLUB_DETAIL, { club });
  };

  const handlePressWebView = (clubId: number) => {
    navigation.navigate(mainNavigations.WEBVIEW, { clubId });
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

  if (clubListIsLoading) {
    return <CustomLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.welcomeText}>
            반가워요!
            {"\n" + user?.name}님.
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign
            name="setting"
            onPress={openCustomBottomSheet}
            style={styles.settingIcon}
          />
          <AntDesign
            name="pluscircle"
            onPress={() => navigation.navigate(mainNavigations.CLUB_CREATE)}
            style={styles.addIcon}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>내가 속한 모임</Text>
      <ScrollView
        style={styles.bodyContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {clubList?.clubGetListDto.map((club: ClubGetRes) => (
          <TouchableOpacity
            key={club.clubId}
            onPress={() => handlePressWebView(club.clubId)}
          >
            <View style={styles.clubContainer}>
              <View style={styles.clubInfo}>
                <View>
                  <Text style={styles.clubName}>{club.name}</Text>
                  <Text style={styles.clubDescription}>{club.description}</Text>
                </View>
              </View>
              <Text style={styles.balanceText}>
                {new Intl.NumberFormat('ko-KR').format(club.balance)}원
              </Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => handlePressClubDetailScreen(club)}
              >
                <AntDesign name="arrowright" style={styles.detailIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomBottomSheet>
        <SettingEntry 
          user={user}
          logout={() => logoutMutation.mutate()}
        />
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 24,
    color: '#9999FF',
    marginRight: 15,
  },
  addIcon: {
    fontSize: 28,
    color: '#6C63FF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#333',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  clubContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clubDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'right',
    position: 'absolute', // 아이콘과 정렬되도록 위치 조정
    right: 50,
  },
  detailButton: {
    padding: 8,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
  },
  detailIcon: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default ClubListScreen;