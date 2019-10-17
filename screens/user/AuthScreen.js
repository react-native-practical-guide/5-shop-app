import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colours from '../../constants/Colours';

const AuthScreen = (props) => {
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
							onInputChange={() => {}}
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
							onInputChange={() => {}}
							initialValue=""
							required
						/>
					</ScrollView>
					<View style={styles.buttonContainer}>
						<Button title="Login" color={Colours.chocolate} onPress={() => {}} />
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
