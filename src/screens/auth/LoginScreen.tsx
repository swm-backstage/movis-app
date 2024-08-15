import { Button } from '@ant-design/react-native';
import Input from '@ant-design/react-native/lib/input-item/Input';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import HeaderTitle from '../../components/HeaderTitle';
import useAuth from '../../hooks/useAuth';
import { RequestLogin } from '../../api/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function LoginScreen({navigation} : AuthHomeScreenProps) {

  const {loginMutation}=useAuth();

  const [values,setValues] = useState({
    identifier: '',
    password: ''
  })

  const handleSubmit = ()=>{
    const body: RequestLogin={
      identifier: values.identifier, 
      password: values.password,
    }
    console.log('login.values', values.identifier,values.password)
    loginMutation.mutate(body);
  }

  const handleChangeText=(name: string, text:string)=>{
    setValues({
      ...values,
      [name]: text,
    })
  }


  return (
    <LinearGradient
      colors={['#9369E0', '#D9CCFF']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <HeaderTitle/>
          <Text style={styles.endTitle}>더 나은 경험을 위한 로그인</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input style={styles.input} placeholder='아이디' 
          value={values.identifier} 
          onChangeText={(text)=>handleChangeText('identifier',text)}></Input>

          <Input style={styles.input} placeholder='비밀번호' 
          value={values.password} 
          onChangeText={(text)=>handleChangeText('password',text)}
          secureTextEntry></Input>
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.greenButton} activeStyle={{backgroundColor:'#B799FF'}} onPress={()=>handleSubmit()}>
            <Text style={styles.textColorWhite}>로그인</Text>
          </Button>

          <Button style={styles.grayButton} onPress={() =>navigation.navigate('Signup')}>
            <Text style={styles.textColorBlack}>회원가입</Text>
          </Button>
          
        </View>
        {/* <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.text}>또는</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.grayButton} onPress={()=> navigation.navigate('Guest')}>
            <Text style={styles.textColorBlack}>게스트 로그인</Text>
          </Button>
        </View> */}

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
  buttonContainer: {
    gap: 20,
    width: 300,
    height: 60,
    fontSize: 20,
  },
  inputContainer: {
    gap: 20,
    width: 300,
  },
  lineContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 29,
    marginBottom: -10,
    marginVertical: 20,
  },
  endTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 131,
    marginBottom: -10
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#818181',
    borderRadius: 5,
    height:39,
    paddingHorizontal: 15,
    color: '#000'
  },
  greenButton: {
    backgroundColor: '#9966FF',
    borderRadius: 5,
    borderColor: '#9966FF',
    borderWidth: 0,
  },
  grayButton:{
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    borderColor: '#E8E8E8'
  },
  textColorWhite: {
    fontSize: 16,
    color: '#FFF'
  },
  textColorBlack: {
    fontSize: 16,
    color: '#000'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C6C6C6',
  },
  text: {
    marginHorizontal: 10,
    color: '#C6C6C6',
    fontSize: 16,
  },
});

export default LoginScreen;