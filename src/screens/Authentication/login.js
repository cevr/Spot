import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import startTabs from '../../Tabs/startTabs';
import { Button } from '../../UI';
class Login extends Component {
    onPressTest = () => {
        ToastAndroid.show('Log In Button', ToastAndroid.SHORT);
    };

    render() {
        return (
            <View>
                <Button title="hello" onPress={this.stuff} />
            </View>
        );
    }
}
export default Login;
