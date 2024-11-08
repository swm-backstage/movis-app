import { useCallback, useState } from 'react';

interface UseDateTimePickerInputReturn {
    selectedDateTime: string | undefined;
    isValid: boolean;
    value: string | undefined;
    setSelectedDateTime: (dateTime: string) => void;
    validate: () => boolean;
    onBlur: () => void;
    handleTouched: () => void;
}

const useDateTimePickerInput = (): UseDateTimePickerInputReturn => {
    const [selectedDateTime, setSelectedDateTimeState] = useState<string | undefined>(undefined);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [touched, setTouched] = useState<boolean>(false);

    const validate = useCallback((): boolean => {
        setTouched(true);
        const valid = selectedDateTime ? true : false;
        setIsValid(valid);
        return valid;
    }, [selectedDateTime]);

    const onBlur = useCallback(() => {
        validate();
    }, [validate]);

    const handleTouched = useCallback(() => {
        setTouched(true);
    }, []);

    const setSelectedDateTime = useCallback((dateTime: string) => {
        setSelectedDateTimeState(dateTime);
        setIsValid(true);
        validate();
    }, []);

    return { isValid, value: selectedDateTime, validate, onBlur, selectedDateTime, setSelectedDateTime, handleTouched };
};

export default useDateTimePickerInput;