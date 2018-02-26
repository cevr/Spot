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
import { fetchCoordinates } from "../../Global/api";

export default class NewLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inpLocation: "",
      region: this.props.region
    };
  }

  enterLocation = async () => {
    let region = {
      ...(await fetchCoordinates(this.state.inpLocation)),
      radius: this.state.region.radius
    };
    this.props.setLocation(region);
    this.props.navigator.dismissLightBox();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.miniContainer}>
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
            selectedValue={this.state.region.radius}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                region: { ...this.state.region, radius: itemValue }
              })
            }
            style={styles.picker}
          >
            <Picker.Item label="Small" value={15} />
            <Picker.Item label="Medium" value={30} />
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
    backgroundColor: "rgba(120, 120, 120, 0.8)"
  },
  miniContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 180,
    width: 240,
    borderRadius: 10
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
  picker: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#c4c4c4",
    width: 200
  }
});
