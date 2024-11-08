import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import colors from '../../assets/colors/defaultColors';
import { Text } from 'react-native-paper';
import { Icon, Input } from '@ant-design/react-native';

type DateTimePickerInputProps = {
    label?: string;
    selectedDate?: string;
    isValid: boolean;
    mode?: 'date' | 'time' | 'datetime' | undefined;
    onBlur: () => void;
    handleTouched: () => void;
    setSelectedDateTime: (dateTime: string) => void;
};

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
    label,
    selectedDate,
    isValid,
    mode = 'date',
    onBlur,
    handleTouched,
    setSelectedDateTime,
}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        handleTouched();
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        onBlur();
    };

    const handleConfirm = (date: Date) => {
        const isoDateString = date.toISOString();
        setSelectedDateTime(isoDateString);
        hideDatePicker();
    };

    const getDisplayDate = () => {
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            if (mode === 'date') {
                return dateObj.toISOString().split('T')[0];
            } else if (mode === 'time') {
                const hours = dateObj.getHours().toString().padStart(2, '0');
                const minutes = dateObj.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            } else if (mode === 'datetime') {
                const datePart = dateObj.toISOString().split('T')[0];
                const hours = dateObj.getHours().toString().padStart(2, '0');
                const minutes = dateObj.getMinutes().toString().padStart(2, '0');
                return `${datePart} ${hours}:${minutes}`;
            } else {
                return selectedDate;
            }
        }
        return '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                {label && <Text style={styles.labelText}>{label}</Text>}
            </View>
            <TouchableOpacity onPress={showDatePicker}>
                <View style={[styles.input, !isValid && styles.invalidInputWrapper]}>
                    <Text style={styles.inputText}>
                        {getDisplayDate() || '날짜를 선택하세요'}
                    </Text>
                    <Icon name="calendar" style={styles.calendarIcon} />
                </View>
            </TouchableOpacity>
            {!isValid && (
                <Text style={styles.errorText}>필수 항목</Text>
            )}
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={selectedDate ? new Date(selectedDate) : new Date()}
                locale="ko-KR"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    labelContainer: {
        marginBottom: 12,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '400'
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: colors.Gray200,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between',
    },
    inputText: {
        fontSize: 14,
        color: colors.Black,
    },
    invalidInputWrapper: {
        borderColor: colors.Red,
    },
    calendarIcon: {
        fontSize: 24,
        color: colors.Gray700,
    },
    errorText: {
        fontSize: 13,
        color: colors.Red,
        marginTop: 5,
    },
});

export default DateTimePickerInput;