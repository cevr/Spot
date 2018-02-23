import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ToastAndroid,
  Picker
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";

export default class NewLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inpLocation: "",
      region: this.props.region
    };
  }

  //this fetch will be handled in backend
  async fetchCoordinates(location) {
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    let gmaps = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBir9MEzI0sPVqb1RltNNZh7WA9YcyNa9U`;
    let region = await fetch(gmaps)
      .then(raw => raw.json())
      .then(coordinates => {
        let region = {
          coordinates: {
            latitude: coordinates.results[0].geometry.location.lat,
            longitude: coordinates.results[0].geometry.location.lng
          },
          radius: this.state.radius
        };
        this.setState({ region });
        return region;
      });
    return region;
  }

  enterLocation = async () => {
    let region = await this.fetchCoordinates(this.state.inpLocation);
    console.log("region at enterLoc", region);
    this.props.setLocation(region);
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            region={{
              ...this.state.region.coordinates,
              latitudeDelta: 0.005,
              longitudeDelta: 0.003
            }}
            style={styles.map}
          >
            <Marker coordinate={this.state.region.coordinates} />
            <Circle
              center={this.state.region.coordinates}
              radius={this.state.region.radius}
              strokeColor="#72a3b2"
              fillColor="rgba(140, 201, 219, 0.5)"
            />
          </MapView>
        </View>
        <View>
          <TextInput
            placeholder="Enter location"
            placeholderTextColor="#c4c4c4"
            style={styles.msgBody}
            underlineColorAndroid="transparent"
            maxLength={60}
            onChangeText={inp => this.setState({ inpLocation: inp })}
          />
          <Picker
            prompt="Radius"
            selectedValue={this.state.radius}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ radius: itemValue })
            }
          >
            <Picker.Item label="Small" value={30} />
            <Picker.Item label="Medium" value={60} />
            <Picker.Item label="Large" value={100} />
          </Picker>
          <View>
            <Button title="Ok" onPress={this.enterLocation} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  msgBody: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#c4c4c4",
    textAlignVertical: "top",
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    margin: 10
  },
  mapContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    bottom: 300,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  picker: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#c4c4c4",
    width: 200
  }
});