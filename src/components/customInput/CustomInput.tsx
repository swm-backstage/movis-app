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
  errorMessage: string;
  label?: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  clearInput: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  isValid,
  errorMessage,
  label,
  onChangeText,
  onBlur,
  clearInput,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label && 
        <Text style={styles.labelText}>
          {label}
        </Text>
        }
      </View>
      <View style={[styles.inputWrapper, !isValid && styles.invalidInputWrapper]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
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
  },
  labelContainer: {
  },
  labelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.Black,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.Gray200,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  invalidInputWrapper: {
    borderColor: colors.Red,
  },
  input: {
    flex: 1,
    fontWeight: '500',
    paddingVertical: 8,
    color: colors.Black,
  },
  clearButton: {
    paddingHorizontal: 5,
  },
  clearButtonImage: {
    width: 24,
    height: 24,
  },
  errorText: {
    fontSize: 13,
    color: colors.Red,
    marginTop: 5,
  },
});