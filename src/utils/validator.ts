export const EmailValidator = (text: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
};

export const PhoneNumberValidator = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');

    if (!cleaned.startsWith('010')) {
        return false;
    }

    return cleaned.length === 11;
};