import React from 'react';
import { useSelector } from 'react-redux';

import { FlatList, Text } from 'react-native';

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	return (
		<FlatList
			data={products}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
