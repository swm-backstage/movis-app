import { View } from '@ant-design/react-native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import profileColors from '../../assets/colors/profileColors';
import useCustomBottomSheet from '../../hooks/useCustomButtomSheet';
import { useGetMemberList } from '../../hooks/useMember';
import ItemListButton from '../Button/\bItemListButton';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import ClubMemberListCreateForm from '../customInput/ClubMemberListCreateForm';
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
    const getProfileColor = (identifier: string): string => {
        const profileColorValues = Object.values(profileColors) as string[];
        let hash = 0;
        for (let i = 0; i < identifier.length; i++) {
            hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % profileColorValues.length;
        return profileColorValues[index];
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
                            imageNode={<ProfileIcon backgroundColor={getProfileColor(member.name)} />}
                            mainText={member.name}
                            subText={member.phoneNo}
                        />
                    ))}
                </ItemList>
            </View>
            <View style={styles.footerContainer}>
                <ItemListButton
                    onPress={() => {
                        openCustomBottomSheet();
                    }}
                    buttonText="회원 추가" />
            </View>
            <CustomBottomSheet>
                <ClubMemberListCreateForm />
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