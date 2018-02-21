import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import HomePage from '../HomePage/HomePage';

export default class App extends Component {
    render() {
        return <HomePage />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
