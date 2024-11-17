import { useState } from 'react';
import { bankMap } from '../constants/mockData';

interface UseSelectItemListReturn {
  selectedItem: { code: string; name: string; svg: string } | undefined;
  isValid: boolean;
  validate: () => void;
  selectItem: (key: string) => void;
}

const useSelectItemList = (): UseSelectItemListReturn => {
  const [selectedItem, setSelectedItem] = useState<{ code: string; name: string; svg: string } | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = () => {
    if (selectedItem) {
      setIsValid(true);
    }
  }

  const selectItem = (key: string) => {
    const item = bankMap.get(key);
    if (item) {
      setSelectedItem(item);
      setIsValid(true);
    }
  };

  return { selectedItem, isValid, validate , selectItem };
};

export default useSelectItemList;