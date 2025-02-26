import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { AuthContext } from './AuthProvider';
import ForgetPass from '../screens/ForgetPass';
import Dashboard from '../screens/Dashboard';
import MyProfile from '../screens/MyProfile';
import StockSearch from '../screens/StockSearch';
import CreateOrder from '../screens/CreateOrder';
import MyCart from '../screens/MyCart';
import OrderPlacement from '../screens/OrderPlacement';
import DeleteAccount from '../screens/DeleteAccount';
import {createStackNavigator} from '@react-navigation/stack';
import CollectionAndSKUFilter from '../screens/CollectionAndSKUFilter';
const AuthStack = createStackNavigator();

export default function AppStack() {
  const {isFirstLaunch} = useContext(AuthContext);
  return (
    <AuthStack.Navigator
    screenOptions={{
      headerMode: false,
    }}>
    <AuthStack.Screen name="Dashboard" component={Dashboard} />
    <AuthStack.Screen name="MyProfile" component={MyProfile} />
    <AuthStack.Screen name="StockSearch" component={StockSearch} />
    <AuthStack.Screen name="CreateOrder" component={CreateOrder} />
    <AuthStack.Screen name="MyCart" component={MyCart} />
    <AuthStack.Screen name="OrderPlacement" component={OrderPlacement} />
    <AuthStack.Screen
      name="CollectionAndSKUFilter"
      component={CollectionAndSKUFilter}
    />
    <AuthStack.Screen name="DeleteAccount" component={DeleteAccount} />
    <AuthStack.Screen name="ForgetPass" component={ForgetPass} />
  </AuthStack.Navigator>
  );
}