import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const initialState = {
	availableProducts: [],
	userProducts: [],
	favoriteProducts: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				availableProducts: action.products,
				userProducts: action.userProducts
			};
		case DELETE_PRODUCT:
			return {
				userProducts: state.userProducts.filter((product) => product.id !== action.pid),
				availableProducts: state.availableProducts.filter((product) => product.id !== action.pid),
				favoriteProducts: state.favoriteProducts.filter((product) => product.id !== action.pid)
			};
		case CREATE_PRODUCT:
			const newProduct = new Product(
				action.productData.id,
				action.productData.ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct)
			};
		case UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex((prod) => prod.id === action.pid);
			const updatedProduct = new Product(
				action.pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			);
			const updatedUserProducts = [ ...state.userProducts ];
			updatedUserProducts[productIndex] = updatedProduct;

			const availableProductIndex = state.availableProducts.findIndex((prod) => prod.id === action.pid);
			const updatedAvailableProducts = [ ...state.availableProducts ];
			updatedAvailableProducts[availableProductIndex] = updatedProduct;

			favoriteProductIndex = state.favoriteProducts.findIndex((prod) => prod.id === action.pid);
			const updatedFavoriteProducts = [ ...state.favoriteProducts ];
			updatedFavoriteProducts[favoriteProductIndex] = updatedProduct;
			return {
				...state,
				userProducts: updatedUserProducts,
				availableProducts: updatedAvailableProducts,
				favoriteProducts: updatedFavoriteProducts
			};
	}
	return state;
};
