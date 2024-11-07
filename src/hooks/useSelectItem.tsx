import { useState } from 'react';
import { bankMap } from '../constants/mockData';

interface UseSelectItemListReturn {
  selectedBank: { name: string; imageURL: any } | undefined;
  selectBank: (key: string) => void;
}

const useSelectItemList = (): UseSelectItemListReturn => {
  const [selectedBank, setSelectedBank] = useState<{ name: string; imageURL: any } | undefined>(undefined);

  const selectBank = (key: string) => {
    const bank = bankMap.get(key);
    if (bank) {
      setSelectedBank(bank);
    }
  };

  return { selectedBank, selectBank };
};

export default useSelectItemList;