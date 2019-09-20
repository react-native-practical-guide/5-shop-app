// DO NOT FORGET TO EXPORT THE CONSTANTS
export const ADD_ORDER = 'ADD_ORDER';

// REMEMBER actions reach all reducers. So you can handle this action also in the cart reducer.
export const addOrder = (cartItems, totalAmount) => {    
    return {
        type: ADD_ORDER,
        orderData: {
            items: cartItems,
            amount: totalAmount
        }
    }
}