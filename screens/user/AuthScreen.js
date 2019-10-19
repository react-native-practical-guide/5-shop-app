import React, { useReducer, useState, useCallback } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colours from '../../constants/Colours';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	// console.log('state, action', state, action);
	
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
			inputValidities: updatedValidities,
			inputValues: updatedValues
		};
	}
	return state;
};

const AuthScreen = (props) => {
	const [ error, setError ] = useState(false);

	const dispatch = useDispatch();

	const [ formState, dispatchFormState ] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: ''
		},
		inputValidities: {
			email: false,
			password: false
		},
		formIsValid: false
	});

	const signupHandler = useCallback(
		async () => {
			console.log('formState.inputValues.email ', formState.inputValues.email );
			console.log('formState.inputValues.password', formState.inputValues.password);
			setError(null);
			
			try {
				await dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password));
			} catch (err) {
				setError(err.messsage);
			}
		},
		[ dispatch, formState, dispatchFormState ]
	);

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			// console.log('inputIdentifier, inputValue, inputValidity', inputIdentifier, inputValue, inputValidity);
			
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[ dispatchFormState ]
	);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadProducts} color={Colours.chocolate} />
			</View>
		);
	}

	return (
		<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
			<LinearGradient
				colors={[ Colours.chocolate, Colours.maroon ]}
				// start={{ x: 0, y: 1 }}
				// end={{ x: 0, y: 0 }}
				style={styles.gradient}
			>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input
							id="email"
							label="E-Mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter a valid email address."
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							required
							minLength={5}
							autoCapitalize="none"
							errorText="Please enter a valid password."
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
					</ScrollView>
					<View style={styles.buttonContainer}>
						<Button title="Login" color={Colours.chocolate} onPress={signupHandler} />
					</View>
					<View style={styles.buttonContainer}>
						<Button title="Switch to Sign Up" color={Colours.maroon} onPress={() => {}} />
					</View>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

AuthScreen.navigationOptions = {
	headerTitle: 'Authentication'
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	gradient: {
		// width: '100%',
		// height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20
	},
	buttonContainer: {
		marginTop: 10
	}
});

export default AuthScreen;
