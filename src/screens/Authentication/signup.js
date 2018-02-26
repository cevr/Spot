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
import { connect } from 'react-redux';
import { attemptSignUp } from '../../redux/actions';
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
    renderSignUp = () => {
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
    };
    render() {
        return <View style={styles.container}>{this.renderSignUp()}</View>;
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

export default connect()(SignUp);
