import { REGISTER_USER, USER_ERROR, LOGIN_USER, LOGOUT, UPDATE_USER, GET_USER } from '../actions/types';

const initialState = {
    user: null,
    error: null,
    current: null,
    isAuthenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
        case REGISTER_USER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                current: action.payload.user
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                current: action.payload
            }
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                current: action.payload
            }
        default:
            return { ...state }
    }
}