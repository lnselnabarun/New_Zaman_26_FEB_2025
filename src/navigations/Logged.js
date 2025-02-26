import React from 'react';
import {Dimensions, Text} from 'react-native';

var {height, width} = Dimensions.get('window');

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import HomeScreen from '../screens/Home';
import StartCampaign from '../screens/StartCampaign';
import Dashboard from '../screens/Dashboard';
import User_profile from '../screens/User_profile';
/**
 * All Stack navigators
 */
const HomeStack = createStackNavigator();

const HomeStack_nav = createStackNavigator();

const HomeStack_option = createStackNavigator();

const HomeStackScreenNav = ({navigation}) => (
  <HomeStack_nav.Navigator initialRouteName="User_profile">
    
    <HomeStack.Screen
      name="User_profile"
      component={User_profile}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="StartCampaign"
      component={StartCampaign}
      options={{
        headerShown: false,
      }}
    />
    {/* <HomeStack_nav.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    /> */}
  </HomeStack_nav.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator screenOptions={{
    headerMode: false,
  }}>
    <RootStack.Screen name="Auth" component={HomeStackScreenNav} />
  </RootStack.Navigator>
);

export default ({userToken}) => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
