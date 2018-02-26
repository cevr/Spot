import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid,
    Modal,
    TextInput
} from 'react-native';
class SignUp extends Component {
    state = {};

    onPressTest = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(data);
        fetch('http://jodysmith.ca:5000/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.res) {
                    ToastAndroid.show('sign up successful', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('sign up failed', ToastAndroid.SHORT)
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        });

    }

    //Regular expression for email address
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    //Render the Sign Up modal after pressing the Sign up button.
    renderSignUp() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    ref={x => {
                        this.email = x;
                    }}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder="Email address"
                    keyboardType={'email-address'}
                />
                <TextInput
                    style={styles.textInput}
                    ref={x => {
                        this.password = x;
                    }}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <Button onPress={this.onPressTest} title="Sign Up" />
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderSignUp()}
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


export default SignUp;
