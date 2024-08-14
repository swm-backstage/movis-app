import AuthStackNavigator from './AuthStackNavigator';
import useAuth from '../hooks/useAuth';
import MainStackNavigator from './MainStackNavigator';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Modal, StyleSheet, Text } from 'react-native';
import { Button, View } from '@ant-design/react-native';
import Toast from 'react-native-toast-message';


function RootNavigator() {
  const { isLogin } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [depositCount, setDepositCount] = useState(0);
  const [withdrawCount, setWithdrawCount] = useState(0);

  console.log('isLogin:', isLogin);

  useEffect(() => {
    if (!isLogin) return;

    const checkBackgroundData = async () => {
      const deposit = parseInt(await AsyncStorage.getItem('@depositCount') || '0', 10);
      const withdraw = parseInt(await AsyncStorage.getItem('@withdrawCount') || '0', 10);

      console.log(deposit, withdraw)
      setDepositCount(deposit);
      setWithdrawCount(withdraw);
      setModalVisible(true);
    };

    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'active') {
        checkBackgroundData();
      }
      else if (nextAppState === 'background') {
        // 앱이 백그라운드로 전환될 때 AsyncStorage 값을 0으로 초기화
        await AsyncStorage.setItem('@depositCount', '0');
        await AsyncStorage.setItem('@withdrawCount', '0');
    }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [isLogin]);

  const resetCounts = async () => {
    await AsyncStorage.setItem('@depositCount', '0');
    await AsyncStorage.setItem('@withdrawCount', '0');
    setDepositCount(0);
    setWithdrawCount(0);
    setModalVisible(false);
  };

  return (
    <>
      {isLogin ? <MainStackNavigator /> : <AuthStackNavigator />}
      {isLogin && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 4 }}>
            <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
              <Text style={styles.modalText}>알림 발생 현황</Text>
              <Text style={styles.modalText}>입금: {depositCount}건</Text>
              <Text style={styles.modalText}>출금: {withdrawCount}건</Text>
              <Button style={styles.button} onPress={resetCounts}>
                <Text>확인</Text>
              </Button>
            </View>
          </View>
        </Modal>
      )}
      {isLogin && (<Toast />)}
    </>);
}
const styles = StyleSheet.create({
  modalText: {
    color: 'black',
    marginBottom: 4
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(153, 102, 255, 1)',
  },
  buttonText: {
    color: 'white'
  }
});

export default RootNavigator;