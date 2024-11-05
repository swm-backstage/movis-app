import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';


type ItemListButtonButtonProps = {
    onPress: () => void;
    buttonText?: string
};

const ItemListButton: React.FC<ItemListButtonButtonProps> = ({ onPress, buttonText = "Movis" }) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
                {buttonText}
            </Text>
            <Text style={styles.buttonTextPlus}>
                +
            </Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.Gray100,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 18,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        textAlignVertical: 'center',
    },
    buttonTextPlus: {
        fontSize: 22,
        marginLeft: 4,
    },
});

export default ItemListButton;