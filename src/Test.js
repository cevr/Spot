import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
class Test extends Component {
    constructor() {
        super();

        this.state = {
            test: 'hey'
        };
    }

    render() {
        return (
            <View>
                <Text>{this.props.count}</Text>
            </View>
        );
    }
}
const mapStatetoProps = state => {
    return state;
};
export default connect(mapStatetoProps)(Test);
