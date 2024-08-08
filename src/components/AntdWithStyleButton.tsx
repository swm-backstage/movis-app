import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@ant-design/react-native';

type AntdWithStyleButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
};

const AntdWithStyleButton: React.FC<AntdWithStyleButtonProps> = ({ onPress, children }) => {
  return (
    <Button
      type="primary"
      onPress={onPress}
      style={styles.button}
      activeStyle={styles.buttonActive}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: 'rgba(153, 102, 255, 1)', // 기본 색상
    borderColor: 'rgba(153, 102, 255, 1)', // 기본 테두리 색상
    marginTop: 20,
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: 'rgba(123, 72, 225, 1)', // 눌렀을 때 색상
    borderColor: 'rgba(123, 72, 225, 1)', // 눌렀을 때 테두리 색상
  },
});

export default AntdWithStyleButton;