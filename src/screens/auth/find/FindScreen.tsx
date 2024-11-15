import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../../navigations/AuthStackNavigator';
import ErrorMessageWithInput from '../../../components/customInput/ErrorMessageWithInput';
import { useSendSms, useVerifyCode } from '../../../hooks/useSms';
import { useGetIdentifier, usePasswordReset } from '../../../hooks/useUser';


type FindScreenProps = StackScreenProps<AuthStackParamList>;

const Tab = createMaterialTopTabNavigator();

const FindIDScreen = ({ handleSendCode }: any) => {

    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [firstFocused, setFirstFocused] = useState(false);
    const [check, setCheck] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [identifier, setIdentifier] = useState(null);

    const getIdentifier = useGetIdentifier(
        {
            onSuccess: (data) => {
                setIdentifier(data.identifier)
            }
            ,
            onError: (error) => {

                Alert.alert(
                    '',
                    '다시 시도하세요',
                    [
                        {
                            text: '확인'
                        },
                    ]
                );
            }
        }
    );


    const verifyCode = useVerifyCode({
        onSuccess: (result) => {

            getIdentifier.mutate(phone)
            setCheck(true)
            setFlag(true)
        },
        onError: () => {

            setCheck(false)
            setFlag(true)
        }
    });

    useEffect(() => {
        if (code.length === 4) {
            const timeout = setTimeout(() => {

                verifyCode.mutate({ phoneNumber: phone, verifyCode: code });
            }, 1000);

            return () => clearTimeout(timeout);
        }
        else {
            setFlag(false)
        }
    }, [code]);

    const handleChangeText = (text: string) => {
        const formattedPhoneNo = text
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{3})(\d{0,4})?(\d{0,4})?$/, (match, p1, p2, p3) => {
                if (p2) {
                    return p3 ? `${p1}-${p2}-${p3}` : `${p1}-${p2}`;
                }
                return p1;
            });
        setPhone(formattedPhoneNo);
    }

    const handleFocus = (field: 'first') => {
        if (field === 'first') {
            setFirstFocused(true);
        }
    }
    const handleBlur = (field: 'first') => {
        if (field === 'first') {
            setFirstFocused(false);
        }
    }
    // check가 true로 변경될 때 Alert 창을 띄우기 위한 useEffect
    useEffect(() => {
        if (check === true) {
            Alert.alert(
                "아이디 확인",
                `휴대전화 정보와 일치하는 아이디입니다.\n아이디: ${identifier}`,
                [{ text: "확인" }]
            );
        }
    }, [identifier]);


    return (
        <View style={styles.container}>


            <View style={styles.inputContainerWithButton}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.smallInput, check ? styles.closedText : styles.openText]}
                        placeholder="휴대폰번호 입력"
                        placeholderTextColor="#ACB2B5"
                        value={phone}
                        onChangeText={handleChangeText}
                        keyboardType='phone-pad'
                        maxLength={13}
                        editable={!check}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => handleSendCode(phone)} style={styles.codeButton} disabled={check}>
                    <Text style={check ? styles.closedText : styles.openText}>코드 발송</Text>
                </TouchableOpacity>

            </View>
            <ErrorMessageWithInput
                placeholder='인증번호 4자리 입력'
                placeholderTextColor="#ACB2B5"
                value={code}
                onChangeText={setCode}
                onFocus={() => handleFocus('first')}
                onBlur={() => handleBlur('first')}
                isFocused={firstFocused}
                onClear={() => setCode('')}
                type='SuccessError'
                condition1={flag === true}
                condition2={check === true}
                successText='인증되었습니다.'
                errorText='인증코드가 올바르지 않습니다.'
                maxLength={4}
                editable={!check}
                isClosed={check}
            />
        </View>
    );
};

const FindPasswordScreen = ({ handleSendCode, sendPassword }: any) => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [firstFocused, setFirstFocused] = useState(false);
    const [check, setCheck] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);

    const resetPasword = usePasswordReset(
        {
            onSuccess: (data) => {
                Alert.alert(
                    '',
                    '임시 비밀번호가 문자로 전송되었습니다.',
                    [
                        {
                            text: '확인'
                        },
                    ]
                );
            }
            ,
            onError: (error) => {

                Alert.alert(
                    '',
                    '다시 시도해주세요',
                    [
                        {
                            text: '확인'
                        },
                    ]
                );
            }
        }
    );

    const verifyCode = useVerifyCode({
        onSuccess: (result) => {

            //여기에 sendPassword() 사용해서 문자메시지 보내기
            resetPasword.mutate(phone)
            setCheck(true)
            setFlag(true)
        },
        onError: () => {

            setCheck(false)
            setFlag(true)
        }
    });

    useEffect(() => {
        if (code.length === 4) {
            const timeout = setTimeout(() => {

                verifyCode.mutate({ phoneNumber: phone, verifyCode: code });
            }, 1000);

            return () => clearTimeout(timeout);
        }
        else {
            setFlag(false)
        }
    }, [code]);

    const handleChangeText = (text: string) => {
        const formattedPhoneNo = text
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{3})(\d{0,4})?(\d{0,4})?$/, (match, p1, p2, p3) => {
                if (p2) {
                    return p3 ? `${p1}-${p2}-${p3}` : `${p1}-${p2}`;
                }
                return p1;
            });
        setPhone(formattedPhoneNo);
    }

    const handleFocus = (field: 'first') => {
        if (field === 'first') {
            setFirstFocused(true);
        }
    }
    const handleBlur = (field: 'first') => {
        if (field === 'first') {
            setFirstFocused(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainerWithButton}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.smallInput, check ? styles.closedText : styles.openText]}
                        placeholder="휴대폰번호 입력"
                        placeholderTextColor="#ACB2B5"
                        value={phone}
                        onChangeText={handleChangeText}
                        keyboardType='phone-pad'
                        maxLength={13}
                        editable={!check}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => handleSendCode(phone)} style={styles.codeButton} disabled={check}>
                    <Text style={check ? styles.closedText : styles.openText}>코드 발송</Text>
                </TouchableOpacity>

            </View>
            <ErrorMessageWithInput
                placeholder='인증번호 4자리 입력'
                placeholderTextColor="#ACB2B5"
                value={code}
                onChangeText={setCode}
                onFocus={() => handleFocus('first')}
                onBlur={() => handleBlur('first')}
                isFocused={firstFocused}
                onClear={() => setCode('')}
                type='SuccessError'
                condition1={flag === true}
                condition2={check === true}
                successText='인증되었습니다.'
                errorText='인증코드가 올바르지 않습니다.'
                maxLength={4}
                editable={!check}
                isClosed={check}
            />
        </View>

    );
};

function FindScreen({ navigation }: FindScreenProps) {


    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [timer, setTimer] = useState(30); // 타이머 초기값 설정



    const sendPassword = () => {
        //임시 비밀번호 발급
    };


    const send = useSendSms(
        {
            onSuccess: () => {

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

    const handleSendCode = (phone: string) => {
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
            send.mutate(phone);
            setIsButtonDisabled(true);
        }
    };


    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: route.name === '비밀번호 찾기' ? '#5F47F1' : '#5F47F1',
                    tabBarInactiveTintColor: '#8e8e93',
                    tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                    tabBarIndicatorStyle: {
                        backgroundColor: route.name === '비밀번호 찾기' ? '#5F47F1' : '#5F47F1',
                    },
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderBottomWidth: 0,
                    },
                })}
            >
                <Tab.Screen
                    name="아이디 찾기"
                    children={() => (
                        <FindIDScreen
                            handleSendCode={(text: string) => handleSendCode(text)}
                        />
                    )}
                />
                <Tab.Screen name="비밀번호 찾기" children={() => (
                    <FindPasswordScreen
                        handleSendCode={(text: string) => handleSendCode(text)}
                        handleNavigate={sendPassword}
                    />
                )} />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    contentContainer: {
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
    idContainer: {
        marginVertical: 40,
        gap: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#007aff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    resultText: {
        fontSize: 16,
        color: '#333333',
        marginTop: 20,
    },
    inputContainerWithButton: {
        marginVertical: 16,
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
        color: 'black'
    },
    smallInput: {
        flex: 0.65,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16.52,
        letterSpacing: -0.28,
    },
    closedText: {
        color: 'gray', // isClosed가 true일 때 글씨 색상
    },
    openText: {
        color: 'black', // isClosed가 false일 때 글씨 색상
    },
    idBox: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CED2D3',
        padding: 40,
        width: '80%',
        color: 'black'
    },
    bottomText: {
        color: 'black'
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
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18.88,
        letterSpacing: -0.32
    },
});

export default FindScreen;