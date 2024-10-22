import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/colors/colors';
import ClubList from '../../components/ClubList';
import SettingEntry from '../../components/SettingEntry';
import { mainNavigations } from '../../constants/navigations';
import useAuth from '../../hooks/useAuth';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { useGetUser } from '../../hooks/useUser';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { ClubGetRes } from '../../types/club/response/ClubGetRes';

type ClubHomeScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_LIST
>;

function ClubListScreen({ navigation }: ClubHomeScreenProps) {
  const { data: user, isLoading: userIsLoading } = useGetUser();
  const { logoutMutation } = useAuth();
  const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
    snapPoints: useMemo(() => ['80%'], []),
  });
  const handlePressClubCreateScreen = () => {
    navigation.navigate(mainNavigations.CLUB_CREATE);
  };  
  const handlePressClubDetailScreen = (club: ClubGetRes) => {
    navigation.navigate(mainNavigations.CLUB_DETAIL, { club });
  };

  const handlePressWebView = (clubId: string) => {
    navigation.navigate(mainNavigations.WEBVIEW, { clubId });
  };

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
          <TouchableOpacity
            style={styles.settingButton}
            onPress={openCustomBottomSheet}
          >
            <AntDesign
              name="setting"
              onPress={openCustomBottomSheet}
              style={styles.settingIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openCustomBottomSheet}
          >
            <AntDesign
              name="plus"
              onPress={handlePressClubCreateScreen}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ClubList
          handlePressClubCreateScreen={handlePressClubCreateScreen}
          handlePressClubDetailScreen={handlePressClubDetailScreen}
          handlePressWebView={handlePressWebView}>
        </ClubList>
      </View>
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
    backgroundColor: colors.White,
    padding: 25,
  },
  headerContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: colors.White,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '900',
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
    marginRight: 10,
  },
  settingIcon: {
    fontSize: 25,
    color: colors.Black,
  },
  addButton: {
    padding: 10,
    backgroundColor: colors.Primary,
    borderRadius: 20,
  },
  addIcon: {
    fontSize: 20,
    color: colors.White,
  },
  bodyContainer: {
    flex: 0.85,
  },
});

export default ClubListScreen;