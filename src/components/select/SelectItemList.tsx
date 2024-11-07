import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import { bankList } from '../../constants/mockData';

interface SelectItemListProps {
  selectItem: (itemId: string) => void;
}

const SelectItemList: React.FC<SelectItemListProps> = ({ selectItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          은행계좌 선택
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={bankList}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.item} onPress={() => selectItem(item.key)}>
                <Image source={item.data.imageURL} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.data.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SelectItemList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 28,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '800',
  },
  bodyContainer: {

  },
  selectedBankContainer: {
    padding: 10,
    backgroundColor: colors.Gray100,
    marginTop: 10,
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.Gray200,
    borderRadius: 5,
    height: 62,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  itemImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    color: colors.Black,
    flex: 1,
  },
});