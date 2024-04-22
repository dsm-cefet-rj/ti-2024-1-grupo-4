import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartSlicer from './cart/CartSlicer';
import produtosSlice from './produtos/ProdutosSlice';
import enderecoSlice from "./endereco/enderecoSlice";

const rootReducer = combineReducers({ userSlice, cartSlicer , produtosSlice, enderecoSlice});

export default rootReducer;