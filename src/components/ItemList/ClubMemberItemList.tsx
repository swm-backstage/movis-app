import { View } from '@ant-design/react-native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import profileColors from '../../assets/colors/profileColors';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { useGetMemberList, useMutateCreateMemberList } from '../../hooks/useMember';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import Item from './Item';
import ItemList from './ItemList';


interface ClubMemberItemListProps {
    clubId: string;
}

const ClubMemberItemList: React.FC<ClubMemberItemListProps> = ({ clubId }) => {
    const { data, isLoading, isError } = useGetMemberList(clubId);
    const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
        snapPoints: useMemo(() => ['80%'], []),
    });
    const getRandomProfileColor = (): string => {
        const profileColorValues = Object.values(profileColors) as string[];
        const randomIndex = Math.floor(Math.random() * profileColorValues.length);
        return profileColorValues[randomIndex];
    };

    if (isLoading) {
        return <CustomLoader />
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.labelText}>
                    회원
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <ItemList>
                    {data && data.members.map((member) => (
                        <Item
                            key={member.memberId}
                            imageNode={<ProfileIcon backgroundColor={getRandomProfileColor()} />}
                            mainText={member.name}
                            subText={member.phoneNo}
                        />
                    ))}
                </ItemList>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.button} onPress={openCustomBottomSheet}>
                    <Text style={styles.buttonText}>
                        회원 추가
                    </Text>
                    <Text style={styles.buttonTextPlus}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <CustomBottomSheet>
                <></>
                {/* <ClubUserCreateEntry clubId={clubId} createClubUser={createClubUser} /> */}
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

export default ClubMemberItemList;