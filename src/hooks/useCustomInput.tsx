import { useState, useCallback } from 'react';

interface UseCustomInputProps {
  validator?: (text: string) => boolean;
}

interface UseCustomInputReturn {
  value: string;
  isValid: boolean;
  clearInput: () => void;
  onChangeText: (text: string) => void;
}

const useCustomInput = ({ validator }: UseCustomInputProps): UseCustomInputReturn => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text);
      if (validator) {
        const valid = validator(text);
        setIsValid(valid);
      } else {
        setIsValid(true);
      }
    },
    [validator]
  );

  const clearInput = useCallback(() => {
    setValue('');
    setIsValid(true);
  }, []);

  return { value, isValid, clearInput, onChangeText };
};

export default useCustomInput