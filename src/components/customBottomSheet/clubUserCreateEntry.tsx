import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useCustomInput from '../../hooks/useCustomInput';
import CustomInput from '../customInput/CustomInput';
import { FormatPhoneNumber } from '../../utils/formator';
import { EmailValidator, PhoneNumberValidator } from '../../utils/validator';


type ClubUserCreateEntryProps = {
    clubId: string,
    createClubUser?: UseMutationResult<void, unknown, Record<string, any>, unknown>;
};

const ClubUserCreateEntry: React.FC<ClubUserCreateEntryProps> = ({
    clubId,
    createClubUser,
}) => {
    const {
        value: email,
        isValid: isEmailValid,
        onChangeText: onEmailChangeText,
        clearInput: clearEmailInput,
    } = useCustomInput({ validator: EmailValidator });
    const {
        value: phone,
        isValid: isPhoneValid,
        onChangeText: onPhoneChangeText,
        clearInput: clearPhoneInput,
    } = useCustomInput({ validator: PhoneNumberValidator, formatText: FormatPhoneNumber });

    const handleCreateClubUser = async (targetIdentifier: string) => {
        const data = {
            clubId: clubId,
            identifier: targetIdentifier,
        }
        // createClubUser.mutate(
        //     data,
        //     {
        //         onError: (error) => { console.error(error) }
        //     }
        // );
    };

    return (
        <View style={styles.container}>
            <CustomInput
                value={email}
                isValid={isEmailValid}
                onChangeText={onEmailChangeText}
                clearInput={clearEmailInput}
                errorMessage="유효한 이메일 주소를 입력하세요. "
                placeholder="이메일을 입력하세요. "
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <CustomInput
                value={phone}
                isValid={isPhoneValid}
                onChangeText={onPhoneChangeText}
                clearInput={clearPhoneInput}
                errorMessage="유효한 전화번호를 입력하세요. "
                placeholder="전화번호 입력하세요. "
                keyboardType="phone-pad"
                autoCapitalize="none"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
});

export default ClubUserCreateEntry;