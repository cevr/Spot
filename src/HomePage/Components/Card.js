import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity as Touchable,
    Image
} from 'react-native';

const Card = props => (
    <Touchable onPress={props.onCardPress}>
        <View style={styles.Card}>
            <Text>{props.message}</Text>
            <Text>{props.location}</Text>
        </View>
    </Touchable>
);

const styles = StyleSheet.create({
    Card: {
        width: '100%',
        backgroundColor: '#eee',
        marginBottom: 5,
        padding: 7,
        flexDirection: 'row',
        alignCards: 'center'
    }
});
export default Card;
