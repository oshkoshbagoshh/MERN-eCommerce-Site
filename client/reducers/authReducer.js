/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 19:52:25 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 20:45:45
 * @Description:
 *  This file is for authentification purposes. It will handle all actions related to the authentification of the user.
 * first import all of the types needed for authentification from the types.js file in the actions folder.
 * we then set up an initial state where we retrieve the token from the local storage if it exists.
 * we also set up isAuthenticatd to null, and isLoading to false to start with. We also set up the user field as false to begin with 
 * 
 */

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

// set up the initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

// export the authReducer function
export default function(state=initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // set the token in the local storage
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        // if the login or register fails, we want to remove the token from the local storage
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            // remove the token from the local storage
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
            
            
    
        default:
            return state;
    }
}
