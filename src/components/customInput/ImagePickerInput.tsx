import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import colors from '../../assets/colors/defaultColors';
import { Icon } from '@ant-design/react-native';

interface ImagePickerInputProps {
  image: any;
  selectImage: () => void;
  clearImage: () => void;
  isValid: boolean;
  errorMessage: string;
  label?: string;
}

const ImagePickerInput: React.FC<ImagePickerInputProps> = ({
  image,
  selectImage,
  clearImage,
  isValid,
  errorMessage,
  label,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <View style={[styles.imageContainer, !isValid && styles.invalidInputWrapper]}>
        {image ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <TouchableOpacity
              onPress={() => {
                console.log('Remove button pressed');
                clearImage();
              }}
              style={styles.removeButton}
            >
              <Icon name="close" style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={selectImage} style={styles.placeholderContainer}>
            <Icon name="camera" style={styles.cameraIcon} />
          </TouchableOpacity>
        )}
      </View>
      {!isValid && errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default ImagePickerInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  labelContainer: {
    marginBottom: 12,
  },
  labelText: {
    fontSize: 14,
    color: colors.Black,
    fontWeight: '400',
  },
  imageContainer: {
    height: 120,
    width: 120,
    borderWidth: 0.8,
    borderColor: colors.Gray200,
    borderRadius: 5,
    backgroundColor: colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invalidInputWrapper: {
    borderColor: colors.Red,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.White,
    borderRadius: 12,
    padding: 2,
    zIndex: 1,
  },
  removeIcon: {
    fontSize: 16,
    color: colors.Gray700,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    fontSize: 40,
    color: colors.Gray500,
  },
  errorText: {
    fontSize: 13,
    color: colors.Red,
    marginTop: 5,
  },
});