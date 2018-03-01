import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    Button,
    ToastAndroid,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, Circle } from 'react-native-maps';
import { createMessage } from '../../Global/api';

class AddMessagesScreen extends Component {
    constructor() {
        super();
        this.state = {
            region: {
                coordinates: {
                    //Default coordinates - Montreal
                    latitude: 45.5017,
                    longitude: -73.5673
                },
                radius: 15
            }
        };
        this.msg = '';
    }

    addLocation = () => {
        this.props.navigator.showLightBox({
            screen: 'spot.AddLocationScreen',
            passProps: {
                setLocation: this.setLocation,
                region: this.state.region
            },
            style: {
                tapBackgroundToDismiss: true
            }
        });
    };

    setLocation = region => {
        this.setState({ region });
    };

    submitMsg = () => {
        if (!this.state.title) {
            ToastAndroid.show(
                'Please enter a message title.',
                ToastAndroid.SHORT
            );
        }
        createMessage({
            title: this.state.title,
            list: this.state.msg,
            lat: this.state.region.coordinates.latitude,
            long: this.state.region.coordinates.longitude,
            rad: this.state.region.radius
        });
        ToastAndroid.show('Message Sent!', ToastAndroid.SHORT);
        this.title.clear();
        this.msg.clear();
        this.setState({
            region: {
                coordinates: this.props.coordinates,
                radius: 15
            }
        });
    };

    mapReady = () => {
        this.setState({ mapReady: true });
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                <View>
                    <TextInput
                        placeholder="Title"
                        placeholderTextColor="#c4c4c4"
                        style={styles.msgTitle}
                        underlineColorAndroid="transparent"
                        maxLength={40}
                        ref={text => (this.title = text)}
                        onChangeText={text => this.setState({ title: text })}
                    />
                    <View style={styles.textField}>
                        <TextInput
                            placeholder="Type up to 256 characters here"
                            placeholderTextColor="#c4c4c4"
                            style={styles.msgBody}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            maxLength={256}
                            ref={text => (this.msg = text)}
                            onChangeText={text => this.setState({ msg: text })}
                        />
                        <View>
                            <View style={styles.button}>
                                <Button
                                    title="Set Location"
                                    color="#ce797b"
                                    onPress={this.addLocation}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    title="Send Message"
                                    onPress={this.submitMsg}
                                    color="#890B0E"
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {this.props.coordinates && (
                    <View style={styles.mapContainer}>
                        <MapView
                            region={{
                                ...this.state.region.coordinates,
                                latitudeDelta: 0.0022,
                                longitudeDelta:
                                    Dimensions.get('window').width /
                                    Dimensions.get('window').height *
                                    0.0022
                            }}
                            style={styles.map}
                            onLayout={this.mapReady}
                        >
                            <Marker
                                coordinate={this.state.region.coordinates}
                            />
                            <Circle
                                center={this.state.region.coordinates}
                                radius={this.state.region.radius}
                                strokeColor="#72a3b2"
                                fillColor="rgba(140, 201, 219, 0.5)"
                            />
                        </MapView>
                    </View>
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },
    title: {
        fontSize: 26,
        margin: 30
    },
    msgBody: {
        height: 100,
        width: 240,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#c4c4c4',
        textAlignVertical: 'top'
    },
    msgTitle: {
        height: 40,
        width: Dimensions.get('window').width - 30,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#c4c4c4',
        textAlignVertical: 'top',
        marginTop: 30,
        marginBottom: 20
    },
    button: {
        margin: 6
    },
    mapContainer: {
        position: 'absolute',
        top: 220,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 20
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 10
    },
    textField: {
        flexDirection: 'row'
    }
});

const mapStateToProps = state => {
    return {
        coordinates: state.coordinates
    };
};

export default connect(mapStateToProps)(AddMessagesScreen);
