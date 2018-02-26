import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Button,
  ToastAndroid,
  Dimensions
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { createMessage } from "../../Global/api";

export default class AddMessagesScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        coordinates: {
          //Default coordinates - Montreal
          latitude: 45.5017,
          longitude: -73.5673
        },
        radius: 15
      },
      msg: "",
      title: ""
    };
  }

  addLocation = () => {
    this.props.navigator.showLightBox({
      screen: "spot.AddLocationScreen",
      passProps: {
        setLocation: this.setLocation,
        region: this.state.region
      }
    });
  };

  setLocation = region => {
    console.log("SETTING LOCATION", region);
    this.setState({ region });
  };

  submitMsg = () => {
    let reqBody = {
      title: this.state.title,
      list: [this.state.msg],
      lat: this.state.region.coordinates.latitude,
      long: this.state.region.coordinates.longitude,
      rad: this.state.region.radius
    };
    createMessage(reqBody);
    this.setState({
      region: {
        coordinates: {
          latitude: 45.5017,
          longitude: -73.5673
        },
        radius: 0
      }
    });
  };

  mapReady = () => {
    this.setState({ mapReady: true });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
        <View>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#c4c4c4"
            style={styles.msgTitle}
            underlineColorAndroid="transparent"
            maxLength={40}
            onChangeText={text => this.setState({ title: text })}
          />
          <TextInput
            placeholder="Type up to 256 characters here"
            placeholderTextColor="#c4c4c4"
            style={styles.msgBody}
            underlineColorAndroid="transparent"
            multiline={true}
            maxLength={256}
            onChangeText={text => this.setState({ msg: text })}
          />
        </View>
        <View style={styles.mapContainer}>
          <MapView
            region={{
              ...this.state.region.coordinates,
              latitudeDelta: 0.0005,
              longitudeDelta: 0.0002
            }}
            style={styles.map}
            onLayout={this.mapReady}
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
          <View style={styles.button}>
            <Button title="Add Location" onPress={this.addLocation} />
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
    backgroundColor: "#F6F6F6"
  },
  title: {
    fontSize: 26,
    margin: 30
  },
  msgBody: {
    height: 100,
    width: 240,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#c4c4c4",
    textAlignVertical: "top",
    marginTop: 20,
    marginBottom: 10
  },
  msgTitle: {
    height: 40,
    width: 240,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#c4c4c4",
    textAlignVertical: "top",
    marginTop: 10
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
