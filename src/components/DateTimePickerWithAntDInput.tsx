import { Input, View, Icon } from '@ant-design/react-native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

type DateTimePickerWithAntdDInputProps = {
  setFormFieldsValue: (paidAt: string) => void;
};

const DateTimePickerWithAntdDInput: React.FC<DateTimePickerWithAntdDInputProps> = ({ setFormFieldsValue }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const isoDateString = date.toISOString();
    setSelectedDate(isoDateString);
    setFormFieldsValue(isoDateString);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Input
        value={selectedDate ? new Date(selectedDate).toLocaleString('ko-KR') : ''}
        placeholder="날짜를 선택하세요"
        style={styles.input}
        editable={false}
        suffix={
          <TouchableOpacity onPress={showDatePicker} style={styles.iconButton}>
            <Icon name="calendar" style={styles.calendarIcon} />
          </TouchableOpacity>
        }
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
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
    width: '100%',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    color: 'black',
  },
  iconButton: {
    padding: 5,
  },
  calendarIcon: {
    fontSize: 24,
    color: '#5F47F1',
  },
});

export default DateTimePickerWithAntdDInput;