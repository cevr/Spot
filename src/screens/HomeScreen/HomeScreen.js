import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import {
    View,
    ToastAndroid,
    StyleSheet,
    Text,
    Image,
    WebView
} from 'react-native';
import { connect } from 'react-redux';
import {
    setData,
    updatePosition,
    checkSessionID,
    checkLocation,
    UILoading,
    UINotLoading
} from '../../redux/actions';

// import MapView from 'react-native-maps';
import data from '../../Global/fakeData';
import CardList from './Components/CardList';
import { Loading, ListEmpty } from '../../UI';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        // this.state = { coordinates: { latitude: 0, longitude: 0 } };
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
        this.props.UILoading();
        navigator.geolocation.getCurrentPosition(
            pos => {
                console.log('getting coords', pos);
                this.props.setCoordinates(pos.coords);
                this.props.checkLocation(pos.coords);
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

    componentWillMount() {
        this.props.checkSessionID();
    }
    componentDidMount() {
        console.log(this.props.data);
        this.getCoordinates();
    }
    componentDidUpdate() {
        this.updateCoordinates();
    }

    render() {
        return this.props.isLoading ? (
            <Loading />
        ) : this.props.data.length === 0 ? (
            <ListEmpty />
        ) : (
            <View style={styles.CardList}>
                {this.props.coordinates && (
                    <Text>
                        lat {this.props.coordinates.latitude} long
                        {this.props.coordinates.longitude}
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
    },
    image: {
        width: 50,
        height: 50
    }
});
const mapStatetoProps = state => {
    return {
        data: state.data,
        coordinates: state.coordinates,
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading
    };
};
const mapDispatchtoProps = dispatch => {
    return {
        checkLocation: coordinates => {
            dispatch(checkLocation(coordinates));
        },
        checkSessionID: () => {
            dispatch(checkSessionID());
        },
        setData: data => {
            dispatch(setData(data));
        },
        setCoordinates: coordinates => {
            dispatch(updatePosition(coordinates));
        },
        UILoading: () => {
            dispatch(UILoading());
        },
        UINotLoading: () => {
            dispatch(UINotLoading());
        }
    };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
