import React, {Component} from 'react';
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
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  // TextInput,
} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
import AsyncStorage from '@react-native-async-storage/async-storage';

class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderlog = ({item, index}) => {
    // const progressStatus =
    // (parseInt(item.amountr) / parseInt(item.amountp)) * 100;
    console.log(item);
    return (
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
                <Text style={Styles.doner_name_font}>{item.dname}</Text>
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
                      source={require('../../src/assets/images/dots.jpg')}
                      // resizeMode="contain"dashboard_main_btn
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.doner_title_font}>{item.title}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={Styles.doner_title_font}>
                  {item.amountr} of {item.amountp}
                </Text>
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
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={Styles.doner_title_font}>{item.dcount} Doner</Text>
                <TouchableOpacity
                  style={Styles.donate_btn_now}
                  onPress={() => Donate()}>
                  <Text style={Styles.donate_btn_text}>Donate Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  };
  componentDidMount() {
    this.campaign();
  }
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
      <ScrollView>
        <Container>
          <ImageBackground
            source={require('../../src/assets/images/bg.jpg')}
            style={Styles.login_main}>
            <View style={Styles.dashboard_main_header}>
              <View style={Styles.dashboard_main_headers}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
                <TouchableOpacity
                  onPress={() => this.user()}>
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
            
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
}

export default CampaignList;
