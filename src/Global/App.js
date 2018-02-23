import { Navigation } from 'react-native-navigation';
import { store } from 'statorgfc';

/*                  Relative imports                       */
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Login from '../screens/Authentication/login';
import Signup from '../screens/Authentication/signup';
import AddMessagesScreen from '../screens/AddMessagesScreen/AddMessagesScreen';
import LocationScreen from '../screens/LocationScreen/LocationScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import SideDrawer from '../screens/SideDrawer/SideDrawer';
import NewLocationScreen from '../screens/AddMessagesScreen/newLocation';
import AddLocationScreen from '../screens/AddMessagesScreen/newLocation';
import Auth from '../screens/Auth';
import Test from '../Test';
//this initializes the global state
store.initialize({ count: 0 });

//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent('spot.Auth', () => Auth);
Navigation.registerComponent('spot.LoginScreen', () => Login);
Navigation.registerComponent('spot.SignupScreen', () => Signup);
Navigation.registerComponent('spot.AddMessagesScreen', () => AddMessagesScreen);
Navigation.registerComponent('spot.AddLocationScreen', () => AddLocationScreen);
Navigation.registerComponent('spot.LocationScreen', () => LocationScreen);
Navigation.registerComponent('spot.ProfileScreen', () => ProfileScreen);
Navigation.registerComponent('spot.SettingsScreen', () => SettingsScreen);
Navigation.registerComponent('spot.HomeScreen', () => HomeScreen);
Navigation.registerComponent('spot.SideDrawer', () => SideDrawer);
Navigation.registerComponent('spot.Test', () => Test);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'spot.Test',
        title: 'Spot!'
    }
});
