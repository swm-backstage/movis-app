import { ActivityIndicator, Button } from '@ant-design/react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainNavigations } from '../../constants/navigations';
import { useGetClubList } from '../../hooks/useClub';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { ClubGetRes } from '../../types/club/response/ClubGetRes';


type ClubHomeScreenProps = StackScreenProps<
MainStackParamList,
  typeof mainNavigations.CLUB_LIST
>;

function ClubListScreen({ navigation }: ClubHomeScreenProps) {
  const {data: data, isLoading, isError} = useGetClubList();
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handlePressClubDetailScreen = (club: ClubGetRes) => {
    navigation.navigate(mainNavigations.CLUB_DETAIL, { club });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>
          백진암
        </Text>

        <MaterialCommunityIcons
          name="account-circle-outline"
          style={styles.userIcon}
          onPress={() => {
            
            console.log('회원 정보 수정');
          }}
        />
      </View>
      <ScrollView style={styles.clubListContainer}>
        {data.clubGetListDto.map((club: ClubGetRes) => (
          <TouchableOpacity key={club.clubId} onPress={() => handlePressClubDetailScreen(club)}>
            <View style={styles.clubContainer}>
              <View style={styles.clubInfo}>
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
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          type="primary"
          style={styles.submitButton}
          onPress={() => navigation.navigate(mainNavigations.CLUB_CREATE)}>
          <AntDesign
            name="plus"
            style={styles.submitButtonIcon}
          />
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    color: 'black',
  },
  userIcon: {
    fontSize: 35,
    color: 'black',
  },
  clubListContainer: {
    flex: 0.92,
    width: '100%',
    backgroundColor: 'white',
  },
  shadowContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 50,
    padding: 20,
    borderRadius: 5,
    width: '100%',
  },
  clubContainer: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: 30,
    padding: 6,
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  clubInfo: {
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
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
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  submitButton: {
    borderWidth: 0.3,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  submitButtonIcon: {
    color: 'black',
    fontSize: 30,
  },
});

export default ClubListScreen;