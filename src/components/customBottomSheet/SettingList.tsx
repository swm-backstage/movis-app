import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SettingListProps = {
    title: string;
    children: ReactNode; 
};

const SettingList: React.FC<SettingListProps> = ({ title, children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#444',
    },
});

export default SettingList;