import { View } from '@ant-design/react-native';
import React, { useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import profileColors from '../../assets/colors/profileColors';
import { useGetClubUserList, useMutateCreateClubUser, useMutateDeleteClub } from '../../hooks/useClubUser';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { ClubUserGetRes } from '../../types/clubUser/response/ClubUserGetRes';
import ItemListButton from '../Button/ItemListButton';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import ClubUserCreateForm from '../customInput/ClubUserCreateForm';
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
    const getProfileColor = (identifier: string): string => {
        const profileColorValues = Object.values(profileColors) as string[];
        let hash = 0;
        for (let i = 0; i < identifier.length; i++) {
            hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % profileColorValues.length;
        return profileColorValues[index];
    };
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
                            imageNode={<ProfileIcon iconName={clubUser.identifier} iconSize={48}/>}
                            mainText={clubUser.identifier}
                            subText={clubUser.identifier}
                            labelText={roleMap[clubUser.role]}
                            buttonHandler={handleDeleteClubUser(clubUser.identifier)}
                        />
                    ))}
                </ItemList>
            </View>
            <View style={styles.footerContainer}>
                <ItemListButton
                    onPress={() => {
                        openCustomBottomSheet();
                    }}
                    buttonText="운영진 추가" />
            </View>
            <CustomBottomSheet>
                <ClubUserCreateForm clubId={clubId} createClubUser={createClubUser} />
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

    },
});

export default ClubUserItemList;