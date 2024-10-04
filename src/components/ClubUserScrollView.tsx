import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGetClubUserList } from '../hooks/useClubUser';
import CustomLoader from './Loader';

interface ClubUserScrollViewProps {
  clubId: string;
}

const ClubUserScrollView: React.FC<ClubUserScrollViewProps> = ({ clubId }) => {
  const { data: clubUserList, isLoading, isError } = useGetClubUserList(clubId);
	console.log(clubUserList);
  if (isLoading) {
    return <CustomLoader />
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer} nestedScrollEnabled={true}>
        {clubUserList && clubUserList.clubUserGetResDtoList.map((clubUser) => (
          <View key={clubUser.clubUserId} style={styles.clubUserItem}>
            <Text style={styles.identifier}>{clubUser.identifier}</Text>
            <Text style={styles.role}>{clubUser.role}</Text>
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
  clubUserItem: {
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 7,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  identifier: {
    fontSize: 18,
    color: 'black',
  },
  role: {
    fontSize: 14,
    color: 'black',
  },
});

export default ClubUserScrollView;