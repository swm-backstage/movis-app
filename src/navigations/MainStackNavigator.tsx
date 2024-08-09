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



export type MainStackParamList = {
  [mainNavigations.CLUB_LIST]: undefined;
  [mainNavigations.CLUB_DETAIL]: { club: ClubGetRes };
  [mainNavigations.CLUB_CREATE]: undefined;

  [mainNavigations.EVENT_CREATE]: { clubId: string };

  [mainNavigations.WEBVIEW]: { clubId: string };
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
        name={mainNavigations.EVENT_CREATE}
        component={EventCreateScreen}
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
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainStackNavigator;