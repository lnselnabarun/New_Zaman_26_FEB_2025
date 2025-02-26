// https://www.getpostman.com/collections/256c60dba9f14e80f75e

//{"userid":"1","user_hash":"827ccb0eea8a706c4c34a16891f84e7b","sessioncode":"722940720210613245607979143742","deviceid":"","accesskey":"Q79pLfEBWwqHYkI","token":"1b5a8cb9aaf2be2af659343fb5bba91d7bea8d6bd21eb54eb48b55b9dde76a33","tabid":"22","postdata":{"cf_3286":"ZAOR - Asset Sales","cf_5404":"SO","cf_5406":true,"cf_5412":"BCIL - BCL Ceramics Industries Limited","cf_5414":"05 - Government Sale","cf_5416":"17 - Floor Tiles","arocrm_purchaseorder":"PO","cf_5408":"2021-06-24","subject":"Subject","sostatus":"Delivered","cf_3080":"2022-06-24","cf_5410":"2023-06-24","cf_4306":"2025-06-24","txtAdjustment":"","hdnGrandTotal":"","hdnSubTotal":"","hdnS_H_Amount":"","currency_id":"","conversion_rate":"","pre_tax_total":"","tags":"","contact_id":"","account_id":"383","cf_nrl_accounts564_id":"378","cf_5419":"CPT - Carriage paid to","cf_5421":"DAF - Delivered at frontier","bill_street":"Billing","ship_street":"Shipping","bill_pobox":"","ship_pobox":"","bill_city":"","ship_city":"","bill_state":"","ship_state":"","bill_code":"","ship_code":"","bill_country":"","ship_country":"","cf_5423":"Z003 - 30 Days after delivery","terms_conditions":"","cf_5454":""},"LineItems":[{"plant":"5001 - BCL Ceramics Industries Plant","productid":"425","quantity":"1","listprice":"","comment":"","discount_amount":"","discount_qtyamounteach":"","discount_qtyamount":"","discount_percent":"","supplementary_duty":"","custtaxtotal":"","custnettotal":"","internal_price":"","image":"","purchase_cost":"","margin":"","productcode":"","itemunit":""},{"plant":"5001 - BCL Ceramics Industries Plant","productid":"408","quantity":"22","listprice":"","comment":"","discount_amount":"","discount_qtyamounteach":"","discount_qtyamount":"","discount_percent":"","supplementary_duty":"","custtaxtotal":"","custnettotal":"","internal_price":"","image":"","purchase_cost":"","margin":"","productcode":"","itemunit":""}]}

import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
export default class MyCart extends Component {
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
      itemList: [],
      // imgSource: arocrmImg,
    };
  }

  componentDidMount = async () => {
    this.setState({
      company_id: '',
    });

    this.loadData();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.loadData();
      //Put your Data loading function here instead of my this.loadData()
    });
  };
  loadData = async () => {
    console.log('loadData111111 called:::: ');
    var username = await AsyncStorage.getItem('username');
    const myArray = await AsyncStorage.getItem(username + 'cartArray');

    console.log(
      'loadData111111 myArray1:::: ',
      myArray,
      JSON.parse(myArray).length,
    );

    if (myArray == null) {
      Toast.show('Your cart is empty', Toast.CENTER);
    }

    if (JSON.parse(myArray).length != 0) {
      console.log('enter 1');
      console.log(JSON.parse(myArray));
      var myArray1 = JSON.parse(myArray);

      this.setState({
        itemList: myArray1,
      });
    } else {
      console.log('enter 2');
      Toast.show('Your cart is empty', Toast.CENTER);
    }
  };
  onSelect = data => {
    console.log('onSelect data12: ', data);

    if (data.navigationFlag1 == 'collection') {
      this.setState({collectionString: data.category_name});
    } else {
      this.setState({SKUstring: data.category_name});
    }
  };
  backPresses = async () => {
    var username = await AsyncStorage.getItem('username');
    await AsyncStorage.setItem(
      username + 'cartArray',
      JSON.stringify(this.state.itemList),
    );
    // this.props.navigation.goBack(null)
    this.props.navigation.goBack();
  };
  addNewItemPresses = async () => {
    var username = await AsyncStorage.getItem('username');
    await AsyncStorage.setItem(
      username + 'cartArray',
      JSON.stringify(this.state.itemList),
    );
    this.props.navigation.navigate('CreateOrder');
  };
  goToOrderSubmit = async () => {
    if (this.state.itemList.length == 0) {
      Toast.show(
        'Please add atleast one item in cart before you proceed',
        Toast.CENTER,
      );
    } else {
      this.props.navigation.navigate('OrderPlacement', {
        flagtoShow: 'myCart',
        itemList: this.state.itemList,
      });
    }
  };
  render() {
    return (
      <SafeAreaView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <StatusBar animated={true} backgroundColor="grey" />

        <ImageBackground
          source={require('../../src/assets/images/Zaman_BG1.jpg')}
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
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
              <TouchableOpacity onPress={() => this.backPresses()}>
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
                My Cart
              </Text>
            </View>
          </View>
          {/* <ScrollView> */}

          <View
            style={{
              alignSelf: 'center',
              marginTop: 10,
              // backgroundColor: 'rgba(246, 244, 243, 1)',
              borderRadius: 6,
              width: '100%',
              marginBottom: 140,
            }}>
            <FlatList
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="handled"
              data={this.state.itemList}
              renderItem={this.renderHorizontalItem}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View style={styles.footer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  maxWidth: 414,
                  backgroundColor: null,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => this.addNewItemPresses()}>
                  <View
                    style={{
                      marginLeft: 0,
                      width: Dimensions.get('window').width / 2 - 10,
                      marginTop: 0,
                      height: 80,
                      backgroundColor: 'null',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          resizeMode: 'contain',
                          tintColor: 'white',
                        }}
                        source={require('../../src/assets/images/outline_add_black_48.png')}></Image>
                      <Text style={{color: 'white'}}>Add Item</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    marginLeft: 0,
                    width: 2,
                    marginTop: 0,
                    height: 80,
                    backgroundColor: 'gray',
                  }}></View>

                <TouchableOpacity onPress={() => this.goToOrderSubmit()}>
                  <View
                    style={{
                      marginLeft: 0,
                      width: Dimensions.get('window').width / 2 - 10,
                      marginTop: 0,
                      height: 80,
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          resizeMode: 'contain',
                          tintColor: 'white',
                        }}
                        source={require('../../src/assets/images/my-cart-icon.png')}></Image>
                      <Text style={{color: 'white'}}>Next</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* </ScrollView> */}
        </ImageBackground>
      </SafeAreaView>
    );
  }
  renderHorizontalItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 1,
          backgroundColor: '#fff',
          padding: 1,
          borderRadius: 10,
          paddingTop: 1,
          shadowColor: '#efefef',
          shadowOffset: {width: 0, height: 23},
          shadowOpacity: 1,
          shadowRadius: 3,
          marginTop: 1,
          elevation: 3,
          paddingTop: 20,
          marginVertical: 5,
          marginLeft: 8,
          marginRight: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 0,
          }}>
          <View
            style={{
              flex: 1,
              maxWidth: 414,
              backgroundColor: null,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 13,
                  color: 'grey',
                  marginLeft: 13,
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                Collection
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: 'grey',
                  marginLeft: 13,
                  marginTop: 5,
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                SKU No.
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'grey',
                  marginLeft: 13,
                  marginTop: 5,
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                Stock Status
              </Text>
            </View>
            <View
              style={{
                width: null,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginRight: 25,
                marginBottom: 20,
              }}>
              <View>
                <Text style={{fontSize: 13, color: 'grey', marginBottom: 5}}>
                  {item.collection}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'grey',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  {item.sku}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'grey',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  {item.stock}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* { (this.state['addToCart'+String(index)] == undefined || this.state['addToCart'+String(index)] == 'Add to Cart') &&  <TouchableOpacity style={{ height: 40, alignSelf: 'flex-end',
  marginTop:-8,borderRadius:5,width: 160, backgroundColor: 'green', width: 150, marginBottom: 15, marginRight: 13}}
   onPress ={() => this.addToCartPressed('Remove from Cart', index)}>
                <Text style={{  fontSize:15,fontWeight: "bold",color:'white',
   textAlign: 'center', textAlignVertical: 'center', padding: 10,
  color: 'white', textAlignVertical: 'center'}}>
      {this.state['addToCart'+String(index)] ?? 'Add to Cart'}
  </Text> 
  </TouchableOpacity> } */}

        <TouchableOpacity
          style={{
            height: 40,
            alignSelf: 'flex-end',
            marginTop: -8,
            borderRadius: 5,
            width: 160,
            backgroundColor: 'green',
            width: 150,
            marginBottom: 15,
            marginRight: 13,
          }}
          onPress={() => {
            this.addToCartPressed('Add to Cart', index);
            this.alertModal();
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textAlignVertical: 'center',
              padding: 10,
              color: 'white',
              textAlignVertical: 'center',
            }}>
            {this.state['addToCart' + String(index)] ?? 'Remove from Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  addToCartPressed = (status, index) => {
    console.log('addToCartPressed: ', status, index);

    // this.setState({ ['addToCart'+String(index)]: status})

    var array = [...this.state.itemList]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({itemList: array});

    console.log('cart item array: ', this.state.cartArray);
  };

  alertModal = () => {
    Alert.alert(
      'Success',
      'Order submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  customLoginClick = () => {
    //     this.setState({
    //       progress:true
    //   })

    const {navigate} = this.props.navigation;

    const url = UrlUtil.BASE_URL + this.state.company_id + '/auth/login';

    console.log('login urll => ', this.state.FCMToken);

    console.log(
      'login payload => ',
      JSON.stringify({
        username: this.state.emp_id,
        password: this.state.password,
        deviceid: this.state.FCMToken, //this.state.countryCode1,
      }),
    );

    // const url = 'https://bcl-middleware.aro-crm.com/api/bcil/auth/login';
    // Alert.alert(url);

    fetch(url, {
      method: 'POST',

      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),

      // body: JSON.stringify({
      // username: 'admin',//this.state.mobile,
      // password: '12345',//paramsDic.password,
      // deviceid: ''//this.state.countryCode1,
      // })
      body: JSON.stringify({
        username: this.state.emp_id,
        password: this.state.password,
        deviceid: this.state.FCMToken, //this.state.countryCode1,
      }),
    })
      .then(res => res.json())
      .then(json => {
        let resultJSON = JSON.stringify(json);
        console.log('Result JSON is == ', resultJSON);

        this.setState({
          FileUrlHolder: json.message,
        });

        this.loadingButton1.showLoading(false);

        if (this.state.FileUrlHolder === 'Login Successful !!') {
          this.setState({progress: false});
          AsyncStorage.setItem('Profile', JSON.stringify(json.data));

          // this.props.navigation.navigate('HomeScreen_Page')

          this.props.navigation.navigate('HomeScreen_Page', {
            selectedCompanyID: this.state.company_id,
            deviceid: this.state.FCMToken,
          });
        } else {
          console.log('dsadasdsad');

          // this.setState({progress:false})
          Alert.alert(
            'Alert',
            json.message, // <- this part is optional, you can pass an empty string
            [{text: 'OK', onPress: () => this.setState({progress: false})}],
            {cancelable: false},
          );
          //   this.setState({progress:false})
          //    alert(json.message);
        }
      })
      .catch(err => {
        // alert('Error occurred :'+JSON.stringify(err));
        this.loadingButton1.showLoading(false);
        Alert.alert(
          'Error',
          'Please check your network connection', // <- this part is optional, you can pass an empty string
          [{text: 'OK', onPress: () => this.setState({progress: false})}],
          {cancelable: false},
        );
        //alert('error = '+JSON.stringify(err));
      });

    // this.setState(() => ({ nameError: null}));
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    //   position: 'absolute',
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
    // resizeMode:'cover'
  },
  textInput: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'transparent',
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    color: '#000',
  },
  loginView: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderColor: '#fff',
  },
  loginForm: {
    backgroundColor: '#fff',
    height: '84%',
    minHeight: 400,
    borderRadius: 25,
    padding: '5%',
    margin: '5%',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
  },
  footer: {
    position: 'absolute',
    height: 80,
    left: 0,
    // top: Dimensions.get('window').height - 100,
    width: Dimensions.get('window').width,
    backgroundColor: '#252324',
    bottom: 0,
    // opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  logo: {
    height: 120,
    width: '60%',
    resizeMode: 'contain',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '20%',
    right: '20%',
    borderRadius: 5,
  },
  logoView: {
    alignContent: 'center',
    justifyContent: 'center',
    height: '35%',
    marginTop: -23,
    borderRadius: 5,
  },
  loginButton: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff6600',
    borderRadius: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  checboxkView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    width: '80%',
    marginLeft: '4%',
    marginRight: '10%',
  },

  checkbox: {
    alignSelf: 'center',
    height: 22,
    width: 22,
  },
  label: {
    margin: 8,
    marginTop: 4,
    color: '#000',
  },
  submitButton: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  progressBar: {
    flex: 1,
    alignSelf: 'center',
    height: 80,
    position: 'absolute',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  btnRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 0,
  },
});
