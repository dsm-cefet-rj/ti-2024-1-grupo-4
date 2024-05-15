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

export const fetchEndereco = createAsyncThunk('endereco/fetchEndereco', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/endereco`);
});

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

export const deleteEnderecoServer = createAsyncThunk('endereco/deleteEnderecoServer', async (idEndereco, {getState}) => {
    await httpDelete(`${baseUrl}/endereco/${idEndereco}`);
    return idEndereco;
});


export const addEnderecoServer = createAsyncThunk('endereco/addEnderecoServer', async (endereco, {getState}) => {
    return await httpPost(`${baseUrl}/endereco`, endereco);
});

export const updateEnderecoServer = createAsyncThunk('endereco/updateEnderecoServer', async (endereco, {getState}) => {
    return await httpPut(`${baseUrl}/endereco/${endereco.id}`, endereco);
});

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