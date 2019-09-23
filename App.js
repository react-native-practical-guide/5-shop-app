import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension'; // !!! Remove before deploying app !!!
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import ShopNavigator from './navigation/shopNavigator';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
});
// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};
export default function App() {
	const [ fontLoaded, setFontLoaded ] = useState(false);
	if (!fontLoaded) {
		return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
	}
	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	);
}
