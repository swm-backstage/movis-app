import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';


import { clubNavigations } from '../constants/navigations';
import CustomForm from '../screens/club/ClubCreateScreen';
import ClubDetailScreen from '../screens/club/ClubDetailScreen';
import ClubListScreen from '../screens/club/ClubListScreen';
import { ClubGetRes } from '../types/club/response/ClubGetRes';


export type ClubStackParamList = {
  [clubNavigations.CLUB_LIST]: undefined;
  [clubNavigations.CLUB_DETAIL]: { club: ClubGetRes };
  [clubNavigations.CLUB_CREATE]: undefined;
}

const Stack = createStackNavigator<ClubStackParamList>();

function ClubStackNavigator() {

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
        name={clubNavigations.CLUB_LIST}
        component={ClubListScreen}
        options={{
          headerTitle: '모임 리스트 조회',
        }}
      />
      <Stack.Screen
        name={clubNavigations.CLUB_DETAIL}
        component={ClubDetailScreen}
        options={{
          headerTitle: '모임 상세 조회',
        }}
      />
      <Stack.Screen
        name={clubNavigations.CLUB_CREATE}
        component={CustomForm}
        options={{
          headerTitle: '모임 생성',
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default ClubStackNavigator;