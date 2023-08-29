/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 19:28:13 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 19:36:00
 * @Description: file:///Users/aj/Desktop/bootcamp/Repos_SideProjects/MERN-eCommerce-Site/client/src/actions/itemActions.js
 *

all actions related to items / products. (add, delete, get, update) then we set the item state as loading

get items 

add items

delete items

update items 

set items loading
*/
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';  // import all the types from types.js
import { returnErrors } from './errorActions'; // import returnErrors from errorActions.js


//get items from the api
export const getItems = () => dispatch => {
    dispatch(setItemsLoading()); // set the items loading to true
    axios.get('/api/items') // get the items from the api
        .then(res => dispatch({ // then dispatch the items to the reducer
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); // if there is an error, dispatch the error to the reducer
        
}

// add items to the api

export const addItem = item => (dispatch, getState) => {
    axios.post('/api/items', item)
    .then (res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// delete items from the api
export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
    .then (res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


// update items from the api
export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
    .then (res => dispatch({
        type: UPDATE_ITEM,
        payload: Promise.all([id, res.data])
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// setItems loading
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

