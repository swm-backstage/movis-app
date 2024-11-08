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

type ClubUserCreateFormProps = {
    clubId: string,
    createClubUser: UseMutationResult<void, ResponseError, ClubUserCreateReq, unknown>;
};

const ClubUserCreateForm: React.FC<ClubUserCreateFormProps> = ({
    clubId,
    createClubUser,
}) => {
    const identifierInput = useCustomInput({
        required: true,
        requiredMessage: '필수 항목입니다.',
    });

    const handleCreateClubUser = async () => {
        const data = {
            clubId: clubId,
            identifier: identifierInput.value,
        }
        createClubUser.mutate(
            data,
            {
                onError: (error) => { console.error(error) }
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
                    value={identifierInput.value}
                    isValid={identifierInput.isValid}
                    errorMessage={identifierInput.errorMessage}
                    onChangeText={identifierInput.onChangeText}
                    onBlur={identifierInput.onBlur}
                    clearInput={identifierInput.clearInput}
                    placeholder="이름"
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