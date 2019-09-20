import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colours from '../../constants/Colours';
import { FlatList } from 'react-native-gesture-handler';

import CartItem from '../../components/shop/CartItem';

const CartScreen = (props) => {
	const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
	const cartItems = useSelector((state) => {
		// TRANSFORM AN OBJECT INTO AN ARRAY
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			// A cart-item with an additional productId prop.
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum
			});
		}
		return transformedCartItems;
	});

	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<Button color={Colours.chocolate} title="Order Now" disabled={cartItems.length === 0} />
			</View>
				<FlatList
					data={cartItems}
					keyExtractor={(item) => item.productId}
					renderItem={(itemData) => (
						<CartItem quantity={itemData.item.quantity} 
						title={itemData.item.productTitle} 
						amount={itemData.item.sum}
						onRemove={() => {}}
						/>
					)}
				/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		margin: 20
	},
	summary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		padding: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	summaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		color: Colours.chocolate
	},
	amount: {}
});

export default CartScreen;
