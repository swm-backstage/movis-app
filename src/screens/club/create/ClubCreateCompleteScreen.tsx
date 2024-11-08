import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../assets/colors/defaultColors';
import ExpandedButton from '../../../components/Button/ExpandedButton';
import { mainNavigations } from '../../../constants/navigations';
import { MainStackParamList } from '../../../navigations/MainStackNavigator';


type ClubCreateCompleteScreenProps = StackScreenProps<
    MainStackParamList,
    typeof mainNavigations.CLUB_CREATE_COMPLETE
>;

function ClubCreateCompleteScreen({ route, navigation }: ClubCreateCompleteScreenProps) {
    const club = route.params.club;

    return (
        <View style={styles.container}>
            <View style={styles.bodyContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/welcom.png')} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.bigText}>{club.name}</Text>
                    <Text style={styles.smallText}>모임을 만들었어요!{'\n'}회원을 추가 해볼까요?</Text>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <ExpandedButton 
                    onPress={() => navigation.replace(mainNavigations.CLUB_DETAIL, { club: club })} 
                    buttonText='회원 추가하기'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.White,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    bodyContainer: {
        alignItems: 'center',
        marginTop: 132,
    },
    imageContainer: {

    },
    icon: {
        width: 100,
        height: 100
    },
    textContainer: {
        marginTop: 32,
    },
    bigText: {
        color: colors.Black,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
    smallText: {
        marginTop: 10,
        textAlign: 'center',
        color: colors.Gray400,
        fontWeight: '700',
        fontSize: 14,
    },
    footerContainer: {

    }
});

export default ClubCreateCompleteScreen;