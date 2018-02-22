import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import HomePage from '../HomePage/HomePage';

import Login from '../Authentication/login';
import SignUp from '../Authentication/signup';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container} >
            <Text style={styles.text}>SpotDude</Text>
                <Login />
                <SignUp/>
                <HomePage />
            </View>
        )
        return 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text: {
        fontSize : 35,
        fontWeight : 'bold'
    }
});
