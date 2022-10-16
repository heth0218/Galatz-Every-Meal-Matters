import { combineReducers } from 'redux';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import cartReducer from './cartReducer'

export default combineReducers({
    user: userReducer,
    restaurant: restaurantReducer,
    cart: cartReducer
})