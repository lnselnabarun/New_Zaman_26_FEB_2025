import React, {Component} from 'react';
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
import {Container} from 'native-base';
var Styles = require('../assets/files/Styles');
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
export default class ForgetPassord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_id: '',
      password: '',
      visible: false,
      isSelected: false,
      showPassword: true,
      progress: false,
      isPasswordHidden: false,
      isPasswordHidden1: false,
      passwordString: '',
      passwordString1: '',
      changePWDerror: '',
      changeConfirmPWDerror: '',
      itemList: [
        {a: 'ALPS', b: '102', c: '(ALPS)(102)', d: 'Available Stock: 45'},
        {a: 'ALPS', b: '107', c: '(ALPS)(107)', d: 'Available Stock: 100'},
        {a: 'ALPS', b: '311', c: '(ALPS)(311)', d: 'Available Stock: 134'},
      ],
      // imgSource: arocrmImg,
    };
  }
  componentDidMount() {
    this.setState({
      company_id: '',
    });
  }
  setpasswordString = value => {
    if (value.trim() != '') {
      this.setState({changePWDerror: '', passwordString: value});
    } else {
      this.setState({
        changePWDerror: 'Please enter new password',
        passwordString: value,
      });
    }
  };

  setconfirmpasswordString = value => {
    if (value.trim() != '') {
      this.setState({changeConfirmPWDerror: '', passwordString1: value});
    } else {
      this.setState({
        changeConfirmPWDerror: 'Please enter confirm password',
        passwordString1: value,
      });
    }
  };
  updateSecureText = () => {
    this.setState({isPasswordHidden: !this.state.isPasswordHidden});
  };
  updateSecureText1 = () => {
    this.setState({isPasswordHidden1: !this.state.isPasswordHidden1});
  };
  submitNewPasswordButtonPressed = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (this.state.passwordString.trim() == '') {
      Toast.show('Please enter email', Toast.LONG);
      this.setState({changePWDerror: 'Email can not be blank'});
    } else if (reg.test(this.state.passwordString.trim()) === false) {
      Toast.show('Please enter valid email', Toast.LONG);
      this.setState({changePWDerror: 'Entered email format is wrong'});
    } else {
      var username = await AsyncStorage.getItem('username');

      var logs = {
        email: username,
        newpass: this.state.passwordString,
      };
      var response = await API.post('forget-password', logs);

      console.log('response1: ', response.userdata);
      if (response.status === 'success') {
        Toast.show('Password changed successfully...', Toast.LONG);

        this.props.navigation.navigate('Dashboard', {loveOne: 'son'});
      } else {
        Alert.alert(response.status, response.message);
      }
    }
  };
  render() {
    return (
      <>
        <ImageBackground
          source={require('../../src/assets/images/Zaman_BG1.jpg')}
          style={Styles.login_main}>
          <SafeAreaView style={Styles.dashboard_main_header}>
            <View style={Styles.dashboard_main_headers}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginStart: 10,
                    // marginTop: 20,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    marginTop: 4,
                    tintColor: 'white',
                  }}
                  source={require('../../src/assets/images/back.png')}
                  // resizeMode="contain"dashboard_main_btn
                />
              </TouchableOpacity>
              {/* <TouchableOpacity>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      marginStart: 10,
                      // marginTop: 20,
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                    }}
                    source={require('../../src/assets/images/heart1.png')}
                    // resizeMode="contain"dashboard_main_btn
                  />
                </TouchableOpacity> */}
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
              <Text
                style={{
                  fontSize: 33,
                  alignSelf: 'center',
                  margin: 23,
                  color: '#000',
                }}>
                Forgot Password
              </Text>
            </View>
            <View style={Styles.login_text_input_contain}>
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
                  placeholder="Email Address"
                  placeholderTextColor={'grey'}
                  onChangeText={text => this.setpasswordString(text)}
                  value={this.state.passwordString}
                  style={{
                    flex: 1,
                    paddingTop: 0,
                    fontSize: 16,
                    height: 40,
                    color: 'black',
                    //   borderColor: "#080606",
                    //   paddingLeft: 15,

                    fontWeight: '500',
                  }}
                  keyboardType="default"
                  secureTextEntry={!this.state.isPasswordHidden}
                />
                {/* <TouchableOpacity onPress={()=> this.updateSecureText()}>
                {!this.state.isPasswordHidden ? (
                  <Feather name="eye-off" color="gray" size={20} />
                ) : (
                  <Feather name="eye" color="green" size={20} />
                )}
              </TouchableOpacity> */}
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
                {this.state.changePWDerror}
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  alignSelf: 'center',
                  marginTop: 0,
                  padding: 7,
                }}>
                Please enter your email address and we will send you a link to
                reset the password.
              </Text>

              <Text
                style={{
                  marginTop: 3,
                  color: 'red',
                  fontSize: 11,
                  marginBottom: -5,
                  alignSelf: 'flex-start',
                  marginLeft: 13,
                }}>
                {this.state.changeConfirmPWDerror}
              </Text>

              <TouchableOpacity
                style={{
                  // fontSize: 18,
                  // marginLeft: 50,
                  // marginRight: 50,
                  width: '94%',
                  height: 55,
                  backgroundColor: '#252324',
                  marginTop: 50,
                  color: '#f55656',
                  alignSelf: 'center',
                  marginBottom: 14,
                  borderRadius: 10,
                }}
                onPress={() => this.submitNewPasswordButtonPressed()}>
                <Text style={Styles.login_text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </>
    );
  }
}
