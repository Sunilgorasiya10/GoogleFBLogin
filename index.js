/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import FBLogin from './FBLogin';

AppRegistry.registerComponent(appName, () => FBLogin);
