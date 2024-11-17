import React, { forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useCustomInput from '../../hooks/useCustomInput';
import { PhoneNumberValidator, NameValidator } from '../../utils/validator';
import { FormatPhoneNumber } from '../../utils/formator';
import CustomInput from './CustomInput';

interface MemberInputRowProps {
  id: number;
  onRemove: (id: number) => void;
}

export interface MemberData {
  id: number;
  name: string;
  isNameValid: boolean;
  phoneNo: string;
  isPhoneValid: boolean;
}

const MemberInputRow = forwardRef(({ id, onRemove }: MemberInputRowProps, ref) => {
  const nameInput = useCustomInput({
    required: true,
    requiredMessage: '이름은 필수 항목',
    validator: NameValidator,
  });

  const phoneNoInput = useCustomInput({
    required: true,
    requiredMessage: '휴대폰 번호는 필수 항목',
    validator: PhoneNumberValidator,
    formator: FormatPhoneNumber,
  });

  useImperativeHandle(ref, () => ({
    getData: () => ({
      id,
      name: nameInput.value,
      isNameValid: nameInput.isValid,
      phoneNo: phoneNoInput.value,
      isPhoneValid: phoneNoInput.isValid,
    }),
    setNameError: (msg: string) => nameInput.setError(msg),
    setPhoneError: (msg: string) => phoneNoInput.setError(msg),
    validate: () => {
      nameInput.validate();
      phoneNoInput.validate();
    },
  }));

  return (
    <View style={styles.formRow}>
      <View style={styles.formInputName}>
        <CustomInput
          value={nameInput.value}
          isValid={nameInput.isValid}
          errorMessage={nameInput.errorMessage}
          onChangeText={nameInput.onChangeText}
          onBlur={nameInput.onBlur}
          clearInput={nameInput.clearInput}
          placeholder="이름"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formInputPhoneNum}>
        <CustomInput
          value={phoneNoInput.value}
          isValid={phoneNoInput.isValid}
          errorMessage={phoneNoInput.errorMessage}
          onChangeText={phoneNoInput.onChangeText}
          onBlur={phoneNoInput.onBlur}
          clearInput={phoneNoInput.clearInput}
          placeholder="휴대폰 번호"
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={13}
        />
      </View>
      <View style={styles.formBtn}>
        <TouchableOpacity onPress={() => onRemove(id)}>
          <AntDesign name="minuscircleo" size={24} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 8,
  },
  formInputName: {
    flex: 1,
    marginRight: 8,
    height: 70,
  },
  formInputPhoneNum: {
    flex: 1,
    marginRight: 8,
    height: 70,
  },
  formBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default MemberInputRow;