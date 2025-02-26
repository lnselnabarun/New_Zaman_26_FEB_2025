import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../navigations/AuthProvider';

const Login = () => {
  const {Loginn} = useContext(AuthContext);
  const navigation = useNavigation();
  const [empId, setEmpId] = useState('');
  const [passwordString, setPasswordString] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [progress, setProgress] = useState(false);

  const updateSecureText = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const onPressLoginHandler = async () => {
    Keyboard.dismiss();
    await login();
  };

  const login = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (empId.trim() === '' && passwordString.trim() === '') {
      Toast.show('Email and Password fields should not be empty', Toast.LONG);
      setUsernameError('Please enter a valid Email');
      setPasswordError('Please enter a valid Password');
    } else if (empId.trim() === '') {
      Toast.show('Email field should not be empty', Toast.LONG);
      setUsernameError('Please enter a valid Email');
    } else if (passwordString.trim() === '') {
      Toast.show('Password field should not be empty', Toast.LONG);
      setPasswordError('Please enter a valid Password');
    } else if (reg.test(empId.trim()) === false) {
      Toast.show('Entered Email is incorrect', Toast.LONG);
      setUsernameError('Please enter a valid Email');
    } else {
      setProgress(true);
    
      var logs = {
        username: empId.trim(),
        password: passwordString,
      };
      var response = await API.post('user_login.php', logs);
      setProgress(false);
      console.log(response,logs,"Login resp")
      if (response.status === 'success') {
        // Toast.show('Logged In Successfully! wait a moment...', Toast.LONG);
        await AsyncStorage.setItem('status', 'true');
        await AsyncStorage.setItem(
          'userdata',
          JSON.stringify(response.userdata),
        );
        await AsyncStorage.setItem(
          'NameofClient',
          response.userdata.NameofClient,
        );
        await AsyncStorage.setItem('Address', response.userdata.Address);
        await AsyncStorage.setItem('ContactNo', response.userdata.ContactNo);
        await AsyncStorage.setItem('GST', response.userdata.GST);
        await AsyncStorage.setItem('username', response.userdata.username);
        await AsyncStorage.setItem('CourierNo', response.userdata.CourierNo);
        await AsyncStorage.setItem('IsLogin', 'true');
        // navigation.navigate('Dashboardss', {loveOne: 'son'});
       await Loginn();
        // navigation.navigate('ForgetPass')
      } else {
        console.log(response);
        Alert.alert(response.status, response.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="grey" />
      <ImageBackground
        source={require('../../src/assets/images/Zaman_BG1.jpg')}
        style={styles.backgroundImage}>
        <View style={{marginTop: 50}}>
          <View style={styles.loginForm}>
            <View style={styles.logoView}>
              <Image
                source={require('../../src/assets/images/zaman_logo.jpg')}
                style={styles.logo}
              />
            </View>
            <View style={styles.centerAlign}>
              <TouchableOpacity>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginView}>
              <View style={styles.inputRow}>
                <Feather name="user" color="gray" size={30} />
                <TextInput
                  autoCapitalize="none"
                  style={styles.textInput}
                  onChangeText={text => setEmpId(text)}
                  value={empId}
                  placeholder="Email ID"
                  placeholderTextColor={'grey'}
                />
              </View>
              <Text style={styles.errorHint}>{usernameError}</Text>
              <View style={[styles.inputRow, {marginTop: 28}]}>
                <Feather name="key" color="gray" size={30} />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={'grey'}
                  onChangeText={text => setPasswordString(text)}
                  value={passwordString}
                  style={styles.textInput}
                  secureTextEntry={isPasswordHidden}
                />
                <TouchableOpacity onPress={updateSecureText}>
                  {!isPasswordHidden ? (
                    <Feather name="eye-off" color="gray" size={25} />
                  ) : (
                    <Feather name="eye" color="green" size={25} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.errorHint}>{passwordError}</Text>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity>
                <Text style={{color: '#000'}}>{/* Forgot Password ? */}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.centerAlign}>
              <TouchableOpacity
                onPress={onPressLoginHandler}
                style={styles.btnRow}>
                <Text style={styles.btnText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 0,
    fontSize: 16,
    height: 40,
    borderBottomWidth: 1,
    color: 'black',
    fontWeight: '500',
  },
  loginView: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderColor: '#fff',
  },
  loginForm: {
    backgroundColor: '#fff',
    height: '84%',
    minHeight: 400,
    borderRadius: 25,
    padding: '5%',
    margin: '5%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
  },
  logo: {
    height: 120,
    width: '60%',
    resizeMode: 'contain',
    position: 'absolute',
    left: '20%',
    right: '20%',
    borderRadius: 5,
  },
  logoView: {
    justifyContent: 'center',
    height: '35%',
    marginTop: -23,
    borderRadius: 5,
  },
  centerAlign: {
    alignItems: 'center',
    marginTop: -10,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
  },
  inputRow: {
    flexDirection: 'row',
    paddingRight: 10,
    marginHorizontal: 13,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginRight: '5%',
  },
  btnRow: {
    marginTop: 20,
    backgroundColor: '#000',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorHint: {
    marginTop: 3,
    color: 'red',
    fontSize: 11,
    marginBottom: -5,
    alignSelf: 'flex-start',
    marginLeft: 43,
  },
});

export default Login;
