import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View, Button, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colours from '../../constants/Colours';

const ProductsOverviewScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ onRefreshing, setOnRefreshing ] = useState(false);
	const [ error, setError ] = useState(false);
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();

	const loadProducts = useCallback(
		async () => {
			// Note multiple set-states get batched together by React!
			setError(null);
			setOnRefreshing(true);
			try {
				await dispatch(productsActions.fetchProducts());
			} catch (err) {
				setError(err.message);
			}
			setOnRefreshing(false);
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			const willFocusEvent = props.navigation.addListener('willFocus', loadProducts);
			return () => willFocusEvent.remove();
		},
		[ loadProducts ]
	);

	// This is also needed to fire loadProducts initially!
	useEffect(
		() => {
			setIsLoading(true);
			loadProducts().then(() => setIsLoading(false));
		},
		[ dispatch, loadProducts ]
	);

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title
		});
	};

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadProducts} color={Colours.chocolate} />
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colours.chocolate} />
			</View>
		);
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={loadProducts}
			refreshing={onRefreshing}
			data={products}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
				>
					<Button
						color={Colours.maroon}
						title="View Details"
						onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
					/>
					<Button
						color={Colours.maroon}
						title="To Cart"
						onPress={() => dispatch(cartActions.addToCard(itemData.item))}
					/>
				</ProductItem>
			)}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="card"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => navData.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="card"
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => navData.navigation.navigate('Cart')}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ProductsOverviewScreen;
