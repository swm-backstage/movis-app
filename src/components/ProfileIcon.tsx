import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/defaultColors';

interface ProfileIconProps {
  backgroundColor?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  backgroundColor = colors.Gray400,
  iconName = 'user',
  iconSize = 22,
  iconColor = colors.White,
}) => {
  return (
    <View
      style={[
        styles.profile,
        { backgroundColor },
      ]}
    >
      <Icon
        name={iconName}
        style={{ fontSize: iconSize, color: iconColor }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileIcon;