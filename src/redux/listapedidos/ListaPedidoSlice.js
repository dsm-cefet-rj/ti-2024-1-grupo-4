import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl';
import { toast } from 'react-toastify';

const pedidoAdapter = createEntityAdapter();

const initialState = pedidoAdapter.getInitialState({
    pedidos: [],
    status: 'not_loaded',
    error:null
});

export const fetchPedido = createAsyncThunk('pedido/fetchPedido', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/pedido`);
});

export const deletePedidoServer = createAsyncThunk('pedido/deletePedidoServer', async (pedido, {getState}) => {
    await httpDelete(`${baseUrl}/pedido/${pedido.id}`);
    toast.warning(pedido.id + " removido!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return pedido.id;
});

export const addPedidoServer = createAsyncThunk('pedido/addPedidoServer', async (pedido, {getState}) => {
    toast.success(pedido.nome + " registrado com sucesso!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return await httpPost(`${baseUrl}/pedido`, pedido);
});

export const fetchPedidosByUser = createAsyncThunk('pedido/fetchPedidoByUser', async(payload, {getState}) =>{
  try{
    //Pega todos os pedidos do user
    const response = await fetch(`${baseUrl}/pedido/`);
    const pedidos = await response.json();

    const pedidoByUser = pedidos.filter(pedido => pedido.user.id === payload);
    return pedidoByUser;
  } catch(error){
    throw error;
  }
});

export const updatePedidoServer = createAsyncThunk('pedido/updatePedidoServer', async (pedido, {getState}) => {
    toast.info(pedido.id + " foi alterado!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return await httpPut(`${baseUrl}/pedido/${pedido.id}`, pedido);
});

export const updateStatusPedidoServer = createAsyncThunk('pedido/updatePedidoServer', async (pedido, {getState}) => {
  toast.info("Status foi alterado para: "+ pedido.status, {
    position: "bottom-left",
    className: "text-spicy-mix bg-banana-mania shadow",
    autoClose: 4000,
  });
  const pedidoId = pedido.id
  return await httpPut(`${baseUrl}/pedido/${pedido.id}`, pedido);
});

export const pedidoIDExistServer = createAsyncThunk('pedido/pedidoExistServer', async (id, {getState}) => {
  const response = await fetch (`${baseUrl}/pedido?id=${id}`);
  const existe = await response.json();
  return existe.length > 0;
});

export const pedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchPedido.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchPedido.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchPedido.fulfilled, (state, action) => {
            state.status = 'loaded';
            pedidoAdapter.setAll(state, action.payload);
          })
          .addCase(deletePedidoServer.fulfilled, (state,action) => {
            state.status = 'deleted';
            pedidoAdapter.removeOne(state, action.payload);
          })
          .addCase(addPedidoServer.fulfilled, (state,action) => {
            state.status = 'saved';
            pedidoAdapter.addOne(state,action.payload);
          })
          .addCase(updatePedidoServer.fulfilled, (state, action) => {
            state.status = 'saved';
            pedidoAdapter.upsertOne(state, action.payload);
          })
          .addCase(fetchPedidosByUser.fulfilled,(state,action)=>{
            state.status = 'saved';
            state.pedidos = action.payload;
          })

        }

});

export const {
      selectAll: selectAllPedido,
      selectById: selectPedidoById,
      selectIds: selectPedidosIds
} = pedidoAdapter.getSelectors(state => state.pedidos)
export default pedidoSlice.reducer
