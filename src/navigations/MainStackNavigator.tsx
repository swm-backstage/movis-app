import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';


import { mainNavigations } from '../constants/navigations';
import ClubDetailScreen from '../screens/club/ClubDetailScreen';
import ClubListScreen from '../screens/club/ClubListScreen';
import { ClubGetRes } from '../types/club/response/ClubGetRes';
import ClubCreateScreen from '../screens/club/ClubCreateScreen';
import EventCreateScreen from '../screens/event/EventCreateScreen';
import WebViewScreen from '../screens/webview/WebViewScreen';
import NotificiationTest from '../screens/NotificiationTest';

import UnclassifiedListScreen from '../screens/unclassified/UnclassifiedListScreen';
import WithdrawalClassifiedScreen from '../screens/unclassified/WithdrawalClassifiedScreen';
import DepositClassifiedScreen from '../screens/unclassified/DepositClassifiedScreen';
import TransactionHistoryCreateScreen from '../screens/transactionHistory/TransactionHistoryCreateScreen';
import { clubUserGetResDtoList } from '../types/clubUser/response/ClubUserGetListRes';
import ClubUserUpdateScreen from '../screens/clubUser/ClubUserUpdateScreen';




export type MainStackParamList = {
  [mainNavigations.CLUB_LIST]: undefined;
  [mainNavigations.CLUB_DETAIL]: { club: ClubGetRes };
  [mainNavigations.CLUB_CREATE]: undefined;

  [mainNavigations.CLUB_USER_UPDATE]: {clubId: string};

  [mainNavigations.EVENT_CREATE]: { clubId: string };

  [mainNavigations.TRANSACTIONHISTORY_CREATE]: { clubId: string, eventId: string};

  [mainNavigations.WEBVIEW]: { clubId: string };
  [mainNavigations.NOTIFICATION]: undefined,
  [mainNavigations.UNCLASSIFIED]: undefined,
  [mainNavigations.WITHDRAWAL]: { selectedWithdrawals: any[], clubId: string },
  [mainNavigations.DEPOSIT]: { selectedDeposits: any[], clubId: string }
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
      <Stack.Screen
        name={mainNavigations.CLUB_LIST}
        component={ClubListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mainNavigations.CLUB_DETAIL}
        component={ClubDetailScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={mainNavigations.CLUB_CREATE}
        component={ClubCreateScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={mainNavigations.CLUB_USER_UPDATE}
        component={ClubUserUpdateScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={mainNavigations.EVENT_CREATE}
        component={EventCreateScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={mainNavigations.TRANSACTIONHISTORY_CREATE}
        component={TransactionHistoryCreateScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={mainNavigations.WEBVIEW}
        component={WebViewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={mainNavigations.NOTIFICATION}
        component={NotificiationTest}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen name={mainNavigations.UNCLASSIFIED}
        component={UnclassifiedListScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen name={mainNavigations.WITHDRAWAL}
        component={WithdrawalClassifiedScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen name={mainNavigations.DEPOSIT}
        component={DepositClassifiedScreen}
        options={{
          headerTitle: '',
        }}
      />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainStackNavigator;