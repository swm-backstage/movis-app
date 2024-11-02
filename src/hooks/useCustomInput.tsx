import { useState, useCallback } from 'react';

interface UseCustomInputProps {
  validator?: (text: string) => boolean;
  formatText?: (text: string) => string;
}

interface UseCustomInputReturn {
  value: string;
  isValid: boolean;
  clearInput: () => void;
  onChangeText: (text: string) => void;
}

const useCustomInput = ({ validator, formatText }: UseCustomInputProps): UseCustomInputReturn => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChangeText = useCallback(
    (text: string) => {
      let formattedText = text;
      if (formatText) {
        formattedText = formatText(text);
      }
      setValue(formattedText);
      if (validator) {
        const valid = validator(formattedText);
        setIsValid(valid);
      } else {
        setIsValid(true);
      }
    },
    [validator, formatText]
  );

  const clearInput = useCallback(() => {
    setValue('');
    setIsValid(true);
  }, []);

  return { value, isValid, clearInput, onChangeText };
};

export default useCustomInput