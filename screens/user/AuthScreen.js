import React, { useReducer, useCallback } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colours from '../../constants/Colours';
import * as authActions from '../../store/actions/auth';

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
			inputValidities: updatedValidities,
			inputValues: updatedValues
		};
	}
	return state;
};

const AuthScreen = (props) => {
    const dispatch = useDispatch();

    const [ formState, dispatchFormState ] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false
	});

    const signupHandler = () => {
        dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
    }

    const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[ dispatchFormState ]
    );
    
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
							label="E-mail"
							errorText="Please enter a valid email address!"
							keyboardType="email-address"
							autoCapitalize="none"
							// returnKeyType="next"
							onInputChange={inputChangeHandler}
							initialValue=""
							required
							email
						/>
						<Input
							id="password"
							label="Password"
							errorText="Please enter a valid password!"
							keyboardType="default"
							secureTextEntry
							minLength={5}
							autoCapitalize="none"
							// returnKeyType="next"
							onInputChange={inputChangeHandler}
							initialValue=""
							required
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
