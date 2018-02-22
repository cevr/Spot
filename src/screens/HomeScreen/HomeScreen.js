import React, { Component } from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
// import MapView from 'react-native-maps';
import data from '../Global/fakeData';
import CardList from './Components/CardList';
class HomeScreen extends Component {
    state = { data };
    render() {
        const { data } = this.state;
        return (
            <View style={styles.CardList}>
                <CardList messages={data} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CardList: {
        flex: 1,
        margin: 40
    }
});
export default HomeScreen;
