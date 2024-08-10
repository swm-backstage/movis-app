/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import './src/utils/hedlessTask'
import {name as appName} from './app.json';
import App from './App'

AppRegistry.registerComponent(appName, () => App);
