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
 * Async Thunk para buscar endereco por usuario
 * @param {string} payload - O id do usuario
 * @returns {Promise} - Promise contendo os enderecos que possuem o id do usuario
 */
export const fetchEnderecoByUser = createAsyncThunk('endereco/fetchEnderecoByUser', async(userKey, {getState}) =>{
  try{
    return await httpGet(`${baseUrl}/endereco/${userKey}`, { headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
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
    await httpDelete(`${baseUrl}/endereco/${idEndereco}`,{ headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
    return idEndereco;
});

/**
 * Async Thunk para adicionar um endereco ao servidor
 * @param {string} endereco - O endereco a ser adicionado
 * @returns {Promise} - Promise com o endereco adicionado
 */

export const addEnderecoServer = createAsyncThunk('endereco/addEnderecoServer', async (payload, {getState}) => {
    return await httpPost(`${baseUrl}/endereco`, payload,{ headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
});

/**
 * Async Thunk que atualiza um endereco pelo id
 * @param {string} endereco - O endereco que deve ter o valor atualizado
 * @returns {Promise} - Promise com o valor atualizado
 */
export const updateEnderecoServer = createAsyncThunk('endereco/updateEnderecoServer', async (endereco, {getState}) => {
    return await httpPut(`${baseUrl}/endereco/${endereco.id}`, endereco.endereco,{ headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
});

/**
 * Slice que gerencia o endereco
 */

export const enderecoSlice = createSlice({
    name: 'endereco',
    initialState,
    extraReducers: (builder) => {
        builder
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
            console.log(action.payload)
            state.enderecos = action.payload;
          }).addCase(fetchEnderecoByUser.rejected,(state,action) => {
            toast.error("Erro ao requisitar endereços", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
              })
          })

        }

});


export const {
    selectAll: selectAllEndereco,
    selectById: selectEnderecoById,
    selectIds: selectEnderecosIds
} = enderecoAdapter.getSelectors(state => state.endereco)
export default enderecoSlice.reducer