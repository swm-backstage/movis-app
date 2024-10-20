import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import useAuth from '../../hooks/useAuth';
import { RequestLogin } from '../../api/auth';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function LoginScreen({ navigation }: AuthHomeScreenProps) {

  const passwordInputRef = useRef<TextInput>(null);
  const { loginMutation, isLogin } = useAuth();

  const [values, setValues] = useState({
    identifier: '',
    password: ''
  })

  const handleSubmit = () => {
    const body: RequestLogin = {
      identifier: values.identifier,
      password: values.password,
    }
    loginMutation.mutate(body, {
      onError: (error) => {
        Alert.alert(
          '로그인 실패',
          error?.response?.data?.message || '아이디 또는 비밀번호가 일치하지 않습니다.',
          [{ text: '확인' }])
      }
    });

  }

  const handleChangeText = (name: string, text: string) => {
    setValues({
      ...values,
      [name]: text,
    })
  }


  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/loginLogo.png')} style={styles.logoImage} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        placeholderTextColor="#c7c7c7"
        value={values.identifier}
        onChangeText={(text) => handleChangeText('identifier', text)}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        placeholderTextColor="#c7c7c7"
        value={values.password}
        onChangeText={(text) => handleChangeText('password', text)}
        secureTextEntry
        ref={passwordInputRef}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      {/* <View style={styles.inputContainer}>
        <Input style={styles.input} placeholder='아이디'
          value={values.identifier}
          onChangeText={(text) => handleChangeText('identifier', text)}></Input>

        <Input style={styles.input} placeholder='비밀번호'
          value={values.password}
          onChangeText={(text) => handleChangeText('password', text)}
          secureTextEntry></Input>
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateId')}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity> */}
      </View>

      {/* <View style={styles.buttonContainer}>
        <Button style={styles.greenButton} activeStyle={{ backgroundColor: '#B799FF' }} onPress={() => handleSubmit()}>
          <Text style={styles.textColorWhite}>로그인</Text>
        </Button>

        <Button style={styles.grayButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textColorBlack}>회원가입</Text>
        </Button>

      </View> */}
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

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center'
  },
  buttonContainer: {
    gap: 20,
    width: '100%',
    height: 60,
    fontSize: 20,
  },
  logoImage: {
    marginBottom: 50,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4B4B4B',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5E3AE2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 20,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    justifyContent: 'center',
    width: '80%',
  },
  linkText: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default LoginScreen;