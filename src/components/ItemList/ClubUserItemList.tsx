import React from 'react';
import { StyleSheet, View } from 'react-native';
import Item from './Item';
import ItemList from './ItemList';
import CustomLoader from '../Loader';
import { useGetClubUserList } from '../../hooks/useClubUser';

interface ClubUserItemListProps {
    clubId: string;
}

const ClubUserItemList: React.FC<ClubUserItemListProps> = ({ clubId }) => {
    const { data, isLoading, isError } = useGetClubUserList(clubId);
    const roleMap = {
        'ROLE_MANAGER': '총무',
        'ROLE_EXECUTIVE': '운영진',
      };
    if (isLoading) {
      return <CustomLoader />
    }
    return (
        <View>
            <ItemList>
                {data && data.clubUserGetResDtoList.map((clubUser) => (
                    <Item mainText={clubUser.identifier} subText={clubUser.identifier} labelText={roleMap[clubUser.role]} />
                ))}
            </ItemList>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        height: 150,
    },
});

export default ClubUserItemList;