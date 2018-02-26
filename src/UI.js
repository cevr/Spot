import React from 'react';
import {
    TouchableNativeFeedback as Touchable,
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

//Look at the export to see all the available imports (at the bottom)

const DefaultTextInput = props => {
    return (
        <TextInput
            {...props}
            style={[styles.input, props.style]}
            underlineColorAndroid="transparent"
        />
    );
};

const DefaultText = props => {
    return (
        <Text {...props} style={[styles.text, props.style]}>
            {props.children}
        </Text>
    );
};

const Button = props => {
    return (
        <Touchable onPress={props.onPress}>
            <View elevation={5} style={[styles.button, props.style]}>
                <Text style={{ color: '#890B0E', fontSize: 17 }}>
                    {props.title}
                </Text>
            </View>
        </Touchable>
    );
};

const H1 = props => {
    return (
        <DefaultText>
            <Text {...props} style={[styles.h1, props.style]}>
                {props.children}
            </Text>
        </DefaultText>
    );
};
const H2 = props => {
    return (
        <DefaultText>
            <Text {...props} style={[styles.h2, props.style]}>
                {props.children}
            </Text>
        </DefaultText>
    );
};
const H3 = props => {
    return (
        <DefaultText>
            <Text {...props} style={[styles.h3, props.style]}>
                {props.children}
            </Text>
        </DefaultText>
    );
};
const H4 = props => {
    return (
        <DefaultText>
            <Text {...props} style={[styles.h4, props.style]}>
                {props.children}
            </Text>
        </DefaultText>
    );
};
const H5 = props => {
    return (
        <DefaultText>
            <Text {...props} style={[styles.h5, props.style]}>
                {props.children}
            </Text>
        </DefaultText>
    );
};
const H6 = props => {
    return (
        <DefaultText>
            <Text {...props} style={[styles.h6, props.style]}>
                {props.children}
            </Text>
        </DefaultText>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#890B0E',
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    },
    button: {
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 7,
        padding: 10,
        borderRadius: 2,
        borderColor: '#890B0E',
        backgroundColor: '#F6F6F6',
        borderWidth: 2
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
    }
});

export { Button, DefaultTextInput, DefaultText, H1, H2, H3, H4, H5, H6 };
