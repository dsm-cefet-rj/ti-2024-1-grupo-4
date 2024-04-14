import { combineReducers } from "redux"
import userReducer from './user/reducer';
import cartReducer from './cart/reducer';
import compraReducer from "./compra/compraSlice";

const rootReducer = combineReducers({ userReducer, cartReducer,compraReducer});

export default rootReducer;