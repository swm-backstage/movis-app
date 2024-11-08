import { useState, useCallback } from 'react';

export type Item = {
  id: string;
  name: string;
};

interface UseItemListSelectorProps {
  validator?: (selectedIds: string[]) => { valid: boolean; errorMessage?: string };
  required?: boolean;
  requiredMessage?: string;
}

interface UseItemListSelectorReturn {
  selectedIds: string[];
  isSelected: (itemId: string) => boolean;
  toggleSelectItem: (itemId: string) => void;
  selectAll: (items: Item[]) => void;
  deselectAll: () => void;
  selectedCount: number;
  isValid: boolean;
  errorMessage: string;
  validate: () => boolean;
}

const useItemListSelector = ({
  validator,
  required = false,
  requiredMessage = '필수 항목입니다.',
}: UseItemListSelectorProps = {}): UseItemListSelectorReturn => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const isSelected = useCallback(
    (itemId: string) => selectedIds.includes(itemId),
    [selectedIds]
  );

  const validate = useCallback(() => {
    if (required && selectedIds.length === 0) {
      setErrorMessage(requiredMessage);
      setIsValid(false);
      return false;
    }

    if (validator) {
      const validation = validator(selectedIds);
      if (!validation.valid) {
        setErrorMessage(validation.errorMessage || '유효하지 않은 선택입니다.');
        setIsValid(false);
        return false;
      }
    }

    setErrorMessage('');
    setIsValid(true);
    return true;
  }, [selectedIds, required, requiredMessage, validator]);

  const toggleSelectItem = useCallback(
    (itemId: string) => {
      setSelectedIds(prev =>
        prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
      );
      setTouched(true);
    },
    []
  );

  const selectAll = useCallback((items: Item[]) => {
    setSelectedIds(items.map(item => item.id));
    setTouched(true);
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedIds([]);
    setTouched(true);
  }, []);

  const selectedCount = selectedIds.length;

  return {
    selectedIds,
    isSelected,
    toggleSelectItem,
    selectAll,
    deselectAll,
    selectedCount,
    isValid,
    errorMessage,
    validate,
  };
};

export default useItemListSelector;