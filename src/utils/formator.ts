export const FormatPhoneNumber = (text: string) => {
  const cleaned = text.replace(/\D+/g, '');
  let formatted = '';

  if (cleaned.length <= 3) {
    formatted = cleaned;
  } else if (cleaned.length <= 7) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }

  return formatted;
};

export const ClubAccountFormat = (text: string) => {
  const cleaned = text.replace(/\D+/g, '');

  return cleaned.slice(0, 4);
}

export const ClubBalanceFormat = (text: string) => {
  const cleaned = text.replace(/\D+/g, '');
  const formatted = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${formatted} 원`;
};