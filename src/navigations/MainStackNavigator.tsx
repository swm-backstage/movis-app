import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { mainNavigations } from '../constants/navigations';
import NotificiationTest from '../screens/NotificiationTest';
import ClubDetailScreen from '../screens/club/ClubDetailScreen';
import ClubListScreen from '../screens/club/ClubListScreen';
import EventCreateScreen from '../screens/event/EventCreateScreen';
import UnclassifiedListScreen from '../screens/unclassified/UnclassifiedListScreen';
import WithdrawalClassifiedScreen from '../screens/unclassified/WithdrawalClassifiedScreen';
import WebViewScreen from '../screens/webview/WebViewScreen';
import { ClubGetRes } from '../types/club/response/ClubGetRes';
import ClubMainInfoCreateScreen from '../screens/club/create/ClubMainInfoCreateScreen';
import ClubBankInfoCreateScreen from '../screens/club/create/ClubBankInfoCreateScreen';
import { ClubCreateReq } from '../types/club/request/ClubCreateReq';
import ClubCreateCompleteScreen from '../screens/club/create/ClubCreateCompleteScreen';
import DepositClassifiedScreen from '../screens/unclassified/DepositClassifiedScreen';
import TransactionHistoryDepositCreateScreen from '../screens/transactionHistory/TransactionHistoryDepostiCreateScreen';
import TransactionHistoryWithdrawCreateScreen from '../screens/transactionHistory/TransactionHistoryWithdrawCreateScreen';
import ClubUserUpdateScreen from '../screens/clubUser/ClubUserUpdateScreen';
import ChangePasswordScreen from '../screens/auth/find/ChangePasswordScreen';
import UserDeleteScreen from '../screens/auth/UserDeleteScreen';


export type MainStackParamList = {
  [mainNavigations.USER_DELETE_SCREEN]: undefined;

  [mainNavigations.CLUB_LIST]: undefined;
  [mainNavigations.CLUB_DETAIL]: { club: ClubGetRes, identifier: string };
  [mainNavigations.CLUB_CREATE]: undefined;
  [mainNavigations.CLUB_MAIN_INFO_CREATE]: undefined;
  [mainNavigations.CLUB_BANK_INFO_CREATE]: { values: ClubCreateReq };
  [mainNavigations.CLUB_CREATE_COMPLETE]: { club: ClubGetRes };

  [mainNavigations.CLUB_USER_UPDATE]: { clubId: string };

  [mainNavigations.EVENT_CREATE]: { clubId: string };

  [mainNavigations.TRANSACTIONHISTORY_CREATE]: { clubId: string, eventId: string };
  [mainNavigations.TRANSACTIONHISTORY_DEPOSIT_CREATE]: { clubId: string, eventId: string };
  [mainNavigations.TRANSACTIONHISTORY_WITHDRAW_CREATE]: { clubId: string, eventId: string };

  [mainNavigations.WEBVIEW]: { clubId: string };
  [mainNavigations.NOTIFICATION]: undefined,
  [mainNavigations.UNCLASSIFIED]: { clubId: string },
  [mainNavigations.WITHDRAWAL]: { selectedWithdrawals: any[], clubId: string },
  [mainNavigations.DEPOSIT]: { selectedDeposits: any[], clubId: string },
  [mainNavigations.CHANGE_PASSWORD]: undefined
}

const Stack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>


      <Stack.Screen name={mainNavigations.CLUB_LIST} component={ClubListScreen} options={{ headerShown: false }} />
      <Stack.Screen name={mainNavigations.CLUB_DETAIL} component={ClubDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name={mainNavigations.CLUB_MAIN_INFO_CREATE} component={ClubMainInfoCreateScreen} options={{ headerTitle: '' }} />
      <Stack.Screen name={mainNavigations.CLUB_BANK_INFO_CREATE} component={ClubBankInfoCreateScreen} options={{ headerTitle: '' }} />
      <Stack.Screen name={mainNavigations.CLUB_CREATE_COMPLETE} component={ClubCreateCompleteScreen} options={{ headerShown: false }} />
      <Stack.Screen name={mainNavigations.CLUB_USER_UPDATE} component={ClubUserUpdateScreen} options={{ headerTitle: '' }} />

      <Stack.Screen name={mainNavigations.USER_DELETE_SCREEN} component={UserDeleteScreen} options={{ headerTitle: '' }} />
      
      <Stack.Screen name={mainNavigations.EVENT_CREATE} component={EventCreateScreen} options={{ headerTitle: '' }} />

      <Stack.Screen name={mainNavigations.TRANSACTIONHISTORY_DEPOSIT_CREATE} component={TransactionHistoryDepositCreateScreen} options={{ headerTitle: '' }} />
      <Stack.Screen name={mainNavigations.TRANSACTIONHISTORY_WITHDRAW_CREATE} component={TransactionHistoryWithdrawCreateScreen} options={{ headerTitle: '' }} />

      <Stack.Screen name={mainNavigations.WEBVIEW} component={WebViewScreen} options={{ headerShown: false, }} />
      <Stack.Screen name={mainNavigations.NOTIFICATION} component={NotificiationTest} options={{ headerTitle: '' }} />
      <Stack.Screen name={mainNavigations.UNCLASSIFIED} component={UnclassifiedListScreen} options={{ headerTitle: '', }} />
      <Stack.Screen name={mainNavigations.WITHDRAWAL} component={WithdrawalClassifiedScreen} options={{ headerTitle: '미분류 설정(출금)', headerTitleStyle: { fontSize: 20, marginLeft: -12 }, }} />
      <Stack.Screen name={mainNavigations.DEPOSIT} component={DepositClassifiedScreen} options={{ headerTitle: '미분류 설정(입금)', headerTitleStyle: { fontSize: 20, marginLeft: -12 }, }} />
      <Stack.Screen name={mainNavigations.CHANGE_PASSWORD} component={ChangePasswordScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainStackNavigator;