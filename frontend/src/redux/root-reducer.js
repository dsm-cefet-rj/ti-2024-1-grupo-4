import { combineReducers } from "redux"
import userSlice from './user/UserSlice';
import cartSlicer from './cart/CartSlicer';
import produtosSlice from './produtos/ProdutosSlice';
import compraSlice from "./compra/compraSlice";
import pedidoSlice from './listapedidos/ListaPedidoSlice';
import enderecoSlice from "./endereco/enderecoSlice";
import entregaSlice from "./entrega/entregaSlice";

/**
 * @description RootReducer com todos os slicers da aplicação
 */
const rootReducer = combineReducers({ userSlice, cartSlicer , produtosSlice,compraSlice, enderecoSlice, pedidoSlice, entregaSlice});

export default rootReducer;