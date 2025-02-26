import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Animated,
} from 'react-native';
import {Container, Card, CardItem, Body, ListItem, List} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
class add_proifle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      address: '',
      image: '',
      imageType: '',
    };
  }

  componentDidMount() {
    this.getuser();
  }
  addhar = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.5,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      this.imageUpload(image);
      console.log(image);
    });
  };
  imageUpload = image => {
    let item = {
      // id: Date.now(),
      url: image.data,
      mime: image.mime,
      // content: image.data,
    };
    this.setState({
      image: item.url,
      imageType: item.mime,
    });
    console.log(image.path);
  };
  setFirstname = value => {
    this.setState({
      fname: value,
    });
  };
  setLastname = value => {
    this.setState({
      lname: value,
    });
  };
  setEmail = value => {
    this.setState({
      email: value,
    });
  };
  setMobile = value => {
    this.setState({
      mobile: value,
    });
  };
  setAddress = value => {
    this.setState({
      address: value,
    });
  };
  getuser = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    console.log(token);
    console.log('user_id', user_id);
    var logs = {
      user_id: user_id,
    };
    if (token !== null) {
      var response = await API.post('fetch_profile_data', logs);
      console.log(response);
      if (response.status == 'success') {
        // navigation.navigate('OtpVerify', {mobile: Mobile});
        this.setState({
          fname: response.data.first_name,
          lname: response.data.last_name,
          email: response.data.email,
          mobile: response.data.phone,
        });
      } else {
        Alert.alert(response.status, response.message);
      }
    } else {
    }
  };
  updatePro = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    console.log(token);
    console.log('user_id', user_id);
    if (
      this.state.imageType == 'image/jpeg' ||
      this.state.imageType == 'image/png' ||
      this.state.imageType == 'image/jpg'
    ) {
      var logs = {
        user_id: user_id,
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        phone: this.state.mobile,
        kyc_file: this.state.image,
        kycfile_type: 'base64',
        address: this.state.address,
      };
      console.log(logs);
      if (token !== null) {
        var response = await API.post('update_kyc', logs);
        console.log(response);
        if (response.status == 'success') {
          Alert.alert(response.status, response.message);
        } else {
          Alert.alert(response.status, response.message);
        }
      } else {
      }
    } else {
      Alert.alert('warning', 'please upload an image');
    }
  };
  user = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      this.props.navigation.navigate('User profile');
    } else {
      this.props.navigation.navigate('LogIn');
    }
  };
  render() {
    return (
      <Container>
        <ScrollView>
          <ImageBackground
            source={require('../../src/assets/images/bg.jpg')}
            style={Styles.login_main}>
            <View style={Styles.dashboard_main_header}>
              <View style={Styles.dashboard_main_headers}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginStart: 10,
                      // marginTop: 20,
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                    }}
                    source={require('../../src/assets/images/back.png')}
                    // resizeMode="contain"dashboard_main_btn
                  />
                </TouchableOpacity>
                <TouchableOpacity>
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
                </TouchableOpacity>
              </View>
              <View style={Styles.dashboard_main_headers}>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginStart: 40,
                      // marginTop: 20,
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                    }}
                    source={require('../../src/assets/images/search.png')}
                    // resizeMode="contain"dashboard_main_btn
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.user()}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginStart: 10,
                      marginEnd: 10,
                      // marginTop: 20,
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                    }}
                    source={require('../../src/assets/images/user.png')}
                    // resizeMode="contain"dashboard_main_btn
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Image
                style={{
                  width: 84,
                  height: 80,
                  marginStart: 14,
                  marginTop: 20,
                  backgroundColor: 'transparent',
                }}
                source={require('../../src/assets/images/heart.png')}
                // resizeMode="contain"dashboard_main_btn
              />
              <Text
                style={[
                  Styles.user_kyc_font,
                  {
                    marginLeft: 14,
                  },
                ]}>
                User KYC
              </Text>
            </View>
            <List style={Styles.profile_main_contain}>
              {/* <ListItem> */}
              <TextInput
                style={Styles.login_text_input}
                placeholder="First Name"
                editable={this.state.iseditablefname}
                onChangeText={value => this.setFirstname(value)}
                value={this.state.fname}
                keyboardType="default"></TextInput>
              {/* </ListItem> */}
              {/* <ListItem> */}
              <TextInput
                style={Styles.login_text_input}
                placeholder="Last Name"
                editable={this.state.iseditablefname}
                onChangeText={value => this.setLastname(value)}
                value={this.state.lname}
                keyboardType="default"></TextInput>
              {/* </ListItem> */}
              {/* <ListItem> */}
              <TextInput
                style={Styles.login_text_input}
                placeholder="Email"
                editable={this.state.iseditablefname}
                onChangeText={value => this.setEmail(value)}
                value={this.state.email}
                keyboardType="email-address"></TextInput>
              {/* </ListItem> */}
              {/* <ListItem> */}
              <TextInput
                style={Styles.login_text_input}
                placeholder="Mobile"
                editable={this.state.iseditablefname}
                onChangeText={value => this.setMobile(value)}
                value={this.state.mobile}
                keyboardType="decimal-pad"></TextInput>
              {/* </ListItem> */}
              {/* <ListItem> */}
              <TextInput
                style={Styles.login_text_input}
                placeholder="Address"
                editable={this.state.iseditablefname}
                onChangeText={value => this.setAddress(value)}
                value={this.state.address}
                keyboardType="default"></TextInput>
              {/* </ListItem> */}
              {/* <ListItem>
                <TextInput
                  style={Styles.user_text_input}
                  placeholder="Last Name"
                  editable={this.state.iseditablefname}
                  onChangeText={value => this.setFirstname(value)}
                  value={this.state.fname}></TextInput>
              </ListItem> */}
              {/* <ListItem> */}
              <View style={Styles.profile_main_text_contain}>
                <Text style={Styles.user_profile_lbtext}>
                  Adhaar or pan or any I’d{' '}
                </Text>
                <TouchableOpacity
                  style={[
                    Styles.view_btn_kyc,
                    {
                      marginStart: 0,
                    },
                  ]}
                  onPress={() => this.addhar()}>
                  <Text style={Styles.donate_btn_text}>Upload</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={Styles.login_btn_forget}
                  onPress={() => this.updatePro()}>
                  <Text style={Styles.login_text}>Update KYC</Text>
                </TouchableOpacity>
              </View>
            </List>
          </ImageBackground>
        </ScrollView>
      </Container>
    );
  }
}

export default add_proifle;
