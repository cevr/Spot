import React from 'react';
import { FlatList, Text, StyleSheet, ToastAndroid } from 'react-native';
import Card from './Card';

//these props are called from the Home Page
const CardList = props => (
    <FlatList
        //this receives the array of information needed to render the card list
        data={props.messages}
        //this renders each card the same way a map function would
        renderItem={card => (
            <Card
                onCardPress={() => {
                    //
                    ToastAndroid.show(card.item.location, ToastAndroid.SHORT);
                }}
                message={card.item.message}
                location={card.item.location}
            />
        )}
    />
);

const styles = StyleSheet.create({});
export default CardList;
