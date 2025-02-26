import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Container} from 'native-base';
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const ForgetPass = () => {
  const navigation = useNavigation();
  const [passwordString, setPasswordString] = useState('');
  const [passwordString1, setPasswordString1] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordHidden1, setIsPasswordHidden1] = useState(true);
  const [changePWDerror, setChangePWDerror] = useState('');
  const [changeConfirmPWDerror, setChangeConfirmPWDerror] = useState('');

  const updateSecureText = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const updateSecureText1 = () => {
    setIsPasswordHidden1(!isPasswordHidden1);
  };

  const setpasswordString = value => {
    if (value.trim() !== '') {
      setChangePWDerror('');
      setPasswordString(value);
    } else {
      setChangePWDerror('Please enter new password');
      setPasswordString(value);
    }
  };

  const setconfirmpasswordString = value => {
    if (value.trim() !== '') {
      setChangeConfirmPWDerror('');
      setPasswordString1(value);
    } else {
      setChangeConfirmPWDerror('Please enter confirm password');
      setPasswordString1(value);
    }
  };

  const submitNewPasswordButtonPressed = async () => {
    if (passwordString.trim() === '') {
      Toast.show('Please enter new password', Toast.LONG);
      setChangePWDerror('Please enter new password');
    } else if (passwordString1.trim() === '') {
      Toast.show('Please enter confirm password', Toast.LONG);
      setChangeConfirmPWDerror('Please enter confirm password');
    } else if (passwordString.trim() !== passwordString1.trim()) {
      Toast.show('New password and Confirm password did not match', Toast.LONG);
    } else {
      const username = await AsyncStorage.getItem('username');
      const logs = {
        email: username,
        newpass: passwordString,
      };
      const response = await API.post('change_pass.php', logs);
      console.log(response, 'ggggggggg');
      if (response.status === 'success') {
        Toast.show('Password changed successfully...', Toast.LONG);
        navigation.navigate('Dashboards', {loveOne: 'son'});
      } else {
        Alert.alert(response.status, response.message);
      }
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../src/assets/images/Zaman_BG1.jpg')}
        style={{flex: 1, flexDirection: 'column'}}>
        <SafeAreaView
          style={{
            backgroundColor: '#252324',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#252324',
              // height: 60,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginStart: 10,
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                  marginTop: 4,
                  tintColor: 'white',
                }}
                source={require('../../src/assets/images/back.png')}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 120, height: 120, marginTop: 20}}
              source={require('../../src/assets/images/zaman_logo.jpg')}
            />
            <Text style={{fontSize: 33, alignSelf: 'center', margin: 23, color:"#000"}}>
              Change Password
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              height: 300,
              borderRadius: 25,
              padding: '5%',
              margin: '5%',
              alignContent: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#000',
              borderBottomWidth: 0,
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.9,
              shadowRadius: 20,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 14,
                borderBottomWidth: 1,
                paddingRight: 10,
                marginStart: 13,
                marginEnd: 13,
              }}>
              <TextInput
                placeholder="New Password"
                placeholderTextColor={'grey'}
                onChangeText={setpasswordString}
                value={passwordString}
                style={{
                  flex: 1,
                  paddingTop: 0,
                  fontSize: 16,
                  height: 40,
                  color: 'black',
                  fontWeight: '500',
                }}
                keyboardType="default"
                secureTextEntry={isPasswordHidden}
              />
              <TouchableOpacity onPress={updateSecureText}>
                {isPasswordHidden ? (
                  <Feather name="eye-off" color="gray" size={20} />
                ) : (
                  <Feather name="eye" color="green" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginTop: 3,
                color: 'red',
                fontSize: 11,
                marginBottom: -5,
                alignSelf: 'flex-start',
                marginLeft: 13,
              }}>
              {changePWDerror}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 14,
                borderBottomWidth: 1,
                paddingRight: 10,
                marginStart: 13,
                marginEnd: 13,
              }}>
              <TextInput
                placeholder="Confirm New Password"
                placeholderTextColor={'grey'}
                onChangeText={setconfirmpasswordString}
                value={passwordString1}
                style={{
                  flex: 1,
                  paddingTop: 0,
                  fontSize: 16,
                  height: 40,
                  color: 'black',
                  fontWeight: '500',
                }}
                keyboardType="default"
                secureTextEntry={isPasswordHidden1}
              />
              <TouchableOpacity onPress={updateSecureText1}>
                {isPasswordHidden1 ? (
                  <Feather name="eye-off" color="gray" size={20} />
                ) : (
                  <Feather name="eye" color="green" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginTop: 3,
                color: 'red',
                fontSize: 11,
                marginBottom: -5,
                alignSelf: 'flex-start',
                marginLeft: 13,
              }}>
              {changeConfirmPWDerror}
            </Text>

            <TouchableOpacity
              style={{
                width: '94%',
                height: 55,
                backgroundColor: '#252324',
                marginTop: 50,
                color: '#f55656',
                alignSelf: 'center',
                marginBottom: 14,
                borderRadius: 10,
              }}
              onPress={() => submitNewPasswordButtonPressed()}>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingTop: 14,
                  color: '#ffff',
                  fontWeight: '500',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ForgetPass;
