import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import Colours from '../../constants/Colours';

const ProductDetailScreen = (props) => {
	// Get productId from ProductOverviewScreen.
	const productId = props.navigation.getParam('productId');
	const selectedProduct = useSelector((state) =>
		state.products.availableProducts.find((prod) => prod.id === productId)
	);
	const dispatch = useDispatch();

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
			<View style={styles.actions}>
				<Button
					color={Colours.maroon}
					title="Add to Card"
					onPress={() => dispatch(cartActions.addToCard(selectedProduct))}
				/>
			</View>
			<Text style={styles.price}>${selectedProduct.price}</Text>
			<Text style={styles.desc}>{selectedProduct.description}</Text>
		</ScrollView>
	);
};

ProductDetailScreen.navigationOptions = (navData) => ({
	headerTitle: navData.navigation.getParam('productTitle')
});

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 300
	},	
	actions: {
		marginVertical: 10,
		alignItems: 'center' // So the button does not stretch in android.
		// width: '40%'
	},
	price: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: '#888',
		textAlign: 'center',
		marginVertical: 20
	},
	desc: {
		fontFamily: 'open-sans',
		fontSize: 14,
		textAlign: 'center',
		marginHorizontal: 20
	}
});

export default ProductDetailScreen;
