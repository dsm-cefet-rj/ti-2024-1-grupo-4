import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartReducer from './cart/reducer';

const rootReducer = combineReducers({ userSlice, cartReducer });

export default rootReducer;