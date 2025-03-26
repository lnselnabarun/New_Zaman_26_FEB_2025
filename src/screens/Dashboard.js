import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigations/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { plugins } from '../../babel.config';

const Dashboard = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [progress, setProgress] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [username, setUsername] = useState('');
  const [noticeText, setNoticeText] = useState('No Notice available');
  const [countArr, setCountArr] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // const logout = async () => {
  //   await AsyncStorage.clear();
  //   await AsyncStorage.setItem('IsLogin', 'false');
  //   navigation.navigate('LoginScreen');
  //   //props.navigation.goBack(null)
  // };

  useEffect(() => {
    const initialize = async () => {
      const userdata1 = await AsyncStorage.getItem('userdata');
      const NameofClient = await AsyncStorage.getItem('NameofClient');
      await loadData();
      await fetchNoticeApi();
      navigation.addListener('focus', () => {
        // navigation.closeDrawer();
        // fetchNoticeApi();
        loadData();
      });

      setUserdata(userdata1);
      setUsername(NameofClient);
    };

    initialize();

    return () => {
      console.log('componentWillUnmount called');
    };
  }, [countArr]);

  const loadData = async () => {
    console.log('loadData111111 called:::: ');
    const username = await AsyncStorage.getItem('username');
    const myArray = await AsyncStorage.getItem(username + 'cartArray');

    if (myArray != null) {
      setCountArr(JSON.parse(myArray).length);
    }
  };

  const fetchNoticeApi = async () => {
    try {
      const response = await fetch('https://zaman.co.in/get-notice.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.status === 'success') {
        setNoticeText(json.noticeData);
      } else {
        setNoticeText('No Notice available');
      }
    } catch (error) {
      Toast.show(
        'There is something wrong, Order submission failed!',
        Toast.LONG,
      );
      console.log('error: ', error);
    } finally {
      setProgress(false);
    }
  };

  const refreshNoticeApi = async () => {
    setProgress(true);
    try {
      const response = await fetch('https://zaman.co.in/get-notice.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.status === 'success') {
        setNoticeText(json.noticeData);
      } else {
        setNoticeText('No Notice available');
      }
    } catch (error) {
      Toast.show(
        'There is something wrong, Order submission failed!',
        Toast.LONG,
      );
      console.log('error: ', error);
    } finally {
      setProgress(false);
    }
  };

  return (
    <>
    <SafeAreaView style={{flex:1}}>
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
            <TouchableOpacity onPress={() => toggleDrawer()}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginStart: 10,
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
                source={require('../../src/assets/images/3_line_icon.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                alignItems: 'center',
                color: '#ffff',
                fontWeight: '500',
                paddingLeft: 13,
              }}>
              {'Hi, ' + username}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#252324',
              // height: 60,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyCart', {deviceid: ''})}>
              <View
                style={{
                  backgroundColor: '#252324',
                  // height: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginStart: 10,
                    marginEnd: 10,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    tintColor: 'white',
                  }}
                  source={require('../../src/assets/images/my-cart-icon.png')}
                />
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'green',
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
                    {countArr}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              alignSelf: 'center',
              alignItems: 'center',
              color: 'black',
              fontWeight: '500',
              paddingTop: 20,
              paddingBottom: 150,
            }}>
            Dashboard
          </Text>
          <View
            style={{
              // backgroundColor: '#f55656',
              // flexDirection: 'row',
              justifyContent: 'center',
              // alignSelf: 'center',
              flex: 1,
              paddingStart: 30,
              paddingTop: 10,
              paddingEnd: 30,
            }}>
            <TouchableOpacity
              style={{
                width: '94%',
                height: 55,
                backgroundColor: '#252324',
                marginTop: 20,
                color: '#f55656',
                alignSelf: 'center',
                marginBottom: 14,
                borderRadius: 10,
              }}
              onPress={() =>
                navigation.navigate('StockSearch', {deviceid: ''})
              }>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingTop: 14,
                  color: '#ffff',
                  fontWeight: '500',
                }}>
                Review Stock
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '94%',
                height: 55,
                backgroundColor: '#252324',
                marginTop: 20,
                color: '#f55656',
                alignSelf: 'center',
                marginBottom: 14,
                borderRadius: 10,
              }}
              onPress={() =>
                navigation.navigate('CreateOrder', {deviceid: ''})
              }>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingTop: 14,
                  color: '#ffff',
                  fontWeight: '500',
                }}>
                Create Order
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 15,
                color: 'white',
                alignSelf: 'center',
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Notice :
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '92%',
                  backgroundColor: 'black',
                  fontSize: 15,
                  color: 'white',
                  marginTop: 10,
                  shadowColor: 'grey',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 3,
                  padding: 5,
                  borderColor: 'grey',
                  borderWidth: 0.6,
                  marginBottom: 20,
                  borderRadius: 4,
                }}
                textAlignVertical={'top'}>
                {noticeText}
              </Text>

              <TouchableOpacity
                style={{
                  marginStart: 3,
                  alignSelf: 'center',
                  marginTop: -4,
                }}
                onPress={() => refreshNoticeApi()}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    backgroundColor: 'transparent',
                  }}
                  source={require('../../src/assets/images/outline_refresh_black_36pt_3x.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal
          transparent={true}
          animationType={'none'}
          visible={progress}
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
                animating={progress}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Modal
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            isVisible={isDrawerOpen}
            onBackdropPress={toggleDrawer}
            style={styles.modal}
            backdropOpacity={0.5}>
            <View style={styles.drawer}>
              <Image
                source={require('../assets/images/zaman_logo.jpg')}
                style={{
                  alignSelf: 'center',
                  height: 125,
                  width: 125,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderTopColor: '#000',
                  borderBottomColor: '#000',
                  width: '100%',
                  marginVertical: 20,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#000',
                    fontStyle: 'normal',
                  }}>
                  Arras Furnishing LLP
                </Text>
              </View>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => toggleDrawer()}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#ebebeb',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="clipboard-clock-outline"
                    color={'#000'}
                    size={30}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#000',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    Dashboard{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleDrawer();
                    navigation.navigate('StockSearch');
                  }}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="clipboard-text-clock-outline"
                    color={'#000'}
                    size={30}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1A1A1A',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    Review Stock{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleDrawer();
                    navigation.navigate('CreateOrder');
                  }}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="calendar-end"
                    color={'#000'}
                    size={30}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1A1A1A',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    Create Order{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleDrawer();
                    navigation.navigate('MyCart');
                  }}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="cart-variant"
                    color={'#000'}
                    size={30}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1A1A1A',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    My Cart{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleDrawer();
                    navigation.navigate('MyProfile');
                  }}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <AntDesign name="user" color={'#000'} size={30} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1A1A1A',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    My Profile{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleDrawer();
                    navigation.navigate('ForgetPass');
                  }}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="lock-check-outline"
                    color={'#000'}
                    size={30}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1A1A1A',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    Change Password{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleDrawer();
                    logout();
                  }}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="logout"
                    color={'#000'}
                    size={30}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#1A1A1A',
                      fontStyle: 'normal',
                      marginLeft: 5,
                    }}>
                    Logout{' '}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </ImageBackground>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  drawer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '70%', // Adjust width as needed
    height: '100%', // Takes full height of screen
    paddingTop:Platform.OS === 'ios' ? 80:10
  },
  closeText: {
    alignSelf: 'flex-end',
    color: 'blue',
  },
});
export default Dashboard;
