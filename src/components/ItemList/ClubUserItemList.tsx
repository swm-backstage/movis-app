import React from 'react';
import profileColors from '../../assets/colors/profileColors';
import { useGetClubUserList } from '../../hooks/useClubUser';
import { ClubUserGetRes } from '../../types/clubUser/response/ClubUserGetRes';
import CustomLoader from '../Loader';
import ProfileIcon from '../ProfileIcon';
import Item from './Item';
import ItemList from './ItemList';

interface ClubUserItemListProps {
    clubId: string;
}

const ClubUserItemList: React.FC<ClubUserItemListProps> = ({ clubId }) => {
    const { data, isLoading, isError } = useGetClubUserList(clubId);
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
        <ItemList>
            {data && data.clubUserGetResDtoList.map((clubUser: ClubUserGetRes) => (
                <Item
                    imageNode={<ProfileIcon backgroundColor={getRandomProfileColor()} />}
                    mainText={clubUser.identifier}
                    subText={clubUser.identifier}
                    labelText={roleMap[clubUser.role]}
                />
            ))}
        </ItemList>
    );
};

export default ClubUserItemList;