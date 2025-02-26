import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
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
class My_donation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setcmpData: [],
      isWish: '',
      modalComment: false,
      isVisible: false,
      shareHeight: 360,
      modalCommentVal: '',
      commentArr: [],
      comment: '',
      campaign_id: '',
      genderValue: '',
      gender: 'Preference',
      ArrPref: [
        {
          pref_name: 'All',
          id: 'all',
        },
        {
          pref_name: 'By Preference',
          id: 'by preference',
        },
      ],
      showPicker: false,
      hasLocationPermission: null,
      isPreference: null,
    };
  }
  componentDidMount() {
    this.dashboard_donate();
  }

  dashboard_donate = async () => {
    var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');
    var logs = {
      user_id: user_id,
    };
    console.log(logs);
    var response = await API.post('donations_by_donor', logs);
    if (response.status == 'success') {
      console.log(response);
      this.setState({
        setcmpData: [...response.data.donations],
      });
    } else {
      Alert.alert(response.status, response.message);
    }
  };
  renderlog = ({item, index}) => {
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
                <Text style={Styles.doner_name_font}>{item.donor_name}</Text>

                {item.amountpaid == '0.00' ? (
                  <Text style={[Styles.doner_title_font, {marginTop: 0}]}>
                    Quantity:{item.quantity}
                  </Text>
                ) : (
                  <Text
                    style={[
                      Styles.doner_title_font,
                      {
                        marginTop: 0,
                      },
                    ]}>
                    Amount: {item.amountpaid}
                  </Text>
                )}
                <Text
                  style={[
                    Styles.doner_title_font,
                    {
                      marginTop: 0,
                    },
                  ]}>
                  {' '}
                  {item.donee_approved == 0 ? 'Not Approved' : 'Approved'}
                </Text>
                <Text
                  style={[
                    Styles.doner_title_font,
                    {
                      marginTop: 0,
                    },
                  ]}>
                  {item.status}
                </Text>
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

export default My_donation;
