import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useMutateCreateClubUser } from '../../hooks/useClubUser';
import { UseMutationResult } from '@tanstack/react-query';
import CancelButtonWithInput from '../customInput/CancelButtonWithInput';

type ClubUserCreateEntryProps = {
    clubId: string,
    createClubUser: UseMutationResult<void, unknown, Record<string, any>, unknown>;
};

const ClubUserCreateEntry: React.FC<ClubUserCreateEntryProps> = ({
    clubId,
    createClubUser,
}) => {
    const handleCreateClubUser = async (targetIdentifier: string) => {
        const data = {
            clubId: clubId,
            identifier: targetIdentifier,
        }
        createClubUser.mutate(
            data,
            {
                onError: (error) => {console.error(error)}
            }
        );
    };

    return (
        <View style={styles.container}>
            <CancelButtonWithInput />
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