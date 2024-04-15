import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartSlicer from './cart/CartSlicer';
import produtosSlice from './produtos/ProdutosSlice';

const rootReducer = combineReducers({ userSlice, cartSlicer , produtosSlice});

export default rootReducer;