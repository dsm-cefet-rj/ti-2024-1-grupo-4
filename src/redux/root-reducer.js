import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartSlicer from './cart/CartSlicer';
import produtosSlice from './produtos/ProdutosSlice';
import pedidoSlice from './listapedidos/ListaPedidoSlice';

const rootReducer = combineReducers({ userSlice, cartSlicer , produtosSlice, pedidoSlice});

export default rootReducer;