
import {Dimensions} from 'react-native';

var React = require('react-native');

var {StyleSheet} = React;

var {height, width} = Dimensions.get('window');

export const PrimaryColor = '#035048';

module.exports = StyleSheet.create({
  //////////////////////// GENERAL

  padding_general: {
    padding: 20,
    backgroundColor: '#FFF',
  },

  background_general: {
    backgroundColor: '#FFF',
  },

  card_general: {
    width: width,
  },

  gradient_general: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title_general: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle_general: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: '300',
  },

  touchBookmark: {
    backgroundColor: PrimaryColor,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 15,
    bottom: -25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  touchBookmarkTran: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 50,
    height: 50,
    position: 'absolute',
    right: 15,
    top: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //////////////////////// CATEGORIES

  title_categories: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  title_categories_background: {
    width: width,
    alignItems: 'center',
    padding: 15,
  },

  title_categories_border: {
    height: 2,
    backgroundColor: PrimaryColor,
    width: 50,
  },

  gradient_categories: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  background_categories: {
    width: width,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  gradient_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  title_2columns_background: {
    width: width * 0.5,
    alignItems: 'center',
    padding: 15,
  },

  background_2columns: {
    width: width * 0.5,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  background_exercises: {
    width: width * 0.5,
    height: height / 4.35,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  //////////////////////// POSTS

  title_posts_categories: {
    color: '#000',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
    paddingTop: 2,
    marginTop: 20,
    // textAlign: 'center',
  },
  title_posts_categoriesdetis: {
    color: '#000',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    paddingTop: 2,
    marginTop: 20,
    textAlign: 'center',
  },
  desc_posts_categories: {
    color: '#000',
    fontSize: 13,
    padding: 10,
    fontWeight: 'bold',
    marginEnd: 20,
    // paddingTop: 2,
  },
  date_posts: {
    color: 'rgba(255,255,255,0.50)',
    fontSize: 11,
    padding: 10,
    paddingBottom: 0,
    fontWeight: 'bold',
  },

  gradient_posts_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_posts_2columns: {
    width: width * 0.46,
    height: height * 0.24,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderRadius: 7,
    marginStart: 7,
    marginTop: 7,
    marginBottom: 7,
  },

  postDetail_background: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postDetail_gradient: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  postDetail_title: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 5,
    lineHeight: 30,
  },

  postDetail_tag: {
    fontSize: 18,
    fontWeight: 'normal',
    color: PrimaryColor,
    lineHeight: 30,
  },

  postDetail_date: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
    marginLeft: 0,
    paddingLeft: 8,
  },

  postCommentButton: {
    backgroundColor: PrimaryColor,
    elevation: 0,
    shadowOpacity: 0,
  },

  postCommentText: {
    color: '#FFFFFF',
  },

  //////////////////////// DIETS

  title_diets: {
    color: '#FFF',
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  title_diets_categories: {
    color: '#FFF',
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
  },

  category_diets: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: PrimaryColor,
    padding: 5,
  },

  subcategory_diets: {
    color: '#FFF',
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 10,
  },

  gradient_diets: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_diets: {
    width: width,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15,
  },

  gradient_diets_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_diets_2columns: {
    width: width * 0.46,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_diets_col: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info_diets: {
    backgroundColor: 'rgba(0,0,0,0.70)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    paddingBottom: 11,
    paddingTop: 11,
  },

  title_diets_detail: {
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 30,
  },

  gtitle_diets_detail: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  description_diets_detail: {
    fontSize: 14,
  },

  col_diets: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlecol_diets: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
    color: PrimaryColor,
  },

  tabs_diets: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e0dbda',
    // flex:1,
    width: 90,
  },

  activetabs_diets: {
    backgroundColor: '#11ba11',
    flex: 1,
    width: 90,
  },

  tabs_text_diets: {
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 'normal',
  },

  activetabs_text_diets: {
    color: '#333',
    fontWeight: 'normal',
  },

  //////////////////////// CARDS

  title_card: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold',
  },

  category_card: {
    color: PrimaryColor,
    marginBottom: 3,
    fontSize: 14,
  },

  subcategory_card: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.8,
  },

  gradient_card: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.23,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_card: {
    width: width,
    height: height * 0.23,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15,
  },

  //////////////////////// WORKOUT DETAILS

  title_workout: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 3,
    fontWeight: 'bold',
  },

  category_workout: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },

  gradient_workout: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  background_workout: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  col_workout: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlecol_workout: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PrimaryColor,
  },

  icon_workout: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ddd',
    position: 'absolute',
    right: 15,
  },

  textButton_workout: {
    color: '#000',
  },

  button_workout: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'rgba(0,0,0,0.02)',
    height: 48,
    paddingLeft: 15,
    elevation: 0,
    shadowOpacity: 0,
  },

  //////////////////////// EXERCISE

  footer_exercise: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginTop: 10,
    marginBottom: 5,
    elevation: 0,
    shadowOpacity: 0,
  },

  start_exercise: {
    backgroundColor: '#fff',
    borderColor: PrimaryColor,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 5,
    width: width * 0.9,
  },

  textStart_exercise: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },

  col_exercise: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlecol_exercise: {
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 6,
    fontSize: 16,
  },

  title_exercise_background: {
    width: width,
    alignItems: 'flex-start',
    padding: 15,
  },

  subtitle_exercise: {
    color: PrimaryColor,
  },

  icon_get: {
    fontSize: 14,
    fontWeight: 'bold',
    color: PrimaryColor,
  },

  icon_exercise: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginBottom: 7,
  },

  icon_videoexercise: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 7,
  },

  playButton: {
    backgroundColor: PrimaryColor,
    elevation: 0,
    shadowOpacity: 0,
  },

  playCol_exercise: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },

  //////////////////////// START

  button_start: {
    minWidth: 250,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: PrimaryColor,
    marginBottom: 11,
    height: 53,
  },

  logo_start: {
    width: 250,
    height: 140,
    marginTop: 15,
    marginBottom: 30,
  },

  //////////////////////// LOGIN & SIGNUP

  button_auth: {
    minWidth: 250,
    backgroundColor: PrimaryColor,
    marginBottom: 8,
    height: 53,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  login_main: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent:'space-around',
    // padding:20,
  },
  login_text_main: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // marginLeft: 20,
    // backgroundColor: '#f55656',
  },
  login_text_input_contain: {
    backgroundColor: "#fff",
        height: 300,
        borderRadius: 25,
        padding: '5%',
        margin: '5%',
        alignContent: 'center',
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 5,
  },
  login_text_input: {
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: '#dcdedc',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
     color:'black',
    paddingTop: 20,
  },
  login_text_font: {
    fontSize: 45,
    marginLeft: 40,
  },
  login_text_font1: {
    fontSize: 20,
    marginLeft: 40,
  },
  login_text_check: {
    fontSize: 20,
    marginLeft: 19,
    alignSelf: 'flex-start',
  },
  login_main_header: {
    backgroundColor: '#f55656',
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  login_text_forget: {
    fontSize: 18,
    marginLeft: 50,
    alignSelf: 'flex-end',
    paddingTop: 20,
    color: '#f55656',
  },
  login_btn_forget: {
    // fontSize: 18,
    // marginLeft: 50,
    // marginRight: 50,
    width: '94%',
    height: 55,
    backgroundColor: '#252324',
    marginTop: 20,
    color: '#f55656',
    alignSelf:"center",
    marginBottom: 14,
    borderRadius: 10
  },
  login_user_register: {
    fontSize: 18,
    marginLeft: 50,
    // alignSelf:"flex-end",
    paddingTop: 5,
    color: '#f55656',
  },
  login_text: {
    fontSize: 18,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 14,
    color: '#ffff',
    fontWeight: '500',
  },
  login_social_contain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    // backgroundColor: '#f55656',
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
  },
  //campaign style
  campaign_name_font: {
    fontSize: 18,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: '500',
    paddingTop: 20,
    paddingBottom: 150

  },
  campaign_text_font: {
    fontSize: 18,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#f55656',
    fontWeight: '700',
    paddingTop: 40,
  },
  campaign_btn_upload_image: {
    width: 80,
    height: 21,
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: '#f55656',
    justifyContent: 'center',
  },
  campaign_text_upload: {
    fontSize: 12,
    alignSelf: 'center',
    color: '#ffff',
  },
  campaign_btn_next: {
    width: 60,
    height: 45,
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: '#f55656',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  campaign_btn_next2: {
    width: 60,
    height: 25,
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: '#f55656',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  campaign_btn_back: {
    width: 60,
    height: 25,
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: '#f55656',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  campaign_name_contain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
  },
  campaign_btn_start: {
    width: 160,
    height: 25,
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: '#f55656',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  campaign_text_input: {
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#dcdedc',
    // borderBottomColor: '#000',
    // borderBottomWidth: 1,
    // paddingTop:20,
    marginTop: 20,
    color: 'black'
  },
  campaign_radio_contain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
  },
  campaign_details_contain: {
    // justifyContent: 'space-around',
    alignSelf: 'center',
    // paddingStart: 10,
    paddingTop: 10,
    // paddingEnd: 10,
    // backgroundColor: '#f55656',
    width:'90%',
  },
  campaign_details_text_contain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    // paddingStart: 10,
    padding: 7,
    // paddingEnd: 10,
  },
  campaign_details_date_contain: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'center',
    // paddingStart: 10,
    padding: 7,
    paddingTop: 10
    // paddingEnd: 10,
  },
  campaign_text_font1:{
    fontSize: 24,
    alignSelf: 'center',
    // color: '#ffff',
    fontWeight: '700',
  },
  sub_text_font1:{
    fontSize: 15,
    // alignSelf: 'center',
    // color: '#ffff',
    fontWeight: '500',
    textAlign:"center"
  },
  //Dashboard style
  dashboard_main_btn: {
    // backgroundColor: '#f55656',
    // flexDirection: 'row',
    justifyContent: 'center',
    // alignSelf: 'center',
    flex: 1,
    paddingStart: 30,
    paddingTop: 10,
    paddingEnd: 30,
  },
  dashboard_main_contain: {
    // backgroundColor: '#f55656',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'center',
    flex: 1,
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
  },
  dashboard_main_header: {
    backgroundColor: '#252324',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems:"center"
  },
  dashboard_main_headers: {
    backgroundColor: '#252324',
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doner_name_font: {
    fontSize: 19,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#000',
    fontWeight: '700',
    // paddingTop:40,
  },
  doner_dname_font: {
    fontSize: 19,
    alignSelf: 'flex-start',
    // alignItems: 'center',
    color: '#000',
    fontWeight: '700',
    paddingTop: 20,
  },
  doner_title_font: {
    fontSize: 14,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#757373',
    fontWeight: '500',
    marginTop: 20,
  },
  doner_title_font_Modified: {
    fontSize: 14,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#757373',
    fontWeight: '500',
    marginTop: 20,
    marginEnd: 5,
    fontWeight: 'bold'
  },
  prefer_title_font: {
    fontSize: 14,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#757373',
    fontWeight: '500',
    marginTop: 0,
  },
  doner_comment_font:{
    fontSize: 14,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#757373',
    fontWeight: '500',
    // marginTop: 20,
  },
  doner_comments_font: {
    fontSize: 19,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#d92323',
    fontWeight: '500',
    paddingTop: 10,
  },
  inner_barpro: {
    marginTop: 20,
    // marginStart:10,
    // borderColor: '#2c2e2c',
    // borderWidth: 3,
    flexDirection: 'row',
    // borderRadius: 30,
    width: '100%',
    // marginRight:10,
    backgroundColor: '#e6e6e6',
  },
  inner_bar: {
    width: '100%',
    height: 12,
    // borderRadius: 15,
    backgroundColor: '#11ba11',
    // marginTop:20,
    // marginStart:10,
  },
  inner_barpros: {
    marginTop: 20,
    flexDirection: 'row',
    // borderRadius: 30,
    width: '50%',
    // marginRight:10,
    backgroundColor: '#e6e6e6',
  },
  donate_btn_now: {
    // fontSize: 18,
    // marginLeft: 50,
    // marginRight: 50,
    width: 151,
    height: 40,
    backgroundColor: '#f55656',
    marginTop: 20,
    color: '#f55656',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
  },
  donate_btn_now1: {
    // fontSize: 18,
    // marginLeft: 50,
    // marginRight: 50,
    width: 151,
    height: 40,
    backgroundColor: '#f55656',
    marginTop: 0,
    color: '#f55656',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5
  },
  donate_btn_text: {
    fontSize: 21,
    alignSelf: 'center',
    color: '#ffff',
    fontWeight: '500',
  },
  donation_icon_font: {
    width: 18,
    height: 18,
    marginStart: 10,
    // marginTop: 20,
    backgroundColor: 'transparent',
  },
  location_icon_font: {
    width: 28,
    height: 28,
    // marginStart: 10,
    marginTop: 10,
    backgroundColor: 'transparent',
  },

  text_auth: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    minWidth: 200,
    marginTop: 5,
    color: '#808080',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  amount_text_input: {
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: '#dcdedc',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingTop: 0,
    color: 'black'
  },
  amount_main_contain: {
    // backgroundColor: '#f55656',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // flex: 1,
    padding: 10,
    // paddingTop: 10,
    // paddingEnd: 10,
  },
  amount_text_font1: {
    fontSize: 20,
    marginLeft: 10,
    textAlign:"left",
    alignSelf: 'center',
    marginTop: -30,
    marginBottom: 8
  },
  donate_btn: {
    width: 100,
    height: 50,
    backgroundColor: '#f55656',
    marginTop: 20,
    color: '#f55656',
    alignSelf: 'center',
    borderRadius: 6
  },
  donation_sub: {
    // flex: 1,
    // flexDirection: 'column',
    justifyContent:'center',
    // backgroundColor: '#f55656',
    alignSelf: 'center',
    paddingTop:0,
  },
  donation_main: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent:'space-between',
    // padding:20,
  },
  title_donation_text_font1: {
    fontSize: 25,
    marginLeft: 10,
    textAlign:"center",
    marginTop: 213
  },
  //profile
  profile_main_contain: {
    // backgroundColor: '#f55656',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'center',
    flex: 1,
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
  },
  user_profile_lbtext: {
    fontSize: 21,
    // alignSelf: 'center',
    color: '#9c9c9c',
    fontWeight: '700',
    marginTop: 10,
  },
  user_profile_text: {
    fontSize: 21,
    alignSelf: 'center',
    color: '#9c9c9c',
    fontWeight: '500',
    marginStart: 10,
  },
  view_btn_kyc: {
    // fontSize: 18,
    // marginLeft: 50,
    // marginRight: 50,
    width: 120,
    height: 25,
    backgroundColor: '#f55656',
    marginTop: 20,
    color: '#f55656',
    justifyContent: 'center',
    marginStart: 10,
  },
  user_kyc_font: {
    fontSize: 40,
    marginLeft: 12,
  },
  user_kyc_contain: {
    flex: 1,
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
  },
  profile_main_text_contain: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    
  },
  user_text_input: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: '90%',
    color: 'black'
  },
  user_edit_profile_lbtext: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    marginEnd: 10,
    // alignItems: 'flex-end',
    // alignSelf:'flex-end',
  },
  user_edit_contain: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: '#f55656',
  },

  //////////////////////// HOME

  listitem_home: {
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon_home: {
    fontSize: 20,
    color: '#ddd',
  },

  note_home: {
    fontSize: 13,
  },

  //////////////////////// MENU

  container_menu: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  item_menu: {
    borderBottomWidth: 0,
    borderBottomColor: '#f7f8f9',
    marginLeft: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },

  text_menu: {
    fontSize: 16,
  },

  thumbnail_menu: {
    marginRight: 10,
    maxWidth: 40,
  },

  icon_menu: {
    fontSize: 20,
    color: '#ddd',
  },

  footer_menu: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  home_more: {
    minWidth: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    // borderColor: PrimaryColor,
    marginBottom: 11,
    borderColor: 'red',
    height: 50,
    color: '#000',
    borderRadius: 5,
  },
  homeTitle: {
    padding: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  stepView: {
    textAlign: 'center',
  },
  stepText: {
    textAlign: 'center',
    color: '#378ff0',
    fontWeight: '700',
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  // image: {
  //   marginTop: 50
  // },
  // heading: {
  //     marginTop: 40

  // },
  text: {
    marginHorizontal: 8,
    marginVertical: 10,
    textAlign: 'center',
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 19,
    fontWeight: '700',
  },
  task: {
    color: '#035048',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 35,
    marginBottom: 30,
  },
  counterText: {
    color: '#035048',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 5,
    paddingRight: 15,
  },
  homeEvent: {
    backgroundColor: '#d8cecd',
  },
  homeText: {
    borderLeftWidth: 3,
    borderLeftColor: '#77b942',
    paddingLeft: 6,
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  childView: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 120,
    height: 20,
    borderWidth: 2,
    borderColor: '#707070',
    borderRadius: 10,
    padding: 20,
  },

  More_text: {
    fontSize: 13,
    color: '#387069',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  cardTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 16,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  cardTitle_food: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    // alignContent: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    marginTop: 20,
  },
  needs_setting: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardTitle_report: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    // alignContent: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    marginLeft: 10,
    // backgroundColor: '#d8cecd',
    // width:'100%',
    // marginTop: 20,
  },
  cardTitle_dislike: {
    width: 60,
    height: 60,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 6,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
  card_dislikeimg: {
    height: 40,
    width: 40,
    marginEnd: 20,
    alignSelf: 'center',
    marginStart: 18,
    // padding:6,
    // marginTop: 10,
  },
  profileTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 20,
    marginStart: 30,
    marginTop: 10,
  },
  profileMedi: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    marginStart: 30,
    marginTop: 10,
  },
  profiledes: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 17,
    marginStart: 10,
    marginTop: 0,
  },
  suggestedTitle: {
    color: '#ffff',
    fontWeight: '700',
    fontSize: 18,
    // marginStart: 30,
    // marginTop: 10,
    padding: 6,
  },
  suggestedTitleweek: {
    color: '#ffff',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    // marginEnd: 20,
    textAlign: 'center',
  },
  needs_title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  needs_circle_red: {
    flexDirection: 'row',
    backgroundColor: '#e32114',
    height: 10,
    width: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  needs_circle_green: {
    backgroundColor: '#10a31c',
    height: 10,
    width: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  profileTitledesc: {
    color: '#035048',
    fontWeight: '400',
    fontSize: 16,
    marginStart: 10,
  },
  needs_titlecolor: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menstrual_title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 80,
    marginBottom: 20,
  },
  cardTitle_health: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 16,
    alignItems: 'center',
    marginStart: 10,
  },
  profileTitle_sugg: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    alignItems: 'center',
    marginStart: 30,
    marginTop: 20,
  },
  revenueTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 14,
    alignItems: 'center',
    marginStart: 30,
    marginTop: 20,
  },
  cardTitle_programs: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 16,
    alignItems: 'center',
    marginStart: 10,
    marginTop: 0,
  },
  cardTitle_date: {
    color: '#035048',
    fontWeight: '400',
    fontSize: 16,
    alignItems: 'center',
    marginStart: 10,
    marginTop: 0,
  },
  // inner_bar: {
  //   width: '100%',
  //   height: 12,
  //   borderRadius: 15,
  //   backgroundColor: '#11ba11',
  //   // marginTop:20,
  //   // marginStart:10,
  // },
  // inner_barpro: {
  //   marginTop: 20,
  //   // marginStart:10,
  //   borderColor: '#2c2e2c',
  //   borderWidth: 3,
  //   flexDirection: 'row',
  //   borderRadius: 30,
  //   width: '100%',
  //   // marginRight:10,
  // },
  weightTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 20,
    // alignItems:"center",
    marginStart: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  stepsTitle: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 18,
    // alignItems:"center",
    marginStart: 10,
    // marginTop:10,
    // marginBottom:20,
  },
  Titletoday: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 24,
    // alignItems:"center",
    marginStart: 24,
    marginTop: 20,
    // marginBottom:20,
  },
  flatButton: {
    // alignSelf: 'flex-end',
    // marginTop: 20,
    // marginBottom: 20,
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 30,
  },
  flatButton1: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 14,
    bottom: 30,
  },
  flatButtonhome: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    //  right: 10,
    right: 20,
    bottom: 20,
  },
  flatPopup: {
    // alignSelf: 'flex-end',
    // borderWidth: 1,
    borderRadius: 20,
    // elevation: 4,
    // height: 250,
    width: 170,
    marginEnd: 10,
    marginTop: -160,
    textAlignVertical: 'top',
    // alignSelf: 'flex-start',
    backgroundColor: '#ffff',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 9,
    // alignItems: 'stretch',
    // justifyContent:"center",
    alignSelf: 'center',
  },
  flatPopupcal: {
    width: 145,
    position: 'absolute',
    marginEnd: 10,
    textAlignVertical: 'top',
    // alignSelf: 'flex-start',
    backgroundColor: '#ffff',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 9,
    borderRadius: 20,
    // alignItems: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    right: 14,
    bottom: 90,
  },
  stepsLog: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    marginStart: 10,
    marginTop: 20,
    marginEnd: 10,
  },
  stepsLogTest: {
    color: '#035048',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
    marginStart: 10,
    marginTop: 20,
    marginEnd: 10,
  },
  stepsLog1: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 14,
    alignSelf: 'center',
    marginStart: 10,
    marginTop: 30,
    marginEnd: 10,
  },
  stepsLog2: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    marginStart: -30,
    marginTop: 30,
    marginEnd: 10,
    alignItems: 'center',
  },
  stepsLogdislike: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    marginStart: 10,
    // marginTop: 20,
    marginEnd: 10,
  },
  stepsSetting: {
    color: '#035048',
    // fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    marginStart: 10,
    marginTop: 10,
    marginEnd: 10,
    // marginBottom:10,
  },
  stepsSetting_bottom: {
    color: '#035048',
    // fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    marginStart: 10,
    marginTop: 10,
    marginEnd: 10,
    marginBottom: 18,
  },
  stepsLogs: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 18,
    marginStart: 10,
    marginTop: 10,
    // marginBottom:20,
    marginEnd: 20,
  },
  stepsLogsdlog: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 18,
    marginStart: 10,
    marginTop: 10,
    // marginBottom:20,
    marginEnd: 20,
  },
  stepsLogs_weight: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 18,
    marginStart: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  title_MENSTRUATION: {
    margin: 10,
    marginStart: 30,
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
  },
  title_subCate: {
    // margin: 10,
    // marginStart: 30,
    color: '#035048',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
  },
  dietTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    // alignSelf:"center",
    marginStart: 30,
    // marginTop: 10,
  },
  tabdays: {
    width: 40,
    height: 40,
    borderRightWidth: 1,
    borderColor: '#e0dbda',
    justifyContent: 'center',
  },
  tabdaysend: {
    width: 40,
    height: 40,
    // borderRightWidth:1,
    borderColor: '#e0dbda',
    justifyContent: 'center',
  },
  cardTitle_days: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    // alignSelf:"center",
    marginStart: 10,
    marginTop: 6,
  },
  cardTitle_desc: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 14,
    // alignSelf:"center",
    marginStart: 10,
    marginTop: 6,
    // textAlign:"center"
  },
  cardTitle_like: {
    width: 60,
    height: 60,
    // elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 6,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
  diabetesTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    marginStart: 30,
    marginTop: 6,
  },
  diationTitle: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 14,
    alignItems: 'center',
    marginStart: 10,
    marginEnd: 40,
    // marginTop: 20,
    // textAlign:"center",
  },
  cardTitle_healthnote: {
    color: '#035048',
    fontWeight: '400',
    fontSize: 18,
    alignItems: 'center',
    marginStart: 30,
    marginEnd: 40,
    marginTop: 20,
  },
  cardTitle_days1: {
    padding: 10,
    paddingTop: 10,
    marginTop: 20,
  },
  card_each: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 6,
    flex: 1,
  },
  cardTitle_text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card_likeimg: {
    height: 40,
    width: 40,
    marginEnd: 20,
    alignSelf: 'center',
    marginStart: 18,
    padding: 6,
    // marginTop: 10,
  },
  card_likeimgad: {
    height: 40,
    width: 40,
    marginEnd: 20,
    alignSelf: 'center',
    marginStart: 18,
    padding: 6,
    marginTop: 10,
  },
  stepsdeviation: {
    color: '#035048',
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
    // marginStart: 10,
    marginTop: 10,
  },
  card_eachitem: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 6,
    flex: 1,
    // marginTop: 10,
    backgroundColor: '#11ba11',
  },
  stepsEdit: {
    color: '#035048',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'flex-start',
    // marginStart: 10,
    marginTop: 10,
  },
  stepsView: {
    color: '#035048',
    fontWeight: '400',
    fontSize: 18,
    alignSelf: 'flex-start',
    // marginStart: 10,
    marginTop: 10,
    // width:'40%',
    // backgroundColor: '#11ba11',
    // marginEnd:90,
  },
  chatmessage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  messages: {
    alignSelf: 'stretch',
  },
  input: {
    alignSelf: 'stretch',
  },
  joinPart: {
    fontStyle: 'italic',
  },
});
