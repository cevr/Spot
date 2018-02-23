import React, { Component } from "react";
import { View, ToastAndroid, StyleSheet } from "react-native";
import data from "../../Global/fakeLocations";
import CardList from "../HomeScreen/Components/CardList";
class LocationScreen extends Component {
  state = { data };
  render() {
    const { data } = this.state;
    return (
      <View style={styles.CardList}>
        <CardList messages={data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CardList: {
    flex: 1,
    margin: 40
  }
});
export default LocationScreen;
