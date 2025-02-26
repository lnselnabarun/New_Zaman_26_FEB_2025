import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  Container,
  // TextInput,
} from 'native-base';
var Styles = require('../assets/files/Styles');
import {AuthContext} from '../context';
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import AppPreLoader from '../components/AppPreLoader';
import {ScrollView} from 'react-native-gesture-handler';
export default class OrderPlacement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_id: '',
      password: '',
      visible: false,
      isSelected: false,
      showPassword: true,
      progress: false,
      collectionString: 'Choose Mode',
      SKUstring: 'Choose Mode',
      dispatchModeError: '',
      orderReferenceError: '',
      remarksString: '',
      ordrRefString: '',
      ContactNo: '',
      email: '',
      NameofClient: '',
      // loading: true,

      itemList: [
        {a: 'ALPS', b: '102', c: '(ALPS)(102)', d: 'Available Stock: 45'},
        {a: 'ALPS', b: '107', c: '(ALPS)(107)', d: 'Available Stock: 100'},
        {a: 'ALPS', b: '311', c: '(ALPS)(311)', d: 'Available Stock: 134'},
      ],
      // imgSource: arocrmImg,
    };
  }
  componentDidMount = async () => {
    console.log(
      'this.props.navigation.state.params: ',
      this.props.route.params.itemList,
    );
    this.setState({
      company_id: '',
    });

    var ContactNo = await AsyncStorage.getItem('ContactNo');
    var username = await AsyncStorage.getItem('username');
    var NameofClient = await AsyncStorage.getItem('NameofClient');

    this.setState({
      ContactNo: ContactNo,
      email: username,
      NameofClient: NameofClient,
    });
  };
  onSelect = data => {
    console.log('onSelect data12: ', data);

    if (data.navigationFlag1 == 'courierSerice') {
      this.setState({
        collectionString: data.category_name,
        dispatchModeError: '',
      });
    } else {
      this.setState({SKUstring: data.category_name});
    }
  };
  submitButtonPresses = async () => {
    // if (this.state.ordrRefString.trim() == '')
    // {
    //   Toast.show('Please enter order reference number', Toast.LONG)
    //   this.setState({orderReferenceError: 'Please enter order reference number'})
    // }
    // else
    if (this.state.collectionString.trim() == 'Choose Mode') {
      Toast.show('Please select Dispatch mode', Toast.LONG);
      this.setState({dispatchModeError: 'Please select Dispatch mode'});
    } else {
      this.setState({
        progress: true,
      });

      var myArray = [];
      var finalArray = [];
      var username = await AsyncStorage.getItem('username');
      for (let i = 0; i < this.props.route.params.itemList.length; i++) {
        var val = Math.floor(1 + Math.random() * 9999);
        myArray = [];
        console.log('indexxx: ', i);
        myArray.push(
          new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            new Date().getDate() +
            ' ' +
            new Date().toLocaleTimeString(),
        );
        myArray.push(this.state.NameofClient);
        myArray.push(this.props.route.params.itemList[i].collection);
        myArray.push(this.props.route.params.itemList[i].sku);
        myArray.push('ZO' + String(val));
        myArray.push(this.props.route.params.itemList[i].stock);
        myArray.push(this.state.collectionString);
        myArray.push(this.state.email);
        myArray.push(this.state.ContactNo);
        myArray.push(this.state.ordrRefString);
        myArray.push(this.state.remarksString);
        finalArray.push(myArray);
      }

      console.log(
        'The final submission array: ',
        JSON.stringify({
          orderData: finalArray,
        }),
        finalArray.length,
        this.props.route.params.itemList.length,
      );

      // //  var logs = {
      // //   orderData: finalArray
      // // };
      // // var response = await API.post('createOrder', logs);

      // var formData = new FormData();

      // // for (var k in finalArray) {
      // //   formData.append(k, finalArray[k]);
      // // }

      //  formData.append("orderData", JSON.stringify(finalArray));

      // console.log('parameter::: ', formData)

      //http://182.75.124.211/orchid-lifestyle/api/createOrder
      fetch('https://zaman.co.in/createOrder.php', {
        method: 'POST',

        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },

        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),

        body: JSON.stringify({
          orderData: finalArray,
        }),
      })
        .then(res => res.json())
        .then(json => {
          // let resultJSON = JSON.stringify(json)
          // console.log("Result JSON is == ",resultJSON)

          if (json.status == 'success') {
            this.setState({
              progress: false,
            });

            Toast.show('Order submitted successfully!', Toast.LONG);

            AsyncStorage.setItem(username + 'cartArray', JSON.stringify([]));

            Alert.alert(
              'Success',
              'Order submitted successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.navigate('Dashboard'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Toast.show(
              'There is something wrong, Order submission failed!',
              Toast.LONG,
            );
            // this.props.navigation.navigate('Dashboard')
            // AsyncStorage.setItem('cartArray', JSON.stringify([]))
            this.setState({
              progress: false,
            });
          }
        })
        .catch(err => {
          Toast.show(
            'There is something wrong, Order submission failed!',
            Toast.LONG,
          );
          this.setState({
            progress: false,
          });
          console.log('error: ', err);
        });
    }
  };
  setOrderReference = value => {
    if (value.trim() != '') {
      this.setState({orderReferenceError: '', ordrRefString: value});
    } else {
      this.setState({
        orderReferenceError: 'Please enter order reference number',
        ordrRefString: value,
      });
    }
  };
  render() {
    return (
      <>
        <ImageBackground
          source={require('../../src/assets/images/Zaman_BG1.jpg')}
          style={Styles.login_main}>
          <SafeAreaView style={Styles.dashboard_main_header}>
            <View style={Styles.dashboard_main_headers}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginStart: 10,
                    // marginTop: 20,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    marginTop: 4,
                    tintColor: 'white',
                  }}
                  source={require('../../src/assets/images/back.png')}
                  // resizeMode="contain"dashboard_main_btn
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  marginLeft: 23,
                  marginTop: 6,
                  fontWeight: '800',
                  fontSize: 19,
                }}>
                Order Placement
              </Text>
            </View>
          </SafeAreaView>
          <ScrollView>
            <View
              style={{
                backgroundColor: '#fff',
                height: 125,
                borderRadius: 25,
                padding: '5%',
                marginLeft: '5%',
                marginRight: '5%',
                marginTop: '5%',
                // alignContent: 'center',
                // justifyContent: "center",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#000',
                borderBottomWidth: 0,
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.9,
                shadowRadius: 20,
                elevation: 5,
              }}>
              <Text
                style={{
                  paddingLeft: 13,
                  color: 'black',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Order Reference No.
              </Text>

              <TextInput
                style={{
                  width: null,
                  marginLeft: 13,
                  borderRadius: 5,
                  marginRight: 13,
                  backgroundColor: 'white',
                  fontSize: 12,
                  height: 40,
                  color: 'black',
                  marginTop: 10,
                  shadowColor: 'grey',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 3,
                  padding: 5,
                  paddingTop: 5,
                  borderColor: 'grey',
                  borderWidth: 0.6,
                }}
                placeholder="Enter your order reference no."
                //  onChangeText={text => this.setState({ordrRefString: text})}
                onChangeText={text => this.setOrderReference(text)}
                value={this.state.ordrRefString}></TextInput>

              <Text
                style={{
                  marginTop: 3,
                  color: 'red',
                  fontSize: 11,
                  marginBottom: -5,
                  alignSelf: 'flex-start',
                  marginLeft: 13,
                }}>
                {this.state.orderReferenceError}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                height: 123,
                borderRadius: 25,
                padding: '5%',
                margin: '5%',
                // alignContent: 'center',
                // justifyContent: "center",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#000',
                borderBottomWidth: 0,
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.9,
                shadowRadius: 20,
                elevation: 5,
              }}>
              <Text
                style={{
                  paddingLeft: 13,
                  color: 'black',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Dispatch Mode
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CollectionAndSKUFilter', {
                    onSelect: this.onSelect,
                    flagtoShow: 'courierSerice',
                    navigationFlaggg: 'orderPlacement',
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    margin: 0,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      maxWidth: 414,
                      backgroundColor: null,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{paddingLeft: 13, color: 'gray', fontSize: 20}}>
                      {this.state.collectionString}
                    </Text>
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        justifyContent: 'flex-end',
                        marginRight: 25,
                        marginTop: 9,
                      }}>
                      <Image
                        source={require('../../src/assets/images/outline_chevron_right_black_48.png')}
                        style={{width: 26, height: 26}}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 3,
                  color: 'red',
                  fontSize: 11,
                  marginBottom: -5,
                  alignSelf: 'flex-start',
                  marginLeft: 13,
                }}>
                {this.state.dispatchModeError}
              </Text>
            </View>

            {/* <View style={{
    backgroundColor: "#fff",
        height: 110,
        borderRadius: 25,
        padding: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '1%',
        // alignContent: 'center',
        // justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 5,
  }}>


<Text style={{paddingLeft:13,color: 'black', fontSize: 13, fontWeight: 'bold'}}>Selected Courier Mode</Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('collectionAndSKUFilter',{onSelect: this.onSelect,
                flagtoShow: 'courierMode', navigationFlaggg: 'createOrder'
            })}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 10}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 20,}}>{this.state.SKUstring}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 25, marginTop: 9}}>
                  <Image source={require("../../src/assets/images/outline_chevron_right_black_48.png")} style={{width:26, height:26,}} />
                </View>

                
                
              </View>
              </View>
              </TouchableOpacity>

        </View> */}

            <View
              style={{
                backgroundColor: '#fff',
                height: 143,
                borderRadius: 25,
                padding: '5%',
                marginLeft: '5%',
                marginRight: '5%',
                marginTop: 0,
                // alignContent: 'center',
                // justifyContent: "center",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#000',
                borderBottomWidth: 0,
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.9,
                shadowRadius: 20,
                elevation: 5,
              }}>
              <Text
                style={{
                  paddingLeft: 13,
                  color: 'black',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Remarks
              </Text>

              <TextInput
                style={{
                  width: null,
                  marginLeft: 13,
                  borderRadius: 5,
                  marginRight: 13,
                  backgroundColor: 'white',
                  fontSize: 12,
                  height: 60,
                  color: 'black',
                  marginTop: 10,
                  shadowColor: 'grey',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 3,
                  padding: 5,
                  paddingTop: 5,
                  borderColor: 'grey',
                  borderWidth: 0.6,
                }}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={'top'}
                placeholder="Write notes ..."
                onChangeText={text => this.setState({remarksString: text})}
                value={this.state.remarksString}></TextInput>
            </View>

            <TouchableOpacity
              onPress={() => this.submitButtonPresses()}
              style={{
                width: '94%',
                height: 64,
                backgroundColor: '#252324',
                marginTop: 40,
                color: '#f55656',
                alignSelf: 'center',
                marginBottom: 14,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingTop: 18,
                  color: '#ffff',
                  fontWeight: '500',
                }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* <View style={{
    backgroundColor: "#fff",
        height: 450,
        borderRadius: 25,
        padding: '5%',
        margin: '5%',
        // alignContent: 'center',
        // justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 5,
  }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('collectionAndSKUFilter',{onSelect: this.onSelect,
                flagtoShow: 'collection', navigationFlaggg: 'createOrder'
            })}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 10}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.collectionString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 25, marginTop: 6}}>
                  <Image source={require("../../src/assets/images/outline_chevron_right_black_48.png")} style={{width:26, height:26,}} />
                </View>

                
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop: 3, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 0}}></View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('collectionAndSKUFilter',{onSelect: this.onSelect,
                flagtoShow: 'sku', navigationFlaggg: 'createOrder'
            })}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 10}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.SKUstring}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 25, marginTop: 6}}>
                  <Image source={require("../../src/assets/images/outline_chevron_right_black_48.png")} style={{width:26, height:26,}} />
                </View>

                
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop: 3, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 0}}></View>

<TextInput
            placeholder="Quantity *"
            // onChangeText={text => setTaskti(text)}
            style={Styles.login_text_input}
            autoCapitalize='none'
            placeholderTextColor='grey'
            keyboardType='number-pad'
          />

<Text style={{fontSize:15,
        color:'grey',
        marginLeft: 13,
        marginTop:20,}}>Remark : </Text>

<TextInput style={{
    
    width: null,
    marginLeft: 13,
    borderRadius: 0,
    marginRight: 13,
    backgroundColor: 'white',
    fontSize: 12,
    height: 60,
    color: 'black',
    marginTop: 10,
    shadowColor: 'grey',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 3,
      padding: 5,
      paddingTop: 5,
      borderColor: 'grey',
      borderWidth: .6
    
    }}
                multiline={true}
     numberOfLines={5}
     textAlignVertical={'top'}
                // value = {'SDF Building, 4th Floor, Software Technology Park, GP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091'}
                ></TextInput>


          <TouchableOpacity
            style={{
              width: '94%',
              height: 55,
              backgroundColor: '#252324',
              marginTop: 80,
              color: '#f55656',
              alignSelf:"center",
              marginBottom: 14,
              borderRadius: 10
            }}
            onPress={() => Login()}>
            <Text style={Styles.login_text}>Submit</Text>
          </TouchableOpacity>
        </View> */}

          <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.progress}
            onRequestClose={() => {
              console.log('close modal');
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around',
                backgroundColor: '#00000040',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <ActivityIndicator
                  color="#999999"
                  size="large"
                  animating={this.state.progress}
                />
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </>
    );
  }
}
