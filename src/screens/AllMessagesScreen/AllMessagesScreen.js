import React, { Component } from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { listReadAll } from '../../redux/actions';
import CardList from '../HomeScreen/Components/CardList';
import { Loading, Button } from '../../UI';
import { navigatorStyle } from '../../Tabs/startTabs';
class AllMessagesScreen extends Component {
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
    };

    componentDidMount() {
        this.props.listReadAll();
    }

    enterMap = () => {
        this.props.navigator.showModal({
            title: 'Map View',
            screen: 'spot.MapModal',
            navigatorStyle
        });
    };

    render() {
        return this.props.isLoading ? (
            <Loading />
        ) : (
            <View style={styles.CardList}>
                <CardList
                    data={this.props.allMessages}
                    navigator={this.props.navigator}
                />
                <View>
                    <Button title="Map View" onPress={this.enterMap} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CardList: {
        flex: 1,
        margin: 40
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
