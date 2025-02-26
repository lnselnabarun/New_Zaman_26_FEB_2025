/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import ForgetPass from '../screens/ForgetPass';
import ForgetPassord from '../screens/ForgetPassord';
import SplashScreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import MyProfile from '../screens/MyProfile';
import StockSearch from '../screens/StockSearch';
import CreateOrder from '../screens/CreateOrder';
import MyCart from '../screens/MyCart';
import OrderPlacement from '../screens/OrderPlacement';
import CollectionAndSKUFilter from '../screens/CollectionAndSKUFilter';
import {navigationRef} from './Route';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from './SideMenu';
import DeleteAccount from '../screens/DeleteAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './AuthProvider';
const AuthStack = createStackNavigator();
const DrawerCamp = createDrawerNavigator();
const HomeStack_nav = createStackNavigator();

// const AuthStackScreen = () => {
//   const {isFirstLaunch} = useContext(AuthContext);
//   return (
//     <NavigationContainer>
//       {!isFirstLaunch ? (
//         <AuthStack.Navigator
//           initialRouteName="splash"
//           screenOptions={{
//             headerMode: false,
//           }}>
//           <AuthStack.Screen name="splash" component={SplashScreen} />
//           <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
//           <AuthStack.Screen name="ForgetPass" component={ForgetPass} />
//           {/* <AuthStack.Screen name="ForgetPassord" component={ForgetPassord} /> */}
//           {/* <AuthStack.Screen name="Dashboards" component={DrawerScreencamp} /> */}

//           <AuthStack.Screen name="Dashboardss" component={Dashboard} />
//           <AuthStack.Screen name="MyProfile" component={MyProfile} />
//           <AuthStack.Screen name="StockSearch" component={StockSearch} />
//           <AuthStack.Screen name="CreateOrder" component={CreateOrder} />
//           <AuthStack.Screen name="MyCart" component={MyCart} />
//           <AuthStack.Screen name="OrderPlacement" component={OrderPlacement} />
//           <AuthStack.Screen
//             name="CollectionAndSKUFilter"
//             component={CollectionAndSKUFilter}
//           />
//           <AuthStack.Screen name="DeleteAccount" component={DeleteAccount} />
//         </AuthStack.Navigator>
//       ) : (
//         <AuthStack.Navigator
//           initialRouteName="Dashboardss"
//           screenOptions={{
//             headerMode: false,
//           }}>
//           <AuthStack.Screen name="Dashboardss" component={Dashboard} />
//           <AuthStack.Screen name="MyProfile" component={MyProfile} />
//           <AuthStack.Screen name="StockSearch" component={StockSearch} />
//           <AuthStack.Screen name="CreateOrder" component={CreateOrder} />
//           <AuthStack.Screen name="MyCart" component={MyCart} />
//           <AuthStack.Screen name="OrderPlacement" component={OrderPlacement} />
//           <AuthStack.Screen
//             name="CollectionAndSKUFilter"
//             component={CollectionAndSKUFilter}
//           />
//           <AuthStack.Screen name="DeleteAccount" component={DeleteAccount} />
//         </AuthStack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// };

// export default AuthStackScreen;

export default function AuthStackScreen() {
  const {isFirstLaunch} = useContext(AuthContext);
  console.log(isFirstLaunch, 'isFirstLaunch');
  return (
    <NavigationContainer>
      {!isFirstLaunch ? (
        <AuthStack.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerMode: false,
          }}>
          <AuthStack.Screen name="splash" component={SplashScreen} />
          <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
          <AuthStack.Screen name="ForgetPass" component={ForgetPass} />

          
        </AuthStack.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Dashboardss"
          screenOptions={{
            headerMode: false,
          }}>
          <AuthStack.Screen name="Dashboardss" component={Dashboard} />
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
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
