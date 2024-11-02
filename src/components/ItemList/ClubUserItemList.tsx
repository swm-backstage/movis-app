import { View } from '@ant-design/react-native';
import React, { useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import profileColors from '../../assets/colors/profileColors';
import { useGetClubUserList, useMutateCreateClubUser, useMutateDeleteClub } from '../../hooks/useClubUser';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { ClubUserGetRes } from '../../types/clubUser/response/ClubUserGetRes';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import ClubUserCreateEntry from '../customBottomSheet/clubUserCreateEntry';
import Item from './Item';
import ItemList from './ItemList';


interface ClubUserItemListProps {
    clubId: string;
}

const ClubUserItemList: React.FC<ClubUserItemListProps> = ({ clubId }) => {
    const { data, isLoading, isError } = useGetClubUserList(clubId);
    const createClubUser = useMutateCreateClubUser();
    const deleteClubUser = useMutateDeleteClub();
    const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
        snapPoints: useMemo(() => ['80%'], []),
    });
    const getRandomProfileColor = (): string => {
        const profileColorValues = Object.values(profileColors) as string[];
        const randomIndex = Math.floor(Math.random() * profileColorValues.length);
        return profileColorValues[randomIndex];
    };
    const roleMap: Record<string, string> = {
        'ROLE_MANAGER': '총무',
        'ROLE_EXECUTIVE': '운영진',
    };
    const handleDeleteClubUser = (identifier: string) => {
        const values = {
            queryParams: {clubId: clubId},
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
                                  console.error('Error deleting club:', error, error.message, error.name, error.response.data);
                                }
                            }
                        )
                    }
                ],
            );
        }
    }

    if (isLoading) {
        return <CustomLoader />
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.labelText}>
                    운영진
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <ItemList>
                    {data && data.clubUserGetResDtoList.map((clubUser: ClubUserGetRes) => (
                        <Item
                            key={clubUser.identifier}
                            imageNode={<ProfileIcon backgroundColor={getRandomProfileColor()} />}
                            mainText={clubUser.identifier}
                            subText={clubUser.identifier}
                            labelText={roleMap[clubUser.role]}
                            buttonHandler={handleDeleteClubUser(clubUser.identifier)}
                        />
                    ))}
                </ItemList>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.button} onPress={openCustomBottomSheet}>
                    <Text style={styles.buttonText}>
                        운영진 추가
                    </Text>
                    <Text style={styles.buttonTextPlus}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <CustomBottomSheet>
                <ClubUserCreateEntry clubId={clubId} createClubUser={createClubUser} />
            </CustomBottomSheet>
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
        maxHeight: 130,
    },
    footerContainer: {
        alignItems: 'flex-end',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.Gray100,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 18,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        textAlignVertical: 'center',
    },
    buttonTextPlus: {
        fontSize: 22,
        marginLeft: 4,
    },
});

export default ClubUserItemList;