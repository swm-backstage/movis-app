import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import { bankList } from '../../constants/mockData';
import SvgIcon from '../../constants/SvgIcon';

interface SelectItemListProps {
  selectItem: (itemId: string) => void;
}

const SelectItemList: React.FC<SelectItemListProps> = ({ selectItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>은행계좌 선택</Text>
      </View>
      <ScrollView style={styles.bodyContainer}>
        {bankList.map((item) => (
          <View key={item.key}>
            <TouchableOpacity style={styles.item} onPress={() => selectItem(item.key)}>
              <View style={styles.svgIcon}>
                <SvgIcon size={32} name={item.data.svg} />
              </View>
              <Text style={styles.itemName}>{item.data.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    color: colors.Black,
  },
  bodyContainer: {
    // 필요한 스타일 추가
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
  svgIcon: {
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    color: colors.Black,
    flex: 1,
  },
});
