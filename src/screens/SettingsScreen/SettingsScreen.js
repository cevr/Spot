import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
class SettingsScren extends Component {
    render() {
        return (
            <View
                style={[
                    styles.container,
                    {
                        width: Dimensions.get('window').width * 0.8
                    }
                ]}
            >
                <Text>Settings Drawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#fff'
    }
});

export default SettingsScren;
