import { ADD_TO_CARD } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
	items: {},
	totalAmount: 0
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CARD:
			const addedProduct = action.product;
			const prodPrice = addedProduct.price;
			const prodTitle = addedProduct.title;

			let updatedOrNewCardItem;
			// If this product is allready in Card...
			// items[addedProduct.id] = access or set a dynamic prop.
			if (state.items[addedProduct.id]) { 
				// Already have the item in the card
				updatedOrNewCardItem = new CartItem(
					state.items[addedProduct.id].quantity + 1,
					prodPrice,
					prodTitle,
					state.items[addedProduct.id].sum + prodPrice
				);
				// If we do not have this product in Card.
			} else {
				updatedOrNewCardItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
			}
			return {
				...state, // actually redundant
				items: { ...state.items, [addedProduct.id]: updatedOrNewCardItem },
				totalAmount: state.totalAmount + prodPrice
			};
		default:
			return state;
	}
};
