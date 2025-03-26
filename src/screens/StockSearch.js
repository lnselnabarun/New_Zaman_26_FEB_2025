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
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Keyboard} from 'react-native';
var Styles = require('../assets/files/Styles');
// import UrlUtil from '../Service/UrlUtils';
// import CheckBox from '@react-native-community/checkbox';
// import Spinner from 'react-native-loading-spinner-overlay';
//  import AnimateLoadingButton from 'react-native-animate-loading-button';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import API from '../services/api';
export default class StockSearch extends Component {
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
      showFlatList: false,
      quantityString: '',
      cartArray: [],
      countArr: 0,
      itemList: [
        {a: 'ALPS', b: '102', c: '(ALPS)(102)', d: 'Available Stock: 45'},
        {a: 'ALPS', b: '107', c: '(ALPS)(107)', d: 'Available Stock: 100'},
        {a: 'ALPS', b: '311', c: '(ALPS)(311)', d: 'Available Stock: 134'},
      ],
      collectionError: '',
      skuError: '',
      quantityError: '',
      // imgSource: arocrmImg,
    };
  }
  componentDidMount() {
    this.setState({
      company_id: '',
    });
  }
  onSelect = data => {
    console.log('onSelect data12: ', data);

    if (data.navigationFlag1 == 'collection') {
      this.setState({
        collectionString: data.category_name,
        collectionError: '',
        addToCart0: 'Add to Cart',
        showFlatList: false,
        SKUstring: 'SKU No. *',
        skuError: '',
      });
    } else {
      this.setState({
        SKUstring: data.category_name,
        skuError: '',
        addToCart0: 'Add to Cart',
        showFlatList: false,
      });
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <StatusBar animated={true} backgroundColor="grey" />

        <ImageBackground
          source={require('../../src/assets/images/Zaman_BG1.jpg')}
          style={Styles.login_main}>
          <View style={Styles.dashboard_main_header}>
            <View style={Styles.dashboard_main_headers}>
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
                Stock Search
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.goToCart()}>
              <View style={Styles.dashboard_main_headers}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginStart: 10,
                    marginEnd: 10,
                    // marginTop: 20,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    tintColor: 'white',
                  }}
                  source={require('../../src/assets/images/my-cart-icon.png')}
                  // resizeMode="contain"dashboard_main_btn
                />

                {/* <View
                  style={{
                    width: 30,
                    height: 30,

                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'green',
                    borderStyle: 'solid',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: -13,
                    marginLeft: -18,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {this.state.countArr}
                  </Text>
                </View> */}
              </View>
            </TouchableOpacity>
          </View>
          {/* <ScrollView> */}

          <View
            style={{
              backgroundColor: '#fff',
              height: 310,
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
            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CollectionAndSKUFilter', {
                  onSelect: this.onSelect,
                  flagtoShow: 'collection',
                  navigationFlaggg: 'stockSearch',
                })
              }>
              <TextInput
                placeholder="Collection *"
                style={styles.login_text_input}
                autoCapitalize="none"
                placeholderTextColor="grey"
                value={this.state.collectionString}
                editable={false}
              />
            </TouchableOpacity> */}

            {/* <Text style={styles.errorHint}>{this.state.collectionError}</Text> */}

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CollectionAndSKUFilter', {
                  onSelect: this.onSelect,
                  flagtoShow: 'collection',
                  navigationFlaggg: 'stockSearch',
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

                <Text style={styles.errorHint}>
                {this.state.collectionError}
                </Text>

            {/* <TouchableOpacity onPress={() => this.selectSKU()}>
              <TextInput
                placeholder="SKU number *"
                style={styles.login_text_input}
                autoCapitalize="none"
                value={this.state.SKUstring}
                placeholderTextColor="grey"
                editable={false}
              />
            </TouchableOpacity> */}

            {/* <Text style={styles.errorHint}>{this.state.skuError}</Text> */}

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

                <Text style={styles.errorHint}>
                  {this.state.skuError}
                </Text>

            <TextInput
              placeholder="Quantity *"
              onChangeText={text => this.setQuantity(text)}
              style={styles.login_text_input}
              autoCapitalize="none"
              placeholderTextColor="black"
              keyboardType="number-pad"
              value={this.state.quantityString}
            />

            <Text style={styles.errorHint}>{this.state.quantityError}</Text>

            <TouchableOpacity
              style={Styles.login_btn_forget}
              onPress={() => this.showFlatlistbelow()}>
              <Text style={Styles.login_text}>SEARCH</Text>
            </TouchableOpacity>
          </View>

          {this.state.showFlatList == true && (
            <FlatList
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="handled"
              data={this.state.itemList}
              renderItem={this.renderHorizontalItem}
              keyExtractor={(item, index) => index}
            />
          )}

          {/* </ScrollView> */}
        </ImageBackground>
      </View>
      </SafeAreaView>
    );
  }
  setQuantity = value => {
    if (value.trim() != '') {
      this.setState({
        quantityError: '',
        quantityString: value,
        addToCart0: 'Add to Cart',
        showFlatList: false,
      });
    } else {
      this.setState({
        quantityError: 'Please enter a valid Quantity',
        quantityString: value,
      });
    }
  };
  selectSKU = value => {
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
        navigationFlaggg: 'stockSearch',
      });
    }
  };
  backPresses = async () => {
    console.log(
      'cart item array112: ',
      this.state.cartArray,
      this.state.cartArray.length,
    );
    // await AsyncStorage.setItem('cartArray', JSON.stringify(this.state.cartArray))

    if (this.state.cartArray.length > 0) {
      console.log(
        'cart item array1132: ',
        this.state.cartArray,
        this.state.cartArray.length,
      );
      var username = await AsyncStorage.getItem('username');
      const myArray = await AsyncStorage.getItem(username + 'cartArray');
      if (myArray !== null) {
        // We have data!!
        console.log(JSON.parse(myArray));
        var myArray1 = JSON.parse(myArray);

        for (let i = 0; i < this.state.cartArray.length; i++) {
          myArray1.push(this.state.cartArray[i]);
        }

        // myArray1.push(this.state.cartArray[0])

        console.log('final array: ', myArray1);

        await AsyncStorage.setItem(
          username + 'cartArray',
          JSON.stringify(myArray1),
        );

        this.props.navigation.goBack(null);
      } else {
        var myArray1 = [];

        // myArray1.push(this.state.cartArray[0])

        for (let i = 0; i < this.state.cartArray.length; i++) {
          myArray1.push(this.state.cartArray[i]);
        }

        console.log('final array: ', myArray1);

        await AsyncStorage.setItem(
          username + 'cartArray',
          JSON.stringify(myArray1),
        );

        this.props.navigation.goBack(null);
      }
    } else {
      this.props.navigation.goBack(null);
    }
  };
  goToCart = async () => {
    console.log(
      'cart item array112: ',
      this.state.cartArray,
      this.state.cartArray.length,
    );
    // await AsyncStorage.setItem('cartArray', JSON.stringify(this.state.cartArray))

    if (this.state.cartArray.length > 0) {
      console.log(
        'cart item array1132: ',
        this.state.cartArray,
        this.state.cartArray.length,
      );
      var username = await AsyncStorage.getItem('username');
      const myArray = await AsyncStorage.getItem(username + 'cartArray');
      if (myArray !== null) {
        // We have data!!
        console.log(JSON.parse(myArray));
        var myArray1 = JSON.parse(myArray);

        for (let i = 0; i < this.state.cartArray.length; i++) {
          myArray1.push(this.state.cartArray[i]);
        }

        // myArray1.push(this.state.cartArray[0])

        console.log('final array: ', myArray1);

        await AsyncStorage.setItem(
          username + 'cartArray',
          JSON.stringify(myArray1),
        );

        this.props.navigation.navigate('MyCart');
      } else {
        var myArray1 = [];

        // myArray1.push(this.state.cartArray[0])

        for (let i = 0; i < this.state.cartArray.length; i++) {
          myArray1.push(this.state.cartArray[i]);
        }

        console.log('final array: ', myArray1);

        await AsyncStorage.setItem(
          username + 'cartArray',
          JSON.stringify(myArray1),
        );

        this.props.navigation.navigate('MyCart');
      }
    } else {
      this.props.navigation.navigate('MyCart');
    }
  };
  showFlatlistbelow() {
    Keyboard.dismiss();
    this.searchStockApi();
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

        {(this.state['addToCart' + String(index)] == undefined ||
          this.state['addToCart' + String(index)] == 'Add to Cart') && (
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
            onPress={() => this.addToCartPressed('Remove from Cart', index)}>
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
              {this.state['addToCart' + String(index)] ?? 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        )}

        {this.state['addToCart' + String(index)] == 'Remove from Cart' && (
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
            onPress={() => this.addToCartPressed('Add to Cart', index)}>
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
              {this.state['addToCart' + String(index)] ?? 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  addToCartPressed = (status, index) => {
    console.log('addToCartPressed: ', status, index);

    if (status == 'Remove from Cart') {
      var indexData = this.state.itemList[index];

      var dictionary_main = {};
      dictionary_main['collection'] = indexData['collection'];
      dictionary_main['sku'] = indexData['sku'];
      dictionary_main['stock'] = this.state.quantityString;
      dictionary_main['Remarks'] = '';

      console.log('indexData stock: ', indexData['stock']);

      const newIds = this.state.cartArray.slice(); //copy the array
      newIds.push(dictionary_main);
      this.setState({
        cartArray: newIds,
        countArr: this.state.cartArray.length + 1,
      });
    } else {
      var array = [...this.state.cartArray]; // make a separate copy of the array
      array.splice(index, 1);
      this.setState({
        cartArray: array,
        countArr: this.state.cartArray.length - 1,
      });
    }

    this.setState({['addToCart' + String(index)]: status});
    console.log('cart item array: ', this.state.cartArray);
  };

  searchStockApi = async () => {
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
      this.setState({
        collectionError: '',
        skuError: '',
        quantityError: '',
        itemList: [],
      });
      var logs = {
        collection: this.state.collectionString,
        sku: this.state.SKUstring,
      };
      var response = await API.post('searchStock.php', logs);

      console.log('response3: ', response);

      if (response.status === 'success') {
        Toast.show(response.message, Toast.LONG);

        if (response.StockData.collection != undefined) {
          const newIds = []; //copy the array
          newIds.push(response.StockData);

          this.setState({
            itemList: newIds,
            showFlatList: true,
          });
        } else {
        }
      } else {
        Alert.alert(
          'Status',
          'Stock is not available, please check back later',
        );
      }
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
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
    paddingBottom:10,
    marginBottom:10
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
  errorHint: {
    marginTop: 3,
    color: 'red',
    fontSize: 11,
    marginBottom: -5,
    alignSelf: 'flex-start',
    marginLeft: 13,
  },
});
