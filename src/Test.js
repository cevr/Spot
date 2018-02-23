import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { store } from 'statorgfc';

class Test extends Component {
    constructor() {
        super();
        store.connectComponentState(this, ['count']);
    }
    componentDidMount() {
        store.set({ count: 1 });
    }
    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
            </View>
        );
    }
}

export default Test;
