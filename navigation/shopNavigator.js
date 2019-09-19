import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

// Result is a React component.
const ProductsNavigator = createStackNavigator(
	{
		productsOverview: ProductsOverviewScreen
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.moccasin : ''
			},
			headerTintColor: Platform.OS === 'android' ? 'white' : Colors.darkblue 
		}
	}
);

export default createAppContainer(ProductsNavigator);
