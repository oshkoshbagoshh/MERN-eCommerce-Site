/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 20:51:45 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 20:52:50
 * @Description: manage the errors part of the app. We set up an initial state where we set the msg to an empty object and the status to null to begin with.
 * import the GET_ERRORS and CLEAR_ERRORS types from the actions/types.js file
 */
import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// set up the initial state
const initialState = {
    msg: {},
    status: null,
    id: null
}

// export the errorReducer function
export default function(state=initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
            case CLEAR_ERRORS:
                return {
                    msg: {},
                    status: null,
                    id: null
                };
        default:
            return state;
    }
}
