export const FormatPhoneNumber = (text: string): string => {
    const cleaned = text.replace(/\D+/g, '');

    let formattedText = '';
    if (cleaned.length <= 3) {
        formattedText = cleaned;
    } else if (cleaned.length <= 7) {
        formattedText = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
        formattedText = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }

    return formattedText;
};