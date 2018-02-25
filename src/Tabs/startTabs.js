import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//Icon library is useful for phone apps...
//However, it is actually necessary when using react-native-navigation
// See object bellow
const navigatorStyle = {
    navBarBackgroundColor: '#890C10',
    navBarTextColor: '#F6F6F6',
    topBarElevationShadowEnabled: true,
    screenBackgroundColor: '#F6F6F6',
    navBarHideOnScroll: true,
    statusBarColor: '#890C10'
};

const startTabs = () => {
    //Icon.getImageSource is async, therefore you need to resolve it through a promise or an async/await (couldn't get it working with async)
    Promise.all([
        Icon.getImageSource('home-outline', 40),
        Icon.getImageSource('crosshairs-gps', 40),
        Icon.getImageSource('plus-circle-outline', 40),
        Icon.getImageSource('account-circle', 40),
        Icon.getImageSource('settings', 40),
        Icon.getImageSource('menu', 30)
    ]).then(sources =>
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'spot.HomeScreen',
                    label: 'Home',
                    title: 'Home',
                    //this icon key is a required value otherwise react throws an error
                    icon: sources[0],
                    navigatorStyle,
                    navigatorButtons: {
                        rightButtons: [
                            {
                                icon: sources[5],
                                title: 'Settings',
                                id: 'sideDrawerToggle',
                                buttonColor: '#F6F6F6'
                            }
                        ]
                    }
                },
                {
                    screen: 'spot.AddMessagesScreen',
                    label: 'Add Message',
                    title: 'Add Message',
                    icon: sources[2],
                    navigatorStyle,
                    navigatorButtons: {
                        rightButtons: [
                            {
                                icon: sources[5],
                                title: 'Settings',
                                id: 'sideDrawerToggle',
                                buttonColor: '#F6F6F6'
                            }
                        ]
                    }
                },
                {
                    screen: 'spot.LocationScreen',
                    label: 'All Locations',
                    title: 'All Locations',
                    icon: sources[1],
                    navigatorStyle,
                    navigatorButtons: {
                        rightButtons: [
                            {
                                icon: sources[5],
                                title: 'Settings',
                                id: 'sideDrawerToggle',
                                buttonColor: '#F6F6F6'
                            }
                        ]
                    }
                }
            ],
            drawer: {
                right: {
                    screen: 'spot.SettingsScreen'
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: '#F6F6F6',
                tabBarBackgroundColor: '#890C10',
                orientation: 'portrait'
            },
            animationType: 'slide-down'
        })
    );
};

//this is imported as a function so we can call it as a side-effect in the login screen
export default startTabs;
