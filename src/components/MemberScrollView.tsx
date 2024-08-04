import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MemberGetListRes } from '../types/member/response/MemberGetListRes';



interface MemberScrollViewProps {
  memberList: MemberGetListRes;
}

const MemberScrollView: React.FC<MemberScrollViewProps> = ({ memberList }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        {memberList.map((member) => (
          <View key={member.memberId} style={styles.memberItem}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberPhoneNo}>{member.phoneNo}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.3,
    borderRadius: 5,
    height: 150,
    padding: 12,
  },
  scrollViewContainer: {

  },
  memberItem: {
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 7,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberName: {
    fontSize: 18,
  },
  memberPhoneNo: {
    fontSize: 14,
  },
});

export default MemberScrollView;