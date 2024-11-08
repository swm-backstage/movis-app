import React from 'react';
import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import { View } from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface SelectItemInputProps {
  name: string | undefined;
  imageURL: ImageSourcePropType | undefined;
  openSelectItemList: () => void;
}

const SelectItemInput: React.FC<SelectItemInputProps> = ({ name, imageURL, openSelectItemList }) => (
    <TouchableOpacity style={styles.container} onPress={openSelectItemList}>
      {name
        ?
        <View style={styles.selectedItem}>
          <Image source={imageURL} style={styles.itemImage} />
          <Text style={styles.itemName}>{name}</Text>
        </View>
        :
        <View style={styles.unSelectedItem}>
          <Text style={styles.initialText}>은행 선택</Text>
          <AntDesign name="up" style={styles.initialIcon} />
        </View>
      }
    </TouchableOpacity>
);

export default SelectItemInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.Gray200,
    borderRadius: 5,
    height: 62,
    paddingHorizontal: 16,
  },
  selectedItem: {
    flex: 1,
    flexDirection: 'row',
  },
  unSelectedItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  itemName: {
    fontSize: 14,
    marginTop: 2,
    color: colors.Black,
  },
  initialText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.Black,
  },
  initialIcon: {
    fontSize: 16,
  },
});