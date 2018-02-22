import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity as Touchable,
    Image
} from 'react-native';

const Card = props => (
    // This prop is usually called at the CardList component
    <Touchable onPress={props.onCardPress}>
        <View style={styles.Card}>
            <Text style={{ fontSize: 15 }}>{props.message}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end'
                }}
            >
                <Text
                    style={{
                        fontSize: 10
                    }}
                >
                    {props.location}
                </Text>
            </View>
        </View>
    </Touchable>
);

const styles = StyleSheet.create({
    Card: {
        width: '100%',
        backgroundColor: '#eee',
        marginBottom: 8,
        padding: 7,
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});
export default Card;
