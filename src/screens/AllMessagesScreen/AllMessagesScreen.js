import React, { Component } from 'react';
import {
    Text,
    View,
    ToastAndroid,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';
import { listReadAll } from '../../redux/actions';
import CardList from '../HomeScreen/Components/CardList';
import { Loading, Button2 } from '../../UI';
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
                            latitudeDelta: 0.0022,

                            longitudeDelta:
                                Dimensions.get('window').width /
                                Dimensions.get('window').height *
                                0.0022
                        }}
                        style={styles.map}
                        onLayout={this.mapReady}
                        ref={ref => (this.map = ref)}
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
                                radius={10}
                                strokeColor="rgba(137,11,14,0.8)"
                                fillColor="rgba(137,11,14,0.2)"
                            />
                        )}
                    </MapView>
                    <View style={styles.overlay}>
                        <ScrollView
                            style={{
                                flex: 1,
                                paddingLeft: 7
                            }}
                            contentContainerStyle={styles.ScrollView}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {this.props.allMessages.map((msg, index) => {
                                return (
                                    <Button2
                                        readStatus={msg.read}
                                        style={{
                                            width: 125,
                                            height: 50,
                                            marginRight: 5,
                                            marginBottom: 0
                                        }}
                                        key={`${index}`}
                                        title={msg.title}
                                    />
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            );
        } else return <Loading />;
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    overlay: {
        backgroundColor: 'rgba(246,246,246,0.5)',
        height: 70,
        width: '100%'
    },
    ScrollView: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
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
