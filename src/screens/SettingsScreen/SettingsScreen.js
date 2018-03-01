import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { logOut, attemptLogOut } from '../../redux/actions';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ToastAndroid,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
    }
    logOut = () => {
        let data = {
            res: 'I logged out'
        };
        this.props.logOut(data);
    };

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
                <View>
                    <Image
                        style={styles.images}
                        source={{
                            uri:
                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                        }}
                    />
                    <Text style={styles.text}>{this.props.email}</Text>
                </View>
                <View style={styles.button}>
                    <Icon.Button
                        style={{
                            width: 200,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: 25
                        }}
                        name="sign-out"
                        backgroundColor="#890C10"
                        onPress={this.logOut}
                    >
                        Log out
                    </Icon.Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        justifyContent: 'space-between'
    },
    images: {
        marginTop: 25,
        borderRadius: 75,
        width: 150,
        height: 150
    },
    text: {
        marginTop: 10,
        fontSize: 25
    },
    button: {
        marginTop: 170,
        marginBottom: 30
    },
    settings: {
        justifyContent: 'space-between'
    }
});

const myButton = (
    <Icon.Button
        name="sign-out"
        backgroundColor="#890C10"
        onPress={this.logOut}
    >
        Log out
    </Icon.Button>
);

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        email: state.email
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        logOut: data => {
            dispatch(attemptLogOut(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(SettingsScreen);
