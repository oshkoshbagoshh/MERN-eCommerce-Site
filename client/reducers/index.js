/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 20:58:14 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 20:59:02
 * @Description: combine all the reducers into one. Import the combineReducers function from redux and import all the reducers we created.
 */

import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

// export the combined reducers
export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer
});
