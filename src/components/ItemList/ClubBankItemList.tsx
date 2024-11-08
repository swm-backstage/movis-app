import { View } from '@ant-design/react-native';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import { bankMap } from '../../constants/mockData';
import { ClubGetRes } from '../../types/club/response/ClubGetRes';
import Item from './Item';
import ItemList from './ItemList';


interface ClubBankItemListProps {
    club: ClubGetRes;
}

const ClubBankItemList: React.FC<ClubBankItemListProps> = ({ club }) => {
    const data = bankMap.get(club.bankCode);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.labelText}>
                    연동된 계좌
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <ItemList>
                    <Item
                        imageNode={<Image
                            source={data?.imageURL}
                            style={styles.bankImage}/>}                        
                        mainText={data?.name ?? "은행"}
                        subText={club.accountNumber}
                        labelText={"은행 코드 : " + club.bankCode}
                    />
                </ItemList>
            </View>
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
    bankImage: {
        width: 42,
        height: 42,
    }
});

export default ClubBankItemList;