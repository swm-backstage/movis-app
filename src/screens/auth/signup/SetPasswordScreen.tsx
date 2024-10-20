import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../../navigations/AuthStackNavigator';

type SetPasswordScreenProps = StackScreenProps<AuthStackParamList>;

function SetPasswordScreen({ route, navigation }: SetPasswordScreenProps) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFirstFocused, setIsFirstFocused] = useState(false);
    const [isSecondFocused, setIsSecondFocused] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const passwordInputRef = useRef<TextInput>(null);
    const identifier = route.params?.identifier || '';

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

    const handleChangeText = (field: 'password' | 'confirmPassword', text: string) => {
        if (field === 'password') {
            setPassword(text);
        } else if (field === 'confirmPassword') {
            setConfirmPassword(text);
        }
    };

    const handleFocus = (field: 'first' | 'second') => {
        field === 'first' ? setIsFirstFocused(true) : setIsSecondFocused(true)
    }
    const handleBlur = (field: 'first' | 'second') => {
        field === 'first' ? setIsFirstFocused(false) : setIsSecondFocused(false)
    }


    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>

                <Text style={styles.text}>비밀번호를{'\n'}설정해 주세요</Text>

                <View style={styles.inputLayout}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호 입력"
                            value={password}
                            onChangeText={(text) => handleChangeText('password', text)}
                            onFocus={() => handleFocus('first')}
                            onBlur={() => handleBlur('first')}
                            secureTextEntry
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                            returnKeyType="next"
                        />
                        {isFirstFocused && (
                            <TouchableOpacity onPress={() => setPassword('')} >
                                <Image source={require('../../../assets/delete.png')} style={styles.clearIcon} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.inputWithText}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호 재입력"
                                value={confirmPassword}
                                onChangeText={(text) => handleChangeText('confirmPassword', text)}
                                onFocus={() => handleFocus('second')}
                                onBlur={() => handleBlur('second')}
                                secureTextEntry
                                ref={passwordInputRef}
                            />
                            {isSecondFocused && (
                                <TouchableOpacity onPress={() => setConfirmPassword('')} >
                                    <Image source={require('../../../assets/delete.png')} style={styles.clearIcon} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.checkInput}>
                            {password.length > 0 && confirmPassword.length > 0 && (
                                <Image
                                    source={password === confirmPassword
                                        ? require('../../../assets/check_circle.png')
                                        : require('../../../assets/remove_circle.png')}
                                    style={styles.textIcon}
                                />
                            )}
                            {password.length > 0 && confirmPassword.length > 0 && (
                                <Text style={[
                                    styles.availabilityText,
                                    password === confirmPassword ? styles.available : styles.unavailable,
                                ]}>
                                    {password === confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                                </Text>
                            )}

                        </View>
                    </View>

                </View>


            </View>
            {password.length > 0 && confirmPassword.length > 0 && password === confirmPassword && (
                <TouchableOpacity
                    style={isKeyboardVisible ? styles.nextButtonWithKeyboard : styles.nextButton}
                    onPress={() => navigation.navigate('VerifyPhoneNumber', { identifier: identifier, password: password })}
                >
                    <Text style={styles.nextButtonText}>다음</Text>
                </TouchableOpacity>
            )}
        </View >
    );
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

export default SetPasswordScreen;
