import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { enableLatestRenderer } from 'react-native-maps';

AppRegistry.registerComponent('api', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('api', { rootTag });
    enableLatestRenderer();
}