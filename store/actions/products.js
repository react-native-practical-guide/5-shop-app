import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		try {
			const response = await fetch('https://shop-app-bf402.firebaseio.com/products.json');

			if (!response.ok) {
				throw new Error('Something went wrong with fetching the data from the server!');
			}
			const resData = await response.json();
			const loadedProducts = [];

			for (const key in resData) {
				loadedProducts.push(
					new Product(
						key,
						resData[key].ownerId,
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}
			dispatch({
				type: SET_PRODUCTS,
				products: loadedProducts,
				userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
			});
		} catch (err) {
			// sent error to custom analytics server
			throw err;
		}
	};
};

export const deleteProduct = (productId) => {
	return async (dispatch) => {
		const response = await fetch(`https://shop-app-bf402.firebaseio.com/products/${productId}.json`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Something went wrong with deleting the data on the server!');
		}

		dispatch({
			type: DELETE_PRODUCT,
			pid: productId
		});
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	// Note: Now also createProduct returns a Promise

	// async code before dispatching the action...
	return async (dispatch, getState) => {
		// With redux thunk `createProduct` action returns a function. This func receives an argument
		// the `dispatch` func, which will be passed automatically by redux thunk.
		// Redux thunk will call this `dispatch` func.
		// But before that you can execute any `async` code you want...
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const response = await fetch(`https://shop-app-bf402.firebaseio.com/products.json?auth=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// Note: Firebase uses alphabetical order...
				title,
				description,
				imageUrl,
				price,
				ownerId: userId
			})
		});

		const resData = await response.json();

		// Redux thunk will call this `dispatch` func.
		dispatch({
			type: CREATE_PRODUCT,
			productData: {
				id: resData.name, // `name` is the key that Firebase gives to its ids...
				title,
				description,
				imageUrl,
				price,
				ownerId: userId
			}
		});
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		// For token authentication check https://firebase.google.com/docs/database/rest/auth
		const response = await fetch(`https://shop-app-bf402.firebaseio.com/products/${id}.json?auth=${token}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title,
				description,
				imageUrl
			})
		});

		if (!response.ok) {
			const resData = await response.json();
			throw new Error('Something went wrong with updating the data on the server!');
		}

		dispatch({
			type: UPDATE_PRODUCT,
			pid: id,
			productData: {
				title,
				description,
				imageUrl
			}
		});
	};
};
