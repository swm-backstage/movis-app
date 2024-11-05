// utils/formatPhoneNumber.ts

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