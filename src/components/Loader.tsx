import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const CustomLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 배경
  },
  loadingText: {
    marginTop: 20,
    fontSize: 12,
    color: 'white',

  },
});

export default CustomLoader;