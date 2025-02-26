import API from './index';
import ConfigApp from "../utils/ConfigApp";
import { Container } from 'native-base';

const Api = new API({
  baseUrl: ConfigApp.URL,
  // blogUrl: ConfigApp.BlogURL,
});

export default Api;