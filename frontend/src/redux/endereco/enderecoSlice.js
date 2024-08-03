import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'
import { toast } from "react-toastify";

const enderecoAdapter = createEntityAdapter();

const initialState = enderecoAdapter.getInitialState({
    enderecos: [],
    status: 'not_loaded',
    error:null
});

/**
 * Async Thunk para busca todos os enderecos
 * @returns {Promise} - Promise com todos os enderecos
 */
export const fetchEndereco = createAsyncThunk('endereco/fetchEndereco', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/endereco`);
});

/**
 * Async Thunk para buscar endereco por usuario
 * @param {string} payload - O id do usuario
 * @returns {Promise} - Promise contendo os enderecos que possuem o id do usuario
 */
export const fetchEnderecoByUser = createAsyncThunk('endereco/fetchEnderecoByUser', async(payload, {getState}) =>{
  try{
    //Pega todos os enderecos do user
    const response = await fetch(`${baseUrl}/endereco?userKey=${payload}`);
    const enderecoByUser = await response.json();
    return enderecoByUser;
  } catch(error){
    throw error;
  }
});

/**
 * Async Thunk para deletar um endereco por Id
 * @param {string} idEndereco - O id do endereco para deletar
 * @returns {Promise} - Promise contendo o id do endereco deletado
 */

export const deleteEnderecoServer = createAsyncThunk('endereco/deleteEnderecoServer', async (idEndereco, {getState}) => {
    await httpDelete(`${baseUrl}/endereco/${idEndereco}`);
    return idEndereco;
});

/**
 * Async Thunk para adicionar um endereco ao servidor
 * @param {string} endereco - O endereco a ser adicionado
 * @returns {Promise} - Promise com o endereco adicionado
 */

export const addEnderecoServer = createAsyncThunk('endereco/addEnderecoServer', async (endereco, {getState}) => {
    return await httpPost(`${baseUrl}/endereco`, endereco);
});

/**
 * Async Thunk que atualiza um endereco pelo id
 * @param {string} endereco - O endereco que deve ter o valor atualizado
 * @returns {Promise} - Promise com o valor atualizado
 */
export const updateEnderecoServer = createAsyncThunk('endereco/updateEnderecoServer', async (endereco, {getState}) => {
    return await httpPut(`${baseUrl}/endereco/${endereco.id}`, endereco);
});

/**
 * Slice que gerencia o endereco
 */

export const enderecoSlice = createSlice({
    name: 'endereco',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchEndereco.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchEndereco.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchEndereco.fulfilled, (state, action) => {
            state.status = 'loaded';
            enderecoAdapter.setAll(state, action.payload);
          })
          .addCase(deleteEnderecoServer.fulfilled, (state,action) => {
            state.status = 'deleted';
            enderecoAdapter.removeOne(state, action.payload);
          })
          .addCase(addEnderecoServer.fulfilled, (state,action) => {
            state.status = 'saved';
            enderecoAdapter.addOne(state,action.payload);
          })
          .addCase(updateEnderecoServer.fulfilled, (state, action) => {
            state.status = 'saved';
            enderecoAdapter.upsertOne(state, action.payload);
          })
          .addCase(fetchEnderecoByUser.fulfilled,(state,action) => {
            state.status = 'saved';
            state.enderecos = action.payload;
          })

        }

});


export const {
    selectAll: selectAllEndereco,
    selectById: selectEnderecoById,
    selectIds: selectEnderecosIds
} = enderecoAdapter.getSelectors(state => state.endereco)
export default enderecoSlice.reducer