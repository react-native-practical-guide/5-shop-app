import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colours from '../../constants/Colours';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(false);

	const dispatch = useDispatch();
	const userProducts = useSelector((state) => state.products.userProducts);

	useEffect(
		() => {
			if (error) {
				Alert.alert('Error occurred!', error, [ { text: 'OK' } ]);
			}
		},
		[ error ]
	);

	const editProductHandler = (id) => {
		props.navigation.navigate('EditProduct', { productId: id });
	};

	const deleteHandler = (id) => {
		Alert.alert('Delete product!', 'Are you sure you want to delete this product?', [
			{ text: 'NO', style: 'default' },
			{
				text: 'YES',
				style: 'destructive',
				onPress: async () => {
					setError(null);
					setIsLoading(true);
					try {
						await dispatch(productsActions.deleteProduct(id));
					} catch (err) {
						setError(err.message);
					}
					setIsLoading(false);
				}
			}
		]);
	};

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colours.chocolate} />
			</View>
		);
	}

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => editProductHandler(itemData.item.id)}
				>
					<Button color={Colours.maroon} title="Edit" onPress={() => editProductHandler(itemData.item.id)} />
					<Button
						color={Colours.maroon}
						title="Delete"
						onPress={deleteHandler.bind(this, itemData.item.id)}
					/>
				</ProductItem>
			)}
		/>
	);
};

UserProductsScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Products',
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
					iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					onPress={() => navData.navigation.navigate('EditProduct')}
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

export default UserProductsScreen;
