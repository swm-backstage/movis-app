import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import SettingList from './SettingList';
import SettingListItem from './SettingListItem';

type SettingEntryProps = {
    logout: () => void;
};

const SettingEntry: React.FC<SettingEntryProps> = ({ logout }) => {
    const [isNotificationSet, setIsNotificationSet] = useState(false);

    const handleNotificationPress = () => {
        setIsNotificationSet(true);
        Alert.alert("알림 설정이 완료되었습니다.");
    };

    const showLogoutAlert = () => {
        Alert.alert(
          "로그아웃",
          "로그아웃 하시겠습니까?",
          [
            {
              text: "아니오",
              style: "cancel"
            },
            {
              text: "예",
              onPress: () => logout()
            }
          ],
          { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>백진암(Mock)</Text>
            </View>

            <SettingList title="권한 설정">
                <SettingListItem 
                    text="알림(개발중)" 
                    onPress={handleNotificationPress} 
                    disabled={isNotificationSet}
                />
            </SettingList>

            <SettingList title="로그인 정보">
                <SettingListItem 
                    text="비밀번호 변경(추가 예정)" 
                    onPress={() => Alert.alert("추가 예정입니다.")} 
                    disabled={true}
                />
                <SettingListItem 
                    text="로그아웃" 
                    onPress={showLogoutAlert} 
                />
                <SettingListItem 
                    text="회원 탈퇴(추가 예정)" 
                    onPress={() => Alert.alert("추가 예정입니다.")} 
                    disabled={true}
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
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default SettingEntry;