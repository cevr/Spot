import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    TouchableOpacity as Touchable,
    Image,
    Modal
} from 'react-native';
import { navigatorStyle } from '../../../Tabs/startTabs';
import { H3, H2 } from '../../../UI';

export default (Card = props => (
    // This prop is usually called at the CardList component
    <Touchable
        onPress={() => {
            props.navigator.showModal({
                screen: 'spot.CardPopUp',
                title: props.cardData.title,
                passProps: {
                    info: Object.assign({}, props.cardData)
                }
            });
        }}
    >
        <View
            elevation={5}
            style={
                props.cardData.read
                    ? stylesCard.CardRead
                    : stylesCard.CardUnread
            }
        >
            <H3
                style={
                    props.cardData.read
                        ? stylesCard.textRead
                        : stylesCard.textUnread
                }
            >
                {props.cardData.title}
            </H3>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end'
                }}
            />
        </View>
    </Touchable>
));

export const stylesCard = StyleSheet.create({
    CardRead: {
        width: '100%',
        height: 70,
        marginBottom: 8,
        padding: 7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: '#F6F6F6',
        borderColor: '#aaa'
    },
    CardUnread: {
        width: '100%',
        height: 70,
        marginBottom: 8,
        padding: 7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 3,
        borderColor: '#ce797b',

        backgroundColor: '#F6F6F6'
    },
    textRead: {},
    textUnread: {
        color: '#ce797b'
    }
});
