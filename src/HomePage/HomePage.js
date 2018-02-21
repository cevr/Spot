import React, { Component } from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import data from '../Global/fakeData';
import CardList from './Components/CardList';
class HomePage extends Component {
    state = { data };
    render() {
        const { data } = this.state;
        return (
            <View style={styles.CardList}>
                <CardList messages={data} />
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 45.5017,
                            longitude: -73.5673,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CardList: {
        flex: 1,
        margin: 40
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
export default HomePage;
