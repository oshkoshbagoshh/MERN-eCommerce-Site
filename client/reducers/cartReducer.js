/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 20:53:09 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 20:56:04
 * @Description: deal with the reducers related to the cart. Import the types from the actions/types.js file 
 * set up an initial state where we set the cart to an empty array and set loading to false to begin with.
 */

import {
    GET_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,   
    CART_LOADING
} from "../actions/types";

// set up the initial state
const initialState = {
    cart: null,
    loading: false
}

// export the cartReducer function
export default function(state=initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: [action.payload, ...state.cart]
            }
        case DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }
        case CART_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }

}

