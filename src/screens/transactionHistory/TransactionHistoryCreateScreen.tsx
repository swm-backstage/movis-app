import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TransactionHistoryDepositCreate from '../../components/TransactionHistoryDepositCreate';
import TransactionHistoryWithdrawCreate from '../../components/TransactionHistoryWithdrawCreate';
import { mainNavigations } from '../../constants/navigations';
import { useGetEventMemberList } from '../../hooks/useEventMember';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

type TransactionHistoryCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.TRANSACTIONHISTORY_CREATE
>;

const TransactionHistoryCreateScreen = ({ route, navigation }: TransactionHistoryCreateScreenProps) => {
  const [isDepositView, setIsDepositView] = useState(true);
  const { clubId, eventId } = route.params;
  const { data: eventMemberGetListRes, isLoading, isError } = useGetEventMemberList(eventId);

  const handleDepositViewToggle = () => {
    setIsDepositView(!isDepositView);
  };

  const navigateGoBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>내역 생성</Text>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsDepositView(true)}
          style={[styles.toggleButton, isDepositView && styles.activeTab]}
        >
          <Text style={[styles.toggleText, isDepositView && styles.activeText]}>입금</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsDepositView(false)}
          style={[styles.toggleButton, !isDepositView && styles.activeTab]}
        >
          <Text style={[styles.toggleText, !isDepositView && styles.activeText]}>출금</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        {isDepositView ? (
          <TransactionHistoryDepositCreate 
            clubId={clubId}
            eventId={eventId}
            eventMemberGetListRes={eventMemberGetListRes}
            navigateGoBack={navigateGoBack}
          />
          ) : (
          <TransactionHistoryWithdrawCreate
            clubId={clubId}
            eventId={eventId}
            navigateGoBack={navigateGoBack}
          />    
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    flexGrow: 0.8,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 15,
    padding: 6,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  toggleText: {
    fontSize: 18,
    color: '#333',
  },
  activeTab: {
    backgroundColor: 'rgba(153, 102, 255, 1)',
  },
  activeText: {
    color: '#fff',
  },
});

export default TransactionHistoryCreateScreen;