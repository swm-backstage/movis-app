import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

type TransactionHistoryDepositCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.TRANSACTIONHISTORY_DEPOSIT_CREATE
>;

const TransactionHistoryDepositCreateScreen = ({ route, navigation }: TransactionHistoryDepositCreateScreenProps) => {

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});

export default TransactionHistoryDepositCreateScreen;