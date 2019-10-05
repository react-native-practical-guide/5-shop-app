import React, { useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, TextInput, Platform, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValues: updatedValues,
			inputValidities: updatedValidities
		};
	}
	return state;
};

const EditProductScreen = (props) => {
	const prodId = props.navigation.getParam('productId');
	// If productId is not set (if we press the add button in UserProductScreen)
	// then editedProduct will be undifined. But that is OK.
	const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));

	const dispatch = useDispatch();

	const [ formState, dispatchFormState ] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: ''
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false
		},
		formIsValid: editedProduct ? true : false
	});
	// Rap it with useCallback to avoid infinite loop.
	const submitHandler = useCallback(
		() => {
			if (!formState.formIsValid) {
				Alert.alert('Invalid input', 'Please check the error in the form', [ { text: 'OK' } ]);
				return;
			}
			if (editedProduct) {
				dispatch(
					productActions.updateProduct(
						prodId,
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imageUrl
					)
				);
			} else
				// Put a + to price to convert it from a string to a number so the .toFixed(2)
				// function works (in ProductsOverviewScreen) !
				dispatch(
					productActions.createProduct(
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imageUrl,
						+formState.inputValues.price
					)
				);
			props.navigation.goBack();
		},
		[ dispatch, prodId, formState ]
	);

	useEffect(
		() => {
			props.navigation.setParams({ submit: submitHandler });
		},
		[ submitHandler ]
	);

	const textChangeHandler = (inputIdentifier, text) => {
		let isValid = false;
		if (text.trim().length > 0) {
			isValid = true;
		}

		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: text,
			isValid: isValid,
			input: inputIdentifier
		});
	};

	return (
		<ScrollView style={styles.form}>
			
			<View style={styles.formControl}>
				<Text style={styles.label}>Image</Text>
				<TextInput
					style={styles.input}
					value={formState.inputValues.imageUrl}
					onChangeText={textChangeHandler.bind(this, 'imageUrl')}
				/>
			</View>
			{/* If in edited mode then we get no price */}
			{editedProduct ? null : (
				<View style={styles.formControl}>
					<Text style={styles.label}>Price</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.price}
						onChangeText={textChangeHandler.bind(this, 'price')}
						keyboardType="decimal-pad"
					/>
				</View>
			)}
			<View style={styles.formControl}>
				<Text style={styles.label}>Description</Text>
				{/* For keyboardType check the docs form Platform compatibility */}
				<TextInput
					style={styles.input}
					value={formState.inputValues.description}
					onChangeText={textChangeHandler.bind(this, 'description')}
				/>
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
