import React, { Component } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { listRead } from '../../../Global/api';

export default class CardPopUp extends Component {
    constructor() {
        super();
        this.state = { mapReady: false };
    }

    componentDidMount() {
        console.log('CARDPOPUP PROPS', this.props.info);
    }

    mapReady = () => {
        this.setState({ mapReady: true });
    };

    render() {
        const { info } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.msgBody}>
                    {info.items[0] || 'No message to display'}
                </Text>
                <Text>{info.read ? 'READ' : 'UNREAD'}</Text>
                <View style={styles.mapContainer}>
                    <MapView
                        region={{
                            latitude: info.lat,
                            longitude: info.long,
                            latitudeDelta: 0.0005,
                            longitudeDelta: 0.0002
                        }}
                        style={styles.map}
                        onLayout={this.mapReady}
                    >
                        {this.state.mapReady && (
                            <Marker
                                coordinate={{
                                    latitude: info.lat,
                                    longitude: info.long
                                }}
                            />
                        )}

                        {this.state.mapReady && (
                            <Circle
                                center={{
                                    latitude: info.lat,
                                    longitude: info.long
                                }}
                                radius={info.rad}
                                strokeColor="#72a3b2"
                                fillColor="rgba(140, 201, 219, 0.5)"
                            />
                        )}
                    </MapView>
                </View>
            </View>
        );
    }
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },
    msgBody: {
        fontSize: 18,
        margin: 20
    },
    mapContainer: {
        position: 'absolute',
        top: 270,
        left: 0,
        right: 0,
        bottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 20
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
