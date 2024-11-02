// useCustomInput.tsx

import React, { useState, useCallback } from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UseCustomInputReturn {
  value: string;
  isValid: boolean;
  clearInput: () => void;
  CustomInput: React.FC<CustomInputProps>;
}

interface CustomInputProps extends TextInputProps {
  validator?: (text: string) => boolean;
  errorMessage?: string;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const useCustomInput = (): UseCustomInputReturn => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChangeText = useCallback(
    (text: string, validator?: (text: string) => boolean) => {
      setValue(text);
      if (validator) {
        setIsValid(validator(text));
      } else {
        setIsValid(true);
      }
    },
    []
  );

  const clearInput = useCallback(() => {
    setValue('');
    setIsValid(true);
  }, []);

  const CustomInput: React.FC<CustomInputProps> = ({
    validator,
    errorMessage,
    inputStyle,
    containerStyle,
    ...props
  }) => (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputWrapper, !isValid && styles.invalidInputWrapper]}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={(text) => onChangeText(text, validator)}
          {...props}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>
      {!isValid && errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );

  return { value, isValid, clearInput, CustomInput };
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  invalidInputWrapper: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  clearButton: {
    paddingHorizontal: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default useCustomInput;