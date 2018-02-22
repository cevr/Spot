import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Button,
  ToastAndroid
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default class AddMessagesScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 45.5017,
        longitude: -73.5673,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0003
      }
    };
  }

  newLocation = () => {
    this.props.navigator.showModal({
      screen: "spot.NewLocationScreen",
      title: "New Location",
      passProps: {
        setLocation: inpRegion => {
          console.log("region final", inpRegion);
          this.setState({ region: inpRegion });
        },
        region: this.state.region
      }
    });
  };

  existingLocation = () => {
    console.log("region after render", this.state.region);
  };

  submitMsg = () => {};

  //   mapReady = () => {
  //     this.setState({ mapReady: true });
  //   };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
        <View>
          <TextInput
            placeholder="Type up to 256 characters here"
            placeholderTextColor="#c4c4c4"
            style={styles.msgBody}
            underlineColorAndroid="transparent"
            multiline={true}
            maxLength={256}
          />
        </View>
        <View style={styles.mapContainer}>
          <MapView
            region={this.state.region}
            style={styles.map}
            // onLayout={this.mapReady}
          >
            <Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
            />
          </MapView>
        </View>
        <View>
          <View style={styles.button}>
            <Button title="New Location" onPress={this.newLocation} />
          </View>
          <View style={styles.button}>
            <Button title="Existing Location" onPress={this.existingLocation} />
          </View>
          <View style={styles.button}>
            <Button
              title="Send Message"
              onPress={this.submitMsg}
              color="#1d3c72"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 26,
    margin: 30
  },
  msgBody: {
    height: 120,
    width: 240,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#c4c4c4",
    textAlignVertical: "top",
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    margin: 5
  },
  mapContainer: {
    position: "absolute",
    top: 270,
    left: 0,
    right: 0,
    bottom: 0,
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
  }
});
