import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colours from '../../constants/Colours';
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = (props) => {
	const dispatch = useDispatch();
	const userProducts = useSelector((state) => state.products.userProducts);
	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
				onSelect={() => {}}
				>
					<Button
						color={Colours.maroon}
						title="Edit"
						onPress={() => {}}
					/>
					<Button
						color={Colours.maroon}
						title="Delete"
						onPress={() => dispatch(productsActions.deleteProduct(itemData.item.id))}
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
		)
	};
};

export default UserProductsScreen;
