import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../../navigations/AuthStackNavigator';
import { useSendSms, useVerifyCode } from '../../../hooks/useSms';
import useAuth from '../../../hooks/useAuth';
import { RequestCreateUser } from '../../../api/auth';


type VerifyPhoneNumberScreenProps = StackScreenProps<AuthStackParamList>;

function VerifyPhoneNumberScreen({ route, navigation }: VerifyPhoneNumberScreenProps) {

    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [code, setCode] = useState('');
    const [isFirstFocused, setIsFirstFocused] = useState(false);
    const [isSecondFocused, setIsSecondFocused] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [timer, setTimer] = useState(30); // 타이머 초기값 설정
    const [check, setCheck] = useState<boolean>(false);
    const [flag, setFlag] = useState(false);
    const { signupMutation } = useAuth();

    const data = route.params as { identifier: string; password: string };

    const send = useSendSms(
        {
            onSuccess: () => {
                console.log("success")
                Alert.alert(
                    '인증코드 전송',
                    '3분안에 인증코드를 입력해주세요',
                    [
                        {
                            text: '확인'
                        },
                    ]
                );
            },
            onError: (error) => {
                console.log(error.response?.data)
                Alert.alert(
                    '실패',
                    `인증코드 전송에 실패 : ${error.response?.data || '알 수 없는 오류'}`,
                    [
                        {
                            text: '확인',
                        },
                    ]
                );
            }
        }
    );
    const verifyCode = useVerifyCode({
        onSuccess: (result) => {
            setCheck(true)
            setFlag(true)
        },
        onError: () => {
            setCheck(false)
            setFlag(true)
        }
    });
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


    // 타이머 업데이트
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isButtonDisabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setIsButtonDisabled(false);
                        return 30; // 타이머 초기화
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isButtonDisabled]);

    useEffect(() => {
        if (code.length === 4) {
            const timeout = setTimeout(() => {
                verifyCode.mutate({ phoneNumber: phoneNo.replace(/-/g, ''), verifyCode: code });
            }, 1000);

            return () => clearTimeout(timeout);
        }
        else {
            setFlag(false)
        }
    }, [code]);

    const handleChangeText = (field: 'name' | 'phoneNo' | 'code', text: string) => {
        if (field === 'name') {
            setName(text)
        } else if (field === 'phoneNo') {
            const formattedPhoneNo = text
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{3})(\d{0,4})?(\d{0,4})?$/, (match, p1, p2, p3) => {
                    if (p2) {
                        return p3 ? `${p1}-${p2}-${p3}` : `${p1}-${p2}`;
                    }
                    return p1;
                });
            setPhoneNo(formattedPhoneNo);
        } else if (field == 'code') {
            setCode(text)
        }
    };
    const handleFocus = (field: 'first' | 'second') => {
        if (field === 'first') {
            setIsFirstFocused(true);
        }
        else if (field === 'second') {
            setIsSecondFocused(true);
        }
    }
    const handleBlur = (field: 'first' | 'second') => {
        if (field === 'first') {
            setIsFirstFocused(false);
        }
        else if (field === 'second') {
            setIsSecondFocused(false);
        }
    }

    const handleSendCode = () => {
        if (isButtonDisabled === true) {
            Alert.alert(
                '실패',
                `${timer}초후에 다시 시도해주세요.`,
                [
                    {
                        text: '확인',
                    },
                ]
            );
        }
        else {
            send.mutate(phoneNo.replace(/-/g, ''));
            setIsButtonDisabled(true);
        }
    };

    const handleSingUp = () => {
        const signupBody: RequestCreateUser = {
            identifier: data.identifier,
            password: data.password,
            phoneNo: phoneNo,
            name: name
        }
        signupMutation.mutate(signupBody, {
            onSuccess: () => {
                navigation.navigate('Welcome', { identifier: signupBody.identifier, password: signupBody.password, name: name })
            },
            onError: (error) => {
                console.log(error.response?.data)
            },
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.text}>휴대폰 번호를{'\n'}인증해 주세요</Text>

                <View style={styles.inputLayout}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="이름 입력"
                            value={name}
                            onChangeText={(text) => handleChangeText('name', text)}
                            onFocus={() => handleFocus('first')}
                            onBlur={() => handleBlur('first')}
                        />
                        {isFirstFocused && (
                            <TouchableOpacity onPress={() => setName('')} >
                                <Image source={require('../../../assets/delete.png')} style={styles.clearIcon} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.inputContainerWithButton}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.smallInput}
                                placeholder="휴대폰번호 입력"
                                value={phoneNo}
                                onChangeText={(text) => handleChangeText('phoneNo', text)}
                                maxLength={13}
                                editable={!check}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSendCode} style={styles.codeButton} >
                            <Text>코드 발송</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputWithText}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="인증번호 4자리 입력"
                                value={code}
                                onChangeText={(text) => handleChangeText('code', text)}
                                onFocus={() => handleFocus('second')}
                                onBlur={() => handleBlur('second')}
                                maxLength={4}
                                editable={!check}
                            />
                            {isSecondFocused && (
                                <TouchableOpacity
                                    onPress={() => setCode('')} >
                                    <Image source={require('../../../assets/delete.png')} style={styles.clearIcon} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.checkInput}>
                            {flag === true && (
                                <Image
                                    source={check === true
                                        ? require('../../../assets/check_circle.png')
                                        : require('../../../assets/remove_circle.png')}
                                    style={styles.textIcon}
                                />
                            )}
                            {flag === true && (
                                <Text style={[
                                    styles.availabilityText,
                                    check === true ? styles.available : styles.unavailable,
                                ]}>
                                    {check === true ? '인증되었습니다.' : '인증코드가 올바르지 않습니다.'}
                                </Text>
                            )}

                        </View>
                    </View>
                </View>
            </View>
            {check === true && (
                <TouchableOpacity
                    style={isKeyboardVisible ? styles.nextButtonWithKeyboard : styles.nextButton}
                    onPress={handleSingUp}
                >
                    <Text style={styles.nextButtonText}>다음</Text>
                </TouchableOpacity>
            )}
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
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: 96,
        gap: 24,
        marginHorizontal: 24
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
    inputLayout: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 8,
        alignSelf: 'stretch'
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
    inputContainerWithButton: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    smallInputContainer: {
        display: 'flex',
        height: 52,
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#F0F0F3',
        borderRadius: 4,
        paddingHorizontal: 16,
    },
    codeButton: {
        // borderColor: '#F0F0F3',
        // borderWidth: 1,
        // borderRadius: 4,
        // display: 'flex',

        // justifyContent: 'center',
        // alignItems: 'center',
        // gap: 10,
        backgroundColor: '#fff',
        borderColor: '#F0F0F3',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 22,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    smallInput: {
        flex: 0.65,
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
    inputWithText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        alignSelf: 'stretch'
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

export default VerifyPhoneNumberScreen;