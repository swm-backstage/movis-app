import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors/defaultColors';


type ExpandedButtonProps = {
    onPress: () => void;
    buttonText?: string
};

const ExpandedButton: React.FC<ExpandedButtonProps> = ({ onPress, buttonText = "Movis" }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.Button}
                onPress={onPress}
            >
                <Text style={styles.ButtonText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    Button: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.Primary,
        paddingVertical: 15,
        borderRadius: 12
    },
    ButtonText: {
        color: colors.White,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ExpandedButton;