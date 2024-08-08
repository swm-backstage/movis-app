type Bank = {
  name: string;
  code: string;
};

const bankList: Bank[] = [
  { name: '카카오뱅크', code: '080' },
  { name: '토스뱅크', code: '090' },
];

const bankMap = new Map(bankList.map(bank => [bank.code, bank.name]));

export { bankList, bankMap };