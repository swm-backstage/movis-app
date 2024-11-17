import * as Icons from "../assets/svg/svg";

type BankNameCodeRecord = {
  key: string;
  data: {
    name: string;
    svg: keyof typeof Icons;
  }
};

const bankList: BankNameCodeRecord[] = [
  { key: '080', data: { name: '카카오뱅크', svg: "Kakao" }},
  { key: '090', data: { name: '토스뱅크', svg: "Toss" }},
];

const bankMap = new Map(bankList.map(bank => [bank.key, { code: bank.key, name: bank.data.name, svg: bank.data.svg }]));

export { bankList, bankMap };