import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/defaultColors';
import profileColors from '../assets/colors/profileColors';

interface ProfileIconProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  iconName = 'user',
  iconSize = 48,
  iconColor = colors.White,
}) => {

  const getProfileColor = (identifier: string): string => {
    const profileColorValues = Object.values(profileColors) as string[];
    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % profileColorValues.length;
    return profileColorValues[index];
  };
  
  return (
    <View
      style={[styles.profile, { 
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / 2,
        backgroundColor: getProfileColor(iconName) 
      }]}
    >
      <Icon
        name='user'
        style={{ fontSize: iconSize / 2, color: iconColor }}
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