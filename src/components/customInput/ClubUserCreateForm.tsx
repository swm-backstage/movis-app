import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import useCustomInput from '../../hooks/useCustomInput';
import { ClubUserCreateReq } from '../../types/clubUser/request/ClubUserReq';
import { ResponseError } from '../../types/common';
import ExpandedButton from '../Button/ExpandedButton';
import CustomInput from './CustomInput';
import { PhoneNumberValidator } from '../../utils/validator';
import { FormatPhoneNumber } from '../../utils/formator';

type ClubUserCreateFormProps = {
    clubId: string,
    createClubUser: UseMutationResult<void, ResponseError, ClubUserCreateReq, unknown>;
};

const ClubUserCreateForm: React.FC<ClubUserCreateFormProps> = ({
    clubId,
    createClubUser,
}) => {
    const phoneNoInput = useCustomInput({
        required: true,
        requiredMessage: '휴대폰 번호는 필수 항목',
        validator: PhoneNumberValidator,
        formator: FormatPhoneNumber,
      });

    const handleCreateClubUser = async () => {
        const phoneNoIsValid = phoneNoInput.validate();
        if(!phoneNoIsValid){
            return;
        }
        const data = {
            clubId: clubId,
            phoneNo: phoneNoInput.value,
        }
        createClubUser.mutate(
            data,
            {
                onError: (error) => { console.error(error, error?.response?.data) }
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    운영진 추가
                </Text>

            </View>
            <View style={styles.bodyContainer}>
                <CustomInput
                    value={phoneNoInput.value}
                    isValid={phoneNoInput.isValid}
                    errorMessage={phoneNoInput.errorMessage}
                    onChangeText={phoneNoInput.onChangeText}
                    onBlur={phoneNoInput.onBlur}
                    clearInput={phoneNoInput.clearInput}
                    placeholder="운영진 전화번호"
                    keyboardType='phone-pad'
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.footerContainer}>
                <ExpandedButton
                    onPress={handleCreateClubUser}
                    buttonText='추가'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.White,
    },
    headerContainer: {
        marginBottom: 28,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '800'
    },
    bodyContainer: {

    },
    footerContainer: {
        marginTop: 24,
    },
});

export default ClubUserCreateForm;