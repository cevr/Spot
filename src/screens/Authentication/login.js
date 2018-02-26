import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, attemptLogIn } from '../../redux/actions';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TextInput
} from 'react-native';
import startTabs from '../../Tabs/startTabs';
import { Button, DefaultTextInput, H2 } from '../../UI';
class Login extends Component {
    state = {};

    login = () => {
        let userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.logIn(userData);
    };
    componentDidUpdate() {
        if (this.props.isLoggedIn) startTabs();
    }
    showSignup = () => {
        ToastAndroid.show('signup', ToastAndroid.SHORT);
        this.props.navigator.showModal({
            screen: 'spot.SignupScreen',
            title: 'Sign Up',
            animated: true
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <H2 style={{ color: '#F6F6F6' }}>Spot!</H2>
                <DefaultTextInput
                    style={styles.textInput}
                    ref={x => {
                        this.email = x;
                    }}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder="Email Address"
                />
                <DefaultTextInput
                    style={styles.textInput}
                    ref={x => {
                        this.password = x;
                    }}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <Button onPress={this.login} title="Login" />
                <Text style={{ color: '#F6F6F6' }} onPress={this.showSignup}>
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
        backgroundColor: '#890B0E'
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
        logIn: userData => {
            dispatch(attemptLogIn(userData));
        }
    };
};

const mapStatetoProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
