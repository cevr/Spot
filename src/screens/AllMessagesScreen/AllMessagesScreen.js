import React, { Component } from 'react';
import { Text, View, ToastAndroid, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';
import { listReadAll } from '../../redux/actions';
import CardList from '../HomeScreen/Components/CardList';
import { Loading } from '../../UI';
import { navigatorStyle } from '../../Tabs/startTabs';
class AllMessagesScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = { mapReady: false };
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

    componentDidMount() {
        this.props.listReadAll();
    }

    mapReady = () => {
        this.setState({ mapReady: true });
    };

    render() {
        const { coordinates } = this.props;
        if (coordinates) {
            return (
                <View style={styles.mapContainer}>
                    <MapView
                        region={{
                            ...coordinates,
                            latitudeDelta:
                                Dimensions.get('window').width /
                                Dimensions.get('window').height *
                                0.003,
                            longitudeDelta: 0.003
                        }}
                        style={styles.map}
                        onLayout={this.mapReady}
                    >
                        {this.state.mapReady &&
                            this.props.allMessages.map(msg => {
                                return (
                                    <Marker
                                        coordinate={{
                                            latitude: msg.lat,
                                            longitude: msg.long
                                        }}
                                        title={msg.title}
                                        description={msg.items[0]}
                                    />
                                );
                            })}
                        {this.state.mapReady &&
                            this.props.allMessages.map(msg => {
                                return (
                                    <Circle
                                        center={{
                                            latitude: msg.lat,
                                            longitude: msg.long
                                        }}
                                        radius={msg.rad}
                                        strokeColor="#72a3b2"
                                        fillColor="rgba(140, 201, 219, 0.5)"
                                    />
                                );
                            })}
                        {this.state.mapReady && (
                            <Circle
                                center={coordinates}
                                radius={3}
                                strokeColor="#890B0E"
                                fillColor="#890B0E"
                            />
                        )}
                    </MapView>
                </View>
            );
        } else return <Loading />;
    }
}

const styles = StyleSheet.create({
    mapContainer: {
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

const mapStatetoProps = state => {
    return {
        allMessages: state.allMessages,
        coordinates: state.coordinates,
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading
    };
};
const mapDispatchtoProps = dispatch => {
    return {
        listReadAll: () => {
            dispatch(listReadAll());
        }
    };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(AllMessagesScreen);
