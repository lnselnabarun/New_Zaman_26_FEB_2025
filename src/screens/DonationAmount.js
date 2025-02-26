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
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
class DonationAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Amount: '0',
      donateAmt: props.route.params.donate_amt,
      donation_mode: props.route.params.donation_mode,
      campaign_id: props.route.params.campaign_id,
      kind_id: props.route.params.kind_id,
    };
  }
  componentDidMount() {
    this.campaign();
  }
  campaign = async () => {
    var user_id = await AsyncStorage.getItem('user_id');
    var logs = {
      user_id: user_id,
    };
    var response = await API.post('campaign_list');
    if (response.status == 'success') {
      // navigation.navigate('OtpVerify', {mobile: Mobile});
      // console.log(response.data)
    } else {
      Alert.alert(response.status, response.message);
    }
  };
  setAmount = value => {
    this.setState({
      Amount: value,
    });
  };
  donate = () => {
    if (this.state.donation_mode == '1') {
      // this.props.navigation.navigate('DonationPayment');
      this.startMoney();
    } else {
      this.startInkind();
    }
  };
  startInkind = async () => {
    var user_id = await AsyncStorage.getItem('user_id');
    var logs = {
      user_id: user_id,
      kind_id: this.state.kind_id,
      quantity: this.state.Amount,
      amountpaid: '0',
      campaign_id: this.state.campaign_id,
      status: 'success',
    };
    var response = await API.post('add_donation', logs);
    if (response.status == 'success') {
      this.props.navigation.navigate('Dashboard_donation');
      // console.log(response.data)
    } else {
      Alert.alert(response.status, response.message);
    }
  };
  startMoney = async () => {
    var user_id = await AsyncStorage.getItem('user_id');
    var logs = {
      user_id: user_id,
      kind_id: this.state.kind_id,
      quantity: '0',
      amountpaid: this.state.Amount,
      campaign_id: this.state.campaign_id,
      // status: 'success',
    };
    var response = await API.post('add_donation', logs);
    if (response.status == 'success') {
      this.props.navigation.navigate('Dashboard_donation');
      // console.log(response.data)
    } else {
      Alert.alert(response.status, response.message);
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
      <ScrollView>
        <Container>
          <ImageBackground
            source={require('../../src/assets/images/bg.jpg')}
            style={Styles.donation_main}>
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
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('User profile')
                  }>
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

            <Text style={Styles.title_donation_text_font1}>
              Target Donation
            </Text>

            <View style={Styles.donation_sub}>
              <View style={Styles.amount_main_contain}>
                {this.state.donation_mode == '1' ? (
                  <Text style={Styles.amount_text_font1}>
                    Target Donation: {this.state.donateAmt} INR
                  </Text>
                ) : (
                  <Text style={Styles.amount_text_font1}>
                    Target Donation: {this.state.donateAmt} Quantity
                  </Text>
                )}
                <TextInput
                  placeholder="Enter Donation Amount"
                  onChangeText={text => this.setAmount(text)}
                  style={Styles.amount_text_input}
                  keyboardType="decimal-pad"
                />
              </View>
              <TouchableOpacity
                style={Styles.donate_btn}
                onPress={() => this.donate()}>
                <Text style={Styles.login_text}>Donate</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
}

export default DonationAmount;
