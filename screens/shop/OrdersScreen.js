import React from 'react';
import { Text, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const OrdersScreen = (props) => {
	const orders = useSelector((state) => state.orders.orders);
	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
		/>
	);
};

OrdersScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Orders',
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

export default OrdersScreen;
