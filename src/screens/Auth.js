//Vako please put your code in here
//placeholder code
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import startTabs from '../Tabs/startTabs';

class AuthScreen extends Component {
    onPressHandler = () => {
        //this function changes the navigation to render a tabbed based app
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
