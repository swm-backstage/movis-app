import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { useGetClubUserList, useMutateDelegateClubUser } from '../../hooks/useClubUser';
import ItemListRadio from '../../components/select/ItemListRadio';
import useItemListRadio, { Item } from '../../hooks/useItemListRadio';
import { Text } from 'react-native-paper';
import ExpandedButton from '../../components/Button/ExpandedButton';

type ClubUserDelegateScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.CLUB_USER_DELEGATE
>;

function ClubUserDelegateScreen({ route, navigation }: ClubUserDelegateScreenProps) {
    const { clubId, identifier } = route.params;
    const { data, isLoading } = useGetClubUserList(clubId);
    const delegateClubUser = useMutateDelegateClubUser();
    const clubUserRadio = useItemListRadio({
        required: true,
        requiredMessage: '필수 항목',
    });
    const itemList: Item[] = data?.clubUserGetResDtoList
        .filter(clubUser => clubUser.identifier !== identifier)
        .map(clubUser => ({
            id: clubUser.identifier,
            name: clubUser.identifier,
        })) || [];

    const onPress = () => {
        const clubUserIsValid = clubUserRadio.validate();
        if (!clubUserIsValid) {
            return;
        }

        const queryParams = {
            clubId: clubId,
        }
        console.log(clubUserRadio.value)
        delegateClubUser.mutate(
            { toIdentifier: clubUserRadio.value, queryParams: queryParams },
            {
                onSuccess: navigation.goBack,
                onError: (error) => {
                    console.error('Error Delegating:', error,
                        error.message, error.name, error.response?.data);
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    총무 권한 위임
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <ItemListRadio
                    items={itemList}
                    selectedId={clubUserRadio.value}
                    isSelected={clubUserRadio.isSelected}
                    selectItem={clubUserRadio.selectItem}
                    deselectItem={clubUserRadio.deselectItem}
                    isValid={clubUserRadio.isValid}
                    errorMessage={clubUserRadio.errorMessage}
                // label="총무 권한을 위임할 운영진 선택"
                />
            </View>
            <View style={styles.footerContainer}>
                <ExpandedButton onPress={onPress} buttonText='위임' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 40,
    },
    headerContainer: {
        marginBottom: 24,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
    },
    bodyContainer: {

    },
    footerContainer: {

    },

});

export default ClubUserDelegateScreen;