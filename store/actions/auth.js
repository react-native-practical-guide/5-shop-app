export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

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
		dispatch({ type: SIGN_UP, token: resData.idToken, userId: resData.localId });
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
			dispatch({ type: LOG_IN, token: resData.idToken, userId: resData.localId });
		} catch (error) {
			throw error
		}
		
	};
};
