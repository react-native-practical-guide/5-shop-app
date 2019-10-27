import { AsyncStorage } from 'react-native';

// export const SIGN_UP = 'SIGN_UP';
// export const LOG_IN = 'LOG_IN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

let timer;

export const authenticate = (token, userId, expiryTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: AUTHENTICATE,
			token: token,
			userId: userId
		});
	};
};

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwc0Lc6fsxuNCKig9_yh3z8YcffivFte0',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'Something went wrong with logging in!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'This email already exists!';
			}
			throw new Error(message);
		}

		const resData = await response.json(); // transforms the data from json to javascript object
		dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
		// The first new Date converts the second's huge number of miliseconds in a concrete date.
		const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwc0Lc6fsxuNCKig9_yh3z8YcffivFte0',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true
					})
				}
			);

			if (!response.ok) {
				const errorResData = await response.json();
				const errorId = errorResData.error.message;
				let message = 'Something went wrong with logging in!';
				if (errorId === 'EMAIL_NOT_FOUND') {
					message = 'This email could not be found!';
				} else if (errorId === 'INVALID_PASSWORD') {
					message = 'This password is not valid!';
				}
				throw new Error(message);
			}

			const resData = await response.json(); // transforms the data from json to javascript object
			dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
			// The first new Date converts the second's huge number of miliseconds in a concrete date.
			const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
		} catch (error) {
			throw error;
		}
	};
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return { type: LOG_OUT };
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const saveDataToStorage = (token, userId, expirationDate) => {
	// data must be in string format!
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token: token,
			userId: userId,
			expiryDate: expirationDate.toISOString() // convert it to a string in a standardize format
		})
	);
};
