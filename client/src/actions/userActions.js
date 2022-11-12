import { REGISTER_USER, USER_ERROR, LOGIN_USER, LOGOUT, UPDATE_USER, GET_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const registerUser = (user) => async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/users/register', user, config)

        console.log(res)
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })
        setAuthToken(res.data.token)

    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.response.statusText
        })
    }

}

export const loginUser = (user) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log(user)

        const res = await axios.post('/api/users/login', user, config)

        console.log(res.data)
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        })
        setAuthToken(res.data.token)
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.response.statusText
        })
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const updateUser = (item) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { userId } = item
        const user = await axios.put(`/api/users/${userId}`, item, config);
        console.log(user)
        dispatch({
            type: UPDATE_USER,
            payload: user.data
        })
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.response.statusText
        })
    }


}

//Load User
export const loadUser = () => async dispatch => {
    console.log("hello world")
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/users/');
        console.log(res.data)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.response.statusText
        })
    }
}