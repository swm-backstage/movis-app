import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type SettingListItemProps = {
    text: string;
    onPress: () => void;
    disabled?: boolean; // 비활성화 상태를 나타내는 prop 추가
};

const SettingListItem: React.FC<SettingListItemProps> = ({ text, onPress, disabled }) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 16,
        marginLeft: 15,
        color: '#000',
    },
    disabledText: {
        color: '#aaa', // 글자색을 회색으로 변경
    },
});

export default SettingListItem;