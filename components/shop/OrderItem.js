import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import Colours from '../../constants/Colours';

const OrderItem = (props) => {
    return (
        <View style={styles.orderItem} >
            <View style={styles.summary}>
            <Text style={styles.totalAmount} style={styles.orderItem} >
                {props.amount.toFixed(2)}
            </Text>
            <Text style={styles.date}>
                {props.date}
            </Text>
            </View>
            <Button title='Show Details' color={Colours.chocolate} />
        </View>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'    
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
})
 
export default OrderItem;