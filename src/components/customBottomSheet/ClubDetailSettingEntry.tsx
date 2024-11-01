import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import SettingList from './SettingList';
import SettingListItem from './SettingListItem';

type ClubDetailSettingEntryProps = {
    clubId: String,
    deleteClub: (clubId: String) => void;
};

const ClubDetailSettingEntry: React.FC<ClubDetailSettingEntryProps> = ({ clubId, deleteClub }) => {

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
                    onPress: () => deleteClub(clubId)
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