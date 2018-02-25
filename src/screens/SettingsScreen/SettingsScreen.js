import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback as Touchable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
                <Touchable>
                    <View>
                        <Icon name="account-circle" size={30} color="#890C10" />
                        <Text>My Profile</Text>
                    </View>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#F6F6F6'
    }
});

export default SettingsScren;
