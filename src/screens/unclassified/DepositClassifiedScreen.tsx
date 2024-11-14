import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { mainNavigations } from '../../constants/navigations';
import { Text } from 'react-native-paper';
import { useQueryGetEventList } from '../../hooks/useEvent';
import { EventGetRes } from '../../types/event/response/EventGetRes';
import { useQueryGetEventMemberList } from '../../hooks/useEventMember';
import { EventMemberGetRes } from '../../types/eventMember/EventMemberGetRes';
import { useClassifiedFee } from '../../hooks/useFee';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

type DepositClassifiedScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.DEPOSIT
>;


function DepositClassifiedScreen({ route, navigation }: DepositClassifiedScreenProps) {


    const { selectedDeposits, clubId } = route.params;
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
        }
        else {
            setParticipants([]);
        }
    }, [eventMembersData]);

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
            <View style={styles.contentContainer}>

                <View style={styles.sectorContainer}>
                    <Text style={styles.text}>선택된 입금 내역</Text>

                    <View style={styles.selectedDepositBox}>
                        {selectedDeposits.map((item) => (
                            <View key={item.elementId} style={styles.transactionItem}>
                                <View style={styles.nameDateContainer}>
                                    <Text style={styles.transactionName}>{item.name}</Text>
                                    <Text style={styles.dateText}>{formatDistanceToNow(new Date(item.paidAt), { addSuffix: true, locale: ko })}</Text>
                                </View>
                                <Text style={styles.transactionAmount}>{"+"}{item.amount.toLocaleString()}원</Text>
                            </View>
                        ))}
                    </View>
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
                <View style={styles.sectorContainer}>
                    <Text style={styles.text}>할당할 인원</Text>
                    <ScrollView style={styles.memberBox} contentContainerStyle={styles.eventInner}>
                        {participants.map((participant) => (
                            <TouchableOpacity
                                key={participant.eventMemberId}
                                style={styles.transactionItem}
                                onPress={() => handleParticipantSelect(participant)}
                            >
                                <Text style={styles.transactionName}>{participant.name}</Text>
                                <View style={styles.radioButtonOuter}>
                                    <View
                                        style={[
                                            styles.radioButtonInner,
                                            selectedParticipant?.eventMemberId === participant.eventMemberId && styles.radioButtonSelected,
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
    buttonContainer: {
        display: 'flex',
        padding: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        alignSelf: 'stretch',
        marginBottom: 20
    },
    selectedDepositBox: {
        display: 'flex',
        padding: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ACB2B5',
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
    memberBox: {
        display: 'flex',
        padding: 8,
        flexDirection: 'column',
        gap: 8,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ACB2B5',
        width: '100%',
        height: 152
    },
    eventInner: {
        alignItems: 'flex-start',
        paddingHorizontal: 8
    },
    nameDateContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "40%",
        gap: 4,
    },
    eventNameContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 4,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0
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
        fontFamily: 'Pretendard',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18.2,
        letterSpacing: -0.28,
        color: '#000',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0064FF',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventItem: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
        gap: 12,
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    selectedEventItem: {
        borderColor: '#5B4BCF',
    },
    eventText: {
        fontSize: 16,
        color: 'black',
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

export default DepositClassifiedScreen;
