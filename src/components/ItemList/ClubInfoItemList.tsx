import { View } from '@ant-design/react-native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import profileColors from '../../assets/colors/profileColors';
import { useGetClubUserList } from '../../hooks/useClubUser';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { ClubUserGetRes } from '../../types/clubUser/response/ClubUserGetRes';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import Item from './Item';
import ItemList from './ItemList';
import ClubUserCreateEntry from '../customBottomSheet/clubUserCreateEntry';


interface ClubInfoItemListProps {
    clubId: string;
}

const ClubInfoItemList: React.FC<ClubInfoItemListProps> = ({ clubId }) => {
    const { data, isLoading, isError } = useGetClubUserList(clubId);
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
                        />
                    ))}
                </ItemList>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={openCustomBottomSheet}>
                        운영진 추가
                    </Text>
                    <Text style={styles.buttonTextPlus}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <CustomBottomSheet>
                <ClubUserCreateEntry />
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
        maxHeight: 200,
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

export default ClubInfoItemList;