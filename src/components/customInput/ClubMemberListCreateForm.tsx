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
  const memberRefs = useRef<{ [key: number]: any }>({});

  const addMember = () => {
    const newId = Date.now();
    setMemberIds((prevIds) => [...prevIds, newId]);
  };

  const removeMember = (id: number) => {
    setMemberIds((prevIds) => prevIds.filter((memberId) => memberId !== id));
    delete memberRefs.current[id];
  };

  const handleCreateMembers = () => {
    // Validate all inputs
    memberIds.forEach((id) => {
      const ref = memberRefs.current[id];
      if (ref && ref.validate) {
        ref.validate();
      }
    });

    const memberDataList: MemberData[] = memberIds.map((id) => {
      const ref = memberRefs.current[id];
      if (ref && ref.getData) {
        return ref.getData();
      }
      return {
        id,
        name: '',
        isNameValid: false,
        phoneNo: '',
        isPhoneValid: false,
      };
    });

    let hasError = false;

    const nameSet = new Set<string>();
    const phoneSet = new Set<string>();

    memberDataList.forEach((member) => {
      const { name, phoneNo, id } = member;

      if (name !== '' && nameSet.has(name)) {
        const refObj = memberRefs.current[id];
        if (refObj && refObj.setNameError) {
          refObj.setNameError('중복된 이름');
        }
        hasError = true;
      } else {
        nameSet.add(name);
      }

      if (phoneNo !== '' && phoneSet.has(phoneNo)) {
        const refObj = memberRefs.current[id];
        if (refObj && refObj.setPhoneError) {
          refObj.setPhoneError('중복된 휴대폰 번호');
        }
        hasError = true;
      } else {
        phoneSet.add(phoneNo);
      }
    });

    const allValid = memberDataList.every(
      (member) => member.isNameValid && member.isPhoneValid
    );

    if (!allValid || hasError) {
      return;
    }

    console.log('멤버 데이터:', memberDataList);
    Alert.alert('성공', '모든 멤버가 올바르게 입력되었습니다.');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formScrollContainer}>
        {memberIds.map((id) => (
          <MemberInputRow
            key={id}
            id={id}
            onRemove={removeMember}
            ref={(ref) => {
              memberRefs.current[id] = ref;
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