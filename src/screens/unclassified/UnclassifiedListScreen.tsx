import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { mainNavigations } from '../../constants/navigations';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useGetUnclassifiedTransaction } from '../../hooks/useTransaction';
import { TransactionHistoryGetRes } from '../../types/transactionHisotry/TransactionHistoryGetRes';
import { useFocusEffect } from '@react-navigation/native';

type UnclassifiedListScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.UNCLASSIFIED
>;

const Tab = createMaterialTopTabNavigator();


const renderTransactionItem = ({ item, handleCheckboxToggle, selectedItems, isDeposit }: any) => (

    <View style={styles.transactionItem}>
        <Image
            source={item.status === 'FEE' ? require('../../assets/deposit.png') : require('../../assets/withdrawal.png')}  // 입금/출금에 따라 이미지 설정
            style={styles.icon}
        />
        <Text style={styles.transactionName}>{item.name}</Text>
        <View style={styles.amountAndCheckbox}>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    selectedItems.some((selectedItem: any) => selectedItem.elementId === item.elementId) && styles.checkedCheckbox,
                    isDeposit && styles.singleCheckbox, // 단일 선택의 경우 radius 스타일 적용 // 선택된 항목의 스타일 변경
                ]}
                onPress={() => handleCheckboxToggle(item, isDeposit)}
            >
                {selectedItems.some((selectedItem: any) => selectedItem.elementId === item.elementId) && (
                    <Image
                        source={require('../../assets/check.png')}
                        style={styles.checkmark}
                    />)}
            </TouchableOpacity>
        </View>
    </View>
);

const DepositScreen = ({ handleCheckboxToggle, selectedItems, handleEditButtonPress, deposits }: any) => (



    <View style={styles.screenBackground}>
        <FlatList
            data={deposits}
            renderItem={({ item }) => renderTransactionItem({ item, handleCheckboxToggle, selectedItems, isDeposit: true })}
            keyExtractor={item => item.elementId}
            style={styles.list}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleEditButtonPress}>
            <Text style={styles.editButtonText}>내역 수정</Text>
        </TouchableOpacity>
    </View>

);
const WithdrawalScreen = ({ handleCheckboxToggle, selectedItems, handleEditButtonPress, withdrawals }: any) => (
    <View style={styles.screenBackground}>
        <FlatList
            data={withdrawals}
            renderItem={({ item }) => renderTransactionItem({ item, handleCheckboxToggle, selectedItems, isDeposit: false })}
            keyExtractor={item => item.elementId}
            style={styles.list}
        />

        <TouchableOpacity style={styles.editButton} onPress={handleEditButtonPress}>
            <Text style={styles.editButtonText}>일괄 수정</Text>
        </TouchableOpacity>
    </View>
);

function UnclassifiedListScreen({ route, navigation }: UnclassifiedListScreenProps) {

    const [selectedItems, setSelectedItems] = useState<TransactionHistoryGetRes[]>([]); // 선택된 항목들을 저장하는 배열

    const clubId = '01JA4N3AT4K4W3GEHBTVWFAV3B'

    const { data, refetch } = useGetUnclassifiedTransaction(clubId);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    const deposits = data?.transactionHistoryDtoList.filter((item: TransactionHistoryGetRes) => item.status === 'FEE') || [];
    const withdrawals = data?.transactionHistoryDtoList.filter((item: TransactionHistoryGetRes) => item.status === 'BILL') || [];

    const handleCheckboxToggle = (item: TransactionHistoryGetRes, isDeposit: boolean) => {
        if (isDeposit) {
            // 입금의 경우 단일 선택으로 설정
            if (selectedItems.length > 0 && selectedItems[0].elementId === item.elementId) {
                setSelectedItems([]);
            } else {
                setSelectedItems([item]);
            }
        } else {
            // 출금의 경우 다중 선택 허용
            if (selectedItems.some(selectedItem => selectedItem.elementId === item.elementId)) {
                setSelectedItems(prevItems => prevItems.filter(selectedItem => selectedItem.elementId !== item.elementId));
            } else {
                setSelectedItems(prevItems => [...prevItems, item]);
            }
        }
    };

    const handleWithdrawalEditButtonPress = () => {
        if (selectedItems.length > 0) {
            navigation.navigate(mainNavigations.WITHDRAWAL, { selectedWithdrawals: selectedItems, clubId: clubId }); // 선택된 출금 내역을 새로운 화면에 전달
        } else {
            Alert.alert('선택된 항목이 없습니다.');
        }
    };

    const handleDepositEditButtonPress = () => {
        if (selectedItems.length > 0) {
            navigation.navigate(mainNavigations.DEPOSIT, { selectedDeposits: selectedItems, clubId: clubId }); // 선택된 출금 내역을 새로운 화면에 전달
        } else {
            Alert.alert('선택된 항목이 없습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>미분류 항목</Text>
            <Text style={styles.subtitle}>자동 분류되지 않은 항목들은 이 곳에 자동으로 저장됩니다. 항목들을 재분류 해주세요!</Text>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: route.name === '출금' ? 'red' : '#007aff',
                    tabBarInactiveTintColor: '#8e8e93',
                    tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                    tabBarIndicatorStyle: {
                        backgroundColor: route.name === '출금' ? 'red' : '#007aff',
                    },
                    tabBarStyle: {
                        backgroundColor: 'white',
                    },
                })}
            >
                <Tab.Screen name="입금" listeners={() => (
                    {
                        tabPress: e => {
                            setSelectedItems([]);
                        }
                    }
                )}>
                    {() => <DepositScreen handleCheckboxToggle={handleCheckboxToggle} selectedItems={selectedItems} handleEditButtonPress={handleDepositEditButtonPress} deposits={deposits} />}
                </Tab.Screen>

                <Tab.Screen name="출금" listeners={() => ({
                    tabPress: e => {
                        setSelectedItems([]);
                    }
                })}>
                    {() => <WithdrawalScreen handleCheckboxToggle={handleCheckboxToggle} selectedItems={selectedItems} handleEditButtonPress={handleWithdrawalEditButtonPress} withdrawals={withdrawals} />}
                </Tab.Screen>
            </Tab.Navigator>

        </View>
    )
}

const styles = StyleSheet.create({
    screenBackground: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    category: {
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    list: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    transactionName: {
        fontSize: 16,
        color: 'black',
        marginTop: 8,
        textAlign: 'left',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountAndCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#D4BFFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#5B4BCF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#D4BFFF',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: -150
    },
    checkmark: {
        width: 11,
        height: 11,
    },
    checkedCheckbox: {
        backgroundColor: '#7C5DC9',
    },
    singleCheckbox: {
        borderRadius: 10, // 단일 선택의 경우 radius 스타일 적용
    },
});

export default UnclassifiedListScreen;