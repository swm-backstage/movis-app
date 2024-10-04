import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGetMemberList } from '../hooks/useMember';
import CustomLoader from './Loader';

interface MemberScrollViewProps {
  clubId: string;
}

const MemberScrollView: React.FC<MemberScrollViewProps> = ({ clubId }) => {
  const { data: memberList, isLoading, isError } = useGetMemberList(clubId);

  if (isLoading) {
    return <CustomLoader />
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer} nestedScrollEnabled={true}>
        {memberList && memberList.members.map((member) => (
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
    color: 'black',
  },
  memberPhoneNo: {
    fontSize: 14,
    color: 'black',
  },
});

export default MemberScrollView;