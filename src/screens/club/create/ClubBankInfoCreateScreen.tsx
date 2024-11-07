import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { mainNavigations } from '../../../constants/navigations';
import { MainStackParamList } from '../../../navigations/MainStackNavigator';
import { Text } from 'react-native-paper';
import CustomInput from '../../../components/customInput/CustomInput';
import ExpandedButton from '../../../components/Button/ExpandedButton';
import useCustomInput from '../../../hooks/useCustomInput';
import { ClubAccountValidator } from '../../../utils/validator';
import { ClubAccountFormat, ClubBalanceFormat } from '../../../utils/formator';
import useCustomBottomSheet from '../../../hooks/useCustomButtomSheet';
import SelectItemInput from '../../../components/select/SelectItemInput';
import SelectItemList from '../../../components/select/SelectItemList';
import useSelectItemList from '../../../hooks/useSelectItem';
import { ClubCreateReq } from '../../../types/club/request/ClubCreateReq';
import { useMutateCreateClub } from '../../../hooks/useClub';

type ClubBankInfoCreateScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.CLUB_BANK_INFO_CREATE
>;

function ClubBankInfoCreateScreen({ route, navigation }: ClubBankInfoCreateScreenProps) {
    const preValues = route.params.values;
    const createClub = useMutateCreateClub();
    const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
        snapPoints: useMemo(() => ['80%'], []),
    });
    const accountNumberInput = useCustomInput({
        required: true,
        requiredMessage: '필수 항목',
        validator: ClubAccountValidator,
        formator: ClubAccountFormat,
    });
    const bankSelectInput = useSelectItemList();
    const onPress = () => {
        const values: ClubCreateReq = {
            name: preValues.name,
            description: preValues.description,
            accountNumber: accountNumberInput.value,
            bankCode: bankSelectInput.selectedItem?.code || "",
        };

        navigation.navigate(mainNavigations.CLUB_CREATE_COMPLETE, { clubName: values.name });

        // createClub.mutate(
        //     values,
        //     {
        //         onSuccess: () => navigation.goBack(),
        //         onError: (error) => {
        //             console.error('Error creating club:', error, error.message, error.name);
        //         }
        //     }
        // );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    회비를 모을 계좌의{'\n'}정보를 입력해 주세요
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <CustomInput
                    value={accountNumberInput.value}
                    isValid={accountNumberInput.isValid}
                    errorMessage={accountNumberInput.errorMessage}
                    onChangeText={accountNumberInput.onChangeText}
                    onBlur={accountNumberInput.onBlur}
                    clearInput={accountNumberInput.clearInput}
                    placeholder="계좌번호 뒤 4자리"
                    keyboardType='numeric'
                    autoCapitalize="none"
                />
                <SelectItemInput name={bankSelectInput.selectedItem?.name} imageURL={bankSelectInput.selectedItem?.imageURL} openSelectItemList={() => openCustomBottomSheet()} />
            </View>
            <View style={styles.footerContainer}>
                <ExpandedButton onPress={onPress} buttonText='완료' />
                <CustomBottomSheet>
                    <SelectItemList selectItem={bankSelectInput.selectItem} />
                </CustomBottomSheet>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    headerContainer: {
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700'
    },
    bodyContainer: {
        flex: 1,
        paddingTop: 20,
    },
    footerContainer: {
        justifyContent: 'flex-end',
    },
});

export default ClubBankInfoCreateScreen;