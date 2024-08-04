import AuthStackNavigator from './AuthStackNavigator';
import useAuth from '../hooks/useAuth';
import ClubStackNavigator from './ClubStackNavigator';



function RootNavigator() {
  const {isLogin} = useAuth();

  console.log('isLogin:', isLogin);

  return <>{isLogin ?  <ClubStackNavigator/> : <AuthStackNavigator/> }</>
}


export default RootNavigator;