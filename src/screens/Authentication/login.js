import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../redux/actions';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  TextInput
} from 'react-native';
import startTabs from '../../Tabs/startTabs';
import { Button } from '../../UI';
class Login extends Component {
  state = {};

  login = () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);
    fetch("http://jodysmith.ca:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",

      },
      body: JSON.stringify(data),
      credentials: "include"
    })
      .then(res => res.json())
      .then(x => {
        console.log(x)
        if (x.res === false) {
          ToastAndroid.show(x.err, ToastAndroid.SHORT);
          //this.props.logIn(true);
          // startTabs;
        } else {
          startTabs();
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  showSignup = () => {
    ToastAndroid.show('signup', ToastAndroid.SHORT)
    this.props.navigator.showModal({
      screen: "spot.SignupScreen",
      title: "Sign Up",
      animated: true,

    })
  }

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
        <Text onPress={this.showSignup}>
          Don't have an account? Sign up
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    alignItems: 'center'
  },
  textInput: {
    height: 45,
    width: 280
  }
});

const mapDispatchtoProps = dispatch => {
  return {
    logIn: () => {
      dispatch(logIn);
    }
  };
};

export default connect(null, mapDispatchtoProps)(Login);
