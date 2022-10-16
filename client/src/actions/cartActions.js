import { ADD_MENU, CART_ERROR, GET_CART, DELETE_CART, BUY_CART } from './types'
import axios from 'axios'


export const addMenu = (item) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const user = await axios.post('/api/cart/', item, config)
        console.log(user, "ujeer")
        dispatch({
            type: ADD_MENU,
            payload: item
        })

    } catch (error) {
        dispatch({
            type: CART_ERROR,
            payload: error.response.statusText
        })
    }
}

export const getCart = () => async dispatch => {
    try {
        const cart = await axios.get('/api/cart/');
        console.log(cart);
        dispatch({
            type: GET_CART,
            payload: cart.data
        })
    } catch (error) {
        dispatch({
            type: CART_ERROR,
            payload: error.response.statusText
        })
    }

}

export const deleteItem = (item) => async dispatch => {
    try {
        const cart = await axios.delete('/api/cart/delete', { data: item })

        const { _id } = item
        console.log(_id)
        dispatch({
            type: DELETE_CART,
            payload: _id
        })
    } catch (error) {
        dispatch({
            type: CART_ERROR,
            payload: error.response.statusText
        })
    }
}

export const buyCart = () => async dispatch => {
    try {
        const buy = await axios.get('/api/cart/buy');
        console.log(buy);
        dispatch({
            type: BUY_CART,
            payload: buy
        })
    } catch (error) {
        dispatch({
            type: CART_ERROR,
            payload: error.response.statusText
        })
    }
}
