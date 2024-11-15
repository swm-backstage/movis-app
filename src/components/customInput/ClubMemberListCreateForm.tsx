import { UseMutationResult } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import colors from '../../assets/colors/defaultColors';
import { ResponseError } from '../../types/common';
import { MemberCreateListReq, MemberCreateReq } from '../../types/member/request/MemberCreateReq';
import ExpandedButton from '../Button/ExpandedButton';
import ItemListButton from '../Button/ItemListButton';
import MemberInputRow, { MemberData } from './MemberInputRow';

type ClubMemberListCreateFormProps = {
  clubId: string;
  createMemberList: UseMutationResult<void, ResponseError, MemberCreateListReq, unknown>;
};

const ClubMemberListCreateForm: React.FC<ClubMemberListCreateFormProps> = ({ clubId, createMemberList }) => {
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
    // 모든 인풋 필드의 검증을 트리거
    memberIds.forEach((id) => {
      const ref = memberRefs.current[id];
      if (ref && ref.validate) {
        ref.validate();
      }
    });

    // 모든 멤버 데이터를 수집
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

      // 이름 중복 체크
      if (name !== '' && nameSet.has(name)) {
        const refObj = memberRefs.current[id];
        if (refObj && refObj.setNameError) {
          refObj.setNameError('중복된 이름입니다.');
        }
        hasError = true;
      } else {
        nameSet.add(name);
      }

      // 휴대폰 번호 중복 체크
      if (phoneNo !== '' && phoneSet.has(phoneNo)) {
        const refObj = memberRefs.current[id];
        if (refObj && refObj.setPhoneError) {
          refObj.setPhoneError('중복된 휴대폰 번호입니다.');
        }
        hasError = true;
      } else {
        phoneSet.add(phoneNo);
      }
    });

    // 모든 필드가 유효한지 확인
    const allValid = memberDataList.every(
      (member) => member.name && member.phoneNo && member.isNameValid && member.isPhoneValid
    );

    if (!allValid || hasError) {
      Alert.alert('오류', '모든 필드를 올바르게 입력해주세요.');
      return;
    }

    // MemberCreateListReq 객체 생성
    const memberList: MemberCreateReq[] = memberDataList.map((member) => ({
      name: member.name,
      phoneNo: member.phoneNo,
    }));

    const memberCreateListReq: MemberCreateListReq = {
      clubId,
      memberList,
    };


    // 멤버 데이터 전송
    createMemberList.mutate(
      memberCreateListReq,
      {
        onSuccess: () => {
          Alert.alert('성공', '모든 멤버가 올바르게 입력되었습니다.');
          setMemberIds([Date.now()]);
          memberRefs.current = {};
        },
        onError: (error) => {
          console.error(error, error.response?.data);
          Alert.alert('오류', '멤버 추가에 실패했습니다.');
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.bodyContainer}>
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
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.addMemberFormButtonContainer}>
          <ItemListButton onPress={addMember} buttonText='폼 추가' />
        </View>
        <View style={styles.addMemberListButtonContainer} />
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
  bodyContainer: {
    maxHeight: 250,
    marginBottom: 10,
  },
  addMemberFormButtonContainer: {
    alignItems: 'flex-end',
  },
  addMemberListButtonContainer: {
    marginTop: 40,
  },
  footerContainer: {
    marginTop: 24,
  },
});

export default ClubMemberListCreateForm;