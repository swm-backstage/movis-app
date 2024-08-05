import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';


import { mainNavigations } from '../constants/navigations';
import ClubDetailScreen from '../screens/club/ClubDetailScreen';
import ClubListScreen from '../screens/club/ClubListScreen';
import { ClubGetRes } from '../types/club/response/ClubGetRes';
import ClubCreateScreen from '../screens/club/ClubCreateScreen';
import EventCreateScreen from '../screens/event/EventCreateScreen';


export type MainStackParamList = {
  [mainNavigations.CLUB_LIST]: undefined;
  [mainNavigations.CLUB_DETAIL]: { club: ClubGetRes };
  [mainNavigations.CLUB_CREATE]: undefined;

  [mainNavigations.EVENT_CREATE]: { clubId: string };
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
          headerTitle: '모임 리스트 조회',
        }}
      />
      <Stack.Screen
        name={mainNavigations.CLUB_DETAIL}
        component={ClubDetailScreen}
        options={{
          headerTitle: '모임 상세 조회',
        }}
      />
      <Stack.Screen
        name={mainNavigations.CLUB_CREATE}
        component={ClubCreateScreen}
        options={{
          headerTitle: '모임 생성',
        }}
      />
      <Stack.Screen
        name={mainNavigations.EVENT_CREATE}
        component={EventCreateScreen}
        options={{
          headerTitle: '이벤트 생성',
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainStackNavigator;