import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderTitle from '../../components/HeaderTitle';
import { TextInput } from 'react-native-gesture-handler';
import useAuth from '../../hooks/useAuth';
import { RequestCreateUser, RequestLogin } from '../../api/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import { validate} from '../../utils/validate';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function SignupScreen({ navigation }: AuthHomeScreenProps) {


  const { signupMutation, loginMutation } = useAuth();


  const [checks, setChecks] = useState({
    identifier: false,
    password: false,
    phone: false,
    name: false,
  });

  const [values, setValues] = useState({
    identifier: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: ''
  })
  const [errors, setErrors] = useState({
    identifier: '',
    password: '',
    name: '',
    phone: ''
  });



  const [validationMessage, setValidationMessage] = useState('');

  const checkUsername = () => {
    if (values.identifier === 'test') {
      setValidationMessage('중복된 아이디입니다');
    } else {
      setValidationMessage('사용가능한 아이디입니다');
    }
  };

  const handleChangeText = (key: string, value: string) => {
    const validation = validate(key, value);
    setErrors({
      ...errors,
      [key]: validation.message
    })
    setChecks({
      ...checks,
      [key]: validation.check
    })
    setValues({
      ...values,
      [key]: value
    });
  };

  const handleSubmit = () => {
    const signupBody: RequestCreateUser = {
      identifier: values.identifier,
      password: values.password,
      phoneNo: values.phone,
      name: values.name
    }
    const loginBody: RequestLogin = {
      identifier: values.identifier,
      password: values.password,
    }
    console.log('start')
    if(values.password === values.passwordConfirm){
      signupMutation.mutate(signupBody, {
        onSuccess: () => {
          Alert.alert("회원 가입 완료", "로그인 하시겠습니다?",
            [
              {
                text: "확인",
                onPress: () => loginMutation.mutate(loginBody)
              },
              {
                text: "아니오",
                onPress: () => navigation.navigate('Login'),
                style: "cancel"
              }
            ])
        },
        onError: (error) => {
          console.log(error.response?.data)
        },
      })  
    }
    else{
      Alert.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    }
  }

  return (
    <LinearGradient
      colors={['#0077B6', '#00B894']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.textContainer}>
          <HeaderTitle />
          <Text style={styles.firstContent}>회원가입</Text>
        </View>

        <View>
          <View style={styles.inputWithButtonLargeContainer}>
            <TextInput style={styles.inputWithButton} placeholder='아이디'
              value={values.identifier}
              onChangeText={(text) => handleChangeText('identifier', text)}
            ></TextInput>
            <TouchableOpacity activeOpacity={0.7} style={styles.largeButton} onPress={checkUsername}>
              <Text style={styles.text}>중복확인</Text>
            </TouchableOpacity>
          </View>

          {validationMessage ? <Text style={styles.infoText}>{validationMessage}</Text> : null}
          {errors.identifier ? <Text style={styles.errorText}>{errors.identifier}</Text> : null}


          <View style={[styles.inputContainer, { marginTop: 2.5 }]}>
            <TextInput style={styles.largeInput} placeholder='비밀번호'
              value={values.password}
              onChangeText={(text) => handleChangeText('password', text)}
              secureTextEntry></TextInput>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput style={styles.largeInput} placeholder='비밀번호 확인'
              value={values.passwordConfirm}
              onChangeText={(text) => handleChangeText('passwordConfirm', text)}
              secureTextEntry></TextInput>
          </View>

          <View style={[styles.inputWithButtonLargeContainer, { marginTop: 5 }]}>
            <TextInput style={styles.inputWithButton} placeholder='전화번호'
              value={values.phone}
              onChangeText={(text) => handleChangeText('phone', text)}
            ></TextInput>
            <TouchableOpacity activeOpacity={0.7} style={styles.largeButton}>
              <Text style={styles.text}>인증하기</Text>
            </TouchableOpacity>
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <View style={[styles.inputWithButtonSmallContainer, { marginTop: 2.5, marginBottom: 10, alignSelf: 'flex-end' }]}>
            <TextInput style={styles.smallInput} placeholder="인증코드" />
            <TouchableOpacity activeOpacity={0.7} style={styles.smallButton}>
              <Text style={styles.text}>확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.largeInput} placeholder='이름'
              value={values.name}
              onChangeText={(text) => handleChangeText('name', text)}></TextInput>
          </View>
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        </View>

        <View>
          <Text style={[styles.infoText, { alignSelf: 'flex-end' }]}>비밀번호를 잊으셨나요?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
            <Text style={styles.signupText}>회원 가입</Text>
          </TouchableOpacity>
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
  inputWithButtonLargeContainer: {
    backgroundColor: '#fff',
    borderColor: '#818181',
    borderRadius: 5,
    flexDirection: 'row',
    width: 300,
    alignItems: 'center',
    marginBottom: 2.5
  },
  inputWithButtonSmallContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    borderColor: '#818181',
    borderRadius: 5,
    marginBottom: 2.5,
    width: 185,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderColor: '#818181',
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
    marginBottom: 5
  },
  inputWithButton: {
    borderRadius: 5,
    width: 210,
    height: 39,
    paddingHorizontal: 15,
    color: '#000'
  },
  largeInput: {
    borderRadius: 5,
    width: 300,
    height: 39,
    paddingHorizontal: 15,
    color: '#000'
  },
  smallInput: {
    borderRadius: 5,
    width: 120,
    height: 39,
    paddingHorizontal: 15,
  },
  largeButton: {
    margin: 6,
    backgroundColor: '#00B894',
    borderRadius: 5,
    width: 72,
    height: 29,
  },
  smallButton: {
    margin: 5,
    backgroundColor: '#00B894',
    borderRadius: 5,
    width: 46,
    height: 29,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  signupButton: {
    width: 300,
    height: 39,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#000'
  }

});

export default SignupScreen;