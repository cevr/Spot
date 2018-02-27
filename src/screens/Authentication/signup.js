import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Modal,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { attemptSignUp } from '../../redux/actions';
import { Button, DefaultTextInput, H2 } from '../../UI';

class SignUp extends Component {
    state = {};

    signUp = () => {
        let userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.signUp(userData);
    };
    componentDidUpdate() {
        if (this.props.isSignedUp) {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            });
        }
    }
    //Render the Sign Up modal after pressing the Sign up button.

    render() {
        return (
            <View style={styles.container}>
                <H2 style={{ color: '#890B0E' }}>Spot!</H2>
                <DefaultTextInput
                    style={styles.textInput}
                    ref={x => {
                        this.email = x;
                    }}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder="Email address"
                    keyboardType={'email-address'}
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
                <Button onPress={this.signUp} title="Sign Up" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
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

const mapStateToProps = state => {
    return {
        isSignedUp: state.isSignedUp
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: userData => {
            dispatch(attemptSignUp(userData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
