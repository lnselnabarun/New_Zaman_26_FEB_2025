import React, {Component} from 'react';

import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  FlatList,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class CollectionAndSKUFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      seachableModalVisible: false,
      data: [],
      dropdownMasterData: [],
      value: '',
      progress: false,
      serchPalceholderText: '',
      // baseURL: ' ',
      baseURL: 'https://zaman.co.in/',
      itemList: [
        'SM-Air',
        'SM-Surface',
        'Kolkata Express - Air',
        'Kolkata Express - Surface',
        'Bus',
        'By Hand',
        'Self pick-up',
        'Transport',
      ],
      collectionString: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.callToSetAddress1Value = this.callToSetAddress1Value.bind(this);
  }

  callToSetAddress1Value() {}

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
                Filter
              </Text>
            </View>
          </SafeAreaView>

          <View
            style={{
              alignSelf: 'center',
              marginTop: 0,
              backgroundColor: 'rgba(246, 244, 243, 1)',
              borderRadius: 6,
              width: '100%',
            }}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderSearchableData}
              keyExtractor={item => item}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
          </View>

          <Modal
            transparent={true}
            animationType="none"
            visible={this.state.progress}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `rgba(0,0,0,${0.6})`,
              }}>
              <View
                style={{
                  padding: 13,
                  backgroundColor: `${'white'}`,
                  borderRadius: 13,
                }}>
                <ActivityIndicator
                  animating={this.state.progress}
                  color={'black'}
                  size="large"
                />
                <Text style={{color: `${'black'}`}}>{'Wait a moment....'}</Text>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </>
    );
  }
  componentDidMount = async () => {
    console.log(
      'this.props.navigation.state.params: ',
      this.props.route.params,
    );
    var collection = await AsyncStorage.getItem('collection');

    this.setState({
      collectionString: collection,
    });

    if (this.props.route.params.flagtoShow == 'collection') {
      this.setState({
        serchPalceholderText: 'Search Collection name....',
      });
      this.selectDocumentOrPackageCategory('collection', 'GET');
    } else if (this.props.route.params.flagtoShow == 'sku') {
      this.setState({
        serchPalceholderText: 'Search SKU number....',
      });
      this.selectDocumentOrPackageCategory('sku', 'POST');
    } else if (this.props.route.params.flagtoShow == 'courierSerice') {
      this.setState({
        serchPalceholderText: 'Search Dispatch mode....',
      });

      this.setState({
        data: this.state.itemList,
        dropdownMasterData: this.state.itemList,
        value: '',
      });

      // this.selectDocumentOrPackageCategory('docSubCat')
    }
    // else if (this.props.route.params.flagtoShow == 'courierMode')
    // {
    //   this.setState({
    //     serchPalceholderText: 'Please type Courier Mode....',
    //   })
    //  // this.selectDocumentOrPackageCategory('docSubCat')
    // }
    else {
    }
  };
  selectDocumentOrPackageCategory(flagtoShow, method) {
    this.setState({
      progress: true,
    });

    console.log('selectedFlag => ', flagtoShow);

    var params = {};
    var subURL = '';

    var formData = new FormData();

    if (flagtoShow == 'collection') {
      subURL = this.state.baseURL + 'allCollectionList.php';
      formData = null;
    } else if (flagtoShow == 'sku') {
      formData.append('collection', this.state.collectionString);
      subURL = this.state.baseURL + 'skuList.php';
    } else if (flagtoShow == 'docItem') {
      (subURL = 'api/item_list_by_cat_type'),
        (params = {
          type: '1',
          item_cat_id: this.props.navigation.state.params.item_cat_id,
        });
    } else if (flagtoShow == 'packCat') {
      (subURL = 'api/item_cat_list_by_shipping_cat'),
        (params = {
          type: '2',
        });
    } else {
      return;
    }

    const {navigate} = this.props.navigation;

    const url = subURL;

    console.log('Custom sign in param dic => ', params, url);

    fetch(url, {
      method: method,

      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },

      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        let resultJSON = JSON.stringify(json);
        console.log('Result JSON is == ', resultJSON);

        if (json.status == 'success') {
          this.setState({
            progress: false,
          });

          if (this.props.route.params.flagtoShow == 'collection') {
            this.setState({
              data: json.collectionData,
              dropdownMasterData: json.collectionData,
              value: '',
            });
          } else if (this.props.route.params.flagtoShow == 'sku') {
            this.setState({
              data: json.skuData,
              dropdownMasterData: json.skuData,
              value: '',
            });
          } else if (
            this.props.navigation.state.params.flagtoShow == 'docItem' ||
            this.props.navigation.state.params.flagtoShow == 'packItem'
          ) {
            this.setState({
              data: json.ItemList,
              dropdownMasterData: json.ItemList,
              value: '',
            });
          } else {
            return;
          }
        } else {
          this.setState({
            progress: false,
          });
          alert(json.message);
        }
      })
      .catch(err => {
        this.setState({
          progress: false,
        });
        console.log('error: ', err);
      });
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  renderSearchableData = ({item, index}) => {
    //console.log('renderSearchableData ==> ', item)
    return (
      <View>
        <TouchableOpacity onPress={() => this.selectItemOnDropDown(item)}>
          <Text style={{padding: 10, color: 'black', paddingLeft: 20}}>
            {item}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  selectItemOnDropDown = async item => {
    if (this.props.route.params.flagtoShow == 'collection') {
      await AsyncStorage.setItem('collection', item);
    }

    this.props.navigation.goBack(null);
    this.props.route.params.onSelect({
      navigationFlag1: this.props.route.params.flagtoShow,
      category_name: item,
      cat_id: item,
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    );
  };
  searchItems = text => {
    this.setState({
      value: text,
    });

    const newData = this.state.dropdownMasterData.filter(item => {
      const itemData = `${item.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData); // this will return true if our itemData contains the textData
    });

    this.setState({
      data: newData,
    });
  };
  renderHeader = () => {
    return (
      <View
        style={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: '#252324',
          opacity: 0.5,
        }}>
        <TextInput
          style={{
            height: 60,
            color: 'black',
            padding: 10,
            placeholderTextColor: 'black',
            fontSize: 15,
          }}
          placeholder={this.state.serchPalceholderText}
          onChangeText={text => this.searchItems(text)}
          placeholderTextColor="black"
          value={this.state.value}
        />
      </View>
    );
  };
}

var styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    // color: 'green'
  },
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  MainContainer: {
    width: null,
    height: null,
    backgroundColor: 'white',
  },
  SubContainer: {
    marginLeft: 20,
    marginTop: -25,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 230,
    backgroundColor: 'rgba(246, 244, 243, 1)',
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  login: {
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
  SigninToContinue: {
    fontSize: 17,
    color: 'grey',
    alignSelf: 'center',
    marginTop: 10,
  },

  textInput: {
    width: null,
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 7,
    backgroundColor: 'white',
    fontSize: 12,
    height: 40,
    color: 'gray',
  },
  textPass: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    width: null,
    marginTop: 20,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'white',
    fontSize: 16,
    paddingLeft: 13,
    height: 40,
    backgroundColor: 'rgba(246, 244, 243, 1)',
  },
  lineStyle: {
    height: 1,
    width: 140,
    backgroundColor: '#1F203E',
    marginLeft: 50,
    alignSelf: 'center',
  },
  lineSecond: {
    height: 1,
    width: 140,
    backgroundColor: '#1F203E',
    alignSelf: 'center',
    marginTop: 2,
  },
  itemRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  modalStyle: {
    height: 480,
    alignSelf: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(246, 244, 243, 1)',
    borderRadius: 6,
    width: '100%',
  },
  cancelStyle: {
    height: 55,
    marginTop: 12,
    backgroundColor: 'red',
    width: 340,
    alignSelf: 'center',
    borderRadius: 6,
  },
  spinnerTextStyle: {
    color: 'red',
  },
  textInput2: {
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
    width: 200,
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 7,
    backgroundColor: 'white',
    fontSize: 12,
    height: 40,
    color: 'gray',
    marginTop: 3,
  },
  itemRow2: {
    // marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    // marginBottom: 20
  },
});


// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Image,
//   ImageBackground,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   Modal,
//   FlatList,
//   ActivityIndicator
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CollectionAndSKUFilter = (props) => {
//   const [state, setState] = useState({
//     radioValue: 0,
//     seachableModalVisible: false,
//     data: [],
//     dropdownMasterData: [],
//     value: '',
//     progress: false,
//     serchPalceholderText: '',
//     // baseURL: ' ',
//     baseURL: 'https://zaman.co.in/',
//     itemList: [
//       'SM-Air',
//       'SM-Surface',
//       'Kolkata Express - Air',
//       'Kolkata Express - Surface',
//       'Bus',
//       'By Hand',
//       'Self pick-up',
//       'Transport',
//     ],
//     collectionString: '',
//   });

//   const callToSetAddress1Value = () => {};

//   const handleBackButtonClick = () => {
//     props.navigation.goBack(null);
//     return true;
//   };

//   const selectDocumentOrPackageCategory = (flagtoShow, method) => {
//     setState(prevState => ({
//       ...prevState,
//       progress: true,
//     }));

//     console.log('selectedFlag => ', flagtoShow);

//     var params = {};
//     var subURL = '';

//     var formData = new FormData();

//     if (flagtoShow == 'collection') {
//       subURL = state.baseURL + 'allCollectionList.php';
//       formData = null;
//     } else if (flagtoShow == 'sku') {
//       formData.append('collection', state.collectionString);
//       subURL = state.baseURL + 'skuList.php';
//     } else if (flagtoShow == 'docItem') {
//       (subURL = 'api/item_list_by_cat_type'),
//         (params = {
//           type: '1',
//           item_cat_id: props.navigation.state.params.item_cat_id,
//         });
//     } else if (flagtoShow == 'packCat') {
//       (subURL = 'api/item_cat_list_by_shipping_cat'),
//         (params = {
//           type: '2',
//         });
//     } else {
//       return;
//     }

//     const { navigate } = props.navigation;

//     const url = subURL;

//     console.log('Custom sign in param dic => ', params, url);

//     fetch(url, {
//       method: method,

//       headers: {
//         Accept: '*/*',
//         'Content-Type': 'multipart/form-data',
//       },

//       body: formData,
//     })
//       .then(res => res.json())
//       .then(json => {
//         let resultJSON = JSON.stringify(json);
//         console.log('Result JSON is == ', resultJSON);

//         if (json.status == 'success') {
//           setState(prevState => ({
//             ...prevState,
//             progress: false,
//           }));

//           if (props.route.params.flagtoShow == 'collection') {
//             setState(prevState => ({
//               ...prevState,
//               data: json.collectionData,
//               dropdownMasterData: json.collectionData,
//               value: '',
//             }));
//           } else if (props.route.params.flagtoShow == 'sku') {
//             setState(prevState => ({
//               ...prevState,
//               data: json.skuData,
//               dropdownMasterData: json.skuData,
//               value: '',
//             }));
//           } else if (
//             props.navigation.state?.params.flagtoShow == 'docItem' ||
//             props.navigation.state?.params.flagtoShow == 'packItem'
//           ) {
//             setState(prevState => ({
//               ...prevState,
//               data: json.ItemList,
//               dropdownMasterData: json.ItemList,
//               value: '',
//             }));
//           } else {
//             return;
//           }
//         } else {
//           setState(prevState => ({
//             ...prevState,
//             progress: false,
//           }));
//           alert(json.message);
//         }
//       })
//       .catch(err => {
//         setState(prevState => ({
//           ...prevState,
//           progress: false,
//         }));
//         console.log('error: ', err);
//       });
//   };

//   const renderSearchableData = ({ item, index }) => {
//     return (
//       <View>
//         <TouchableOpacity onPress={() => selectItemOnDropDown(item)}>
//           <Text style={{ padding: 10, color: 'black', paddingLeft: 20 }}>
//             {item}{' '}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const selectItemOnDropDown = async (item) => {
//     if (props.route.params.flagtoShow == 'collection') {
//       await AsyncStorage.setItem('collection', item);
//     }

//     props.navigation.goBack(null);
//     props.route.params.onSelect({
//       navigationFlag1: props.route.params.flagtoShow,
//       category_name: item,
//       cat_id: item,
//     });
//   };

//   const renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: '100%',
//           backgroundColor: 'white',
//         }}
//       />
//     );
//   };

//   const searchItems = (text) => {
//     setState(prevState => ({
//       ...prevState,
//       value: text,
//     }));

//     const newData = state.dropdownMasterData.filter(item => {
//       const itemData = `${item.toUpperCase()}`;
//       const textData = text.toUpperCase();
//       return itemData.includes(textData); // this will return true if our itemData contains the textData
//     });

//     setState(prevState => ({
//       ...prevState,
//       data: newData,
//     }));
//   };

//   const renderHeader = () => {
//     return (
//       <View
//         style={{
//           borderColor: 'white',
//           borderWidth: 1,
//           backgroundColor: '#252324',
//           opacity: 0.5,
//         }}>
//         <TextInput
//           style={{
//             height: 60,
//             color: 'black',
//             padding: 10,
//             placeholderTextColor: 'black',
//             fontSize: 15,
//           }}
//           placeholder={state.serchPalceholderText}
//           onChangeText={text => searchItems(text)}
//           placeholderTextColor="black"
//           value={state.value}
//         />
//       </View>
//     );
//   };

//   useEffect(() => {
//     const initializeComponent = async () => {
//       console.log(
//         'this.props.navigation.state.params: ',
//         props.route.params,
//       );
//       var collection = await AsyncStorage.getItem('collection');
  
//       setState(prevState => ({
//         ...prevState,
//         collectionString: collection,
//       }));
  
//       if (props.route.params.flagtoShow == 'collection') {
//         setState(prevState => ({
//           ...prevState,
//           serchPalceholderText: 'Search Collection name....',
//         }));
//         selectDocumentOrPackageCategory('collection', 'GET');
//       } else if (props.route.params.flagtoShow == 'sku') {
//         setState(prevState => ({
//           ...prevState,
//           serchPalceholderText: 'Search SKU number....',
//         }));
//         selectDocumentOrPackageCategory('sku', 'POST');
//       } else if (props.route.params.flagtoShow == 'courierSerice') {
//         setState(prevState => ({
//           ...prevState,
//           serchPalceholderText: 'Search Dispatch mode....',
//           data: prevState.itemList,
//           dropdownMasterData: prevState.itemList,
//           value: '',
//         }));
//       } else {
//         // Handle other cases if needed
//       }
//     };

//     initializeComponent();
//   }, []);

//   return (
//     <>
//       <ImageBackground
//         source={require('../../src/assets/images/Zaman_BG1.jpg')}
//         style={{ flex: 1, flexDirection: 'column' }}>
//         <SafeAreaView
//           style={{
//             backgroundColor: '#252324',
//             height: 60,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             padding: 12,
//             alignItems: 'center',
//           }}>
//           <View
//             style={{
//               backgroundColor: '#252324',
//               // height: 60,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity onPress={() => props.navigation.goBack()}>
//               <Image
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginStart: 10,
//                   // marginTop: 20,
//                   backgroundColor: 'transparent',
//                   alignSelf: 'center',
//                   marginTop: 4,
//                   tintColor: 'white',
//                 }}
//                 source={require('../../src/assets/images/back.png')}
//               />
//             </TouchableOpacity>

//             <Text
//               style={{
//                 fontSize: 15,
//                 color: 'white',
//                 marginLeft: 23,
//                 marginTop: 6,
//                 fontWeight: '800',
//                 fontSize: 19,
//               }}>
//               Filter
//             </Text>
//           </View>
//         </SafeAreaView>

//         <View
//           style={{
//             alignSelf: 'center',
//             marginTop: 0,
//             backgroundColor: 'rgba(246, 244, 243, 1)',
//             borderRadius: 6,
//             width: '100%',
//           }}>
//           <FlatList
//             data={state.data}
//             renderItem={renderSearchableData}
//             keyExtractor={item => item}
//             ItemSeparatorComponent={renderSeparator}
//             ListHeaderComponent={renderHeader}
//           />
//         </View>

//         <Modal
//           transparent={true}
//           animationType="none"
//           visible={state.progress}>
//           <View
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: `rgba(0,0,0,${0.6})`,
//             }}>
//             <View
//               style={{
//                 padding: 13,
//                 backgroundColor: `${'white'}`,
//                 borderRadius: 13,
//               }}>
//               <ActivityIndicator
//                 animating={state.progress}
//                 color={'black'}
//                 size="large"
//               />
//               <Text style={{ color: `${'black'}` }}>{'Wait a moment....'}</Text>
//             </View>
//           </View>
//         </Modal>
//       </ImageBackground>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   loading: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: 'red',
//     // color: 'green'
//   },
//   container: {
//     flex: 1,
//     // remove width and height to override fixed static size
//     width: null,
//     height: null,
//     resizeMode: 'contain',
//   },
//   MainContainer: {
//     width: null,
//     height: null,
//     backgroundColor: 'white',
//   },
//   SubContainer: {
//     marginLeft: 20,
//     marginTop: -25,
//     width: Dimensions.get('window').width - 40,
//     height: Dimensions.get('window').height - 230,
//     backgroundColor: 'rgba(246, 244, 243, 1)',
//     shadowColor: 'grey',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 1,
//     shadowRadius: 3,
//   },
//   login: {
//     fontSize: 22,
//     color: 'black',
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   SigninToContinue: {
//     fontSize: 17,
//     color: 'grey',
//     alignSelf: 'center',
//     marginTop: 10,
//   },

//   textInput: {
//     width: null,
//     marginLeft: 7,
//     borderRadius: 0,
//     marginRight: 7,
//     backgroundColor: 'white',
//     fontSize: 12,
//     height: 40,
//     color: 'gray',
//   },
//   textPass: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'grey',
//     width: null,
//     marginTop: 20,
//     borderRadius: 0,
//     marginLeft: 0,
//     marginRight: 0,
//     backgroundColor: 'white',
//     fontSize: 16,
//     paddingLeft: 13,
//     height: 40,
//     backgroundColor: 'rgba(246, 244, 243, 1)',
//   },
//   lineStyle: {
//     height: 1,
//     width: 140,
//     backgroundColor: '#1F203E',
//     marginLeft: 50,
//     alignSelf: 'center',
//   },
//   lineSecond: {
//     height: 1,
//     width: 140,
//     backgroundColor: '#1F203E',
//     alignSelf: 'center',
//     marginTop: 2,
//   },
//   itemRow: {
//     marginTop: 18,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignContent: 'flex-start',
//     alignItems: 'flex-start',
//     width: '100%',
//     marginBottom: 20,
//   },
//   modalStyle: {
//     height: 480,
//     alignSelf: 'center',
//     marginTop: 0,
//     backgroundColor: 'rgba(246, 244, 243, 1)',
//     borderRadius: 6,
//     width: '100%',
//   },
//   cancelStyle: {
//     height: 55,
//     marginTop: 12,
//     backgroundColor: 'red',
//     width: 340,
//     alignSelf: 'center',
//     borderRadius: 6,
//   },
//   spinnerTextStyle: {
//     color: 'red',
//   },
//   textInput2: {
//     // borderBottomWidth: 1,
//     // borderBottomColor: 'grey',
//     width: 200,
//     marginLeft: 7,
//     borderRadius: 0,
//     marginRight: 7,
//     backgroundColor: 'white',
//     fontSize: 12,
//     height: 40,
//     color: 'gray',
//     marginTop: 3,
//   },
//   itemRow2: {
//     // marginTop: 18,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignContent: 'flex-start',
//     alignItems: 'flex-start',
//     width: '100%',
//     // marginBottom: 20
//   },
// });

// export default CollectionAndSKUFilter;