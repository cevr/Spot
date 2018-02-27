import { ToastAndroid } from 'react-native';
import { Navigation } from 'react-native-navigation';
const url = 'https://jodysmith.ca/';

//used to get coordinates from address in AddMessageScreen
export const fetchCoordinates = async location => {
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    let gmaps = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBir9MEzI0sPVqb1RltNNZh7WA9YcyNa9U`;
    return await fetch(gmaps)
        .then(raw => raw.json())
        .then(coordinates => {
            return {
                coordinates: {
                    latitude: coordinates.results[0].geometry.location.lat,
                    longitude: coordinates.results[0].geometry.location.lng
                }
            };
        });
};

//creates a message; sends message & location data to backend, used in AddMessageScreen
export const createMessage = reqBody => {
    fetch(url + 'listCreate', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(reqBody)
    })
        .then(res => res.json())
        .then(json => {
            console.log('CREATE MESSAGE RESPONSE', json);
            if (!json.res)
                ToastAndroid.show(
                    'Could not create message',
                    ToastAndroid.SHORT
                );
        });
};

//get info of a single list (onCardPress)
export const listRead = listid => {
    return fetch(url + 'listRead', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ listid })
    })
        .then(res => res.json())
        .then(json => {
            console.log('LIST READ JSON RESPONSE', json);
            return json[0];
        });
};

export const SignUpPage = () => {
    Navigation.startSingleScreenApp({
        screen: {
            title: 'Spot!',
            screen: 'spot.LoginScreen',
            navigatorStyle: { navBarHidden: true }
        }
    });
};
