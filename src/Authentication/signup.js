import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ToastAndroid, Modal, TextInput } from 'react-native';
class SignUp extends Component {
    state = {
        modalVisible: false,
        email: 'Enter email address',
        password: 'Enter password',

    };
    openModal = () => {
        this.setState({ modalVisible: true });
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
    }

    onPressTest = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(data)
        fetch("http://10.65.109.159:4000/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                ToastAndroid.show("sign up", ToastAndroid.SHORT);
                //res.json()
            })

            // .then(json => {this.setState({ signedUp: true })})
            .catch(err => {
                console.log(err)
                //ToastAndroid.show(JSON.stringify(err), ToastAndroid.SHORT);

            });



        // setTimeout(() => this.closeModal(), 1000)

    }
    //Render the Sign Up modal after pressing the Sign up button.
    renderSignUp() {
        return (
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <Text>Sign Up Here</Text>
                    {/* <View>{JSON.stringify(this.state.error)}</View> */}
                    <TextInput
                        style={styles.textInput}
                        ref={(x) => { this.email = x; }}
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholder={this.state.email}
                        keyboardType={'email-address'}
                    />
                    <TextInput
                        style={styles.textInput}
                        ref={(x) => { this.password = x; }}
                        onChangeText={(text) => this.setState({ password: text })}
                        placeholder={this.state.password}
                    />
                    <Button
                        onPress={() => this.onPressTest()}
                        title="Sign Up"
                    /></View>
            </View >)
    }
    render() {
        return (
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >{this.renderSignUp()}
                </Modal>
                <Button onPress={() => this.openModal()}
                    title="Sign Up" />
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
    },
    textInput: {
        height: 45,
        width: 200
    }
});

export default SignUp;