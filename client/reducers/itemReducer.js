/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 20:46:41 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 20:51:11
 * @Description: handle all tasks related to items in the store. Set up an initial state where we set the items to an empty array and set loading to false to begin with.
 * we then start checking for each action type and making changes as applicable
 */

import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    ITEMS_LOADING
} from "../actions/types";

// set up the initial state
const initialState = {
    items: [],
    loading: false
}

// export the itemReducer function
export default function(state=initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
            case ADD_ITEM:
                return {
                    ...state,
                    items: [action.payload, ...state.items]
                };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            
            };
        case UPDATE_ITEM:
            const {id,  data } = action.payload;
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === id) {
                        item = data;
                    }
                })
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

