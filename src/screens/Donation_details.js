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
  FlatList,
  Animated,
} from 'react-native';
import {Container, Card, CardItem, Body, ListItem} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const Donation_details = ({navigation}) => {
  const [cmpData, setcmpData] = useState([]);
  const [LastName, setLastName] = useState('');
  const [Email, setemail] = useState('');
  const [Mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [Otp, setotp] = useState('');
  const TrackCampaign = () => {};
  const StartCampaign = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      navigation.navigate('StartCampaign');
    } else {
      navigation.navigate('LogIn');
    }
  };
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      dname: 'Doner name',
      amountr: '2,75,000',
      amountp: '5,00,000',
      location: 'Delhi',
      dcount: '85',
      days: '3',
    },
  ];
  React.useEffect(() => {
    setcmpData(data);
  }, []);
  const like = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      // navigation.navigate('StartCampaign');
    } else {
      navigation.navigate('LogIn');
    }
  };
  const dots = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      // navigation.navigate('StartCampaign');
    } else {
      navigation.navigate('LogIn');
    }
  };
  const share = () => {};
  const Donate = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      // navigation.navigate('StartCampaign');
    } else {
      navigation.navigate('LogIn');
    }
  };
  const user = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      this.props.navigation.navigate('User profile');
    } else {
      this.props.navigation.navigate('LogIn');
    }
  };
  return (
    <ScrollView>
      <Container>
        <ImageBackground
          source={require('../../src/assets/images/bg.jpg')}
          style={Styles.login_main}>
          <View style={Styles.dashboard_main_header}>
            <View style={Styles.dashboard_main_headers}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
              <TouchableOpacity onPress={() => user()}>
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
            <View style={{flex: 1}}>
              <Card style={{overflow: 'hidden'}}>
                <CardItem>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#ffff',
                      }}>
                      <Text style={Styles.doner_name_font}>Doner name</Text>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => like()}>
                          <Image
                            style={Styles.donation_icon_font}
                            source={require('../../src/assets/images/like.png')}
                            // resizeMode="contain"dashboard_main_btn
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dots()}>
                          <Image
                            style={Styles.donation_icon_font}
                            source={require('../../src/assets/images/share.png')}
                            // resizeMode="contain"dashboard_main_btn
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => share()}>
                          <Image
                            style={Styles.donation_icon_font}
                            source={require('../../src/assets/images/dots.jpg')}
                            // resizeMode="contain"dashboard_main_btn
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={Styles.doner_dname_font}>
                        Title of the Donation
                      </Text>
                      <Text style={Styles.doner_title_font}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industrys
                        standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it
                        to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic
                        typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more
                        recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={Styles.doner_title_font}>
                        Target Donation
                      </Text>
                      <Text style={Styles.doner_title_font}>{80}%</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={Styles.doner_title_font}>500000</Text>
                      <View style={Styles.inner_barpros}>
                        <Animated.View
                          style={[
                            Styles.inner_bar,
                            {width: parseInt(80) + '%'},
                          ]}
                        />
                      </View>
                    </View>
                    {/* <View> */}

                    {/* </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={Styles.doner_comments_font}>Comments</Text>
                    </View>
                  </View>
                </CardItem>
              </Card>
            </View>
          </View>
        </ImageBackground>
      </Container>
    </ScrollView>
  );
};

export default Donation_details;
