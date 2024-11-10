import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors/defaultColors';

interface Label {
    text: string;
    color?: string;
}

interface ItemProps {
    imageNode?: React.ReactNode;
    mainText: string;
    subText: string;
    labels?: Label[];
    buttonHandler?: () => void;
}

const Item: React.FC<ItemProps> = ({ 
    imageNode, 
    mainText, 
    subText, 
    labels,
    buttonHandler,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {imageNode}
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.upperContentContainer}>
                    <View style={styles.mainTextContainer}>
                        <Text style={styles.mainText}>
                            {mainText}
                        </Text>
                    </View>
                    {
                    labels && labels.length > 0 &&
                    <View style={styles.labelsContainer}>
                        {labels.map((label, index) => (
                            
                            <View key={index} style={[styles.labelContainer, label.color ? styles.labelColorContainer : null]}>
                                <Text style={[styles.labelText, label.color ? styles.labelColorText : null]}>
                                    {label.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                    }
                </View>
                <View style={styles.lowerContentContainer}>
                    <View style={styles.subTextContainer}>
                        <Text style={styles.subText}>
                            {subText}
                        </Text>
                    </View>
                </View>
            </View>
            {
            buttonHandler &&
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={buttonHandler}>
                    <Image
                        source={require('../../assets/delete.png')}
                        style={styles.deleteButtonImage}
                    />  
                </TouchableOpacity>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 24,
        height: 52,
    },
    imageContainer: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 0.7,
        justifyContent: 'space-between',
        marginLeft: 16,
        marginVertical: 4,
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
    labelsContainer: {
        flexDirection: 'row',
        marginLeft: 14,
    },
    labelContainer: {
        backgroundColor: colors.Gray100,
        justifyContent: 'flex-start',
        borderRadius: 8,
        paddingTop: 1,
        paddingBottom: 4,
        paddingHorizontal: 8,
        marginLeft: 4,
    },
    labelColorContainer: {
        backgroundColor: '#F6E3CE',
    },
    labelText: {
        fontSize: 12,
        color: colors.Gray500,
    },
    labelColorText: {
        color: '#F06B23',
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