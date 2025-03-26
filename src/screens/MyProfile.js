import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var Styles = require('../assets/files/Styles');

const MyProfile = () => {
  const navigation = useNavigation()
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
  const [selectedCompanyName, setSelectedCompanyName] = useState('Selected Company');
  const [companyId, setCompanyId] = useState('');
  const [imgSource, setImgSource] = useState(null);

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

  const formSubmit = () => {
    if (!empId) {
      Alert.alert('Please Enter Username');
    } else if (!password) {
      Alert.alert('Please Enter Password');
    } else if (selectedCompanyName === 'Selected Company' || !companyId) {
      Alert.alert('Please Select Company');
    } else {
      customLoginClick();
    }
  };

  const toggleSwitch = () => {
    setShowPassword(!showPassword);
  };

  const customLoginClick = () => {
    setProgress(true);
    const url = UrlUtil.BASE_URL + companyId + '/auth/login';

    fetch(url, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        username: empId,
        password: password,
        deviceid: this.state.FCMToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        let resultJSON = JSON.stringify(json);

        if (json.message === 'Login Successful !!') {
          setProgress(false);
          AsyncStorage.setItem('Profile', JSON.stringify(json.data));
          navigation.navigate('HomeScreen_Page', {
            selectedCompanyID: companyId,
            deviceid: this.state.FCMToken,
          });
        } else {
          setProgress(false);
          Alert.alert('Alert', json.message, [
            { text: 'OK', onPress: () => setProgress(false) },
          ]);
        }
      })
      .catch((err) => {
        setProgress(false);
        Alert.alert('Error', 'Please check your network connection', [
          { text: 'OK', onPress: () => setProgress(false) },
        ]);
      });
  };

  const selectCompany = (index) => {
    const selectedCompany = Company_Name_Array[index];
    setSelectedCompanyName(selectedCompany.title);
    setCompanyId(selectedCompany.id);
    setImgSource(selectedCompany.img);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StatusBar animated={true} backgroundColor="grey" />
      <ImageBackground source={require('../../src/assets/images/Zaman_BG1.jpg')} style={Styles.login_main}>
        <View style={{...Styles.dashboard_main_header, justifyContent:"space-between"}}>
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
            <Text style={{ fontSize: 19, color: 'white', marginLeft: 23, marginTop: 6, fontWeight: '800' }}>
              Profile
            </Text>
          </View>
          <TouchableOpacity style={{paddingLeft:20}} onPress={() => navigation.navigate('DeleteAccount')}>
             <MaterialCommunityIcons name ="delete-alert" color="#f74040" size={30} />
            </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignSelf: 'center', alignItems: 'center' }}>
            <Image style={{ width: 120, height: 120, marginTop: 20 }} source={require('../../src/assets/images/zaman_logo.jpg')} />
          </View>
          <View style={{backgroundColor:"#fff", margin:15, padding:10, borderWidth:1, borderColor:"#000", borderRadius:20}}>
            <Text style={styles.label}>Name :</Text>
            <TextInput style={styles.login_text_input} value={nameOfClient} editable={false} />

            <Text style={styles.label}>Shipping and Billing address :</Text>
            <TextInput
              style={{borderWidth:1, borderColor:"#ebebeb"}}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
              editable={false}
              value={address}
            />

            <Text style={styles.label}>Phone Number :</Text>
            <TextInput style={styles.login_text_input} value={contactNo} editable={false} />

            <Text style={styles.label}>GSTIN Number :</Text>
            <TextInput style={styles.login_text_input} value={GST} editable={false} />

            <Text style={styles.label}>Email :</Text>
            <TextInput style={styles.login_text_input} value={username} editable={false} />

            <Text style={styles.label}>Courier Service :</Text>
            <TextInput style={styles.login_text_input} value={courierNo} editable={false} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
    </SafeAreaView>
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
    margin: 8,
    marginTop: 4,
    color: '#000',
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
export default MyProfile;