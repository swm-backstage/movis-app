import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../assets/colors/defaultColors';
import { Item } from '../../hooks/useItemListSelector';
import { Icon } from '@ant-design/react-native';
import profileColors from '../../assets/colors/profileColors';
import ProfileIcon from '../ProfileIcon';

interface ItemListSelectorProps {
  items: Item[];
  selectedIds: string[];
  label?: string;
  isSelected: (itemId: string) => boolean;
  toggleSelectItem: (itemId: string) => void;
  selectAll: (items: Item[]) => void;
  deselectAll: () => void;
  selectedCount: number;
  isValid: boolean;
  errorMessage: string;
}

const ItemListSelector: React.FC<ItemListSelectorProps> = ({
  items,
  selectedIds,
  label,
  isSelected,
  toggleSelectItem,
  selectAll,
  deselectAll,
  selectedCount,
  isValid,
  errorMessage,
}) => {
  const isAllSelected = selectedCount === items.length && items.length > 0;

  const getProfileColor = (identifier: string): string => {
    const profileColorValues = Object.values(profileColors) as string[];
    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % profileColorValues.length;
    return profileColorValues[index];
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.labelText}>
          {label}
        </Text>
        <TouchableOpacity onPress={() => (isAllSelected ? deselectAll() : selectAll(items))}>
          <Text style={styles.selectAllText}>
            {isAllSelected ? '전체 선택 해제' : '전체 선택'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.bodyContainer, !isValid && styles.invalidInputWrapper]}>
        <View style={styles.itemListContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <ProfileIcon backgroundColor={getProfileColor(item.name)} />
                <Text style={styles.itemText}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => toggleSelectItem(item.id)}
                  style={[
                    styles.checkbox,
                    isSelected(item.id) ? styles.checkboxSelected : styles.checkboxUnselected,
                  ]}
                >
                  <Icon name="check" style={styles.checkmark} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>총 {selectedCount}명</Text>
      </View>
        </View>
        {!isValid && errorMessage !== '' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
    </View>
  );
};

export default ItemListSelector;

const styles = StyleSheet.create({
  container: {
    height: 260,
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  labelText: {
    fontSize: 14,
    color: colors.Black,
  },
  selectAllText: {
    color: colors.Primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    borderWidth: 0.8,
    borderColor: colors.Gray200,
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: colors.White,
  },
  invalidInputWrapper: {
    borderColor: colors.Red,
  },
  itemListContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Gray700,
  },
  checkboxSelected: {
    backgroundColor: colors.Primary,
  },
  checkboxUnselected: {
    backgroundColor: colors.Gray200,
  },
  checkmark: {
    color: colors.White,
    fontSize: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: colors.Black,
  },
  countContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  countText: {
    fontSize: 14,
    color: colors.Primary,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 13,
    color: colors.Red,
    marginTop: 5,
  },
});