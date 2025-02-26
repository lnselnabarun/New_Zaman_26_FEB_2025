// import React, {Component} from 'react';

// import {
//   StyleSheet,
//   Image,
//   ImageBackground,
//   View,
//   Dimensions,
// } from 'react-native';
// import {StatusBar} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default class SplashScreen extends Component {
//   //   async componentWillMount(){

//   //     let userLoggedInOrNotFlagString = await AsyncStorage.getItem('status');

//   //     if (userLoggedInOrNotFlagString == 'true')
//   //  {
//   //         setTimeout(()=>{
//   //           this.props.navigation.navigate('Dashboard');
//   //         },2000)
//   //         console.disableYellowBox = true;

//   //       }
//   //       else{
//   //         this.props.navigation.navigate('LoginScreen');
//   //       }
//   //     }

//   render() {
//     return (
//       <ImageBackground
//         source={require('../../src/assets/images/Zaman_BG1.jpg')}
//         style={styles.container}>
//         <StatusBar backgroundColor="#090915" barStyle="light-content" />

//         {/* <Image
//                                     source={require('../../src/assets/images/zaman_logo.jpg')}
//                                     style={{
//                                       height: 120,
//                                       width: '60%',
//                                       resizeMode: 'contain',
//                                       alignContent: 'center',
//                                       alignItems: 'center',
//                                       justifyContent: 'center',
//                                       position: 'absolute',
//                                       left: '20%',
//                                       right: '20%',
//                                       borderRadius: 5,
//                                       marginVertical:  Dimensions.get('window').height / 2 - 60,
//                                   }}
//                                 /> */}
//       </ImageBackground>
//     );
//   }
// }

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // remove width and height to override fixed static size
//     width: null,
//     height: null,
//   },
// });

import React, {useEffect} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await AsyncStorage.setItem('IsLogin', 'false');
      navigation.navigate('LoginScreen');
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={[
          {
            // width: '100%',
            // height: '100%',
            resizeMode: 'cover',
            // alignItems: 'baseline',
            justifyContent: 'center',
            // position: 'absolute',
            bottom: 0,
            // backgroundColor:'rgba(0,0,0,0)',
            flex: 1,
          },
        ]}
        source={require('../../src/assets/images/Zaman_BG1.jpg')}></ImageBackground>
    </View>
  );
};

export default SplashScreen;
