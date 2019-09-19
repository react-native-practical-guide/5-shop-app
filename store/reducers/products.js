import PRODUCTS from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerID === 'u1') // dummy set up
}

export default (state = initialState, action) => {
    return state;
}