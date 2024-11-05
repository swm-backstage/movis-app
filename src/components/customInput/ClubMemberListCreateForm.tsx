// ClubMemberListCreateForm.tsx

import React, { useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/colors/defaultColors';
import ExpandedButton from '../Button/ExpandedButton';
import MemberInputRow, { MemberData } from './MemberInputRow';

const ClubMemberListCreateForm: React.FC = () => {
  const [memberIds, setMemberIds] = useState<number[]>([Date.now()]);
  const memberRefs = useRef<any[]>([]);

  const addMember = () => {
    setMemberIds((prevIds) => [...prevIds, Date.now()]);
  };

  const removeMember = (id: number) => {
    setMemberIds((prevIds) => prevIds.filter((memberId) => memberId !== id));
    memberRefs.current = memberRefs.current.filter((ref) => ref.id !== id);
  };

  const handleCreateMembers = () => {
    const memberDataList: MemberData[] = memberRefs.current.map((refObj) => {
      return refObj.ref.getData();
    });

    const allValid = memberDataList.every(
      (member) => member.isNameValid && member.isPhoneValid
    );

    if (!allValid) {
      Alert.alert('오류', '모든 필드를 올바르게 입력해주세요.');
      return;
    }

    // 멤버 데이터를 사용하여 필요한 작업을 수행합니다.
    console.log('멤버 데이터:', memberDataList);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formScrollContainer}>
        {memberIds.map((id, index) => (
          <MemberInputRow
            key={id}
            id={id}
            onRemove={removeMember}
            ref={(ref) => {
              memberRefs.current[index] = { id, ref };
            }}
          />
        ))}
        <View style={styles.addUserFormIconContainer}>
          <TouchableOpacity onPress={addMember}>
            <AntDesign name="pluscircleo" size={28} color="rgba(153, 102, 255, 1)" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <ExpandedButton onPress={handleCreateMembers} buttonText="멤버 추가" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.White,
  },
  formScrollContainer: {
    maxHeight: 250,
    marginBottom: 10,
  },
  addUserFormIconContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerContainer: {
    marginTop: 24,
  },
});

export default ClubMemberListCreateForm;