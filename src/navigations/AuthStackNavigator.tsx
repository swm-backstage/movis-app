import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import CreateIdScreen from '../screens/auth/signup/CreateIdScreen';
import SetPasswordScreen from '../screens/auth/signup/SetPasswordScreen';
import VerifyPhoneNumberScreen from '../screens/auth/signup/VerifyPhoneNumberScreen';
import WelcomeScreen from '../screens/auth/signup/WelcomeScreen';


export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    CreateId: undefined;
    SetPassword: { identifier: string };
    VerifyPhoneNumber: { identifier: string, password: string };
    Welcome: { identifier: string, password: string, name: string };
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {


    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateId" component={CreateIdScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumberScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitle: '', headerTransparent: true, headerTintColor: '#fff', }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;