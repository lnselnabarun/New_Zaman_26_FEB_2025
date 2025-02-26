import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {
  Container,
  // TextInput,
} from 'native-base';
var Styles = require('../assets/files/Styles');
import {AuthContext} from '../context';
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import {Picker} from '@react-native-picker/picker';
import AppPreLoader from '../components/AppPreLoader';
const logintype = ({route, navigation}) => {
  const [Email, setemail] = useState('');
  const [googToken, setgoogleToken] = useState('');
  const [selectedValue, setselectedValue] = useState('');
  const [fbToken, setfbToken] = useState('');
  const [isSelect, setisSelect] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [userId, setuserId] = useState('');

  // const contextType = AuthContext;
  useEffect(() => {
    const {user_id} = route.params;
    setuserId(user_id);
  }, []);

  const Login = async (dataval, accessToken) => {
    var logs = {
      user_id: userId,
      usertype: selectedValue,
    };
    var response = await API.post('update_usertype', logs);
    if (response.status == 'success') {
      // navigation.navigate('OtpVerify', {mobile: Mobile});
      console.log(response);
      if (response.userdata[0].user_type == 0) {
        console.log(response.token);
        await AsyncStorage.setItem('token', String(response.token));
        await AsyncStorage.setItem('user_id', response.userdata[0].user_id);
        // await AsyncStorage.setItem('fb_token', response.userdata[0].fb_token);
        await AsyncStorage.setItem('user_type', response.userdata[0].user_type);
        var token = await AsyncStorage.getItem('token');
        console.log('token', token);
        setisloading(true);
        setTimeout(() => {
          navigation.navigate('Dashboard_donation');
          setisloading(false);
          setselectedValue('');
        }, 3000);
      } else {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user_id', response.userdata[0].user_id);
        // await AsyncStorage.setItem('fb_token', response.userdata[0].fb_token);
        await AsyncStorage.setItem('user_type', response.userdata[0].user_type);

        setisloading(true);
        setTimeout(() => {
          navigation.navigate('Dashboard');
          setisloading(false);
          setselectedValue('');
        }, 3000);
      }
    } else {
      Alert.alert(response.status, response.message);
    }
  };

  if (isloading) {
    return <AppPreLoader />;
  }
  return (
    <Container>
      <ImageBackground
        source={require('../../src/assets/images/bg.jpg')}
        style={Styles.login_main}>
        <View style={Styles.login_main_header}></View>
        <View style={Styles.login_text_main}>
          <Image
            style={{width: 90, height: 80, marginStart: 40, marginTop: 20}}
            source={require('../../src/assets/images/heart.png')}
          />
          <Text style={Styles.login_text_font}>Verify</Text>
          <Text style={Styles.login_text_font1}>Sign in to continue</Text>
        </View>
        <View style={Styles.login_text_input_contain}>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 50,
              width: '90%',
              borderColor: '#000',
              alignSelf: 'center',
              borderWidth: 1,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setselectedValue(itemValue)
            }>
            <Picker.Item label="Select one" value="" />
            <Picker.Item label="Donor" value="0" />
            <Picker.Item label="Donee" value="1" />
          </Picker>

          <TouchableOpacity
            style={Styles.login_btn_forget}
            onPress={() => Login()}>
            <Text style={Styles.login_text}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Container>
  );
};

export default logintype;
