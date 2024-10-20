import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../../navigations/AuthStackNavigator';

type CreadtedIdScreenProps = StackScreenProps<AuthStackParamList>;

function CreateIdScreen({ navigation }: CreadtedIdScreenProps) {

    const [identifier, setIdentifier] = useState<string>('');
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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

    const checkUsernameAvailability = (text: string) => {
        if (text.length >= 5) {
            setIsAvailable(true);
        }
        else {
            setIsAvailable(false);
        }
    };

    const handleChangeText = (text: string) => {
        setIdentifier(text);
        checkUsernameAvailability(text);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);



    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>
                <Text style={styles.text}>반가워요!{'\n'}아이디를 만들어 주세요</Text>


                <View style={styles.inputWithText}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="아이디"
                            value={identifier}
                            onChangeText={handleChangeText}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        {isFocused && (
                            <TouchableOpacity onPress={() => handleChangeText('')} >
                                <Image source={require('../../../assets/delete.png')} style={styles.clearIcon} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.checkInput}>
                        {identifier.length > 0 && isAvailable !== null && (
                            <Image
                                source={isAvailable
                                    ? require('../../../assets/check_circle.png')
                                    : require('../../../assets/remove_circle.png')}
                                style={styles.textIcon}
                            />
                        )}
                        {identifier.length > 0 && isAvailable !== null && (
                            <Text style={[
                                styles.availabilityText,
                                isAvailable ? styles.available : styles.unavailable,
                            ]}>
                                {isAvailable ? '사용 가능한 아이디입니다' : '이미 사용 중인 아이디입니다'}
                            </Text>
                        )}

                    </View>
                </View>

            </View>

            {isAvailable && (
                <TouchableOpacity
                    style={isKeyboardVisible ? styles.nextButtonWithKeyboard : styles.nextButton}
                    onPress={() => navigation.navigate('SetPassword', { identifier: identifier })}
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
    inputWithText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        alignSelf: 'stretch'
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
        backgroundColor: '#5F47F1',
        padding: 15,
        alignItems: 'center',
    },
    nextButton: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#5F47F1',
        padding: 17,
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
    clearIcon: {
        width: 24,
        height: 24,
    },
    textIcon: {
        width: 18,
        height: 18
    }
});

export default CreateIdScreen;