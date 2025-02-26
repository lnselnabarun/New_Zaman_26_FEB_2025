/* eslint-disable react/jsx-no-undef */
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
class View_campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmpData: [],
      tableHead: [
        'No.',
        'Title',
        'Start Date',
        'Expriy Date',
        'Type',
        'Amount',
        'View',
      ],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd'],
      ],
      widthArr: [40, 180, 80, 80, 40, 120, 60],
    };
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
  campaign = async () => {
    console.log(user_id);
    var user_id = await AsyncStorage.getItem('user_id');
    var logs = {
      user_id: user_id,
    };
    var response = await API.post('campaign_details_by_user', logs);
    if (response.status == 'success') {
      // navigation.navigate('OtpVerify', {mobile: Mobile});
      // console.log(response.data)
      var arr = new Array();
      for (var i = 0; i < response.data.length; i++) {
        arr.push([
          response.data[i]['campaign_id'],
          response.data[i]['campaign_name'],
          response.data[i]['campaign_start_date'],
          response.data[i]['campaign_end_date'],
          response.data[i]['donation_mode'],
          response.data[i]['campaign_target_amount'],
          response.data[i]['campaign_id'],
        ]);
        console.log(arr);
      }
      this.setState({
        cmpData: arr,
      });
    } else {
      Alert.alert(response.status, response.message);
    }
  };

  componentDidMount() {
    this.campaign();
  }
  element = (data, index) => {
    console.log(data);
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Campaing_details', {
            camp_id: data,
          })
        }>
        <View
          style={{
            width: 58,
            height: 18,
            backgroundColor: '#78B7BB',
            borderRadius: 2,
          }}>
          <Text style={{textAlign: 'center', color: '#fff'}}>View</Text>
        </View>
      </TouchableOpacity>
    );
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
            {/* <ScrollView horizontal={true}> */}
            <View style={Styles.dashboard_main_contain}>
              {/* <FlatList
                data={this.state.cmpData}
                renderItem={this.renderlog}
                keyExtractor={(item, campaign_id) => campaign_id.toString()}
              /> */}
              {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}> */}
              {/* <ScrollView style={{marginTop: -1}}> */}
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row
                  data={this.state.tableHead}
                  // widthArr={this.state.widthArr}
                  style={{height: 50, backgroundColor: '#537791'}}
                  textStyle={{textAlign: 'center', fontWeight: '100'}}
                />

                {this.state.cmpData.map((rowData, index) => (
                  <TableWrapper
                    key={index}
                    style={{flexDirection: 'row'}}
                    widthArr={this.state.widthArr}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          cellIndex === 6
                            ? this.element(cellData, index)
                            : cellData
                        }
                        textStyle={{margin: 6}}
                        widthArr={this.state.widthArr}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
              {/* </ScrollView> */}
            </View>
            {/* </ScrollView> */}
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
}

export default View_campaign;
