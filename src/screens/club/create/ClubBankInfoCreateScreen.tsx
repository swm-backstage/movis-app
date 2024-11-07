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

type ClubBankInfoCreateScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.CLUB_BANK_INFO_CREATE
>;

function ClubBankInfoCreateScreen({ route, navigation }: ClubBankInfoCreateScreenProps) {
    const clubCreateReq = route.params;
    const { selectedBank, selectBank } = useSelectItemList();

    const { openCustomBottomSheet, CustomBottomSheet } = useCustomBottomSheet({
        snapPoints: useMemo(() => ['80%'], []),
      });
    const accountNumberInput = useCustomInput({
        required: true,
        requiredMessage: '필수 항목',
        validator: ClubAccountValidator,
        formator: ClubAccountFormat,
    });
    const balanceInput = useCustomInput({
        required: true,
        requiredMessage: '필수 항목',
        formator: ClubBalanceFormat,
    });
    const onPress = () => {
        console.log(accountNumberInput.value, balanceInput.value);
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
                <CustomInput
                    value={balanceInput.value}
                    isValid={balanceInput.isValid}
                    errorMessage={balanceInput.errorMessage}
                    onChangeText={balanceInput.onChangeText}
                    onBlur={balanceInput.onBlur}
                    clearInput={balanceInput.clearInput}
                    placeholder="현재 계좌 잔고"
                    autoCapitalize="none"
                />
                <SelectItemInput name={selectedBank?.name} imageURL={selectedBank?.imageURL} openSelectItemList={() => openCustomBottomSheet()} />
            </View>
            <View style={styles.footerContainer}>
                <ExpandedButton onPress={onPress} buttonText='완료' />
                <CustomBottomSheet>
                    <SelectItemList selectItem={selectBank}/>
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