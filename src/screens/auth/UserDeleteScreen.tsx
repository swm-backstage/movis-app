import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { FormatPhoneNumber } from '../../utils/formator';
import useCustomInput from '../../hooks/useCustomInput';
import CustomInput from '../../components/customInput/CustomInput';
import { Text } from 'react-native-paper';
import ExpandedButton from '../../components/Button/ExpandedButton';
import { PasswordValidator } from '../../utils/validator';
import { useMutateDeleteUser } from '../../hooks/useUser';

type UserDeleteScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.USER_DELETE_SCREEN
>;

function UserDeleteScreen({ navigation }: UserDeleteScreenProps) {
  const deleteUser = useMutateDeleteUser();

  const password1Input = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
    validator: PasswordValidator,
  });
  const password2Input = useCustomInput({
    required: true,
    requiredMessage: '필수 항목',
    validator: (text: string) => {
      if (password1Input.value !== password2Input.value) {
        return { valid: false, errorMessage: '입력하신 비밀번호와 일치하지 않습니다. ' };
      }
      return { valid: true, errorMessage: undefined };
    }
  });

  const onPress = () => {
    const password1IsValid = password1Input.validate();
    const password2IsValid = password2Input.validate();

    if (!password1IsValid || !password2IsValid) {
      return;
    }

    Alert.alert(
      "",
      "탈퇴한 아이디, 전화번호로 재가입하실 수 없으며, 계정을 복구할 경우 별도 문의 부탁드립니다. \n\n계정을 삭제하시겠습니까? ",
      [
        {
          text: "아니오",
          style: "cancel"
        },
        {
          text: "예",
          onPress: () => deleteUser.mutate(
            password1Input.value,
            {
              onSuccess: navigation.goBack,
              onError: (error: any) => { 
                console.error('Error deleting user:', error, error.message, error.name, error.response.data);
              }
            }
          )
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          회원탈퇴
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <CustomInput
          value={password1Input.value}
          isValid={password1Input.isValid}
          errorMessage={password1Input.errorMessage}
          onChangeText={password1Input.onChangeText}
          onBlur={password1Input.onBlur}
          clearInput={password1Input.clearInput}
          label='비밀번호'
          secureTextEntry={true}
        />
        <CustomInput
          value={password2Input.value}
          isValid={password2Input.isValid}
          errorMessage={password2Input.errorMessage}
          onChangeText={password2Input.onChangeText}
          onBlur={password2Input.onBlur}
          clearInput={password2Input.clearInput}
          label='비밀번호 확인'
          secureTextEntry={true}
        />
      </View>
      <View style={styles.footerContainer}>
        <ExpandedButton onPress={onPress} buttonText='탈퇴' />
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
    flex: 0.2,
    paddingTop: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
  },
  bodyContainer: {
    flex: 0.8,

  },
  footerContainer: {
    // flex: 0.1,
  },
});

export default UserDeleteScreen;