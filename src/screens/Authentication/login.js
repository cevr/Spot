import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  TextInput
} from "react-native";
import startTabs from "../../Tabs/startTabs";
import { Button } from "../../UI";
class Login extends Component {
  state = {};
  login = () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);

    if (data.email === undefined || data.password === undefined) {
      ToastAndroid.show("Empty inputs", ToastAndroid.SHORT);
    } else if (!this.validateEmail(data.email)) {
      ToastAndroid.show(
        "Please enter a valid email format",
        ToastAndroid.SHORT
      );
    } else {
      fetch("http://jodysmith.ca:5000/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(json => {
          ToastAndroid.show("sign up successful", ToastAndroid.SHORT);
          startTabs();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  showSignup = () => {
    this.props.navigator.showModal({
      screen: "spot.SignupScreen",
      title: "Sign Up",
      animated: true
    });
  };

  //Regular expression for email address
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.textInput}
          ref={x => {
            this.email = x;
          }}
          onChangeText={text => this.setState({ email: text })}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.textInput}
          ref={x => {
            this.password = x;
          }}
          onChangeText={text => this.setState({ password: text })}
          placeholder="Password"
        />
        <Button onPress={this.login} title="Login" />
        <Text onPress={this.showSignup}>Don't have an account? Sign up</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center"
  },
  innerContainer: {
    alignItems: "center"
  },
  textInput: {
    height: 45,
    width: 280
  }
});
export default Login;
