import { ADD_MENU, CART_ERROR, GET_CART, DELETE_CART, BUY_CART , GET_CART_HISTORY} from '../actions/types';

const initialState = {
    cart: [],
    error: null,
    cartItems: null,
    cartHistory: null, 
    total:0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MENU:
            return {
                ...state,
                cart: [action.payload, ...state.cart]
            }
        case GET_CART:
        console.log(action.payload);
        let t=0;
        action.payload.forEach(element => {
          t+=element.cartCost*element.quantity
        });
            return {
                ...state,
                cartItems: action.payload, 
                total:t
            }
        case CART_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_CART:
            console.log(action.payload);
            let x=state.cartItems.filter(item => item.cartId !== action.payload)
            let to=0;
        x.forEach(element => {
         to+=element.cartCost*element.quantity
        });
            return {
                ...state,
                cartItems: x, 
                total:to
            }
        case BUY_CART:

            return {
                ...state,
                cartHistory: action.payload,
                cartItems: null, 
                total:0
            }
        case GET_CART_HISTORY:
            return {
                ...state, 
                cartHistory:action.payload
            }
        default:
            return { ...state }
    }
}