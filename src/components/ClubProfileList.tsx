import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import profileColors from '../assets/colors/profileColors';
import colors from '../assets/colors/defaultColors';
import { ClubGetRes } from '../types/club/response/ClubGetRes';

type ClubProfileListProps = {
  club: ClubGetRes;
};

const ClubProfileList: React.FC<ClubProfileListProps> = ({ club }) => {
  const [profileColorsArray, setProfileColorsArray] = useState<string[]>([]);

  useEffect(() => {
    const colorsArray: string[] = [];
    const maxProfiles = Math.min(club.memberCnt, 3);
    for (let i = 0; i < maxProfiles; i++) {
      const profileColorValues = Object.values(profileColors) as string[];
      const randomIndex = Math.floor(Math.random() * profileColorValues.length);
      const randomColor = profileColorValues[randomIndex];
      colorsArray.push(randomColor);
    }
    setProfileColorsArray(colorsArray);
  }, [club]);

  if (profileColorsArray.length === 0) {
    return null;
  }

  return (
    <View style={styles.clubMembersProfiles}>
      {profileColorsArray.map((randomColor, index) => (
        <View
          key={index}
          style={[
            styles.profile,
            { backgroundColor: randomColor },
          ]}
        >
          <Icon
            name="user"
            style={{ fontSize: 14, color: colors.White, fontWeight: '900' }}
          />
        </View>
      ))}
      {club.memberCnt > 3 && (
        <View style={[styles.profile, { backgroundColor: colors.Gray400 }]}>
          <Text style={{ fontSize: 12, color: colors.White }}>
            +{club.memberCnt - 3}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clubMembersProfiles: {
    flexDirection: 'row',
  },
  profile: {
    width: 28,
    height: 28,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.White,
    marginRight: -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClubProfileList;