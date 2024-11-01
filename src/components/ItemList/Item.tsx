import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors/defaultColors';


interface ItemProps {
    imageNode?: React.ReactNode;
    mainText: string;
    subText: string;
    labelText?: string;
    itemId?: string;
    buttonHandler?: ((id: string) => void);
}

const Item: React.FC<ItemProps> = ({ 
    imageNode, 
    mainText, 
    subText, 
    labelText, 
    itemId,
    buttonHandler,
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Text>
                    {imageNode}
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.upperContentContainer}>
                    <View style={styles.mainTextContainer}>
                        <Text style={styles.mainText}>
                            {mainText}
                        </Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>
                            {labelText}
                        </Text>
                    </View>
                </View>
                <View style={styles.lowerContentContainer}>
                    <View style={styles.subTextContainer}>
                        <Text style={styles.subText}>
                            {subText}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}>
                    <Image
                        source={require('../../assets/delete.png')}
                        style={styles.deleteButtonImage}
                    />  
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 24,
    },
    imageContainer: {
        flex: 0.15,
        // backgroundColor: 'red',
    },
    contentContainer: {
        flex: 0.7,
        height: 52,
        justifyContent: 'space-between',
    },
    upperContentContainer: {
        flexDirection: 'row',
    },
    mainTextContainer: {
    },
    mainText: {
        fontSize: 16,
        color: colors.Black,
    },
    labelContainer: {
        backgroundColor: colors.Gray100,
        justifyContent: 'flex-start',
        borderRadius: 8,
        marginLeft: 14,
        paddingTop: 1,
        paddingBottom: 4,
        paddingHorizontal: 8,
    },
    labelText: {
        fontSize: 12,
        color: colors.Gray500,
    },
    lowerContentContainer: {

    },
    subTextContainer: {

    },
    subText: {
        fontSize: 14,
        color: colors.Gray300,
    },
    buttonContainer: {
        flex: 0.15,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    deleteButton: {
        borderRadius: 26,
    },
    deleteButtonImage: {
        width: 26,
        height: 26,
    },
});

export default Item;