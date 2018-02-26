import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity as Touchable,
  Image
} from "react-native";

export default (Card = props => (
  // This prop is usually called at the CardList component
  <Touchable
    onPress={() => {
      props.navigator.showModal({
        screen: "spot.CardPopUp",
        title: props.cardData.title,
        passProps: {
          ...Object.assign({}, props.cardData),
          items: props.cardData.items[0]
        }
      });
    }}
  >
    <View style={styles.Card}>
      <Text style={{ fontSize: 15 }}>{props.cardData.title}</Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end"
        }}
      >
        {/* <Text
          style={{
            fontSize: 10
          }}
        >
          {props.cardData.items[0]}
        </Text> */}
      </View>
    </View>
  </Touchable>
));

const styles = StyleSheet.create({
  Card: {
    width: "100%",
    backgroundColor: "#eee",
    marginBottom: 8,
    padding: 7,
    flexDirection: "column",
    alignItems: "flex-start"
  }
});
