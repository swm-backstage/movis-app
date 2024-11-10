import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/colors/defaultColors';
import ClubBankItemList from '../../components/ItemList/ClubBankItemList';
import ClubUserAndMemberItemList from '../../components/ItemList/ClubUserAndMemberItemList';
import ClubDetailSettingEntry from '../../components/customBottomSheet/ClubDetailSettingEntry';
import { mainNavigations } from '../../constants/navigations';
import { useMutateDeleteClub } from '../../hooks/useClub';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

type ClubDetailScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_DETAIL
>;

const ClubDetailScreen = ({ route, navigation }: ClubDetailScreenProps) => {
  const { club, identifier } = route.params;
  const deleteClub = useMutateDeleteClub();
  const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
    snapPoints: useMemo(() => ['80%'], []),
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={styles.clubName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
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
      <View style={styles.bodyContainer}>
        <ClubUserAndMemberItemList clubId={club.clubId} identifier={identifier}/>
        <ClubBankItemList club={club} />
      </View>
      <View style={styles.footerContainer}>
        <CustomBottomSheet>
          <ClubDetailSettingEntry
            clubId={club.clubId}
            navigationGoBack={navigation.goBack}
            deleteClub={deleteClub}
          />
        </CustomBottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flex: 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.White,
  },
  clubName: {
    flex: 0.7,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.Black,
  },
  iconContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  bodyContainer: {
    flex: 0.85,
  },
  footerContainer: {

  }
});

export default ClubDetailScreen;