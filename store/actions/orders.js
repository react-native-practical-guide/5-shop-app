export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
	return async (dispatch) => {
		const date = new Date();
		const response = await fetch('https://shop-app-bf402.firebaseio.com/orders/u1.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cartItems,
				totalAmount,
				date: date.toISOString()
			})
		});

        if(!response.ok) {
            throw new Error('Something went wrong with adding the order on the server!')
        }
		const resData = await response.json();
		dispatch({
			type: ADD_ORDER,
			orderData: {
				id: resData.name,
				items: cartItems,
                amount: totalAmount,
                date: date
			}
		});
	};
};
