import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Container,
} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
import AsyncStorage from '@react-native-async-storage/async-storage';
const OtpVerify = ({route, navigation}) => {
  const [Mobile, setMobile] = useState('');
  const [LastName, setLastName] = useState();
  const [Otp, setotp] = useState('');
  const setTaskti = text => {
    setotp(text);
  };
  React.useEffect(() => {
    const {mobile} = route.params;
    console.log(mobile);
    setMobile(mobile);
  }, []);
  const Otpverify = async () => {
    console.log(Mobile);
    var logs = {
      phone: Mobile,
      otp: Otp,
    };
    var response = await API.post('user_otp_verification', logs);
    if (response.token != '') {
      if (response.user_type == 0) {
        console.log(response.token);
        await AsyncStorage.setItem('token', String(response.token));
        await AsyncStorage.setItem('user_id', response.user_id);
        await AsyncStorage.setItem('fb_token', '');
        await AsyncStorage.setItem('user_type', response.user_type);
        await AsyncStorage.setItem('sign_up_type', response.sign_up_type);
        var token = await AsyncStorage.getItem('token');
        console.log('token', token);
        navigation.navigate('Dashboard_donation');
      } else {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user_id', response.user_id);
        await AsyncStorage.setItem('fb_token', '');
        await AsyncStorage.setItem('user_type', response.user_type);
        await AsyncStorage.setItem('sign_up_type', response.sign_up_type);
        navigation.navigate('Dashboard');
      }
    } else {
      // Alert.alert(response.status, response.message);
    }
  };

  return (
    <ScrollView>
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
            <Text style={Styles.login_text_font}>Otp Verify</Text>
          </View>
          <View style={Styles.login_text_input_contain}>
            <TextInput
              placeholder="Enter OTP"
              onChangeText={text => setTaskti(text)}
              style={Styles.login_text_input}
              keyboardType="phone-pad"/>
            <TouchableOpacity
              style={Styles.login_btn_forget}
              onPress={() => Otpverify()}>
              <Text style={Styles.login_text}>Verify</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    </ScrollView>
  );
};

export default OtpVerify;
