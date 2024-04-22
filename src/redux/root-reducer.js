import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartSlicer from './cart/CartSlicer';
import produtosSlice from './produtos/ProdutosSlice';
import compraSlice from "./compra/compraSlice";

const rootReducer = combineReducers({ userSlice, cartSlicer , produtosSlice,compraSlice});

export default rootReducer;