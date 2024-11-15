import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ErrorMessageWithInput from '../../../components/customInput/ErrorMessageWithInput';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigations/MainStackNavigator';
import { useChangePassword } from '../../../hooks/useUser';
import { mainNavigations } from '../../../constants/navigations';

type ChangePasswordScreenProps = StackScreenProps<MainStackParamList>;

function ChangePasswordScreen({ route, navigation, }: ChangePasswordScreenProps) {
    const [prevPassword, setPrevPassword] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focusStates, setFocusStates] = useState({
        first: false,
        second: false,
        third: false,
    });
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const passwordInputRef = useRef<TextInput>(null);
    const chnagePasswordMutation = useChangePassword()


    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleChangeText = (field: 'password' | 'confirmPassword' | 'prev', text: string) => {
        if (field === 'password') {
            setPassword(text);
        } else if (field === 'confirmPassword') {
            setConfirmPassword(text);
        }
        else if (field === 'prev') {
            setPrevPassword(text);
        }
    };

    const isValidPassword = (password: string) => {
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*+=])(?=\S+$).{8,20}$/;
        return regex.test(password);
    };


    const handleFocus = (field: 'first' | 'second' | 'third') => {
        setFocusStates((prevStates) => ({
            ...prevStates,
            [field]: true,
        }));
    };

    const handleBlur = (field: 'first' | 'second' | 'third') => {
        setFocusStates((prevStates) => ({
            ...prevStates,
            [field]: false,
        }));
    };

    const handleChangePassword = () => {


        chnagePasswordMutation.mutate(
            {
                oldPassword: prevPassword,
                newPassword: password
            }
            , {
                onSuccess: () => {
                    Alert.alert(
                        '성공',
                        '비밀번호 변경에 성공하였습니다.',
                        [
                            {
                                text: '확인'
                            },
                        ]
                    );
                    navigation.navigate(mainNavigations.CLUB_LIST)
                },
                onError: (error) => {

                    Alert.alert(
                        '실패',
                        error.response?.data?.message === 'Invalid Input Value' ? "기존 비밀번호가 올바르지 않습니다" : "페이지를 다시 접근하세요",
                        [
                            {
                                text: '확인'
                            }
                        ]
                    )
                },
            })
    }
    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>

                <Text style={styles.text}>기존 비밀번호와 {'\n'}새로운 비밀번호를 입력하세요</Text>



                <View style={styles.inputLayout}>
                    <ErrorMessageWithInput
                        placeholder='현재 비밀번호'
                        placeholderTextColor="#ACB2B5"
                        value={prevPassword}
                        onChangeText={(text) => handleChangeText('prev', text)}
                        onFocus={() => handleFocus('first')}
                        onBlur={() => handleBlur('first')}
                        secureTextEntry
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        returnKeyType="next"
                        onClear={() => setPrevPassword('')}
                        isValidText={() => true}
                        isFocused={focusStates.first}
                    />
                    <ErrorMessageWithInput
                        placeholder='새 비밀번호'
                        placeholderTextColor="#ACB2B5"
                        value={password}
                        onChangeText={(text) => handleChangeText('password', text)}
                        onFocus={() => handleFocus('second')}
                        onBlur={() => handleBlur('second')}
                        secureTextEntry
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        returnKeyType="next"
                        onClear={() => setPassword('')}
                        isValidText={isValidPassword}
                        isFocused={focusStates.second}
                        errorText='비밀번호는 8-20자이며, 특수 문자, 대문자, 소문자, 숫자를 포함해야 합니다.'
                    />

                    <ErrorMessageWithInput
                        placeholder='비밀번호 확인'
                        placeholderTextColor="#ACB2B5"
                        value={confirmPassword}
                        onChangeText={(text) => handleChangeText('confirmPassword', text)}
                        onFocus={() => handleFocus('third')}
                        onBlur={() => handleBlur('third')}
                        secureTextEntry
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        returnKeyType="done"
                        onClear={() => setConfirmPassword('')}
                        isFocused={focusStates.third}
                        type='SuccessError'
                        condition1={password.length > 0 && confirmPassword.length > 0}
                        condition2={password === confirmPassword}
                        successText='비밀번호가 일치합니다.'
                        errorText='비밀번호가 일치하지 않습니다.'
                    />

                </View>


            </View>
            {password.length > 0 && confirmPassword.length > 0 && password === confirmPassword && isValidPassword(password) && (
                <TouchableOpacity
                    style={isKeyboardVisible ? styles.nextButtonWithKeyboard : styles.nextButton}
                    onPress={handleChangePassword}
                >
                    <Text style={styles.nextButtonText}>변경</Text>
                </TouchableOpacity>
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: 96,
        gap: 24,
        marginHorizontal: 24
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // 교차축 ( 주축이 row니까 수직 방향으로 가운데 정렬 )
        borderWidth: 1,
        borderColor: '#F0F0F3',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 8, // 자식 컴포넌트 사이간의 간격을 설정
    },
    inputLayout: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 8,
        alignSelf: 'stretch'
    },
    inputWithText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        alignSelf: 'stretch'
    },
    input: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 16.52,
        letterSpacing: -0.28,
        color: 'black'
    },
    clearIcon: {
        width: 24,
        height: 24,
    },
    text: {
        fontFamily: 'Pretendard',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 31.2,
        letterSpacing: -0.48,
        color: '#000'
    },
    checkInput: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4,
        flexDirection: 'row'
    },
    textIcon: {
        width: 18,
        height: 18
    },
    availabilityText: {
        fontFamily: 'Pretendard',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18.2,
    },
    available: {
        color: '#1C6BF9',
    },
    unavailable: {
        color: '#E42838',
    },
    nextButtonWithKeyboard: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 52,
        backgroundColor: '#5F47F1',
        padding: 17,
        alignItems: 'center',
        alignSelf: 'center'
    },
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

export default ChangePasswordScreen;