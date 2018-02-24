import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.images}
                    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                />
                <Text style={styles.text}>Avery Riell-Perrson</Text>
                <View style={styles.button}>
                    {myButton}
                </View>
                {}
            </View>
        );
    }
}

logOut = () => {
    let data = {
        res: "I logged out bitch"
    }
    fetch('http://jodysmith.ca:5000/logout', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
        .then(x => x.json())
        .then(json => {
            if (json.res === true) {
                ToastAndroid.show('logout successful', ToastAndroid.SHORT)
            } else {
                ToastAndroid.show('could not log out', ToastAndroid.SHORT)
            }
        })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    images: {
        marginTop: 25,
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    text: {
        marginTop: 10,
        fontSize: 25
    },
    button: {
        marginTop: 170
    }
});

const myButton = (
    <Icon.Button name="sign-out" backgroundColor="#f45f5f" onPress={this.logOut}>
        Log out
    </Icon.Button>
);



export default ProfileScreen;
