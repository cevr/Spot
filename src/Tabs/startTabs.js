import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
//Icon library is useful for phone apps...
//However, it is actually necessary when using react-native-navigation
// See object bellow
const startTabs = () => {
    //Icon.getImageSource is async, therefore you need to resolve it through a promise or an async/await (couldn't get it working with async)
    Promise.resolve(Icon.getImageSource('md-home', 30)).then(source =>
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'spot.HomeScreen',
                    label: 'Home',
                    title: 'Home',
                    //this icon key is a required value otherwise react throws an error
                    icon: source
                }
            ]
        })
    );
};

//this is imported as a function so we can call it as a side-effect in the login screen
export default startTabs;
