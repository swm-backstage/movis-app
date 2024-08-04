// HeaderTitle.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderTitle: React.FC = () => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.mainTitle}>모비스</Text>
            <Text style={styles.subTitle}>모임을 위한 비서 자비스</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
      },
      subTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      textContainer: {
        alignItems: 'center',
      },
});

export default HeaderTitle;
