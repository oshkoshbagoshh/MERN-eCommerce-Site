/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 19:36:43 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 19:44:23
 * @Description: handle all actions related to the cart of any user: getCart, addToCart, deleteFromCart, setCartLoading
 */

import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

// get cart from the api
export const getCart = (id) => dispatch => {
    dispatch(setCartLoading()); // set the cart loading to true
    axios.get(`/api/cart/${id}`) // get the cart from the api
        .then(res => dispatch({ // then dispatch the cart to the reducer
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); // if there is an error, dispatch the error to the reducer
        
}
// add items to the cart
export const addToCart = (id, productId, quantity) => (dispatch, getState) => {
    axios.post(`/api/cart/${id}`, {productId, quantity})
    .then (res => dispatch({
        type: ADD_TO_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// delete items from the cart
export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
    .then (res => dispatch({
        type: DELETE_FROM_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// set cart loading to true
export const setCartLoading = () => {
    return {
        type: CART_LOADING
    }
}
