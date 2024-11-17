import { View } from '@ant-design/react-native';
import React, { useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import { useGetClubUserList, useMutateCreateClubUser, useMutateDeleteClubUser } from '../../hooks/useClubUser';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { useGetMemberList, useMutateCreateMemberList, useMutateDeleteMember } from '../../hooks/useMember';
import { ClubUserGetRes } from '../../types/clubUser/response/ClubUserGetRes';
import { MemberGetRes } from '../../types/member/response/MemberGetRes';
import ItemListButton from '../Button/ItemListButton';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import ClubMemberListCreateForm from '../customInput/ClubMemberListCreateForm';
import Item from './Item';
import ItemList from './ItemList';
import ClubUserCreateForm from '../customInput/ClubUserCreateForm';

interface ClubUserAndMemberItemListProps {
    clubId: string;
    identifier: string,
}

const ClubUserAndMemberItemList: React.FC<ClubUserAndMemberItemListProps> = ({ clubId, identifier }) => {
    const { data: clubUserData, isLoading: clubUserIsLoading } = useGetClubUserList(clubId);
    const { data: memberData, isLoading: memberIsLoading } = useGetMemberList(clubId);

    const createClubUser = useMutateCreateClubUser();
    const deleteClubUser = useMutateDeleteClubUser();
    const deleteClubMember = useMutateDeleteMember();
    const createMemberList = useMutateCreateMemberList();

    const { openCustomBottomSheet: openCreateClubUserCustomBottomSheet, CustomBottomSheet: CreateClubUserBottomSheet } = useCustomBottomSheet({
        snapPoints: useMemo(() => ['80%'], []),
    });
    const { openCustomBottomSheet: openCreateMemberListCustomBottomSheet, CustomBottomSheet: CreateMemberListBottomSheet } = useCustomBottomSheet({
        snapPoints: useMemo(() => ['80%'], []),
    });

    const roleMap: Record<string, string> = {
        'ROLE_MANAGER': '총무',
        'ROLE_EXECUTIVE': '운영진',
    };

    const handleDeleteClubUser = (identifier: string) => {
        const values = {
            queryParams: { clubId: clubId },
            identifier: identifier,
        }
        return () => {
            Alert.alert(
                "운영진 내보내기",
                "해당 운영진을 모임에서 내보내시겠습니까? ",
                [
                    {
                        text: "아니오",
                        style: "cancel"
                    },
                    {
                        text: "예",
                        onPress: () => deleteClubUser.mutate(
                            values,
                            {
                                onError: (error: any) => {
                                    console.error('Error deleting clubUser:', error, error.message, error.name, error.response.data);
                                }
                            }
                        )
                    }
                ],
            );
        }
    }
    const handleDeleteClubMember = (memberId: string) => {
        return () => {
            Alert.alert(
                "모임 회원 내보내기",
                "해당 회원을 모임에서 내보내시겠습니까? ",
                [
                    {
                        text: "아니오",
                        style: "cancel"
                    },
                    {
                        text: "예",
                        onPress: () => deleteClubMember.mutate(
                            memberId,
                            {
                                onError: (error: any) => {
                                    console.error('Error deleting clubMember:', error, error.message, error.name, error.response.data);
                                }
                            }
                        )
                    }
                ],
            );
        }
    }

    const combinedData = [
        ...(clubUserData ? clubUserData.clubUserGetResDtoList.map((clubUser: ClubUserGetRes) => ({ ...clubUser, type: 'clubUser' })) : []),
        ...(memberData ? memberData.members.map((member: MemberGetRes) => ({ ...member, type: 'member' })) : []),
    ];

    if (clubUserIsLoading || memberIsLoading) {
        return <CustomLoader />
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.labelText}>
                    회원 목록
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <ItemList>
                    {combinedData.map((item) => {
                        const isMe = (item.identifier === identifier) || (item.memberId === identifier);
                        const labels: { text: string, color?: string }[] = [];

                        if (item.type === 'clubUser') {
                            if (item.role && roleMap[item.role]) {
                                let color;
                                if (item.role === 'ROLE_MANAGER') {
                                    color = colors.Primary;
                                }
                                labels.push({ text: roleMap[item.role], color });
                            }
                        } else {
                            labels.push({ text: '회원' });
                        }

                        if (isMe) {
                            labels.push({ text: 'me' });
                        }

                        return (
                            <Item
                                key={item.identifier || item.memberId}
                                imageNode={<ProfileIcon iconName={item.identifier || item.name} iconSize={48} />}
                                mainText={item.identifier || item.name}
                                subText={item.phoneNo || item.identifier}
                                labels={labels}
                                buttonHandler={(item.type === 'clubUser' && !isMe) ? handleDeleteClubUser(item.identifier) : handleDeleteClubMember(item.memberId)}
                            />
                        )
                    })}
                </ItemList>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.createClubUserButton}>
                    <ItemListButton
                        onPress={() => {
                            openCreateClubUserCustomBottomSheet();
                        }}
                        buttonText="운영진 추가" />
                </View>
                <View>
                    <ItemListButton
                        onPress={() => {
                            openCreateMemberListCustomBottomSheet();
                        }}
                        buttonText="회원 추가" />
                </View>
            </View>
            <CreateClubUserBottomSheet>
                <ClubUserCreateForm createClubUser={createClubUser} clubId={clubId} />
            </CreateClubUserBottomSheet>
            <CreateMemberListBottomSheet>
                <ClubMemberListCreateForm createMemberList={createMemberList} clubId={clubId} />
            </CreateMemberListBottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    headerContainer: {
        marginBottom: 32,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Black,
    },
    bodyContainer: {
        maxHeight: 380,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    createClubUserButton: {
        marginRight: 10,
    },
});

export default ClubUserAndMemberItemList;