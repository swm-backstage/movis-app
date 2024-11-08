import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

type TransactionHistoryWithdrawCreateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.TRANSACTIONHISTORY_WITHDRAW_CREATE
>;

const TransactionHistoryWithdrawCreateScreen = ({ route, navigation }: TransactionHistoryWithdrawCreateScreenProps) => {

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});

export default TransactionHistoryWithdrawCreateScreen;