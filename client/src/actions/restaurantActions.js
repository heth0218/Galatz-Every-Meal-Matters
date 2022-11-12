import { GET_RESTAURANTS, RESTAURANT_ERROR,SEARCH_RESTAURANT, GET_RESTAURANT, SET_RESTAURANT, SEARCH_RESTAURANT_2, ADD_RESTAURANT, DELETE_CART, DELETE_RESTAURANT, ADD_MENU, ADD_MENUITEM, DELETE_MENU } from './types';
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

export const searchRestaurant = (query) => async dispatch => {
    try {
        console.log("jenish", query)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        var d = JSON.stringify({
            "search": query,
          });
        const restaurant = await axios.post('/api/restaurant/hello/search', d, config);
        console.log(restaurant.data)

        // console.log(restaurant, menu);
        dispatch({
            type: SEARCH_RESTAURANT,
            payload: { restaurant: restaurant.data }
        })

    } catch (error) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: error.response.statusText
        })
    }
}

export const setRestaurant = (restaurantId) => {
    console.log(restaurantId)
    return {
        type: SET_RESTAURANT,
        payload: restaurantId
    }
}

export const searchRestaurant2 = (description, avgCost) => async dispatch => {
    try{
    // console.log(restaurantId)
    var data = JSON.stringify({
        "description": description,
        "avgCost": avgCost
      });
      
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rest = await axios.post('/api/restaurant/filter', data, config)
    console.log(rest.data)
    dispatch({
        type: SEARCH_RESTAURANT_2,
        payload: rest.data
    })
    }catch(err) {
        console.log(err);
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
            payload: rest.data
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

        const menuList=await axios.get(`/api/menu/${menuItem.restaurant}`)
        console.log(menuList.data)
        dispatch({
            type: ADD_MENUITEM,
            payload: menuList.data.menus
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