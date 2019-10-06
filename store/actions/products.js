export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId) => {
	return {
		type: DELETE_PRODUCT,
		pid: productId
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	// Note: Now also createProduct returns a Promise

	// async code before dispatching the action...
	return async (dispatch) => {
		// With redux thunk `createProduct` action returns a function. This func receives an argument
		// the `dispatch` func, which will be passed automatically by redux thunk.
		// Redux thunk will call this `dispatch` func.
		// But before that you can execute any `async` code you want...
		const response = await fetch('https://shop-app-bf402.firebaseio.com/products.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// Set in alphabetical order, because this is what Firebase uses...
				description,
				imageUrl,
				price,
				title,
			})
		});

		const resData = await response.json();
		console.log(resData);

		// Redux thunk will call this `dispatch` func.
		dispatch({
			type: CREATE_PRODUCT,
			productData: {
				id: resData.name, // `name` is the key that Firebase gives to its ids... 
				title,
				description,
				imageUrl,
				price
			}
		});
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title,
			description,
			imageUrl
		}
	};
};
