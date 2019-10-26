import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';
import Colours from '../../constants/Colours';

const CartScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	// const [ error, setError ] = useState(false);
	const dispatch = useDispatch();
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
		return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
	});

	const sendOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
		setIsLoading(false);
	};

	if (isLoading) {
		return <View style={styles.centered} />;
	}

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<Text style={styles.summaryText}>
					{/* Use Math.round etc to remove the -0... */}
					Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
				</Text>
				{/* NOTE: cartItems is an array!!! */}
				{isLoading ? (
					<ActivityIndicator size="large" color={Colours.chocolate} />
				) : (
					<Button
						color={Colours.chocolate}
						title="Order Now"
						disabled={cartItems.length === 0}
						onPress={sendOrderHandler}
					/>
				)}
			</Card>
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={(itemData) => (
					<CartItem
						quantity={itemData.item.quantity}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						deletable // Needed to show the delete button.
						onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
					/>
				)}
			/>
		</View>
	);
};

CartScreen.navigationOptions = {
	headerTitle: 'Your Cart'
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
		padding: 10
	},
	summaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		color: Colours.chocolate
	},
	amount: {
		color: Colours.chocolate
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CartScreen;
