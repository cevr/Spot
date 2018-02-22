import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ToastAndroid
} from 'react-native';
import startTabs from '../../Tabs/startTabs';
class Login extends Component {
    render() {
        return (
            <View>
                <Button onPress={startTabs} title="Login" />
            </View>
        );
    }
}
function onPressTest() {
    ToastAndroid.show('Log In Button', ToastAndroid.SHORT);
}
export default Login;
