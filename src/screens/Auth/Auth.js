//Vako please put your code in here
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import startTabs from '../Tabs/startMainTab';

class AuthScreen extends Component {
    onPressHandler = () => {
        startTabs();
    };

    render() {
        return (
            <View>
                <Text>Hello</Text>
                <Button onPress={this.onPressHandler} title="Login" />
            </View>
        );
    }
}

export default AuthScreen;
