import {View, Text, Platform} from 'react-native';
import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  Modal,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services';

const AuthContext = createContext();
const AuthProvider = ({children, navigation}) => {
  const BaseUrl = 'https://shopninja.in/anurag/caross/api/user';

  const [userToken, setUserToken] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState();
  const [deviceId, setDeviceId] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [locationError, setLocationError] = useState({});
  const [locationFetch, setLocationFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');


  const initialFetch = {
    loading: false,
    success: false,
    error: false,
    response: false,
  };
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'setLoading':
        return {...state, loading: action.value};
      case 'setSuccess':
        return {...state, success: action.value};
      case 'setError':
        return {...state, error: action.value};
      case 'setResponse':
        return {...state, response: action.value};
      case 'reset':
        return initialFetch;
      default:
        return state;
    }
  };
  const [fetching, setFetching] = useReducer(fetchReducer, initialFetch);

  const initialAppData = {
    patients: '',
  };
  const dataReducer = (state, action) => {
    switch (action.type) {
      case 'setPatients':
        return {...state, patients: action.value};
      default:
        return state;
    }
  };
  const [appData, setAppData] = useReducer(dataReducer, initialAppData);

  const getToken = async () => {
    await AsyncStorage.getItem('userToken').then(value => {
      if (value !== null) {
        setUserToken(value);
        // getApiData(value)
      }
    });
  };

  const getIntialLaunch = () => {
    AsyncStorage.getItem('username').then(value => {
      console.log(value, 'valuessssss');
      if (value !== null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(null);
      }
    });
  };
 


  useEffect(() => {
    getToken();
    getIntialLaunch();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        userToken,
        fetching,
        setFetching,
        isFirstLaunch,
        setIsFirstLaunch,
        appData,
        setAppData,
        BaseUrl,
        userDetails,
        lat,
        setLat,
        long,
        setLong,
        currentLocation,
        setCurrentLocation,
        lat,
        setLat,
        long,
        setLong,
        Loginn: async () => {
            setIsFirstLaunch(true);
        },

        logout: async () => {
          try {
            setFetching({type: 'setLoading', value: true});

            await AsyncStorage.clear();
            setIsFirstLaunch(null);
            setFetching({type: 'setLoading', value: false});
          } catch (e) {
            setFetching({type: 'setLoading', value: false});
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};

// generate new debug.keystore ---
// keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
// see sha1 key --
// keytool -exportcert -keystore ./android/app/debug.keystore -list -v
