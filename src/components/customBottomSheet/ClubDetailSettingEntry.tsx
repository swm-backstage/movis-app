import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import SettingList from './SettingList';
import SettingListItem from './SettingListItem';
import { UseMutationResult } from '@tanstack/react-query';

type ClubDetailSettingEntryProps = {
    clubId: String,
    navigationGoBack: () => void,
    deleteClub: UseMutationResult<void, unknown, Record<string, any>, unknown>;
};

const ClubDetailSettingEntry: React.FC<ClubDetailSettingEntryProps> = ({ clubId, navigationGoBack, deleteClub }) => {

    const showClubDeleteAlert = () => {
        Alert.alert(
            "모임 삭제",
            "모임을 삭제하시겠습니까?",
            [
                {
                    text: "아니오",
                    style: "cancel"
                },
                {
                    text: "예",
                    onPress: () => deleteClub.mutate(
                        { clubId: clubId },
                        {
                            onSuccess: () => navigationGoBack(),
                            // TODO: 팝업 컴포넌트를 생서하여 띄우기
                            onError: (error: any) => {
                              console.error('Error deleting club:', error, error.message, error.name, error.response.data);
                            }
                          }
                        )
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <SettingList title="모임 설정">
                <SettingListItem
                    text="모임 삭제"
                    onPress={showClubDeleteAlert}
                />
            </SettingList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
});

export default ClubDetailSettingEntry;