import React, { Component } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';
import { listRead } from '../../../Global/api';
import { listUpdate } from '../../../redux/actions';
import { Button } from '../../../UI';

class CardPopUp extends Component {
    constructor() {
        super();
        this.state = { mapReady: false };
    }

    mapReady = () => {
        this.setState({ mapReady: true });
    };

    render() {
        const { info, listUpdate } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.msgContainer}>
                    <Text style={styles.msgBody}>
                        {info.items[0] || 'No message to display'}
                    </Text>
                </View>
                <View>
                    {info.read || (
                        <Button
                            title="Mark as read"
                            // onPress={() =>
                            //     listUpdate({
                            //         listid: info._id,
                            //         reqKey: 'read',
                            //         reqValue: true
                            //     })
                            // }
                            color="#890B0E"
                        />
                    )}
                    <Text>{info.read && 'READ'}</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        region={{
                            latitude: info.lat,
                            longitude: info.long,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.002
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
    msgContainer: {
        height: 200,
        width: '100%',
        backgroundColor: 'red'
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

const mapDispatchtoProps = dispatch => {
    return {
        listUpdate: payload => {
            dispatch(listUpdate(payload));
        }
    };
};

export default connect(null, mapDispatchtoProps)(CardPopUp);
