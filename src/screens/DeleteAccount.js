import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var Styles = require('../assets/files/Styles');

const DeleteAccount = () => {
  const navigation = useNavigation();
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [progress, setProgress] = useState(false);
  const [nameOfClient, setNameOfClient] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [GST, setGST] = useState('');
  const [username, setUsername] = useState('');
  const [courierNo, setCourierNo] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const storedNameOfClient = await AsyncStorage.getItem('NameofClient');
      const storedAddress = await AsyncStorage.getItem('Address');
      const storedContactNo = await AsyncStorage.getItem('ContactNo');
      const storedGST = await AsyncStorage.getItem('GST');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedCourierNo = await AsyncStorage.getItem('CourierNo');

      setNameOfClient(storedNameOfClient);
      setAddress(storedAddress);
      setContactNo(storedContactNo);
      setGST(storedGST);
      setUsername(storedUsername);
      setCourierNo(storedCourierNo);
    };
    loadData();
  }, []);

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar animated={true} backgroundColor="grey" />
      <ImageBackground
        source={require('../../src/assets/images/Zaman_BG1.jpg')}
        style={Styles.login_main}>
        <SafeAreaView
          style={{
            ...Styles.dashboard_main_header,
            justifyContent: 'space-between',
          }}>
          <View style={Styles.dashboard_main_headers}>
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
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
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                marginLeft: 23,
                marginTop: 6,
                fontWeight: '800',
              }}>
              Delete Account
            </Text>
          </View>
          <TouchableOpacity></TouchableOpacity>
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
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              margin: 15,
              padding: 10,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 20,
            }}>
            <Text
              style={{...styles.label, fontWeight: '800', marginBottom: 30}}>
              Are you sure you want to delete your account?
            </Text>
            <Text
              style={{...styles.label, fontWeight: '400', marginBottom: 20}}>
              This action is permanent and cannot be undone. All your data,
              including your profile, settings, and any associated content, will
              be permanently removed with in 7 working day.
            </Text>
            <Text
              style={{...styles.label, fontWeight: '400', marginBottom: 20}}>
              If you wish to proceed, E-Mail Us your Email ID
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack(null)}
                style={{
                  backgroundColor: '#cfcccc',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{...styles.label, fontWeight: '400', color: '#000'}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'mailto:info@orchidlifestyle.com?subject=Delete Account Permanently&body=I am writing to request the deletion of my account associated with the email address. Please confirm once the account has been successfully deleted.',
                  )
                }
                style={{
                  backgroundColor: '#f74040',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{...styles.label, fontWeight: '400', color: '#fff'}}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    //   position: 'absolute',
  },
  login_text_input: {
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: '#dcdedc',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    color: 'black',
    paddingTop: 3,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
    // resizeMode:'cover'
  },
  textInput: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'transparent',
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    color: '#000',
  },
  loginView: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
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
  },
  logo: {
    height: 120,
    width: '60%',
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
    height: '35%',
    marginTop: -23,
    borderRadius: 5,
  },
  loginButton: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff6600',
    borderRadius: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  checboxkView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    width: '80%',
    marginLeft: '4%',
    marginRight: '10%',
  },

  checkbox: {
    alignSelf: 'center',
    height: 22,
    width: 22,
  },
  label: {
    color: '#000',
    textAlign: 'center',
  },
  submitButton: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  progressBar: {
    flex: 1,
    alignSelf: 'center',
    height: 80,
    position: 'absolute',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  btnRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 0,
  },
});
export default DeleteAccount;
