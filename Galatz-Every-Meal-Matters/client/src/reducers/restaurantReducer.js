import { GET_RESTAURANTS, RESTAURANT_ERROR, GET_RESTAURANT, SET_RESTAURANT, ADD_RESTAURANT, DELETE_RESTAURANT, ADD_MENUITEM, DELETE_MENU } from '../actions/types';

const initialState = {
    restaurants: null,
    error: null,
    current: null,
    menu: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload
            }
        case GET_RESTAURANT:
            return {
                ...state,
                current: action.payload.restaurant,
                menu: action.payload.menu.menus
            }
        case RESTAURANT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_RESTAURANT:
            localStorage.setItem('restaurant', action.payload)
        case ADD_RESTAURANT:
            return {
                ...state,
                restaurants: [...state.restaurants, action.payload]
            }
        case DELETE_RESTAURANT:
            return {
                ...state,
                restaurants: state.restaurants.filter(item => item._id !== action.payload)
            }
        case ADD_MENUITEM:
            return {
                ...state,
                menu: [...state.menu, action.payload]
            }
        case DELETE_MENU:
            return {
                ...state,
                menu: state.menu.filter(item => item._id !== action.payload)
            }
        default:
            return { ...state }
    }
}