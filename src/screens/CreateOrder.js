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
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {
  Container,
  // TextInput,
} from 'native-base';
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
import {Keyboard} from 'react-native';
export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_id: '',
      password: '',
      visible: false,
      isSelected: false,
      showPassword: true,
      progress: false,
      collectionString: 'Collection *',
      SKUstring: 'SKU No. *',
      quantityString: '',
      remarksString: '',
      collectionError: '',
      skuError: '',
      quantityError: '',
      showFlatList: false,

      itemList: [
        {a: 'ALPS', b: '102', c: '(ALPS)(102)', d: 'Available Stock: 45'},
        {a: 'ALPS', b: '107', c: '(ALPS)(107)', d: 'Available Stock: 100'},
        {a: 'ALPS', b: '311', c: '(ALPS)(311)', d: 'Available Stock: 134'},
      ],
      // imgSource: arocrmImg,
    };
  }
  componentDidMount() {
    this.setState({
      company_id: '',
    });
  }

  showSubmitButton() {
    Keyboard.dismiss();
    this.submitButtonPresses();
  }
  submitButtonPresses = async () => {
    Keyboard.dismiss();
    if (
      this.state.collectionString.trim() == 'Collection *' &&
      this.state.SKUstring.trim() == 'SKU No. *' &&
      this.state.quantityString.trim() == ''
    ) {
      Toast.show('All fields should be required', Toast.LONG);
      this.setState({
        skuError: 'Please select SKU number',
        collectionError: 'Please select Collection',
        quantityError: 'Please enter Quantity',
      });
    } else if (this.state.collectionString.trim() == 'Collection *') {
      Toast.show('Please select Collection', Toast.LONG);
      this.setState({collectionError: 'Please select Collection'});
    } else if (this.state.SKUstring.trim() == 'SKU No. *') {
      Toast.show('Please select SKU number', Toast.LONG);
      this.setState({skuError: 'Please select SKU number'});
    } else if (this.state.quantityString.trim() == '') {
      Toast.show('Please enter Quantity', Toast.LONG);
      this.setState({quantityError: 'Please enter Quantity'});
    } else {
      // try {

      //   const myArray = await AsyncStorage.getItem('cartArray');
      //   if (myArray !== null) {
      //     // We have data!!
      //     console.log(JSON.parse(myArray));
      //     var myArray1 = JSON.parse(myArray)
      //     var dictionary_main = {};
      //     dictionary_main['collection'] = this.state.collectionString
      //     dictionary_main['sku'] = this.state.SKUstring
      //     dictionary_main['stock'] = this.state.quantityString
      //     dictionary_main['Remarks'] = this.state.remarksString
      //     myArray1.push(dictionary_main)

      //     console.log('final array: ', myArray1)

      //     await AsyncStorage.setItem('cartArray', JSON.stringify(myArray1))

      //     this.props.navigation.goBack(null)
      //   }
      // } catch (error) {
      //   // Error retrieving data
      // }

      var username = await AsyncStorage.getItem('username');
      const myArray = await AsyncStorage.getItem(username + 'cartArray');
      if (myArray !== null) {
        console.log(JSON.parse(myArray));

        var myArray1 = JSON.parse(myArray);

        var dictionary_main = {};
        dictionary_main['collection'] = this.state.collectionString;
        dictionary_main['sku'] = this.state.SKUstring;
        dictionary_main['stock'] = this.state.quantityString;
        dictionary_main['Remarks'] = this.state.remarksString;
        myArray1.push(dictionary_main);

        console.log('final array: ', myArray1);

        await AsyncStorage.setItem(
          username + 'cartArray',
          JSON.stringify(myArray1),
        );

        Toast.show('Item added to the Cart successfully', Toast.LONG);

        setTimeout(() => {
          this.props.navigation.goBack(null);
        }, 1000);
        console.disableYellowBox = true;
      } else {
        var myArray1 = [];

        var dictionary_main = {};
        dictionary_main['collection'] = this.state.collectionString;
        dictionary_main['sku'] = this.state.SKUstring;
        dictionary_main['stock'] = this.state.quantityString;
        dictionary_main['Remarks'] = this.state.remarksString;
        myArray1.push(dictionary_main);

        console.log('final array: ', myArray1);

        await AsyncStorage.setItem(
          username + 'cartArray',
          JSON.stringify(myArray1),
        );

        Toast.show('Item added to the Cart successfully', Toast.LONG);

        setTimeout(() => {
          this.props.navigation.goBack(null);
        }, 2000);
        console.disableYellowBox = true;
      }
    }
  };
  onSelect = data => {
    console.log('onSelect data12: ', data);

    if (data.navigationFlag1 == 'collection') {
      this.setState({
        collectionString: data.category_name,
        collectionError: '',
        SKUstring: 'SKU No. *',
        skuError: '',
      });
    } else {
      this.setState({SKUstring: data.category_name, skuError: ''});
    }
  };
  setQuantity = value => {
    if (value.trim() != '') {
      this.setState({
        quantityError: '',
        quantityString: value,
        showFlatList: false,
      });
    } else {
      this.setState({
        quantityError: 'Please enter a valid Quantity',
        quantityString: value,
      });
    }
  };

  selectSKU = () => {
    if (this.state.collectionString == 'Collection *') {
      Toast.show(
        'Collection value must be required before choosing SKU',
        Toast.LONG,
      );
      this.setState({collectionError: 'Please select Collection'});
    } else {
      this.props.navigation.navigate('CollectionAndSKUFilter', {
        onSelect: this.onSelect,
        flagtoShow: 'sku',
        navigationFlaggg: 'createOrder',
      });
    }
  };

  render() {
    return (
      <>
        <ImageBackground
          source={require('../../src/assets/images/Zaman_BG1.jpg')}
          style={{flex: 1, flexDirection: 'column'}}>
          <SafeAreaView
            style={{
              backgroundColor: '#252324',
              height: 60,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 12,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#252324',
                // height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
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
                Create Order
              </Text>
              {/* <TouchableOpacity>
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
                </TouchableOpacity> */}
            </View>
          </SafeAreaView>
          {/* <View style={{
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  }}>
          <Image
            style={{width: 120, height: 120, marginTop: 20}}
            source={require('../../src/assets/images/zaman_logo.jpg')}
          />
          <Text style={{
    fontSize: 40,
    alignSelf: 'center',
    margin: 10
  }}>Change Password</Text>
        </View> */}
          <ScrollView>
            <KeyboardAvoidingView
              keyboardVerticalOffset={50}
              style={{
                backgroundColor: '#fff',
                height: 335,
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
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CollectionAndSKUFilter', {
                    onSelect: this.onSelect,
                    flagtoShow: 'collection',
                    navigationFlaggg: 'createOrder',
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
                      style={{paddingLeft: 13, color: 'black', fontSize: 12}}>
                      {this.state.collectionString}
                    </Text>
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        justifyContent: 'flex-end',
                        marginRight: 25,
                        marginTop: 6,
                      }}>
                      <Image
                        source={require('../../src/assets/images/outline_chevron_right_black_48.png')}
                        style={{width: 26, height: 26}}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginLeft: 13,
                  marginTop: 3,
                  backgroundColor: 'gray',
                  marginRight: 13,
                  height: 1,
                  marginBottom: 0,
                }}></View>

              <Text style={styles.errorHint}>{this.state.collectionError}</Text>

              <TouchableOpacity onPress={() => this.selectSKU()}>
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
                      style={{paddingLeft: 13, color: 'black', fontSize: 12}}>
                      {this.state.SKUstring}
                    </Text>
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        justifyContent: 'flex-end',
                        marginRight: 25,
                        marginTop: 6,
                      }}>
                      <Image
                        source={require('../../src/assets/images/outline_chevron_right_black_48.png')}
                        style={{width: 26, height: 26}}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginLeft: 13,
                  marginTop: 3,
                  backgroundColor: 'gray',
                  marginRight: 13,
                  height: 1,
                  marginBottom: 0,
                }}></View>

              <Text style={styles.errorHint}>{this.state.skuError}</Text>

              <TextInput
                placeholder="Quantity *"
                onChangeText={text => this.setQuantity(text)}
                style={styles.login_text_input}
                autoCapitalize="none"
                placeholderTextColor="grey"
                keyboardType="number-pad"
                value={this.state.quantityString}
              />

              <Text style={styles.errorHint}>{this.state.quantityError}</Text>

              {/* <Text style={{fontSize:15,
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
    placeholder={'Type your Remark here ...'}
    onChangeText={text => this.setState({remarksString: text})}
    returnKeyType='done'
                multiline={true}
     numberOfLines={5}
     textAlignVertical={'top'}
                // value = {'SDF Building, 4th Floor, Software Technology Park, GP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091'}
                ></TextInput> */}

              <TouchableOpacity
                style={{
                  // fontSize: 18,
                  // marginLeft: 50,
                  // marginRight: 50,
                  width: '94%',
                  height: 55,
                  backgroundColor: '#252324',
                  marginTop: 30,
                  color: '#f55656',
                  alignSelf: 'center',
                  marginBottom: 14,
                  borderRadius: 10,
                }}
                onPress={() => this.showSubmitButton()}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingTop: 14,
                    color: '#ffff',
                    fontWeight: '500',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
              {this.state.showFlatList == true && this.showSubmitButton()}
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </>
    );
  }
}
const styles = StyleSheet.create({
  errorHint: {
    marginTop: 3,
    color: 'red',
    fontSize: 11,
    marginBottom: -5,
    alignSelf: 'flex-start',
    marginLeft: 13,
  },
  login_text_input: {
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: '#dcdedc',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    color: 'black',
    paddingTop: 9,
  },
});
