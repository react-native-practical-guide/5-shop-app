import React from 'react'
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colours from '../constants/Colours';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colours.maroon : ''
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colours.maroon
};

// Result is a React component.
const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen
		// Orders: OrdersScreen, It is not part of this stack. We reach it from the sideDrawer.
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
				size={23} 
				color={drawerConfig.tintColor} />
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen
	},
	{
		// navigationOptions only apply if this Screen here, belongs to another Navigator
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
				size={23} 
				color={drawerConfig.tintColor} />
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrdersNavigator
	},
	{
		contentOptions: {
			activeTintColor: Colours.chocolate
		}
	}
);

export default createAppContainer(ShopNavigator);
