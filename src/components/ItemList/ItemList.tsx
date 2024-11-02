import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface ItemListProps {
  children: React.ReactNode;
}

const ItemList: React.FC<ItemListProps> = ({ children }) => {
  
  return (
    <ScrollView style={styles.scrollViewContainer} nestedScrollEnabled={true}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {

  },
});

export default ItemList;