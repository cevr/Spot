import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    TouchableOpacity as Touchable,
    Image
} from 'react-native';
import { navigatorStyle } from '../../../Tabs/startTabs';
import { H3, H2 } from '../../../UI';

export default (Card = props => (
    // This prop is usually called at the CardList component
    <Touchable
        elevation={5}
        onPress={() => {
            props.navigator.showModal({
                screen: 'spot.CardPopUp',
                title: props.cardData.title,
                passProps: {
                    info: Object.assign({}, props.cardData)
                },
                navigatorStyle
            });
        }}
    >
        <View style={styles.Card}>
            <H3 style={styles.text}>{props.cardData.title}</H3>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end'
                }}
            />
        </View>
    </Touchable>
));

const styles = StyleSheet.create({
    Card: {
        width: '100%',
        height: 70,
        backgroundColor: '#c43639',
        marginBottom: 8,
        padding: 7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#aaa',
        borderWidth: 4,
        borderRadius: 7
    },
    text: {
        color: '#F6F6F6'
    }
});
