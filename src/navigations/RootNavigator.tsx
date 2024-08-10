import AuthStackNavigator from './AuthStackNavigator';
import useAuth from '../hooks/useAuth';
import MainStackNavigator from './MainStackNavigator';
import NotificiationTest from '../screens/NotificiationTest';


function RootNavigator() {
  const {isLogin} = useAuth();

  console.log('isLogin:', isLogin);

  //return <><NotificiationTest/></>
  return <>{isLogin ? <MainStackNavigator/> : <AuthStackNavigator/> }</>
}


export default RootNavigator;