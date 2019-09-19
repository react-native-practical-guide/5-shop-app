import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colours from '../constants/Colours';
import CartScreen from '../screens/shop/CardScreen';

// Result is a React component.
const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen
	},
	{
		defaultNavigationOptions: {
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
	}
);

export default createAppContainer(ProductsNavigator);
