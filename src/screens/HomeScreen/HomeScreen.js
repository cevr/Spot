import React, { Component } from 'react';
import { View, ToastAndroid, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { setData, updatePosition } from '../../redux/actions';

// import MapView from 'react-native-maps';
import { checkLocation } from '../../Global/api';
import data from '../../Global/fakeData';
import CardList from './Components/CardList';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = { coordinates: { latitude: 0, longitude: 0 } };
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

    getCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                console.log('getting coords', pos);
                this.props.setCoordinates(pos.coords);
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
        );
    };

    updateCoordinates = () => {
        let clearID = navigator.geolocation.watchPosition(
            pos => {
                console.log('MOVING!!!', pos);
                this.props.setCoordinates(pos.coords);
            },
            error => this.setState({ error: error.message }),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 5
            }
        );
        return clearID;
    };

    componentWillUpdate() {
        navigator.geolocation.clearWatch(this.updateCoordinates());
    }
    componentDidUpdate() {
        this.updateCoordinates();
    }
    componentDidMount() {
        this.props.setData(data);
        this.getCoordinates();
        this.updateCoordinates();
    }

    render() {
        return (
            <View style={styles.CardList}>
                {this.state.coordinates && (
                    <Text>
                        lat {this.state.coordinates.latitude} long{' '}
                        {this.state.coordinates.longitude}
                    </Text>
                )}
                <CardList
                    data={this.props.data}
                    navigator={this.props.navigator}
                />
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
const mapStatetoProps = state => {
    return {
        data: state.data
    };
};
const mapDispatchtoProps = dispatch => {
    return {
        setData: data => {
            dispatch(setData(data));
        },
        setCoordinates: coordinates => {
            dispatch(updatePosition(coordinates));
        }
    };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
