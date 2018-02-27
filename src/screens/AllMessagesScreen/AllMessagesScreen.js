import React, { Component } from "react";
import { View, ToastAndroid, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { setData } from "../../redux/actions";
import CardList from "../HomeScreen/Components/CardList";
export default class AllMessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "settingsToggle") {
        this.props.navigator.toggleDrawer({
          side: "right"
        });
      }
    }
  };
  render() {
    return (
      <View style={styles.CardList}>
        {/* <CardList navigator={this.props.navigator} /> */}
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
