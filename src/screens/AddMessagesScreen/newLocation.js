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
import MapView, { Marker } from "react-native-maps";

export default class NewLocation extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 45.5017,
        longitude: -73.5673,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  enterLocation = () => {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView region={this.state.region} style={styles.map}>
            <Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
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
          />
          <Picker
            mode="dropdown"
            prompt="Radius"
            selectedValue={this.state.radius}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ radius: itemValue })
            }
          >
            <Picker.Item label="X-Small" value={10} />
            <Picker.Item label="Small" value={30} />
            <Picker.Item label="Medium" value={50} />
            <Picker.Item label="Large" value={80} />
            <Picker.Item label="X-Large" value={100} />
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
