import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from '../../../navigations/AuthStackNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuth from '../../../hooks/useAuth';
import { RequestLogin } from '../../../api/auth';

type WelcomeScreenProps = StackScreenProps<AuthStackParamList>;

function WelcomeScreen({ route, navigation }: WelcomeScreenProps) {

    const { loginMutation } = useAuth();
    const data = route.params as { identifier: string; password: string };
    const handleLogin = () => {
        const body: RequestLogin = {
            identifier: data.identifier,
            password: data.password,
        }
        loginMutation.mutate(body)
    }
    return (
        <View>
            <Text>환영합니다.</Text>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={handleLogin}
            >
                <Text style={styles.nextButtonText}>시작하기</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nextButton: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#5F47F1',
        padding: 15,
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 12
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18.88,
        letterSpacing: -0.32
    },
});

export default WelcomeScreen;