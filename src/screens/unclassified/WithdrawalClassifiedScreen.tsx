import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { mainNavigations } from '../../constants/navigations';
import { Text } from 'react-native-paper';
import { EventGetRes } from '../../types/event/response/EventGetRes';
import { useQueryGetEventList } from '../../hooks/useEvent';
import { useClassifiedEventBill } from '../../hooks/useEventBill';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ScrollView } from 'react-native-gesture-handler';

type WithdrawalClassifiedScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.WITHDRAWAL
>;

function WithdrawalClassifiedScreen({ route, navigation }: WithdrawalClassifiedScreenProps) {


    const { selectedWithdrawals, clubId } = route.params;
    const [selectedEvent, setSelectedEvent] = useState<EventGetRes | null>(null);

    const { data } = useQueryGetEventList(clubId, "first", 1000);
    const events = data?.eventList || [];

    const classifiedEventBill = useClassifiedEventBill({
        onSuccess: () => {
            Alert.alert(
                '성공',
                '요청이 성공적으로 처리되었습니다.',
                [
                    {
                        text: '확인',
                        onPress: () => navigation.navigate(mainNavigations.UNCLASSIFIED, { clubId }),
                    },
                ]
            );
        },
        onError: (error) => {
            console.log(error.response?.data)
            Alert.alert(
                '실패',
                `요청이 실패했습니다: ${error.response?.data || '알 수 없는 오류'}`,
                [
                    {
                        text: '확인',
                        onPress: () => navigation.navigate(mainNavigations.UNCLASSIFIED, { clubId }),
                    },
                ]
            );
        },
    });

    const handleEventSelect = (event: any) => {
        setSelectedEvent(event);
    };


    const handleConfirm = () => {
        if (selectedEvent) {
            console.log(selectedEvent)
            console.log(clubId);

            selectedWithdrawals.forEach((withdrawal) => {
                console.log(withdrawal)
                classifiedEventBill.mutate({
                    eventBillId: withdrawal.elementId,
                    body: {
                        eventId: selectedEvent.eventId,
                        clubId: clubId,
                    },
                });
            });
        } else {
            Alert.alert('이벤트를 선택해주세요.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.sectorContainer}>

                    <Text style={styles.text}>선택된 출금 내역</Text>
                    <ScrollView style={styles.selectedWithdrawalBox} contentContainerStyle={styles.tmp}>
                        {selectedWithdrawals.map((item) => (
                            <View key={item.elementId} style={styles.transactionItem}>
                                <View style={styles.nameDateContainer}>
                                    <Text style={styles.transactionName}>{item.name}</Text>
                                    <Text style={styles.dateText}>{formatDistanceToNow(new Date(item.paidAt), { addSuffix: true, locale: ko })}</Text>
                                </View>
                                <Text style={styles.transactionAmount}>{item.amount.toLocaleString()}원</Text>
                            </View>
                        ))}
                        <View style={{ height: 28 }} />
                    </ScrollView>
                </View>
                <View style={styles.sectorContainer}>
                    <Text style={styles.text}>이벤트 설정</Text>

                    <ScrollView style={styles.eventBox} contentContainerStyle={styles.eventInner}>
                        {events.map((event) => (
                            <TouchableOpacity
                                key={event.eventId}
                                style={styles.transactionItem}
                                onPress={() => handleEventSelect(event)}
                            >
                                <Text style={styles.transactionName}>{event.name}</Text>
                                <View style={styles.radioButtonOuter}>
                                    <View
                                        style={[
                                            styles.radioButtonInner,
                                            selectedEvent?.eventId === event.eventId && styles.radioButtonSelected,
                                        ]}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                        <View style={{ height: 28 }} />
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.confirmButtonText}>저장</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: 20,
        gap: 16,
        marginHorizontal: 24,
        width: '90%'
    },
    sectorContainer: {
        display: 'flex',
        padding: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch'
    },
    nameDateContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "40%",
        gap: 4,
    },
    text: {
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18.2,
        letterSpacing: -0.28,
        color: '#595E62',
    },
    dateText: {
        fontFamily: 'Pretendard',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 14.16,
        letterSpacing: -0.24,
        color: '#ACB2B5',
    },
    selectedWithdrawalBox: {
        display: 'flex',
        padding: 16,
        flexDirection: 'column',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ACB2B5',
        height: 200
    },
    tmp: {
        alignItems: 'flex-start',
    },
    eventBox: {
        display: 'flex',
        padding: 8,
        flexDirection: 'column',
        gap: 8,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ACB2B5',
        width: '100%',
        height: 200
    },
    eventInner: {
        alignItems: 'flex-start',
        paddingHorizontal: 8
    },
    selectedTransactionBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        marginBottom: 16,
    },
    transactionItem: {
        display: 'flex',
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,
        alignSelf: 'stretch'
    },
    transactionName: {
        fontSize: 16,
        color: 'black',
        width: '80%'
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EE5648',
    },
    eventList: {
        marginBottom: 16,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 8,
    },
    radioButtonOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#5F47F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    radioButtonSelected: {
        backgroundColor: '#5F47F1',
    },
    buttonContainer: {
        display: 'flex',
        padding: 16,
        marginTop: 108,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        alignSelf: 'stretch'
    },
    confirmButton: {
        display: 'flex',
        height: 52,
        justifyContent: 'center',
        backgroundColor: '#5F47F1',
        gap: 10,
        alignSelf: 'stretch',
        borderRadius: 12,
        alignItems: 'center',

    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WithdrawalClassifiedScreen;