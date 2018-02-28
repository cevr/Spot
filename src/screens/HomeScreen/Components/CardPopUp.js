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

    componentDidMount() {
        console.log('PROPS FOR CARD POP UP', this.props.coordinates);
    }

    componentWillUnmount() {
        if (!this.props.info.read) {
            this.props.listUpdate(
                {
                    listid: this.props.info._id,
                    reqKey: 'read',
                    reqValue: true
                },
                this.props.coordinates
            );
        }
    }

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
        width: '80%',
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

const mapStatetoProps = state => {
    return {
        coordinates: Object.assign({}, state.coordinates)
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        listUpdate: payload => {
            dispatch(listUpdate(payload));
        }
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(CardPopUp);
