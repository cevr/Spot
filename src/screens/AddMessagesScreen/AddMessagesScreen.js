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
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = {
            region: {
                coordinates: {
                    latitude: 0,
                    longitude: 0
                },
                radius: 15
            },
            showTextInput: false
        };
        this.msg = '';
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'settingsToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'right'
                });
            }
        }
        if (event.id === 'willAppear') {
            if (this.props.coordinates) {
                this.setState({
                    region: {
                        coordinates: {
                            ...this.props.coordinates
                        },
                        radius: 15
                    }
                });
            }
        }
    };

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
            recipient: this.state.person || this.props.email,
            title: this.state.title,
            list: this.state.msg,
            lat: this.state.region.coordinates.latitude,
            long: this.state.region.coordinates.longitude,
            rad: this.state.region.radius
        });
        ToastAndroid.show('Message Sent!', ToastAndroid.SHORT);
        this.person.clear();
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

    showSendToPerson = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                showTextInput: true
            };
        });
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                <View style={styles.titleBar}>
                    <TextInput
                        placeholder="Title"
                        placeholderTextColor="#c4c4c4"
                        style={
                            this.state.showTextInput
                                ? [
                                      styles.msgTitle,
                                      { marginTop: 10, marginBottom: 10 }
                                  ]
                                : styles.msgTitle
                        }
                        underlineColorAndroid="transparent"
                        maxLength={40}
                        value={this.state.title}
                        ref={text => (this.title = text)}
                        onChangeText={text => this.setState({ title: text })}
                    />
                    {/* {this.state.showTextInput ? (
                        <TextInput
                            placeholder="Recipient email"
                            placeholderTextColor="#c4c4c4"
                            style={[
                                styles.msgTitle,
                                { marginTop: 0, marginBottom: 25 }
                            ]}
                            underlineColorAndroid="transparent"
                            maxLength={40}
                            value={this.state.person}
                            ref={text => (this.person = text)}
                            onChangeText={text =>
                                this.setState({ person: text })
                            }
                        />
                    ) : (
                        <Text
                            onPress={this.showSendToPerson}
                            style={{ marginBottom: 17 }}
                        >
                            Sending to someone else?
                        </Text>
                    )} */}
                    <View style={styles.textField}>
                        <TextInput
                            placeholder="Type up to 256 characters here"
                            placeholderTextColor="#c4c4c4"
                            style={styles.msgBody}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            maxLength={256}
                            value={this.state.msg}
                            ref={text => (this.msg = text)}
                            onChangeText={text => this.setState({ msg: text })}
                        />
                        <View style={{ marginLeft: 5 }}>
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
                            {this.state.mapReady && (
                                <Circle
                                    center={this.props.coordinates}
                                    radius={4}
                                    strokeColor="rgba(137,11,14,0.8)"
                                    fillColor="rgba(137,11,14,0.2)"
                                />
                            )}
                            {this.state.mapReady && (
                                <Circle
                                    center={this.props.coordinates}
                                    radius={3}
                                    strokeColor="rgba(137,11,14,0.8)"
                                    fillColor="rgba(137,11,14,0.5)"
                                />
                            )}
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
        width: Dimensions.get('window').width * 0.52,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#c4c4c4',
        textAlignVertical: 'top'
    },
    msgTitle: {
        height: 40,
        width: Dimensions.get('window').width - 36,
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
        margin: 20,
        marginBottom: 10
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
    },
    titleBar: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        coordinates: state.coordinates,
        email: state.email
    };
};

export default connect(mapStateToProps)(AddMessagesScreen);
