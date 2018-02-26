import React, { Component } from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setData } from '../../redux/actions';

// import MapView from 'react-native-maps';
import { checkLocation } from '../../Global/api';
import data from '../../Global/fakeData';
import CardList from './Components/CardList';
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
    };

    componentDidMount() {
        this.props.setData(data);
    }

    render() {
        return (
            <View style={styles.CardList}>
                <CardList
                    data={this.props.data}
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
    }
});
const mapStatetoProps = state => {
    return {
        data: state.data
    };
};
const mapDispatchtoProps = dispatch => {
    return {
        setData: data => {
            dispatch(setData(data));
        }
    };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
