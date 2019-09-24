import { ADD_TO_CARD, REMOVE_FROM_CARD } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

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
		case REMOVE_FROM_CARD:
			const selectedCartItem = state.items[action.pid];
			const currentQty = selectedCartItem.quantity;
			let updatedCartItems;
			if (currentQty > 1) {
				// need to reduce it not erase it
				const updatedCartItem = new CartItem(
					selectedCartItem.quantity - 1,
					selectedCartItem.productPrice,
					selectedCartItem.productTitle,
					selectedCartItem.sum - selectedCartItem.productPrice
				);
				updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.pid];
			}
			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - selectedCartItem.productPrice
			};
		case ADD_ORDER:
			return initialState; // Just clearing the cart!
		case DELETE_PRODUCT:
			// If item doesn't exist...
			if (!state.items[action.pid]) {
				return state;
			}
			const updatedItems = { ...state.items };
			// In case the item is allready in the cart...
			itemTotal = state.items[action.pid].sum;
			delete updatedItems[action.pid];
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount - itemTotal
			};
		default:
			return state;
	}
};
