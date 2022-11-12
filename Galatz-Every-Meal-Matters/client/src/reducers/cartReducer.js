import { ADD_MENU, CART_ERROR, GET_CART, DELETE_CART, BUY_CART } from '../actions/types';

const initialState = {
    cart: [],
    error: null,
    cartItems: null,
    cartHistory: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MENU:
            return {
                ...state,
                cart: [action.payload, ...state.cart]
            }
        case GET_CART:

            return {
                ...state,
                cartItems: action.payload
            }
        case CART_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload)
            }
        case BUY_CART:
            return {
                ...state,
                cartHistory: state.cartItems,
                cartItems: null
            }
        default:
            return { ...state }
    }
}