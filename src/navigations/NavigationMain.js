import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from './AuthProvider';

const NavigationMain = () => {
  const {isFirstLaunch} = useContext(AuthContext);
  console.log(isFirstLaunch,"isFirstLaunch")
  return (
    <NavigationContainer>
      {!isFirstLaunch ? <AuthStack /> : <AppStack /> }
    </NavigationContainer>
  );
};
export default NavigationMain;