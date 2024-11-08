import { useState, useCallback } from 'react';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

interface UseImagePickerInputReturn {
  image: Asset | null;
  selectImage: () => void;
  clearImage: () => void;
  isValid: boolean;
  errorMessage: string;
  validate: () => boolean;
}

const useImagePickerInput = (): UseImagePickerInputReturn => {
  const [image, setImage] = useState<Asset | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const selectImage = useCallback(() => {
    setTouched(true);
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          // 선택 취소 시 처리
        } else if (response.errorCode) {
          setErrorMessage('이미지를 선택하는 중 오류가 발생했습니다.');
          setIsValid(false);
        } else if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0]);
          setIsValid(true);
          setErrorMessage('');
        }
      }
    );
  }, []);

  const clearImage = useCallback(() => {
    console.log('clearImage called');
    setImage(null);
    setIsValid(true);
    setErrorMessage('');
  }, []);

  const validate = useCallback(() => {
    if (!image) {
      setErrorMessage('이미지를 선택해주세요.');
      setIsValid(false);
      return false;
    }
    setErrorMessage('');
    setIsValid(true);
    return true;
  }, [image]);

  return {
    image,
    selectImage,
    clearImage,
    isValid,
    errorMessage,
    validate,
  };
};

export default useImagePickerInput;