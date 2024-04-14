import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartReducer from './cart/CartSlicer';
import produtosReducer from './produtos/ProdutosSlice';

const rootReducer = combineReducers({ userSlice, cartReducer , produtosReducer});

export default rootReducer;