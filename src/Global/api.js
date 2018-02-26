import { ToastAndroid } from "react-native";

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
  fetch("http://jodysmith.ca:5000/listCreate", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(reqBody)
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (!res.res)
        ToastAndroid.show("Could not create message", ToastAndroid.SHORT);
    });
};

export const checkLocation = async (lat, long) => {
  let response = await fetch("http://jodysmith.ca:5000/locCheck", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ lat, long })
  })
    .then(res => res.json())
    .then(res => {
      console.log("response body: ", res);
      if (res.res) {
        return [];
      }
      return res;
    });
  return response;
};
