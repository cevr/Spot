import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
//Icon library is useful for phone apps...
//However, it is actually necessary when using react-native-navigation
// See object bellow
const startTabs = () => {
    //Icon.getImageSource is async, therefore you need to resolve it through a promise or an async/await (couldn't get it working with async)
    Promise.all([
        Icon.getImageSource('ios-home-outline', 30),
        Icon.getImageSource('ios-locate-outline', 30),
        Icon.getImageSource('ios-add-circle-outline', 30),
        Icon.getImageSource('ios-contact-outline', 30),
        Icon.getImageSource('ios-settings-outline', 30),
        Icon.getImageSource('ios-menu', 30)
    ]).then(sources =>
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'spot.HomeScreen',
                    label: 'Home',
                    title: 'Home',
                    //this icon key is a required value otherwise react throws an error
                    icon: sources[0]
                },
                {
                    screen: 'spot.LocationScreen',
                    label: 'All Locations',
                    title: 'All Locations',
                    icon: sources[1]
                },
                {
                    screen: 'spot.AddMessagesScreen',
                    label: 'Add Message',
                    title: 'Add Message',
                    icon: sources[2]
                },
                {
                    screen: 'spot.ProfileScreen',
                    label: 'Profile',
                    title: 'My Profile',
                    icon: sources[3]
                },
                {
                    screen: 'spot.SettingsScreen',
                    label: 'Settings',
                    title: 'Settings',
                    icon: sources[4]
                }
            ],
            drawer: {
                right: {
                    screen: 'spot.SettingsScreen'
                }
            }
        })
    );
};

//this is imported as a function so we can call it as a side-effect in the login screen
export default startTabs;
