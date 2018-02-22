import { Navigation } from 'react-native-navigation';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Login from '../screens/Authentication/login';
import Signup from '../screens/Authentication/signup';
import AddMessagesScreen from '../screens/AddMessagesScreen/AddMessagesScreen';
import LocationScreen from '../screens/LocationScreen/LocationScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent('spot.LoginScreen', () => Login);
Navigation.registerComponent('spot.SignupScreen', () => Signup);
Navigation.registerComponent('spot.AddMessagesScreen', () => AddMessagesScreen);
Navigation.registerComponent('spot.LocationScreen', () => LocationScreen);
Navigation.registerComponent('spot.ProfileScreen', () => ProfileScreen);
Navigation.registerComponent('spot.SettingsScreen', () => SettingsScreen);
Navigation.registerComponent('spot.HomeScreen', () => HomeScreen);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'spot.LoginScreen',
        title: 'Spot!'
    }
});
