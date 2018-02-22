import { Navigation } from 'react-native-navigation';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Login from '../screens/Authentication/login';
import Signup from '../screens/Authentication/signup';

//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent('spot.LoginScreen', () => Login);
Navigation.registerComponent('spot.SignupScreen', () => Signup);
Navigation.registerComponent('spot.HomeScreen', () => HomeScreen);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'spot.SignupScreen',
        title: 'Welcome'
    }
});
