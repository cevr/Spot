import React, { Component } from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setData } from '../../redux/actions';
import data from '../../Global/fakeLocations';
import CardList from '../HomeScreen/Components/CardList';
class LocationScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'settingsToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'right'
                });
            }
        }
    };
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
export default LocationScreen;
