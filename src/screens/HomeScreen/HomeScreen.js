import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { NotificationsAndroid } from 'react-native-notifications';
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
    updatePosition,
    checkSessionID,
    checkLocation,
    UILoading,
    listReadAll
} from '../../redux/actions';

import data from '../../Global/fakeData';
import CardList from './Components/CardList';
import { Loading, ListEmpty } from '../../UI';
import { SignUpPage } from '../../Global/api';
class HomeScreen extends Component {
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
        if (event.id === 'didAppear') {
            if (this.props.coordinates) {
                this.props.checkLocation(
                    Object.assign({}, this.props.coordinates)
                );
            }
        }
    };

    getCoordinates = () => {
        console.log('IS THIS WORKING?');
        this.props.UILoading();
        navigator.geolocation.getCurrentPosition(
            pos => {
                console.log('getting coords', pos);
                this.props.setCoordinates(pos.coords);
                this.props.checkLocation(pos.coords);
            },
            error => this.setState({ error: error.message }),
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 1000
            }
        );
    };

    updateCoordinates = () => {
        navigator.geolocation.watchPosition(
            pos => {
                console.log('MOVING!!!', pos.coords);
                this.props.setCoordinates(pos.coords);
                this.props.checkLocation(pos.coords);
            },
            error => this.setState({ error: error.message }),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 5
            }
        );
    };

    componentDidMount() {
        this.getCoordinates();
        this.updateCoordinates();
    }

    componentDidUpdate() {
        console.log('IS LOADING', this.props.isLoading);
        if (this.props.isLoading === false) {
            if (this.props.messages.length > 0) {
                const unreadCount = this.props.messages.filter(msg => {
                    return msg.read === false;
                }).length;
                if (unreadCount > 0) {
                    NotificationsAndroid.localNotification({
                        title: 'Local notification',
                        body: `You have ${unreadCount} unread message(s)`,
                        data: {
                            extra: 'Some data'
                        }
                    });
                }
            }
        }
    }
    render() {
        return this.props.isLoading && this.props.messages.length === 0 ? (
            <Loading />
        ) : this.props.messages.length === 0 &&
        this.props.isLoading === false ? (
            <ListEmpty />
        ) : (
            <View style={styles.CardList}>
                <CardList
                    data={this.props.messages}
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
        messages: state.messages,
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
        listReadAll: () => {
            dispatch(listReadAll());
        },
        setCoordinates: coordinates => {
            dispatch(updatePosition(coordinates));
        },
        UILoading: () => {
            dispatch(UILoading());
        }
    };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
