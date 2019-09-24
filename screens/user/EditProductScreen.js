import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, TextInput, Platform, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productActions from '../../store/actions/products';

const EditProductScreen = (props) => {
	const prodId = props.navigation.getParam('productId');
	// If productId is not set (if we press the add button in UserProductScreen)
	// then editedProduct will be undifined. But that is OK.
	const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));

	const [ title, setTitle ] = useState(editedProduct ? editedProduct.title : '');
	const [ imageUrl, setImageUrl ] = useState(editedProduct ? editedProduct.imageUrl : '');
	const [ price, setPrice ] = useState('');
	const [ description, setDescription ] = useState(editedProduct ? editedProduct.description : '');

	const dispatch = useDispatch();

	// Rap it with useCallback to avoid infinite loop.
	const submitHandler = useCallback(
		() => {
			if (editedProduct) {
				dispatch(productActions.updateProduct(prodId, title, description, imageUrl));
			} else
				// Put a + to price to convert it from a string to a number so the .toFixed(2)
				// function works (in ProductsOverviewScreen) !
				dispatch(productActions.createProduct(title, description, imageUrl, +price));
			props.navigation.goBack();
		},
		[ dispatch, prodId, title, imageUrl, price, description ]
	);

	useEffect(
		() => {
			props.navigation.setParams({ submit: submitHandler });
		},
		[ submitHandler ]
	);
	return (
		<ScrollView style={styles.form}>
			<View style={styles.formControl}>
				<Text style={styles.label}>Title</Text>
				<TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Image</Text>
				<TextInput style={styles.input} value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
			</View>
			{/* If in edited mode then we get no price */}
			{editedProduct ? null : (
				<View style={styles.formControl}>
					<Text style={styles.label}>Price</Text>
					<TextInput style={styles.input} value={price} onChangeText={(text) => setPrice(text)} />
				</View>
			)}
			<View style={styles.formControl}>
				<Text style={styles.label}>Description</Text>
				<TextInput style={styles.input} value={description} onChangeText={(text) => setDescription(text)} />
			</View>
		</ScrollView>
	);
};

EditProductScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Save"
					iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
					onPress={submitFn}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20
	},
	formControl: {
		width: '100%'
		// marginBottom: 10
	},
	label: {
		fontFamily: 'open-sans-bold'
		// marginHorizontal: 8
	},
	input: {
		paddingHorizontal: 1,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	}
});

export default EditProductScreen;
