/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 19:45:08 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 19:48:25
 * @Description: 
 * handle all actions related to the orders in our application. (getOrders, checkout, setOrderLoading)
 */

import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';

// get orders from the api
export const getOrders = (id) => dispatch => {
    dispatch(setOrdersLoading()); // set the orders loading to true
    axios.get(`/api/orders/${id}`) // get the orders from the api
        .then(res => dispatch({ // then dispatch the orders to the reducer
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); // if there is an error, dispatch the error to the reducer
    }

// checkout
export const checkout = (id, source) => dispatch => {
    axios.post(`/api/orders/${id}`, {source})
    .then (res => dispatch({
        type: CHECKOUT,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// set orders loading to true
export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}
