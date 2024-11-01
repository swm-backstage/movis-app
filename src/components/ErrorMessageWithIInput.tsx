import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet, TextInputProps } from 'react-native';
import colors from '../assets/colors/colors';
import CancelButtonWithInput from './CancelButtonWithInput';

interface InputProps extends Omit<TextInputProps, 'value'> {
    value: string;
    isValidText?: (text: string) => boolean;
    onClear?: () => void;
    isFocused: boolean;
    successText?: string;
    errorText?: string;
    type?: 'error' | 'SuccessError'; // `type` prop 추가
    condition1?: boolean;
    condition2?: boolean;
    isClosed?: boolean
}

const ErrorMessageWithInput: React.FC<InputProps> = ({
    onClear,
    isValidText,
    isFocused,
    errorText = '',
    successText = '',
    type = 'error',
    condition1,
    condition2,
    isClosed = false,
    ...props
}) => {

    return (

        <View style={styles.inputWithText}>
            <CancelButtonWithInput
                onClear={onClear}
                isFocused={isFocused}
                isClosed={isClosed}
                {...props}
            />
            <View style={styles.checkInput}>
                {type === 'error' && props.value.length > 0 && !isValidText(props.value) && (
                    <>
                        <Image
                            source={require('../assets/remove_circle.png')}
                            style={styles.textIcon}
                        />
                        <Text style={[styles.availabilityText, styles.unavailable]}>
                            {errorText}
                        </Text>
                    </>
                )}
                {type === 'SuccessError' && (
                    <>
                        {condition1 && (
                            <>
                                <Image
                                    source={
                                        condition2
                                            ? require('../assets/check_circle.png')
                                            : require('../assets/remove_circle.png')
                                    }
                                    style={styles.textIcon}
                                />
                                <Text
                                    style={[
                                        styles.availabilityText,
                                        condition2 ? styles.available : styles.unavailable,
                                    ]}
                                >
                                    {condition2
                                        ? successText
                                        : errorText}
                                </Text>
                            </>
                        )}
                    </>
                )}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    inputWithText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        alignSelf: 'stretch'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // 교차축 ( 주축이 row니까 수직 방향으로 가운데 정렬 )
        borderWidth: 1,
        borderColor: colors.Gray100,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 8, // 자식 컴포넌트 사이간의 간격을 설정
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
        color: colors.Blue,
    },
    unavailable: {
        color: colors.Red,
    },
});

export default ErrorMessageWithInput;
