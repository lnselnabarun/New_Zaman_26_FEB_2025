import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Container,
  // TextInput,
} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
const Register = ({navigation}) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setemail] = useState('');
  const [Mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [Otp, setotp] = useState('');
  const [selectedValue, setselectedValue] = useState('');
  const [isPasswordHidden, setisPasswordHidden] = useState(false);
  const setTaskti = text => {
    setFirstName(text);
  };
  const setTasktipass = text => {
    setLastName(text);
  };
  const setEmail = text => {
    setemail(text);
  };
  const setMobile = text => {
    setmobile(text);
  };
  // const setOtp = text => {
  //   setotp({text});
  // };
  const setpass = text => {
    setpassword(text);
  };

  const registration = async () => {
    var formdata = new FormData();
    console.log(password);
    if (FirstName == '') {
      Alert.alert('First Name', 'Please enter first name');
    } else if (LastName == '') {
      Alert.alert('Last Name', 'Please enter last name');
    } else if (Email == '') {
      Alert.alert('Email', 'Please enter Email');
    } else if (Mobile == '') {
      Alert.alert('Mobile', 'Please enter Mobile');
    } else if (password == '') {
      Alert.alert('Password', 'Please enter password');
    } else if (selectedValue == '') {
      Alert.alert('User', 'Please select user type');
    } else if (
      FirstName != '' &&
      LastName != '' &&
      Email != '' &&
      Mobile != '' &&
      password != ''
    ) {
      var logs = {
        firstname: FirstName,
        lastname: LastName,
        email: Email,
        phone: Mobile,
        password: password,
        usertype: '0',
        device_id: '',
        device_type: 'A',
        usertype: selectedValue,
      };
      // formdata.append('firstname', FirstName);
      // formdata.append('lastname', LastName);
      // formdata.append('email', Email);
      // formdata.append('phone', Mobile);
      // formdata.append('password', password);
      // formdata.append('usertype', Otp);
      var response = await API.post('register', logs);
      if (response.status == 'success') {
        navigation.navigate('OtpVerify', {mobile: Mobile});
      } else {
        Alert.alert(response.status, response.message);
      }
    }
  };
  const updateSecureText = () => {
    setisPasswordHidden(!isPasswordHidden);
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
              style={{width: 90, height: 80, marginStart: 30, marginTop: 20}}
              source={require('../../src/assets/images/heart.png')}
              // resizeMode="contain"
            />
            <Text style={Styles.login_text_font}>Registration</Text>
          </View>
          <View style={Styles.login_text_input_contain}>
            <TextInput
              placeholder="First Name"
              onChangeText={text => setTaskti(text)}
              style={Styles.login_text_input}
              keyboardType="default"
            />
            <TextInput
              placeholder="Last Name"
              onChangeText={text => setTasktipass(text)}
              style={Styles.login_text_input}
              keyboardType="default"
            />
            <TextInput
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              style={Styles.login_text_input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Mobile"
              onChangeText={text => setMobile(text)}
              style={Styles.login_text_input}
              keyboardType="numeric"
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 14,
                borderBottomWidth: 1,
                paddingRight: 10,
                marginStart: 10,
                marginEnd: 10,
              }}>
              <TextInput
                placeholder="password"
                onChangeText={text => setpass(text)}
                style={{
                  flex: 1,
                  paddingTop: 0,
                  fontSize: 16,
                  height: 40,
                  //   borderColor: "#080606",
                  //   paddingLeft: 15,

                  fontWeight: 'bold',
                }}
                keyboardType="default"
                secureTextEntry={!isPasswordHidden}
              />
              <TouchableOpacity onPress={updateSecureText}>
                {!isPasswordHidden ? (
                  <Feather name="eye-off" color="gray" size={20} />
                ) : (
                  <Feather name="eye" color="green" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {/* <TextInput
              placeholder="Otp"
              onChangeText={text => setOtp(text)}
              style={Styles.login_text_input}
              keyboardType="number-pad"
            /> */}
            {/* <TouchableOpacity>
            <Text style={Styles.login_text_forget}>Forget Password?</Text>
          </TouchableOpacity> */}
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 50,
                width: '100%',
                borderColor: '#000',
                alignSelf: 'center',
                borderWidth: 1,
                marginTop: 19,
              }}
              onValueChange={
                (itemValue, itemIndex) => setselectedValue(itemValue)
                // console.log(itemValue)
                // Alert.alert(itemValue)
              }>
              <Picker.Item label="Select one" value="" />
              <Picker.Item label="Donor" value="0" />
              <Picker.Item label="Donee" value="1" />
            </Picker>
            <TouchableOpacity
              style={Styles.login_btn_forget}
              onPress={() => registration()}>
              <Text style={Styles.login_text}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    </ScrollView>
  );
};

export default Register;
