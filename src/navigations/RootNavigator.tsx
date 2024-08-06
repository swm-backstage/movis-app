import AuthStackNavigator from './AuthStackNavigator';
import useAuth from '../hooks/useAuth';
import MainStackNavigator from './MainStackNavigator';


function RootNavigator() {
  const {isLogin} = useAuth();

  console.log('isLogin:', isLogin);

  return <>{isLogin ? <MainStackNavigator/> : <AuthStackNavigator/> }</>
}


export default RootNavigator;