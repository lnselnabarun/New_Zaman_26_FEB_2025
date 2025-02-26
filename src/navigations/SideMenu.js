import PropTypes from 'prop-types';
import React, {Component, useEffect, useState} from 'react';
import API from '../services/api';
var Styles = require('../assets/files/Styles');

// var styles = require('../../src/assets/files/Styles');
import {NavigationActions, NavigationEvents} from 'react-navigation';
//android:roundIcon="@mipmap/ic_launcher_round"
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const CustomSidebarMenu = props => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.clear();
    console.log('props.navigation.navigate: ');
    navigation.navigate('LoginScreen');
    //props.navigation.goBack(null)
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles1.logoView}>
        <Image
          source={require('../../src/assets/images/zaman_logo.jpg')}
          style={styles1.logo}
        />
      </View>
      <View
        style={{
          borderTopColor: 'grey',
          borderTopWidth: 1,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          alignContent: 'center',
          alignItems: 'center',
          marginRight: '5%',
          marginBottom: 15,
          height: 40,
        }}>
        <TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginTop: 9,
              fontSize: 15,
            }}>
            Arras Furnishings LLP
          </Text>
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerView.Items {...props} labelStyle={{ fontSize: 18 }} /> */}

        <DrawerItem
          icon={({focused, color, size}) => (
            <Image
              source={require('../../src/assets/images/review-icon.png')}
              style={{height: size, width: size, tintColor: 'black'}}
              resizeMode="contain"
            />
          )}
          label="Review Stock"
          labelStyle={{fontSize: 16}}
          onPress={() =>navigation.navigate('StockSearch')}
        />

        <DrawerItem
          icon={({focused, color, size}) => (
            <Image
              source={require('../../src/assets/images/create-order-icon.png')}
              style={{height: size, width: size, tintColor: 'black'}}
              resizeMode="contain"
            />
          )}
          label="Create Order"
          labelStyle={{fontSize: 16}}
          onPress={() =>navigation.navigate('CreateOrder')}
        />

        <DrawerItem
          icon={({focused, color, size}) => (
            <Image
              source={require('../../src/assets/images/my-cart-icon.png')}
              style={{height: size, width: size, tintColor: 'black'}}
              resizeMode="contain"
            />
          )}
          label="My Cart"
          onPress={() =>navigation.navigate('MyCart')}
          labelStyle={{fontSize: 16}}
        />

        {/* onPress={() => navigation.navigate('MyCart')} */}

        <DrawerItem
          icon={({focused, color, size}) => (
            <Image
              source={require('../../src/assets/images/profile-icon.png')}
              style={{height: size, width: size, tintColor: 'black'}}
              resizeMode="contain"
            />
          )}
          label="My Proile"
          labelStyle={{fontSize: 16}}
          onPress={() =>navigation.navigate('MyProfile')}
        />

        <DrawerItem
          icon={({focused, color, size}) => (
            <Image
              source={require('../../src/assets/images/password-icon.png')}
              style={{height: size, width: size, tintColor: 'black'}}
              resizeMode="contain"
            />
          )}
          label="Change Password"
          labelStyle={{fontSize: 16}}
          onPress={() =>navigation.navigate('ForgetPassScreen')}
        />

        <DrawerItem
          icon={({focused, color, size}) => (
            <Image
              source={require('../../src/assets/images/logout-icon.png')}
              style={{height: size, width: size, tintColor: 'black'}}
              resizeMode="contain"
            />
          )}
          label="Logout"
          labelStyle={{fontSize: 16}}
          onPress={() =>
            Alert.alert(
              'Confirm',
              'Are you sure you want to logout?', // <- this part is optional, you can pass an empty string
              [
                {text: 'OK', onPress: () => logout()},
                {text: 'Cancel', onPress: () => console.log('cancelled')},
              ],
              {cancelable: false},
            )
          }
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
{
  /* <DrawerItem  icon={({ focused, color, size }) => (
  <Image
  source={require('../../src/assets/images/user.png')}
    style={{ height: size, width: size, tintColor: 'black' }}
    resizeMode="contain"
  />
)} label="Review Stock" onPress={() =>  props.navigation.navigate('StockSearch')} /> */
}
const styles1 = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    // borderRadius: 100 / 2,
    alignSelf: 'center',
    //  backgroundColor: 'transparent',
    // tintColor: '#252324',
    resizeMode: 'contain',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: '54%',
    resizeMode: 'contain',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '20%',
    right: '20%',
    borderRadius: 5,
  },
  logoView: {
    alignContent: 'center',
    justifyContent: 'center',
    height: '25%',
    marginTop: 0,
    borderRadius: 5,
  },
});

export default CustomSidebarMenu;
