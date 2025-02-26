import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './AuthProvider';
import LoginScreen from '../screens/Login';
import SplashScreen from '../screens/SplashScreen';
const AuthStacks = createStackNavigator();

export default function AuthStack() {
  const {isFirstLaunch} = useContext(AuthContext);
  return (
    <AuthStacks.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerMode: false,
          }}>
          <AuthStacks.Screen name="splash" component={SplashScreen} />
          <AuthStacks.Screen name="LoginScreen" component={LoginScreen} />

          
        </AuthStacks.Navigator>
  );
}
