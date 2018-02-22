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

        if (data.email === undefined || data.password === undefined) {
            ToastAndroid.show('Empty inputs', ToastAndroid.SHORT)
        } else if (!(this.validateEmail(data.email))) {
            ToastAndroid.show('Please enter a valid email format', ToastAndroid.SHORT);
        } else {
            fetch('http://10.65.109.159:4000/signup', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'credentials': 'include'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(json => {
                    ToastAndroid.show('sign up successful', ToastAndroid.SHORT);
                })
                .catch(err => {
                    console.log(err);
                });
            this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            });
        }
        // if (this.validateEmail(data.email)) {
        //     ToastAndroid.show("enter your email please", ToastAndroid.SHORT)
        // } else {
        //     
        // }


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
