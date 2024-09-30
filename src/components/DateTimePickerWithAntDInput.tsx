// HeaderTitle.tsx
import { Input, View } from '@ant-design/react-native';
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

type DateTImePickerWithAntdDInputProps = {
  setFormFieldsValue: (paidAt: string) => void;
};

const DateTimePickerWithAntdDInput: React.FC<DateTImePickerWithAntdDInputProps> = ({ setFormFieldsValue }) => {
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
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker} style={styles.inputWrapper}>
        <Input
          value={selectedDate ? new Date(selectedDate).toLocaleString('ko-KR') : ''}
          placeholder="날짜를 선택하세요"
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>
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
  inputWrapper: {
    backgroundColor: 'red',
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    color: 'black',
  },
});

export default DateTimePickerWithAntdDInput;