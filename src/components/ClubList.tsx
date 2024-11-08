import React, { useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView, View, Text } from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import queryClient from '../api/queryClient';
import colors from '../assets/colors/defaultColors';
import { queryKeys } from '../constants/key';
import { useGetClubList } from '../hooks/useClub';
import { ClubGetRes } from '../types/club/response/ClubGetRes';
import CustomLoader from './Loader';
import ClubProfileList from './ClubProfileList';

type SettingEntryProps = {
  handlePressClubCreateScreen: () => void;
  handlePressClubDetailScreen: (club: ClubGetRes) => void;
  handlePressWebView: (clubId: string) => void;
};

const ClubList: React.FC<SettingEntryProps> = ({
  handlePressClubCreateScreen,
  handlePressClubDetailScreen,
  handlePressWebView,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: clubListData,
    isLoading: clubListIsLoading,
    isSuccess,
    isError,
  } = useGetClubList();

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

  if (clubListIsLoading || !clubListData) {
    return <CustomLoader />;
  }

  return (
    <View>
      {clubListData && clubListData?.clubGetListDto.length ? (
        <>
          <Text style={styles.sectionTitle}>내가 속한 모임</Text>
          <ScrollView
            style={styles.scrollContrainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            {clubListData?.clubGetListDto.map((club: ClubGetRes) => (
              <TouchableOpacity
                key={club.clubId}
                onPress={() => handlePressWebView(club.clubId)}
              >
                <View style={styles.clubContainer}>
                  <View style={styles.clubInfo}>
                    <View style={styles.clubNameDescription}>
                      <Text
                        style={styles.clubName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {club.name}
                      </Text>
                      <Text
                        style={styles.clubDescription}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {club.description}
                      </Text>
                    </View>
                    <ClubProfileList club={club} />
                  </View>
                  <View style={styles.clubComplex}>
                    <View style={styles.clubDetailButton}>
                      <TouchableOpacity
                        style={styles.detailButton}
                        onPress={() => handlePressClubDetailScreen(club)}
                      >
                        <AntDesign name="arrowright" style={styles.detailIcon} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.clubBalanceText}>
                      <Text style={styles.balanceText} numberOfLines={1}>
                        {new Intl.NumberFormat('ko-KR').format(club.balance)}원
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.noClubContainer}>
          <View style={styles.noClubCard}>
            <View style={styles.noClubTextContainer}>
              <Text style={styles.noClubText}>
                아직 내가 속한 {'\n'}모임이 없어요 :{'('}
              </Text>
              <Text style={styles.noClubSubText}>모임을 만들어 볼까요?</Text>
            </View>
            <View style={styles.noClubButtonContainer}>
              <TouchableOpacity
                style={styles.noClubButton}
                onPress={handlePressClubCreateScreen}
              >
                <AntDesign name="plus" style={styles.noClubButtonIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.noClubCardNestedFirst} />
          <View style={styles.noClubCardNestedSecond} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.Black,
    marginBottom: 20,
  },
  scrollContrainer: {},
  clubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    height: 127,
    backgroundColor: colors.Gray100,
  },
  clubInfo: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  clubNameDescription: {},
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.Black,
  },
  clubDescription: {
    fontSize: 13,
    color: colors.Black,
    marginTop: 2,
  },
  clubComplex: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  clubDetailButton: {},
  detailButton: {
    padding: 8,
    backgroundColor: colors.White,
    borderRadius: 20,
  },
  detailIcon: {
    fontSize: 20,
    color: colors.Black,
  },
  clubBalanceText: {},
  balanceText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.Black,
  },
  noClubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noClubCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: 12,
    padding: 30,
    backgroundColor: colors.Primary,
    zIndex: 3,
  },
  noClubTextContainer: {
    justifyContent: 'center',
  },
  noClubButtonContainer: {
    justifyContent: 'flex-end',
  },
  noClubText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.White,
    marginBottom: 3,
  },
  noClubSubText: {
    fontSize: 12,
    color: colors.Gray200,
  },
  noClubButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noClubButtonIcon: {
    fontSize: 28,
    color: colors.Black,
  },
  noClubCardNestedFirst: {
    width: '93%',
    aspectRatio: 1.1,
    borderRadius: 12,
    backgroundColor: colors.Gray300,
    marginTop: -280,
    zIndex: 2,
  },
  noClubCardNestedSecond: {
    width: '86%',
    aspectRatio: 1.1,
    borderRadius: 12,
    backgroundColor: colors.Gray200,
    marginTop: -258,
    zIndex: 1,
  },
});

export default ClubList;