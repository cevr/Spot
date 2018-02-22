import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.resolve(Icon.getImageSource('md-home', 30)).then(source =>
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'spot.HomeScreen',
                    label: 'Home',
                    title: 'Home',
                    icon: source
                }
            ]
        })
    );
};

export default startTabs;
