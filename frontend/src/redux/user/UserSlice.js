import { createSlice, createAsyncThunk, createEntityAdapter, current } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'
import { toast } from "react-toastify";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    currentUser: null,
    currentToken: null,
    isAdmin: false,
    status: 'not_loaded',
    error:null
});

/**
 * Async Thunk para buscar todos os usuários
 * @returns {Promise} - Promise com todos os usuários cadastrados
 */

export const fetchUser = createAsyncThunk('users/fetchUser', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/users`,{ headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
});

/**
 * Async Thunk para buscar usuário por e-mail e senha
 * @param {Object} payload - Objeto contendo o email e a senha
 * @returns {Promise} - Promise contendo o usuario
 */

export const logUser = createAsyncThunk('users/logUser', async (payload) => {
    return await httpPost(`${baseUrl}/users/login`, payload);
});


/**
 * Async Thunk para deletar um usuário pelo ID
 * @param {string} idUser - O id do usuário a ser deletado
 * @returns {Promise} - Promise com o id do usuario deletado
 */

export const deleteUserServer = createAsyncThunk('users/deleteUserServer', async (idUser, {getState}) => {
    await httpDelete(`${baseUrl}/users/${idUser}`, { headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
    return idUser;
});

/**
 * Async Thunk para adicionar um novo usuário
 * @param {Object} user - O usuário a ser adicionado
 * @returns {Promise} - Promise com o usuário adicionado
 */

export const addUserServer = createAsyncThunk('users/addUserServer', async (user, {getState}) => {
  const response = await httpPost(`${baseUrl}/users/signup`, user);
  return response;
});

/**
 * Async Thunk para atualizar um usuário existente
 * @param {Object} user - O usuário a ser atualizado
 * @returns {Promise} - Promise com a informação do usuário atualizado
 */

export const updateUserServer = createAsyncThunk('users/updateUsersServer', async (user, {getState}) => {
  const userKey = getState().userSlice.currentUser
  return await httpPut(`${baseUrl}/users/${userKey}`, user, { headers: { Authorization: `Bearer ` + getState().userSlice.currentToken } });
});
/**
 * Slice que gerencia o user
 */

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      deslogarUser: (state) => {
          state.currentUser = null;
          state.currentToken = null;
          state.isAdmin = false;
          toast.info("Usuario Deslogado", {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
        });
      }
  },
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
            state.currentUser = null;
            state.currentToken = null;
            state.isAdmin = false;
            userAdapter.removeOne(state, action.payload);
          })
          .addCase(addUserServer.fulfilled, (state,action) => {
            state.status = 'saved';
            userAdapter.addOne(state,action.payload);
          })
          .addCase(addUserServer.rejected, (state,action) => {
            state.status = 'failed';
            toast.error("E-mail já cadastrado", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          })
          .addCase(updateUserServer.rejected,(state,action)=>{
            state.status = 'failed';
            toast.error("Erro ao atualizar senha", {
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
            state.currentUser = action.payload._id;
            state.currentToken = action.payload.token;
            state.isAdmin = action.payload.admin;
            if(state.currentUser){
              toast.info("Usuario Logado", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 2000,
                })
            }
          })

        }

});

export const { deslogarUser } = userSlice.actions
export const {
    selectAll: selectAllUser,
    selectById: selectUserById,
    selectIds: selectUsersIds
} = userAdapter.getSelectors(state => state.users)
export default userSlice.reducer