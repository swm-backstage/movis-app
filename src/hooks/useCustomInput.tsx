import { useState, useCallback } from 'react';

interface UseCustomInputProps {
  validator?: (text: string) => { valid: boolean; errorMessage?: string };
  formator?: (text: string) => string;
  required?: boolean;
  requiredMessage?: string;
}

interface UseCustomInputReturn {
  value: string;
  isValid: boolean;
  errorMessage: string;
  clearInput: () => void;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  setError: (msg: string) => void;
  validate: () => boolean;
}

const useCustomInput = ({
  validator,
  formator,
  required = false,
  requiredMessage = '필수 항목',
}: UseCustomInputProps): UseCustomInputReturn => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const setError = useCallback((msg: string) => {
    setErrorMessage(msg);
    setIsValid(false);
  }, []);

  const validateInput = useCallback((): boolean => {
    if (required && value.trim() === '') {
      setErrorMessage(requiredMessage);
      setIsValid(false);
      return false;
    }

    if (validator) {
      const validation = validator(value);
      if (!validation.valid) {
        setErrorMessage(validation.errorMessage || '옳바르지 않은 형식');
        setIsValid(false);
        return false;
      }
    }

    setErrorMessage('');
    setIsValid(true);
    return true;
  }, [value, required, validator, requiredMessage]);

  const onChangeText = useCallback(
    (text: string) => {
      let formattedText = text;
      if (formator) {
        formattedText = formator(text);
      }
      setValue(formattedText);

      if (!touched) {
        setTouched(true);
      }

      // 실시간 유효성 검사
      if (formattedText.trim() !== '' && validator) {
        const validation = validator(formattedText);
        if (!validation.valid) {
          setErrorMessage(validation.errorMessage || '옳바르지 않은 형식');
          setIsValid(false);
        } else {
          setErrorMessage('');
          setIsValid(true);
        }
      } else if (required && formattedText.trim() === '') {
        setErrorMessage(requiredMessage);
        setIsValid(false);
      } else {
        setErrorMessage('');
        setIsValid(true);
      }
    },
    [formator, validator, touched, required, requiredMessage]
  );

  const onBlur = useCallback(() => {
    setTouched(true);
    validateInput();
  }, [validateInput]);

  const clearInput = useCallback(() => {
    setValue('');
    setTouched(true);
    validateInput();
  }, [validateInput]);

  const validate = useCallback((): boolean => {
    setTouched(true);
    return validateInput();
  }, [validateInput]);

  return { value, isValid, errorMessage, clearInput, onChangeText, onBlur, setError, validate };
};

export default useCustomInput;