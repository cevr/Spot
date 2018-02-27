import React, { Component } from 'react';
import {
    TouchableNativeFeedback as Touchable,
    View,
    Text,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';

//Look at the export to see all the available imports (at the bottom)
class DefaultTextInput extends Component {
    render() {
        return (
            <TextInput
                elevation={5}
                {...this.props}
                style={[styles.input, this.props.style]}
                underlineColorAndroid="transparent"
            />
        );
    }
}

class DefaultText extends Component {
    render() {
        return (
            <Text {...this.props} style={[styles.text, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

class Button extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress}>
                <View elevation={5} style={[styles.button, this.props.style]}>
                    <Text style={{ color: '#890B0E', fontSize: 17 }}>
                        {this.props.title}
                    </Text>
                </View>
            </Touchable>
        );
    }
}

class H1 extends Component {
    render() {
        return (
            <DefaultText>
                <Text {...this.props} style={[styles.h1, this.props.style]}>
                    {this.props.children}
                </Text>
            </DefaultText>
        );
    }
}
class H2 extends Component {
    render() {
        return (
            <DefaultText>
                <Text {...this.props} style={[styles.h2, this.props.style]}>
                    {this.props.children}
                </Text>
            </DefaultText>
        );
    }
}
class H3 extends Component {
    render() {
        return (
            <DefaultText>
                <Text {...this.props} style={[styles.h3, this.props.style]}>
                    {this.props.children}
                </Text>
            </DefaultText>
        );
    }
}
class H4 extends Component {
    render() {
        return (
            <DefaultText>
                <Text {...this.props} style={[styles.h4, this.props.style]}>
                    {this.props.children}
                </Text>
            </DefaultText>
        );
    }
}
class H5 extends Component {
    render() {
        return (
            <DefaultText>
                <Text {...this.props} style={[styles.h5, this.props.style]}>
                    {this.props.children}
                </Text>
            </DefaultText>
        );
    }
}
class H6 extends Component {
    render() {
        return (
            <DefaultText>
                <Text {...this.props} style={[styles.h6, this.props.style]}>
                    {this.props.children}
                </Text>
            </DefaultText>
        );
    }
}

class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{
                        uri:
                            'https://media.giphy.com/media/553Ze9JCO6DLVTJA0O/giphy.gif'
                    }}
                    style={{ width: 80, height: 80 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#890B0E',
        borderRadius: 50,
        padding: 5,
        paddingLeft: 15,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: 'rgba(246,246,246, 0.85)'
    },
    button: {
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 7,
        padding: 10,
        borderRadius: 50,
        borderColor: '#890B0E',
        backgroundColor: 'rgba(246,246,246, 0.85)',
        borderWidth: 2,
        width: '50%'
    },
    text: {
        fontFamily: 'Roboto',
        backgroundColor: 'transparent'
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h4: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    h5: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    h6: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export {
    Button,
    DefaultTextInput,
    DefaultText,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Loading
};
