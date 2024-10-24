import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { mainNavigations } from '../../constants/navigations';
import { Text } from 'react-native-paper';
import { useQueryGetEventList } from '../../hooks/useEvent';
import { EventGetRes } from '../../types/event/response/EventGetRes';
import { useQueryGetEventMemberList } from '../../hooks/useEventMember';
import { EventMemberGetRes } from '../../types/eventMember/EventMemberGetRes';
import { useClassifiedFee } from '../../hooks/useFee';

type DepositClassifiedScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.DEPOSIT
>;


function DepositClassifiedScreen({ route, navigation }: DepositClassifiedScreenProps) {


    const { selectedDeposits, clubId } = route.params;
    console.log(selectedDeposits)

    const [selectedEvent, setSelectedEvent] = useState<EventGetRes | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [participants, setParticipants] = useState<EventMemberGetRes[]>([]);
    const [selectedParticipant, setSelectedParticipant] = useState<EventMemberGetRes | null>(null);

    const { data } = useQueryGetEventList(clubId, "first", 1000);
    const events = data?.eventList || [];

    const { data: eventMembersData } = useQueryGetEventMemberList(selectedEventId)
    const classifiedFee = useClassifiedFee({
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


    useEffect(() => {
        if (eventMembersData) {
            const eventMembers = eventMembersData.eventMemberList || [];
            setParticipants(eventMembers);
            console.log(eventMembers);
        }
        else {
            setParticipants([]);
        }
    }, [selectedEventId]);

    const handleEventSelect = (event: EventGetRes) => {
        setSelectedEvent(event);
        setSelectedEventId(event.eventId);
    };

    const handleParticipantSelect = (participant: EventMemberGetRes) => {
        setSelectedParticipant(participant);
    };

    const handleConfirm = () => {
        if (selectedEvent && selectedParticipant) {
            const feeId = selectedDeposits[0].elementId
            const request = selectedDeposits.map(deposit => ({
                clubId,
                eventMemberId: selectedParticipant.eventMemberId,
                name: deposit.name,
                paidAmount: deposit.amount,
                paidAt: deposit.paidAt
            }));
            console.log(feeId)
            console.log(request)
            request.forEach(req => {
                classifiedFee.mutate({ feeId: feeId, body: req })
            })
        } else {
            Alert.alert('이벤트와 할당할 인원을 선택해주세요.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>미분류 설정</Text>
            <Text style={styles.subtitle}>선택된 입금 내역</Text>
            <View style={styles.selectedTransactionBox}>
                {selectedDeposits.map((item) => (
                    <View key={item.elementIid} style={styles.transactionItem}>
                        <Text style={styles.transactionName}>{item.name}</Text>
                        <Text style={styles.transactionAmount}>{item.amount.toLocaleString()}원</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.eventTitle}>이벤트 설정</Text>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.eventItem,
                            selectedEvent?.eventId === item.eventId && styles.selectedEventItem,
                        ]}
                        onPress={() => handleEventSelect(item)}
                    >
                        <View style={styles.radioButtonOuter}>
                            <View
                                style={[
                                    styles.radioButtonInner,
                                    selectedEvent?.eventId === item.eventId && styles.radioButtonSelected,
                                ]}
                            />
                        </View>
                        <Text style={styles.eventText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.eventId}
                style={styles.eventList}
            />

            <Text style={styles.eventTitle}>할당할 인원</Text>
            <FlatList
                data={participants}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.eventItem,
                            selectedParticipant?.eventMemberId === item.eventMemberId && styles.selectedEventItem,
                        ]}
                        onPress={() => handleParticipantSelect(item)}
                    >
                        <View style={styles.radioButtonOuter}>
                            <View
                                style={[
                                    styles.radioButtonInner,
                                    selectedParticipant?.eventMemberId === item.eventMemberId && styles.radioButtonSelected,
                                ]}
                            />
                        </View>
                        <Text style={styles.eventText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.eventMemberId}
                style={styles.eventList}
            />

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>설정 완료</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    selectedTransactionBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        marginBottom: 16,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    transactionName: {
        fontSize: 16,
        color: 'black',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventList: {
        marginBottom: 16,
        borderColor: 'black',
        borderWidth: 1,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 4,

    },
    selectedEventItem: {
        borderColor: '#5B4BCF',
        backgroundColor: '#D4BFFF',
    },
    eventText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 12,
    },
    radioButtonOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#5B4BCF',
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
        backgroundColor: '#5B4BCF',
    },
    confirmButton: {
        backgroundColor: '#5B4BCF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DepositClassifiedScreen;