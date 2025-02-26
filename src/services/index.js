
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class API {
  // static contextType = AuthContext;
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  get(endpoint, params) {
    return this.httpRequestget('GET', this.baseUrl + endpoint, params);
  }
  post(endpoint, params) {
    return this.httpRequest('POST', this.baseUrl + endpoint, params);
  }
  postWithoutHeader(endpoint, params) {
    return this.httpRequestWithoutHeader('POST', this.baseUrl + endpoint, params);
  }
  postWithFormData(endpoint, params) {
    return this.httpRequestWithFormData('POST', this.baseUrl + endpoint, params);
  }
  httpRequestWithFormData(method, url, params) {
    console.log(params);
    
    return new Promise(async (resolve, reject) => {
      console.log('enter111');
      var token = await AsyncStorage.getItem('token');
      console.log(JSON.stringify(params));
      let options = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        method: method,
        body: params,
      };
      console.log(url, options);
      // console.log(options);
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          console.log(responseJson);
        })
        .catch(error => {
          reject(error);
        }); //to catch the errors if any
    });
  }
  httpRequest(method, url, params) {
    console.log(params);
  

    return new Promise(async (resolve, reject) => {
      
      console.log(JSON.stringify(params));

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }


      let options = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
         // Authorization: 'Bearer ' + token,
        },
        method: method,
        body: formData,
      };
      console.log(url, options);
      // console.log(options);
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          console.log(responseJson);
        })
        .catch(error => {
          //reject(error);
          resolve(error);
        }); //to catch the errors if any
    });
  }
  httpRequestWithoutHeader(method, url, params) {
    console.log(params);
  
    return new Promise(async (resolve, reject) => {
      console.log(JSON.stringify(params));

      var formData = new FormData();

for (var k in params) {
  formData.append(k, params[k]);
}

      let options = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
        method: method,
        body: formData,
      };
      console.log(url, options);
      // console.log(options);
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          console.log(responseJson);
        })
        .catch(error => {
          reject(error);
        }); //to catch the errors if any
    });
  }

  httpBlogRequestget(method, url, params) {
    return new Promise(async (resolve, reject) => {
      var token = await AsyncStorage.getItem('token');
      console.log(token);
      let options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + token,
        },
        method: method,
        body: JSON.stringify(params),
      };
      console.log(url);
      // console.log(options);
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        }); //to catch the errors if any
    });
  }
}
