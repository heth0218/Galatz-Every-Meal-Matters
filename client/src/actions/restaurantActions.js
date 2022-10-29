import { GET_RESTAURANTS, RESTAURANT_ERROR, GET_RESTAURANT, SET_RESTAURANT, ADD_RESTAURANT, DELETE_CART, DELETE_RESTAURANT, ADD_MENU, ADD_MENUITEM, DELETE_MENU } from './types';
import axios from 'axios'

export const getRestaurants = () => async dispatch => {
    try {
        const restaurants = await axios.get('/api/restaurant/')
        console.log(restaurants);
        dispatch({
            type: GET_RESTAURANTS,
            payload: restaurants.data
        })

    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }

}

export const getRestaurant = () => async dispatch => {
    try {
        const id = localStorage.getItem('restaurant')
        console.log(id)
        const restaurant = await axios.get(`/api/restaurant/${id}`);
        const menu = await axios.get(`/api/menu/${id}`);

        console.log(restaurant, menu);
        dispatch({
            type: GET_RESTAURANT,
            payload: { restaurant: restaurant.data, menu: menu.data }
        })

    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }
}

export const setRestaurant = (id) => {
    return {
        type: SET_RESTAURANT,
        payload: id
    }
}


export const addRestaurant = (restaurant) => async dispatch => {

    try {
        console.log(restaurant)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const rest = await axios.post('/api/restaurant/', restaurant, config)
        console.log(rest);
        dispatch({
            type: ADD_RESTAURANT,
            payload: rest.data.restaurant
        })
    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }

}

export const deleteRestaurant = (id) => async dispatch => {

    try {
        await axios.delete(`/api/restaurant/${id}`);
        dispatch({
            type: DELETE_RESTAURANT,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }


}

export const addMenuItem = (menuItem) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const menu = await axios.post('/api/menu/', menuItem, config);
        console.log(menu, "menu");
        dispatch({
            type: ADD_MENUITEM,
            payload: menu.data
        })

    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }
}

export const deleteMenu = (id) => async dispatch => {
    try {
        await axios.delete(`/api/menu/${id}`);
        dispatch({
            type: DELETE_MENU,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }

}