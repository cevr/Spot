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
    fetch('http://jodysmith.ca:5000/listCreate', {
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
export const listRead = async listId => {
    let response = await fetch('http://jodysmith.ca:5000/listRead', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ listId })
    })
        .then(res => res.json())
        .then(res => {
            if (res.res !== false) {
                //backend not sending res.res when successful
                return res[0];
            }
            return res;
        });
};

//update info of a single list
export const listUpdate = async (listid, reqKey, reqValue) => {
    let reqBody = { listid, reqKey, reqValue };
    fetch('http://jodysmith.ca:5000/listUpdate', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(reqBody)
    })
        .then(res => res.json())
        .then(json => {
            if (json.err) {
                return json.err;
            }
            return json.res;
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

}
