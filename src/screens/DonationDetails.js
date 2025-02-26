import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class DonationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      <View>
        <Text> DonationDetails </Text>
      </View>
    );
  }
}

export default DonationDetails;
