
function validate(key: string, value: string) {
    const errors = {
        message: '',
        check: false
    };

    if (key === 'identifier') {
        if (!/^[a-zA-Z0-9]{4,20}$/.test(value) && value !== '') {
            errors.message = "아이디는 4글자 이상 20글자 이하의 영문자와 숫자만 허용됩니다.";
        }
        else {
            errors.check = true;
        }
    }

    if(key === 'password'){
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[^ \t]{8,20}$/.test(value) && value !== '') {
            errors.message = "8자리에서 20자리, 영 대/소문자 및 숫자 한 번씩 포함, @, #, $, %, ^, &, +, =등의 문자를 한 번씩 포함, 띄어쓰기/탭 금지"
        }
        else {
            errors.check = true;
        }
    }

    if(key === 'phone'){
        if (!/^\d{3}-\d{4}-\d{4}$/.test(value) && value !== '') {
            errors.message = "010-XXXX-XXXX 형식으로 작성해 주세요"
        }
        else {
            errors.check = true;
        }
    }

    if(key === 'name'){
        if (!/^[가-힣a-zA-Z]{3,10}$/.test(value) && value !== '') {
            errors.message = "이름은 3자리에서 10자리 사이의 한글 또는 영문자만 가능합니다."
        }
        else {
            errors.check = true;
        }
    }

    return errors;
}


export { validate}