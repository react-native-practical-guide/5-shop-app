import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

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
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colours.maroon 
}

// Result is a React component.
const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen,
		// Orders: OrdersScreen, It is not part of this stack. We reach it from the sideDrawer.
	},
	{
		defaultNavigationOptions: defaultNavOptions
	}
);

const OrdersNavigator = createStackNavigator({
	Orders: OrdersScreen
}, {
	defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
	Products: ProductsNavigator,
	Orders: OrdersNavigator
}, {
	contentOptions: {
		activeTintColor: Colours.chocolate
	}
})

export default createAppContainer(ShopNavigator);
