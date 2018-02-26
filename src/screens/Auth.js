//Vako please put your code in here
//placeholder code
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '../UI';
import startTabs from '../Tabs/startTabs';
import { logIn } from '../redux/actions';

class AuthScreen extends Component {
    onPressHandler = () => {
        //this function changes the navigation to render a tabbed based app
        startTabs();
        this.props.logIn(true);
    };

    componentDidMount() {
        if (this.props.isLoggedIn) startTabs();
    }
    render() {
        return (
            <View>
                <Text>Hello</Text>
                <Button onPress={this.onPressHandler} title="Login" />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => {
            dispatch(logIn);
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
