/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 20:56:20 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 20:57:57
 * @Description: reducers related to the orders. Import the types from the actions/types.js file. 
 * define an initial state where we set the orders to an empty array and set loading to false to begin with.
 */

import {
    GET_ORDERS,
    CHECKOUT,
    ORDERS_LOADING
} from "../actions/types";

// set up the initial state
const initialState = {
    orders: [],
    loading: false
}

// export the orderReducer function
export default function(state=initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case CHECKOUT:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            }
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }

}
