import { Navigation } from 'react-native-navigation';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AuthScreen from '../screens/Auth';

//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent('spot.SplashScreen', () => AuthScreen);
Navigation.registerComponent('spot.HomeScreen', () => HomeScreen);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'spot.SplashScreen',
        title: 'Welcome'
    }
});
