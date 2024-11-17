import React from 'react';
import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';
import { View } from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SvgIcon from '../../constants/SvgIcon';
import * as Icons from "../../assets/svg/svg";


interface SelectItemInputProps {
  name: string | undefined;
  svg: keyof typeof Icons;
  openSelectItemList: () => void;
}

const SelectItemInput: React.FC<SelectItemInputProps> = ({ name, svg, openSelectItemList }) => (
    <TouchableOpacity style={styles.container} onPress={openSelectItemList}>
      {name
        ?
        <View style={styles.selectedItem}>
          <View style={styles.svgIcon}>
            <SvgIcon size={32} name={svg} />
          </View>
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
  svgIcon: {
    marginRight: 10,
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