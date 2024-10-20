import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { BackHandler, Button, Image, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from '../../../navigations/AuthStackNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuth from '../../../hooks/useAuth';
import { RequestLogin } from '../../../api/auth';


type WelcomeScreenProps = StackScreenProps<AuthStackParamList>;

function WelcomeScreen({ route, navigation }: WelcomeScreenProps) {

    const { loginMutation } = useAuth();
    const data = route.params as { identifier: string; password: string; name: string };
    const handleLogin = () => {
        const body: RequestLogin = {
            identifier: data.identifier,
            password: data.password,
        }
        loginMutation.mutate(body)
    }

    useEffect(() => {
        const backAction = () => {

            navigation.navigate('Login');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image source={require('../../../assets/welcom.png')} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.bigText}>반가워요, {data.name}님!</Text>
                    <Text style={styles.smallText}>회원가입이 완료 되었습니다.</Text>
                </View>
            </View>

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 133,
        gap: 32,
        marginHorizontal: 88
    },
    textContainer: {

        gap: 8,

    },
    nextButton: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#5F47F1',
        padding: 15,
        alignItems: 'center',
        marginTop: 365,
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
    icon: {
        width: 100,
        height: 100
    },
    bigText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28.6,
        letterSpacing: -0.44
    },
    smallText: {
        fontFamily: 'Pretendard',
        textAlign: 'center',
        color: '#838A8E',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18.88,
        letterSpacing: -0.32
    }
});

export default WelcomeScreen;