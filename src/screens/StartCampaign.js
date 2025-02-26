import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  // Picker,
} from 'react-native';
import {
  Container,
  // TextInput,
} from 'native-base';
import API from '../services/api';
var Styles = require('../assets/files/Styles');
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from 'react-native-simple-radio-button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import Selector from '../components/Selector';
import PickerDob from '../components/Picker';
import DateTimePicker from '../components/DateTimePicker';
const StartCampaign = ({navigation}) => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');

  const [date, setdate] = useState(new Date());
  const [image, setImage] = useState('');
  const [imageType, setImagetype] = useState('');
  const [amount, setamount] = useState('0');
  const [isNext, setNext] = useState(0);
  const [pincode, setpincode] = useState(0);
  const [selCamp, setselCamp] = useState('');
  const [mode, setMode] = useState('date');
  const [selectedValue, setselectedValue] = useState('');
  const [kind, setkind] = useState([]);
  const [isStartPickerVisible, setisStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setisEndPickerVisible] = useState(false);
  const [isFilterPickerVisible, setisFilterPickerVisible] = useState(false);
  const [filterValue, setfilterValue] = useState('');
  const [campaign_target_qty, setcampaign_target_qty] = useState('0');
  const [filter, setfilter] = useState('');
  const [ArrFilter, setArrFilter] = useState([]);
  const [strdate, setSdate] = useState(null);
  const [endseldate, setenddate] = useState(null);
  var radio_props = [
    {label: 'Money  ', value: '1'},
    {label: 'In Kind', value: '2'},
  ];
  const Next = () => {
    console.log(
      Title === '' &&
        Description === '' &&
        strdate === '' &&
        endseldate === '' &&
        image === '' &&
        filterValue === '',
    );
    console.log(moment(strdate).format('MM-DD-YYYY'));
    if (Title == '') {
      Alert.alert('Title', 'Please Add Title');
    } else if (Description == '') {
      Alert.alert('Description', 'Please Add Description');
      // }
      // else if (image == '') {
      // Alert.alert('Image', 'Please Add Image');
    } else if (filterValue == '') {
      Alert.alert('Image', 'Please Add Type of campaign');
    } else if (strdate == null) {
      Alert.alert('Start Date', 'Please Add Start Date');
    } else if (endseldate == null) {
      Alert.alert('End Date', 'Please Add End Date');
    } else {
      setNext(1);
      // if (Description == '') {
      //   Alert.alert('Description', 'Please Add Description');
      // } else if (strdate == '') {
      //   Alert.alert('Start Date', 'Please Add Start Date');
      // } else if (endseldate == '') {
      //   Alert.alert('End Date', 'Please Add End Date');
      // } else if (image == '') {
      //   Alert.alert('Image', 'Please Add Image');
    }
  };
  const Next2 = () => {
    console.log(selCamp);
    if (selCamp === '') {
      Alert.alert('Campaign', 'Please select one');
    } else {
      if (selCamp == '1') {
        setNext(2);
      } else {
        setNext(3);
      }
    }
  };
  const Back = () => {
    setNext(1);
    setselCamp('');
    setamount('');
  };
  const Start_Campaign = () => {
    if (amount == '') {
      Alert.alert('Amount', 'Please Add Amount');
    } else {
      // setNext(3);
      Start_CampaignNow();
    }
  };
  const setExpirystart = selectedDate => {
    var date = selectedDate.nativeEvent.timestamp;
    let formatted = moment(date, 'x').format('YYYY-MM-DD');
    console.log('selectedDate', formatted);
    setSdate(formatted);
    setisStart(false);
  };
  const setExpiryend = selectedDate => {
    var date = selectedDate.nativeEvent.timestamp;
    let formatted = moment(date, 'x').format('YYYY-MM-DD');
    console.log('selectedDate', formatted);
    setenddate(formatted);
    setisEnd(false);
  };
  const upload = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.5,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      imageUpload(image);
      // console.log(image);
    });
  };
  const imageUpload = image => {
    let item = {
      // id: Date.now(),
      url: image.data,
      // content: image.data,
    };
    // const fileToUpload = this.state.newDataImg;

    setImage(item.url);
    setImagetype(image.mime);
    // console.log(image.path);
  };
  const Start_CampaignNow = async () => {
    // var token = await AsyncStorage.getItem('token');
    var user_id = await AsyncStorage.getItem('user_id');

    // if (amount == '') {
    //   Alert.alert('Medical Detail', 'Medical Detail Successfully');
    // }
    console.log('selectedValue', selectedValue);
    var logs = {
      user_id: user_id,
      campaign_name: Title,
      donation_mode: selCamp,
      campaign_details: Description,
      campaign_start_date: moment(strdate).format('YYYY-MM-DD'),
      campaign_end_date: moment(endseldate).format('YYYY-MM-DD'),
      campaign_image: image,
      campaign_target_amount: amount,
      campaign_target_qty: campaign_target_qty,
      kind_id: selectedValue,
      zip: pincode,
      filter_by_type: filterValue,
    };
    console.log(logs);
    var response = await API.post('add_campaign', logs);
    if (response.status === 'success') {
      navigation.navigate('Dashboard');
      Alert.alert(response.status, response.message);
    } else {
      Alert.alert(response.status, response.message);
      // navigation.navigate('Dashboard');
    }
  };
  const setFilterType = async () => {
    var response = await API.post('filter_by_type_list');
    if (response.status == 'success') {
      // console.log(response.data);
      setArrFilter(response.data);
      console.log('ArrFilter', ArrFilter);
    } else {
      Alert.alert(response.status, response.message);
    }
  };
  const startDate = () => {
    setisStart(true);
  };
  const endDate = () => {
    setisEnd(true);
  };
  const hideDatePicker = () => {
    setisStart(false);
  };
  const fetchkind = async () => {
    var response = await API.post('kind_list');
    if (response.status == 'success') {
      console.log(response);
      setkind(response.data);
    } else {
      Alert.alert(response.status, response.message);
    }
  };
  useEffect(() => {
    setFilterType();
    fetchkind();
  }, []);
  const user = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token != null && token !== '') {
      navigation.navigate('User profile');
    } else {
      navigation.navigate('LogIn');
    }
  };
  return (
    <ScrollView>
      <Container>
        <ImageBackground
          source={require('../../src/assets/images/bg.jpg')}
          style={Styles.login_main}>
          <View style={Styles.dashboard_main_header}>
            <View style={Styles.dashboard_main_headers}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
              <TouchableOpacity onPress={() => user()}>
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
          <View style={Styles.login_text_main}>
            <Text style={Styles.campaign_name_font}>Start Campaign</Text>
          </View>
          {isNext == 0 ? (
            <View style={Styles.login_text_input_contain}>
              <Text style={Styles.campaign_text_font}>Step 1</Text>
              <TextInput
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                style={Styles.login_text_input}
                keyboardType="default"
              />
              <TextInput
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                style={Styles.login_text_input}
                keyboardType="default"
              />
              <TextInput
                placeholder="Pincode"
                onChangeText={text => setpincode(text)}
                style={Styles.login_text_input}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={Styles.campaign_btn_upload_image}
                onPress={() => upload()}>
                <Text style={Styles.campaign_text_upload}>Upload image</Text>
              </TouchableOpacity>
              <Picker
                selectedValue={filterValue}
                style={{
                  height: 50,
                  width: '100%',
                  borderColor: '#000',
                  alignSelf: 'center',
                  borderWidth: 1,
                }}
                onValueChange={
                  (itemValue, itemIndex) => setfilterValue(itemValue)
                  // console.log(itemValue)
                  // Alert.alert(itemValue)
                }>
                <Picker.Item label="Select one" value="" />
                {ArrFilter.map((item, index) => (
                  <Picker.Item label={item.name} value={item.id} />
                ))}
              </Picker>
              <View style={Styles.user_edit_contain}>
                <Selector
                  text={strdate ? moment(strdate).format('DD / MM / YYYY') : ''}
                  placeholder="Start Expiry"
                  marginTop={normalize(15)}
                  // onPress={() => setShowPicker(true)}
                  icon={require('../../src/assets/images/calendar.jpg')}
                  onPress={() => setisStartPickerVisible(true)}
                  width={'100%'}
                />
              </View>
              <View style={Styles.user_edit_contain}>
                <Selector
                  text={
                    endseldate
                      ? moment(endseldate).format('DD / MM / YYYY')
                      : ''
                  }
                  placeholder="End Expiry"
                  marginTop={normalize(15)}
                  // onPress={() => setShowPicker(true)}
                  icon={require('../../src/assets/images/calendar.jpg')}
                  onPress={() => setisEndPickerVisible(true)}
                />
              </View>
              <TouchableOpacity style={Styles.campaign_btn_next}>
                <Text
                  style={Styles.campaign_text_upload}
                  onPress={() => Next()}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {isNext == 1 ? (
            <View style={Styles.login_text_input_contain}>
              <Text style={Styles.campaign_text_font}>Step 2</Text>
              <Text style={Styles.campaign_name_font}>
                Select Type of Campaign
              </Text>
              <View style={Styles.campaign_radio_contain}>
                {/* <RadioForm
                  radio_props={radio_props}
                  initial={-1}
                  formHorizontal={true}
                  onPress={value => {
                    setselCamp(value);
                  }}
                /> */}
              </View>
              <TouchableOpacity
                style={Styles.campaign_btn_next2}
                onPress={() => Next2()}>
                <Text style={Styles.campaign_text_upload}>Next</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {isNext == 2 ? (
            <View style={Styles.login_text_input_contain}>
              <Text style={Styles.campaign_text_font}>Step 3</Text>
              <Text style={Styles.campaign_name_font}>
                Enter Donation Amount Target
              </Text>
              <TextInput
                placeholder="Enter Donation Amount"
                onChangeText={text => setamount(text)}
                style={Styles.campaign_text_input}
                keyboardType="number-pad"
              />
              <View style={Styles.campaign_name_contain}>
                <TouchableOpacity
                  style={Styles.campaign_btn_back}
                  onPress={() => Back()}>
                  <Text style={Styles.campaign_text_upload}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={Styles.campaign_btn_start}
                  onPress={() => Start_Campaign()}>
                  <Text style={Styles.campaign_text_upload}>
                    Start Campaign
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {isNext == 3 ? (
            <View style={Styles.login_text_input_contain}>
              <Text style={Styles.campaign_text_font}>Step 3</Text>
              <Text style={Styles.campaign_name_font}>
                Enter the kind of Donation
              </Text>
              <View style={{justifyContent: 'center'}}>
                <Picker
                  selectedValue={selectedValue}
                  style={{
                    height: 50,
                    width: '80%',
                    borderColor: '#000',
                    alignSelf: 'center',
                    borderWidth: 1,
                  }}
                  onValueChange={
                    (itemValue, itemIndex) => setselectedValue(itemValue)
                    // console.log(itemValue)
                    // Alert.alert(itemValue)
                  }>
                  <Picker.Item label="Select one" value="" />
                  {kind.map((item, index) => (
                    <Picker.Item label={item.kind_name} value={item.kind_id} />
                  ))}
                </Picker>
                <TextInput
                  placeholder="Enter Target Quantity"
                  onChangeText={text => setcampaign_target_qty(text)}
                  style={Styles.campaign_text_input}
                  keyboardType="number-pad"
                />
              </View>
              <View style={Styles.campaign_name_contain}>
                <TouchableOpacity
                  style={Styles.campaign_btn_back}
                  onPress={() => Back()}>
                  <Text style={Styles.campaign_text_upload}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.campaign_btn_start}
                  onPress={() => Start_Campaign()}>
                  <Text style={Styles.campaign_text_upload}>
                    Start Campaign
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </ImageBackground>
      </Container>
      <DateTimePicker
        value={strdate == null ? new Date(moment().toISOString()) : strdate}
        // maxDate={new Date(moment().toISOString())}
        minDate={null}
        dateTimePickerVisible={isStartPickerVisible}
        onDateChange={val => setSdate(val)}
        onBackdropPress={() => setisStartPickerVisible(false)}
        onPressDone={() => setisStartPickerVisible(false)}
      />
      <DateTimePicker
        value={
          endseldate == null ? new Date(moment().toISOString()) : endseldate
        }
        maxDate={null}
        minDate={null}
        dateTimePickerVisible={isEndPickerVisible}
        onDateChange={val => setenddate(val)}
        onBackdropPress={() => setisEndPickerVisible(false)}
        onPressDone={() => setisEndPickerVisible(false)}
      />
      <Picker
        backgroundColor={'#ffff'}
        dataList={ArrFilter}
        modalVisible={true}
        onBackdropPress={() => setisFilterPickerVisible(false)}
        renderData={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setfilterValue(item.name);
                setfilter(item.id);
                setisFilterPickerVisible(false);
              }}
              style={{
                paddingVertical: 12,
                borderBottomColor: '#DDDDDD',
                borderBottomWidth: 1,
              }}>
              <Text
                style={[
                  {
                    fontSize: 14,
                    lineHeight: 14,
                  },
                  filterValue == item.name,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

export default StartCampaign;
