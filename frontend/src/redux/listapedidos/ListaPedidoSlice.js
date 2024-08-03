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

/**
 * Async Thunk para busca todos os pedidos
 * @returns {Promise} - Promise com todos os pedidos
 */
export const fetchPedido = createAsyncThunk('pedido/fetchPedido', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/pedido`);
});

/**
 * Async Thunk para deletar um pedido por id
 * @param {string} pedidoID - O id do pedido para deletar
 * @returns {Promise} - Promise contendo o id do pedido deletado
 */
export const deletePedidoServer = createAsyncThunk('pedido/deletePedidoServer', async (pedidoID, {getState}) => {
    await httpDelete(`${baseUrl}/pedido/${pedidoID}`);
    toast.warning(pedidoID + " removido!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return pedidoID;
});

/**
 * Async Thunk para adicionar um pedido ao servidor
 * @param {Object} pedido - O pedido a ser adicionado
 * @returns {Promise} - Promise com o pedido adicionado
 */
export const addPedidoServer = createAsyncThunk('pedido/addPedidoServer', async (pedido, {getState}) => {
    toast.success(pedido.nome + " registrado com sucesso!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return await httpPost(`${baseUrl}/pedido`, pedido);
});

/**
 * Async Thunk para buscar pedido por usuario
 * @param {string} payload - O id do usuario
 * @returns {Promise} - Promise contendo os pedidos que possuem o id do usuario
 */
export const fetchPedidosByUser = createAsyncThunk('pedido/fetchPedidoByUser', async (payload, { getState }) => {
  try {
    //Pega todos os pedidos do user
    //revisar a utilização do admin aqui
    const { id, admin } = payload;
    const response = await fetch(`${baseUrl}/pedido/pedido?id=${id}&admin=${admin}`);
    const pedidos = await response.json();

    return pedidos;
  } catch (error) {
    throw error;
  }
});

/**
 * Async Thunk que atualiza um pedido pelo id
 * @param {Object} pedido - O pedido que deve ter o valor atualizado
 * @returns {Promise} - Promise com o pedido atualizado
 */
export const updatePedidoServer = createAsyncThunk('pedido/updatePedidoServer', async (pedido, {getState}) => {
    toast.info(pedido.id + " foi alterado!", {
      position: "bottom-left",
      className: "text-spicy-mix bg-banana-mania shadow",
      autoClose: 4000,
    });
    return await httpPut(`${baseUrl}/pedido/${pedido.id}`, pedido);
});

/**
 * Async Thunk que atualiza o status de um pedido pelo id
 * @param {Object} pedido - O pedido que deve ter o valor atualizado
 * @returns {Promise} - Promise com o pedido atualizado
 */
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
