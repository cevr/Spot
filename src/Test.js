import React, { Component } from 'react';
import { View, Text } from 'react-native';

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
                <Text>{this.state.test /* hey */}</Text>
            </View>
        );
    }
}

export default Test;
