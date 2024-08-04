import { Button } from '@ant-design/react-native';
import Input from '@ant-design/react-native/lib/input-item/Input';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderTitle from '../../components/HeaderTitle';

interface GusetLoginScreenProps {

}

function GusetLoginScreen({ }: GusetLoginScreenProps) {
    return (
        <LinearGradient
            colors={['#0077B6', '#00B894']}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    <HeaderTitle/>
                    <Text style={styles.firstContent}>게스트 로그인</Text>
                    <Text style={styles.secondContent}>게스트는 초대받은 모임만 접근 가능합니다.</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input style={styles.input} placeholder='초대코드'></Input>
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.greenButton} activeStyle={{ backgroundColor: '#66CDAA' }}>
                        <Text style={styles.textColorWhite}>로그인</Text>
                    </Button>
                </View>

            </SafeAreaView>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        margin: 40,
        alignItems: 'center',
        gap: 40,

    },
    textContainer: {
        alignItems: 'center',
    },
    firstContent: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 131,
        marginBottom: -10
    },
    secondContent: {
        fontSize: 16,
        color: '#fff',
        marginTop: 13,
        fontWeight: 'regular',
    },
    inputContainer: {
        gap: 20,
        width: 300,
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#818181',
        borderRadius: 5,
        paddingHorizontal: 15,
        height:39
    },
    buttonContainer: {
        gap: 20,
        width: 300,
        height: 60,
        fontSize: 20,
    },
    greenButton: {
        backgroundColor: '#00B894',
        borderRadius: 5,
        borderColor: '#00B894'
    },
    textColorWhite: {
        fontSize: 16,
        color: '#FFF'
    },
});

export default GusetLoginScreen;