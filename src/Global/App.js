import { Navigation } from 'react-native-navigation';
import HomeScreen from '../HomeScreen/HomeScreen';
import AuthScreen from '../screens/Auth/Auth';
//React native requires a wrapper to render component
Navigation.registerComponent('spot.SplashScreen', () => AuthScreen);
Navigation.registerComponent('spot.HomeScreen', () => HomeScreen);
//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'spot.SplashScreen',
        title: 'Welcome'
    }
});
