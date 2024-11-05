// utils/validator.ts

export const EmailValidator = (text: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { valid: emailPattern.test(text), errorMessage: '유효한 이메일 주소를 입력하세요.' };
};

export const NameValidator = (text: string) => {
    if (text.trim().length > 10 || text.trim().length < 3) {
        return { valid: false, errorMessage: '2자리 이상 10자리 이하' };
    }
    return { valid: true };
};

export const PhoneNumberValidator = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');

    if (cleaned.length !== 11) {
        return { valid: false, errorMessage: '휴대폰 번호는 11자리' };
    }

    if (!cleaned.startsWith('010')) {
        return { valid: false, errorMessage: '휴대폰 번호는 010으로 시작' };
    }

    return { valid: true };
};