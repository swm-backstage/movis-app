import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../../assets/colors/defaultColors';

interface CustomInputProps extends TextInputProps {
  value: string;
  isValid: boolean;
  onChangeText: (text: string) => void;
  clearInput: () => void;
  errorMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  isValid,
  onChangeText,
  clearInput,
  errorMessage,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, !isValid && styles.invalidInputWrapper]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Image
              source={require('../../assets/delete.png')}
              style={styles.clearButtonImage}
            />
          </TouchableOpacity>
        )}
      </View>
      {!isValid && errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.Gray200,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  invalidInputWrapper: {
    borderColor: colors.Red,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  clearButton: {
    paddingHorizontal: 5,
  },
  clearButtonImage: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: colors.Red,
    marginTop: 5,
  },
});