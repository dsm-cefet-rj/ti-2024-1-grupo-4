import { createSlice, createAsyncThunk, createEntityAdapter, current } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'
import { toast } from "react-toastify";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    currentUser: null,
    currentToken: null,
    status: 'not_loaded',
    error:null
});

/**
 * Async Thunk para buscar todos os usuários
 * @returns {Promise} - Promise com todos os usuários cadastrados
 */

export const fetchUser = createAsyncThunk('users/fetchUser', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/users`);
});

/**
 * Async Thunk para buscar usuário por e-mail e senha
 * @param {Object} payload - Objeto contendo o email e a senha
 * @returns {Promise} - Promise contendo o usuario
 */

export const logUser = createAsyncThunk('users/logUser', async (payload) => {
    return await httpPost(`${baseUrl}/users/login`, payload);
});

export const deslogarUser = createAsyncThunk('users/deslogarUser', async (payload) => {
  const token = localStorage.getItem('token');
  console.log(token)
  return await httpPost(`${baseUrl}/users/logout`,{ headers: {
    Authorization: `Bearer ${token}`,
  },
});
});

/**
 * Async Thunk para deletar um usuário pelo ID
 * @param {string} idUser - O id do usuário a ser deletado
 * @returns {Promise} - Promise com o id do usuario deletado
 */

export const deleteUserServer = createAsyncThunk('users/deleteUserServer', async (idUser, {getState}) => {
    const token = localStorage.getItem('token');
    await httpDelete(`${baseUrl}/users/${idUser}`, { headers: { Authorization: `Bearer ${token}` } });
    return idUser;
});

/**
 * Async Thunk para adicionar um novo usuário
 * @param {Object} user - O usuário a ser adicionado
 * @returns {Promise} - Promise com o usuário adicionado
 */

export const addUserServer = createAsyncThunk('users/addUserServer', async (user, {getState}) => {
  console.log(user)
  const response = await httpPost(`${baseUrl}/users/signup`, user);
  return response;
});

/**
 * Async Thunk para atualizar um usuário existente
 * @param {Object} user - O usuário a ser atualizado
 * @returns {Promise} - Promise com a informação do usuário atualizado
 */

export const updateUserServer = createAsyncThunk('users/updateUsersServer', async (user, {getState}) => {
  const token = localStorage.getItem('token');
  return await httpPut(`${baseUrl}/users/${user.id}`, user, { headers: { Authorization: `Bearer ${token}` } });
});
/**
 * Slice que gerencia o user
 */

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'loaded';
            userAdapter.setAll(state, action.payload);
          })
          .addCase(deleteUserServer.fulfilled, (state,action) => {
            state.status = 'deleted';
            userAdapter.removeOne(state, action.payload);
          })
          .addCase(addUserServer.fulfilled, (state,action) => {
            state.status = 'saved';
            userAdapter.addOne(state,action.payload);
          })
          .addCase(addUserServer.rejected, (state,action) => {
            state.status = 'failed';
            console.log(state.error);
          })
          .addCase(updateUserServer.rejected,(state,action)=>{
            state.status = 'failed';
            toast.error("Erro: " + error, {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          })
          .addCase(updateUserServer.fulfilled, (state, action) => {
            state.status = 'saved';
            userAdapter.upsertOne(state, action.payload);
            toast.info("Informações atualizadas!", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          })
          .addCase(logUser.fulfilled,(state,action) => {
            state.status = 'saved';
            userAdapter.addOne(state, action.payload);
            state.currentUser = action.payload;
            state.currentToken = action.payload.token;
            if(state.currentUser){
              toast.info("Usuario Logado", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 2000,
                })
            }
          })
          .addCase(deslogarUser.fulfilled,(state,action) => {
            state.status = 'saved';
            state.currentUser = null;
            state.currentToken = null;

          })

        }

});

export const {
    selectAll: selectAllUser,
    selectById: selectUserById,
    selectIds: selectUsersIds
} = userAdapter.getSelectors(state => state.users)
export default userSlice.reducer