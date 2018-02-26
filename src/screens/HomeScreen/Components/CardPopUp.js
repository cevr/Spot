import React, { Component } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { listRead } from "../../../Global/api";

export default class CardPopUp extends Component {
  constructor() {
    super();
    this.state = { mapReady: false };
  }

  mapReady = () => {
    this.setState({ mapReady: true });
  };

  async componentDidMount() {
    let data = await listRead(this.props.id);
    if (data.title) {
      this.setState({ data });
    } else ToastAndroid.show(data.reason, ToastAndroid.SHORT);
  }

  render() {
    // if (this.state.data) {
    return (
      <View style={styles.container}>
        <Text style={styles.msgBody}>
          {this.props.items || "No message to display"}
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            region={{
              latitude: this.props.lat,
              longitude: this.props.long,
              latitudeDelta: 0.0005,
              longitudeDelta: 0.0002
            }}
            style={styles.map}
            onLayout={this.mapReady}
          >
            {this.state.mapReady && (
              <Marker
                coordinate={{
                  latitude: this.props.lat,
                  longitude: this.props.long
                }}
              />
            )}

            {this.state.mapReady && (
              <Circle
                center={{
                  latitude: this.props.lat,
                  longitude: this.props.long
                }}
                radius={this.props.rad}
                strokeColor="#72a3b2"
                fillColor="rgba(140, 201, 219, 0.5)"
              />
            )}
          </MapView>
        </View>
      </View>
    );
  }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  msgBody: {
    fontSize: 18,
    margin: 20
  },
  mapContainer: {
    position: "absolute",
    top: 270,
    left: 0,
    right: 0,
    bottom: 20,
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
