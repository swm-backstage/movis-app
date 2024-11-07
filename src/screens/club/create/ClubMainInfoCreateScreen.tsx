import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';
import ExpandedButton from '../../../components/Button/ExpandedButton';
import CustomInput from '../../../components/customInput/CustomInput';
import { mainNavigations } from '../../../constants/navigations';
import useCustomInput from '../../../hooks/useCustomInput';
import { MainStackParamList } from '../../../navigations/MainStackNavigator';
import { ClubDescriptionValidator, ClubNameValidator } from '../../../utils/validator';
import { ClubCreateReq } from '../../../types/club/request/ClubCreateReq';

type ClubMainInfoCreateScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.CLUB_MAIN_INFO_CREATE
>;

function ClubMainInfoCreateScreen({ navigation }: ClubMainInfoCreateScreenProps) {
    const clubNameInput = useCustomInput({
        required: true,
        requiredMessage: '필수 항목',
        validator: ClubNameValidator,
    });
    const clubDescriptionInput = useCustomInput({
        required: true,
        requiredMessage: '필수 항목',
        validator: ClubDescriptionValidator,
    });
    const onPress = () => {
        clubNameInput.validate();
        clubDescriptionInput.validate();

        if(!clubNameInput.value || !clubNameInput.isValid || !clubDescriptionInput.isValid || !clubDescriptionInput.value){
            return;
        }

        const clubCreateReq: ClubCreateReq = {
            name: clubNameInput.value,
            description: clubDescriptionInput.value,
            accountNumber: '',
            balance: 0,
            bankCode: '',
        }

        navigation.navigate(mainNavigations.CLUB_BANK_INFO_CREATE, { clubCreateReq: clubCreateReq });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    모임의 이름과{'\n'}소개글을 작성해 주세요
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <CustomInput
                    value={clubNameInput.value}
                    isValid={clubNameInput.isValid}
                    errorMessage={clubNameInput.errorMessage}
                    onChangeText={clubNameInput.onChangeText}
                    onBlur={clubNameInput.onBlur}
                    clearInput={clubNameInput.clearInput}
                    placeholder="모임명"
                    autoCapitalize="none"
                />
                <CustomInput
                    value={clubDescriptionInput.value}
                    isValid={clubDescriptionInput.isValid}
                    errorMessage={clubDescriptionInput.errorMessage}
                    onChangeText={clubDescriptionInput.onChangeText}
                    onBlur={clubDescriptionInput.onBlur}
                    clearInput={clubDescriptionInput.clearInput}
                    placeholder="소개글(ex. 한국대학교 댄스 동아리)"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.footerContainer}>
                <ExpandedButton onPress={onPress} buttonText='다음' />
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

export default ClubMainInfoCreateScreen;