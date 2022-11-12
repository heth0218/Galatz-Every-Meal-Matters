import { GET_RESTAURANTS, SEARCH_RESTAURANT,SEARCH_RESTAURANT_2, RESTAURANT_ERROR, GET_RESTAURANT, SET_RESTAURANT, ADD_RESTAURANT, DELETE_RESTAURANT, ADD_MENUITEM, DELETE_MENU } from '../actions/types';

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
        case SEARCH_RESTAURANT:
            return{
                ...state, 
                restaurants:action.payload.restaurant
            }
        case SEARCH_RESTAURANT_2:
            return{
                ...state, 
                restaurants:action.payload
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
                restaurants: state.restaurants.filter(item => item.restaurantId !== action.payload)
            }
        case ADD_MENUITEM:
            return {
                ...state,
                menu: action.payload
            }
        case DELETE_MENU:
            return {
                ...state,
                menu: state.menu.filter(item => item.menuItemsId !== action.payload)
            }
        default:
            return { ...state }
    }
}