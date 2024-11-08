import { useState, useCallback, useEffect } from 'react';

export type Item = {
  id: string;
  name: string;
};

interface UseItemListRadioProps {
  validator?: (selectedId: string | null) => { valid: boolean; errorMessage?: string };
  required?: boolean;
  requiredMessage?: string;
}

interface UseItemListRadioReturn {
  value: string | null;
  isSelected: (itemId: string) => boolean;
  selectItem: (itemId: string) => void;
  deselectItem: () => void;
  isValid: boolean;
  errorMessage: string;
  validate: () => boolean;
}

const useItemListRadio = ({
  validator,
  required = false,
  requiredMessage = '필수 항목입니다.',
}: UseItemListRadioProps = {}): UseItemListRadioReturn => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const isSelected = useCallback(
    (itemId: string) => selectedId === itemId,
    [selectedId]
  );

  const validate = useCallback(() => {
    if (required && !selectedId) {
      setErrorMessage(requiredMessage);
      setIsValid(false);
      return false;
    }

    if (validator) {
      const validation = validator(selectedId);
      if (!validation.valid) {
        setErrorMessage(validation.errorMessage || '유효하지 않은 선택입니다.');
        setIsValid(false);
        return false;
      }
    }

    setErrorMessage('');
    setIsValid(true);
    return true;
  }, [selectedId, required, requiredMessage, validator]);

  const selectItem = useCallback((itemId: string) => {
    setSelectedId(itemId);
    setTouched(true);
  }, []);

  const deselectItem = useCallback(() => {
    setSelectedId(null);
    setTouched(true);
  }, []);

  useEffect(() => {
    if (touched) {
      validate();
    }
  }, [selectedId]);

  return {
    value: selectedId,
    isSelected,
    selectItem,
    deselectItem,
    isValid,
    errorMessage,
    validate,
  };
};

export default useItemListRadio;