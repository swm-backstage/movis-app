import { ImageSourcePropType } from "react-native";

type BankNameCodeRecord = {
  key: string;
  data: {
    name: string;
    imageURL: ImageSourcePropType;
  }
};

const bankList: BankNameCodeRecord[] = [
  { key: '080', data: { name: '카카오뱅크', imageURL: require('../assets/bank/kakao.png') }},
  { key: '090', data: { name: '토스뱅크', imageURL: require('../assets/bank/toss.png') }},
];

const bankMap = new Map(bankList.map(bank => [bank.key, { code: bank.key, name: bank.data.name, imageURL: bank.data.imageURL }]));

export { bankList, bankMap };