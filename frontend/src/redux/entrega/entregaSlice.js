import { createSlice, createAsyncThunk, createEntityAdapter, current } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'
import { toast } from "react-toastify";

const entregaAdapter = createEntityAdapter();

const initialState = entregaAdapter.getInitialState({
    status: 'not_loaded',
    error:null
});

/**
 * Async Thunk para busca todas as entregas
 * @returns {Promise} - Promise com todas as entregas
 */

export const fetchEntrega = createAsyncThunk('entrega/fetchEntrega', async (_, {getState}) => {
    return await httpGet(`${baseUrl}/entrega`);
});

/**
 * Async Thunk para deletar uma entrega por id
 *  @param {string} idEntrega - O id da entrega
 * @returns {Promise} - Promise com uma id da entrega
 */
export const deleteEntregaServer = createAsyncThunk('entrega/deleteEntregaServer', async (idEntrega, {getState}) => {
    await httpDelete(`${baseUrl}/entrega/${idEntrega}`);
    return idEntrega;
});

/**
 * Async Thunk para adicionar uma entrega ao servidor
 * @param {Object} entrega - O objeto entrega que será adicionado
 * @returns {Promise} - Promise com o endereco adicionado
 */
export const addEntregaServer = createAsyncThunk('entrega/addEntregaServer', async (entrega, {getState}) => {
    await httpPost(`${baseUrl}/entrega`, entrega);
    return entrega;
});

/**
 * Async Thunk que atualiza um endereco pelo id
 * @param {string} endereco - O endereco que deve ter o valor atualizado
 * @returns {Promise} - Promise com o valor atualizado
 */
export const updateEntregaServer = createAsyncThunk('entrega/updateEntregaServer', async (entrega, {getState}) => {
    return await httpPut(`${baseUrl}/entrega/${entrega.id}`, entrega);
});

/**
 * Slice que gerencia a entrega
 */


export const entregaSlice = createSlice({
    name: 'entrega',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchEntrega.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchEntrega.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchEntrega.fulfilled, (state, action) => {
            state.status = 'loaded';
            entregaAdapter.setAll(state, action.payload);
          })
          .addCase(deleteEntregaServer.fulfilled, (state,action) => {
            state.status = 'deleted';
            entregaAdapter.removeOne(state, action.payload);
          })
          .addCase(addEntregaServer.fulfilled, (state,action) => {
            state.status = 'saved';
            entregaAdapter.addOne(state,action.payload);
          })
          .addCase(updateEntregaServer.rejected,(state,action)=>{
            state.status = 'failed';
            toast.error("Erro: " + error, {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          })
          .addCase(updateEntregaServer.fulfilled, (state, action) => {
            state.status = 'saved';
            userAdapter.upsertOne(state, action.payload);
            toast.info("Informações atualizadas!", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          })

        }

});

export const {
    selectAll: selectAllEntrega,
    selectById: selectEntregaById,
    selectIds: selectEntregasIds
} = entregaAdapter.getSelectors(state => state.enderecos)
export default entregaSlice.reducer