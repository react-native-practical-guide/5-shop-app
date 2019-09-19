import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
 
const ProductDetailScreen = (props) => {
    // Get productId from ProductOverviewScreen.
	const productId = props.navigation.getParam('productId');
	const selectedProduct = useSelector((state) => state.products.availableProducts.find((prod) => prod.id === productId));
    
    return (
		<View>
			<Text>{selectedProduct.title}</Text>
		</View>
	);
};

ProductDetailScreen.navigationOptions = (navData) => ({
    headerTitle: navData.navigation.getParam('productTitle')
})

const styles = StyleSheet.create({});

export default ProductDetailScreen;
