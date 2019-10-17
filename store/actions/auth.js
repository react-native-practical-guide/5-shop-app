export const SIGN_UP = 'SIGN_UP';

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
			throw new Error('Something went wrong with the authentication procedure!');
		}
		const resData = await response.json(); // transforms the data from json to javascript object
		console.log(resData);

		dispatch({ type: SIGN_UP });
	};
};
