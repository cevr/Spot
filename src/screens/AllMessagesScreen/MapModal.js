import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';
import { Loading } from '../../UI';

class MapModal extends Component {
    constructor() {
        super();
        this.state = { mapReady: false };
    }

    mapReady = () => {
        this.setState({ mapReady: true });
    };

    render() {
        const { coordinates } = this.props;
        return (
            <View style={styles.mapContainer}>
                <MapView
                    region={{
                        ...coordinates,
                        latitudeDelta: 0.005,
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
        coordinates: state.coordinates
    };
};
export default connect(mapStatetoProps)(MapModal);
