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
import Selector from '../components/Selector';
import Picker from '../components/Picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderValue: '',
      gender: 'Preference',
      ArrPref: [],
      showPicker: false,
      prefArr: [],
      setcmpData: [],
    };
    this.prefArr = new Array();
  }
  componentDidMount() {
    this.getuser();
    this.prefer_list();
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
  getuser = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    console.log(token);
    console.log('user_id', user_id);

    var response = await API.post('preference_list');
    console.log(response);
    if (response.status == 'success') {
      // navigation.navigate('OtpVerify', {mobile: Mobile});
      this.setState({
        ArrPref: [...response.data],
      });
      console.log(this.state.ArrPref);
    } else {
      Alert.alert(response.status, response.message);
    }
  };
  addpreference = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    console.log('prefArr', this.prefArr);
    var unique = [];
    unique = [...new Set(this.prefArr.map(item => item))];
    var logs = {
      user_id: user_id,
      preferences: unique,
    };
    var response = await API.post('add_preference', logs);
    console.log(response);
    if (response.status == 'success') {
      Alert.alert(response.status, response.message);
      // this.setState({
      //   setcmpData: [],
      // });
      this.prefer_list();
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
  delete = async item => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    const filteredData = this.state.setcmpData.filter(
      card => card.id !== item.id,
    );
    this.setState({
      setcmpData: filteredData,
    });
    var logs = {
      pref_id: item.id,
    };
    var response = await API.post('delete_preference', logs);
    console.log(response);
    if (response.status == 'success') {
      Alert.alert(response.status, response.message);
    }
  };
  prefer_list = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    console.log(token);
    var logs = {
      user_id: user_id,
    };
    if (token != null && token !== '') {
      var response = await API.post('preference_list_by_user', logs);
      this.setState({
        setcmpData: [...response.data],
      });
      console.log(response);
    } else {
    }
  };
  renderlog = ({item, index}) => {
    return (
      <View
        style={{flex: 1, marginStart: 10, marginEnd: 10}}
        key={item.donation_id}>
        <Card style={{overflow: 'hidden'}}>
          <CardItem>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.prefer_title_font}>
                  {item.selected_pref_name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => this.delete(item)}>
                <AntDesign name="delete" size={20} />
              </TouchableOpacity>
            </View>
          </CardItem>
        </Card>
      </View>
    );
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
                  marginStart: 12,
                  marginTop: 20,
                  backgroundColor: 'transparent',
                }}
                source={require('../../src/assets/images/heart.png')}
                // resizeMode="contain"dashboard_main_btn
              />
              <Text style={Styles.user_kyc_font}>User Preference</Text>
            </View>
            <List style={Styles.profile_main_contain}>
              <Selector
                text={this.state.gender}
                placeholder="Preference"
                marginTop={15}
                onPress={() => this.setState({showPicker: true})}
                width={'100%'}
                height={42}
                imageheight={10}
                imagewidth={11}
                backcolor={'#ffff'}
                borderRadius={10}
                borderWidth={1}
                margright={10}
                fontcolor={'#A1A1A1'}
              />
            </List>

            <Picker
              backgroundColor={'#ffff'}
              dataList={this.state.ArrPref}
              modalVisible={this.state.showPicker}
              onBackdropPress={() => this.setState({showPicker: false})}
              renderData={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.prefArr.push(item.pref_id);
                      this.setState({gender: item.pref_name});
                      this.setState({showPicker: false});
                    }}
                    style={{
                      paddingVertical: 12,
                      borderBottomColor: '#DDDDDD',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          lineHeight: 14,
                        },
                        this.state.genderValue == item.pref_name,
                      ]}>
                      {item.pref_name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={[
                Styles.donate_btn_now,
                {
                  alignSelf: 'center',
                  marginBottom: 20,
                },
              ]}
              onPress={() => this.addpreference()}>
              <Text style={Styles.donate_btn_text}>Add Preference</Text>
            </TouchableOpacity>
            <FlatList
              data={this.state.setcmpData}
              renderItem={this.renderlog}
              keyExtractor={(item, id) => id.toString()}
            />
          </ImageBackground>
        </ScrollView>
      </Container>
    );
  }
}

export default Preference;
