import React from 'react';
import { FlatList, Text, StyleSheet, ToastAndroid } from 'react-native';
import Card from './Card';
//these props are called from the Home Page
const CardList = props => (
    <FlatList
        showsHorizontalScrollIndicator={false}
        //this receives the array of information needed to render the card list
        data={props.data}
        //this renders each card the same way a map function would
        renderItem={card => (
            <Card
                key={card.item._id}
                cardData={card.item}
                navigator={props.navigator}
            />
        )}
    />
);

const styles = StyleSheet.create({});

export default CardList;
