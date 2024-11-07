import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import colors from '../../assets/colors/defaultColors';
import { Text } from 'react-native-paper';
import { Icon, Input, View } from '@ant-design/react-native';

type DateTimePickerInputProps = {
    label?: string;
    selectedDate?: string;
    isValid: boolean;
    onBlur: () => void;
    handleTouched: () => void;
    setSelectedDateTime: (dateTime: string) => void;
};

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
    label,
    selectedDate,
    isValid,
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
        const isoDateString = date.toISOString().split('T')[0];
        setSelectedDateTime(isoDateString);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                {label && <Text style={styles.labelText}>{label}</Text>}
            </View>
            <Input
                value={selectedDate || undefined}
                placeholder="날짜를 선택하세요"
                style={[styles.input, !isValid && styles.invalidInputWrapper]}
                inputStyle={{ fontSize: 14, fontWeight: '500' }}
                editable={false}
                suffix={
                    <TouchableOpacity onPress={showDatePicker} style={styles.iconButton}>
                        <Icon name="calendar" style={styles.calendarIcon} />
                    </TouchableOpacity>
                }
            />
            {!isValid && (
                <Text style={styles.errorText}>필수 항목</Text>
            )}
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={selectedDate ? new Date(selectedDate) : new Date()}
                maximumDate={new Date()}
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
    },
    invalidInputWrapper: {
        borderColor: colors.Red,
    },
    iconButton: {
        padding: 5,
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