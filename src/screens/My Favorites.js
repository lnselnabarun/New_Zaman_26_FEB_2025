import React, {useState, useEffect, Component} from 'react';
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
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import {Container, Card, CardItem, Body, ListItem} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon_3 from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Selector from '../components/Selector';
import Picker from '../components/Picker';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : Dimensions.get('window').height;
class My_Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setcmpData: [],
      isWish: '',
      modalComment: false,
      isVisible: false,
    };
  }

  
  getuser = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    console.log(token);
    console.log('user_id', user_id);
    var logs = {
      user_id: user_id,
    };
    var response = await API.post('donation_list_by_preference', logs);
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
  componentDidMount() {
    this.dashboard_donate();
  }
  dashboard_donate = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    
    var logs = {
      user_id: user_id,
      // campaign_name: Title,
    };
    console.log(logs);
    var response = await API.post('user_likes', logs);
    if (response.status == 'success') {
      // navigation.navigate('OtpVerify', {mobile: Mobile});
      console.log(response);
      this.setState({
        setcmpData: [...response.data.campaign_data],
      });
      // setcmpData(response.data);
    } else {
      Alert.alert(response.status, response.message);
    }
  };

  renderlog = ({item, index}) => {
    var progressStatus = 0;
    var amountpaind;
    if (item.donation_mode == '1') {
      if (item.total_donation_amountpaid == null) {
        progressStatus =
          (parseInt(0) / parseInt(item.campaign_target_amount)) * 100;
        amountpaind = 0 + ' of ' + item.campaign_target_amount;
      } else {
        progressStatus =
          (parseInt(item.total_donation_amountpaid) /
            parseInt(item.campaign_target_amount)) *
          100;
        amountpaind =
          item.total_donation_amountpaid + ' of ' + item.campaign_target_amount;
      }
    } else {
      if (item.total_donation_quantity == null) {
        progressStatus =
          (parseInt(0) / parseInt(item.campaign_target_amount)) * 100;
        amountpaind = 0 + ' of ' + item.campaign_target_amount;
      } else {
        progressStatus =
          (parseInt(item.total_donation_quantity) /
            parseInt(item.campaign_target_amount)) *
          100;
        amountpaind =
          item.total_donation_quantity + ' of ' + item.campaign_target_amount;
      }
    }

    const wish = item.like_status == 1 ? true : false;
    console.log(wish);
    return (
      <View style={{flex: 1}} key={item.donation_id}>
        <Card style={{overflow: 'hidden'}}>
          <CardItem>
            <View style={{flexDirection: 'column', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffff',
                }}>
                <Text style={Styles.doner_name_font}>{item.campaign_name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => this.like(item, index)}>
                    {wish ? (
                      <Image
                        style={Styles.donation_icon_font}
                        source={require('../../src/assets/images/like.png')}
                        // resizeMode="contain"dashboard_main_btn
                      />
                    ) : (
                      <Image
                        style={Styles.donation_icon_font}
                        source={require('../../src/assets/images/heartic.png')}
                        // resizeMode="contain"dashboard_main_btn
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.dots()}>
                    <Image
                      style={Styles.donation_icon_font}
                      source={require('../../src/assets/images/dots.jpg')}
                      // resizeMode="contain"dashboard_main_btn
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.doner_title_font}>
                  {item.campaign_details}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={Styles.doner_title_font}>{amountpaind}</Text>
                <Text style={Styles.doner_title_font}>{progressStatus}%</Text>
              </View>
              {/* <View> */}
              <View style={Styles.inner_barpro}>
                <Animated.View
                  style={[
                    Styles.inner_bar,
                    {width: parseInt(progressStatus) + '%'},
                  ]}
                />
              </View>
              {/* </View> */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={Styles.location_icon_font}
                    source={require('../../src/assets/images/location.jpg')}
                    // resizeMode="contain"dashboard_main_btn
                  />
                  <Text style={Styles.doner_title_font}> {item.location}</Text>
                </View>
                <Text style={Styles.doner_title_font}>
                  {item.days} days to go
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: '#5ca7f2',
                }}>
                <Text style={Styles.doner_title_font}>
                  {item.quantity} Doner
                </Text>
                <View
                  style={{
                    width: 90,
                    height: 40,
                    marginRight: 10,
                    marginTop: 19,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // onStartShouldSetResponder={() => this.comment(item)}
                >
                  <TouchableOpacity
                    style={[
                      {
                        width: 90,
                        height: 40,
                        justifyContent: 'center',
                      },
                    ]}
                    onPress={() => this.comment(item)}>
                    <Text style={Styles.doner_comment_font}>
                      {item.quantity} Comment
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={Styles.donate_btn_now}
                  onPress={() => this.Donate(item)}>
                  <Text style={Styles.donate_btn_text}>Donate Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  };
  
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../src/assets/images/bg.jpg')}
          style={Styles.login_main}>
          <View style={Styles.dashboard_main_header}>
            <View style={Styles.dashboard_main_headers}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginStart: 10,
                    // marginTop: 20,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  }}
                  source={require('../../src/assets/images/3_line_icon.png')}
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Search_screen')}>
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
          <View style={Styles.dashboard_main_contain}>
            <FlatList
              data={this.state.setcmpData}
              renderItem={this.renderlog}
              keyExtractor={(item, id) => id.toString()}
            />
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default My_Favorites;
