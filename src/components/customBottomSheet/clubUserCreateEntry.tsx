import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useMutateCreateClubUser } from '../../hooks/useClubUser';
import { UseMutationResult } from '@tanstack/react-query';
import CancelButtonWithInput from '../customInput/CancelButtonWithInput';
import useCustomInput from '../../hooks/useCustomInput';

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
        CustomInput: EmailInput,
    } = useCustomInput();

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
            <EmailInput
                placeholder="이메일을 입력하세요"
                errorMessage="유효한 이메일 주소를 입력하세요."
                keyboardType="email-address"
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