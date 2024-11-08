import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../assets/colors/defaultColors';
import { Item } from '../../hooks/useItemListRadio';
import ProfileIcon from '../ProfileIcon';
import { ScrollView } from 'react-native-gesture-handler';

interface ItemListRadioProps {
    items: Item[];
    selectedId: string | null;
    label?: string;
    isSelected: (itemId: string) => boolean;
    selectItem: (itemId: string) => void;
    deselectItem: () => void;
    isValid: boolean;
    errorMessage: string;
}

const ItemListRadio: React.FC<ItemListRadioProps> = ({
    items,
    selectedId,
    label,
    isSelected,
    selectItem,
    deselectItem,
    isValid,
    errorMessage,
}) => {
    return (
        <View style={styles.container}>
            {label && (
                <View style={styles.headerContainer}>
                    <Text style={styles.labelText}>{label}</Text>
                </View>
            )}
            <View style={[styles.bodyContainer, !isValid && styles.invalidInputWrapper]}>
                <ScrollView style={styles.itemListContainer}>
                    {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemContainer}
                            onPress={() => selectItem(item.id)}
                        >
                            <ProfileIcon iconName={item.name} iconSize={40} />
                            <Text style={styles.itemText}>{item.name}</Text>
                            <View
                                style={[
                                    styles.radioButton,
                                    isSelected(item.id) ? styles.radioSelected : styles.radioUnselected,
                                ]}
                            >
                                {isSelected(item.id) && <View style={styles.radioInnerCircle} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {!isValid && errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
};

export default ItemListRadio;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        height: 284,
    },
    headerContainer: {
        marginBottom: 12,
    },
    labelText: {
        fontSize: 14,
        color: colors.Black,
    },
    bodyContainer: {
        borderWidth: 0.8,
        borderColor: colors.Gray200,
        borderRadius: 5,
        paddingVertical: 8,
        backgroundColor: colors.White,
    },
    invalidInputWrapper: {
        borderColor: colors.Red,
    },
    itemListContainer: {},
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.Gray700,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        borderColor: colors.Primary,
    },
    radioUnselected: {
        borderColor: colors.Gray200,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.Primary,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
        color: colors.Black,
    },
    errorText: {
        fontSize: 13,
        color: colors.Red,
        marginTop: 5,
        paddingHorizontal: 20,
    },
});