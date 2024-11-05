// hooks/useCustomInput.ts

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
}

const useCustomInput = ({
  validator,
  formator,
  required = false,
  requiredMessage = '필수 항목입니다.',
}: UseCustomInputProps): UseCustomInputReturn => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const validateInput = useCallback(() => {
    if (required && value.trim() === '') {
      setErrorMessage(requiredMessage);
      setIsValid(false);
    } else if (validator) {
      const validation = validator(value);
      if (!validation.valid) {
        setErrorMessage(validation.errorMessage || '형식이 올바르지 않습니다.');
        setIsValid(false);
      } else {
        setErrorMessage('');
        setIsValid(true);
      }
    } else {
      setErrorMessage('');
      setIsValid(true);
    }
  }, [value, required, validator, requiredMessage]);

  const onChangeText = useCallback(
    (text: string) => {
      let formattedText = text;
      if (formator) {
        formattedText = formator(text);
      }
      setValue(formattedText);

      if (touched) {
        if (formattedText.trim() !== '' && validator) {
          const validation = validator(formattedText);
          if (!validation.valid) {
            setErrorMessage(validation.errorMessage || '형식이 올바르지 않습니다.');
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
  }, []);

  return { value, isValid, errorMessage, clearInput, onChangeText, onBlur };
};

export default useCustomInput;