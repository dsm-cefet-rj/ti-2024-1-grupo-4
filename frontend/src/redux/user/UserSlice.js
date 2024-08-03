import { createSlice, createAsyncThunk, createEntityAdapter, current } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'
import { toast } from "react-toastify";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    currentUser: null,
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

export const fetchUserByEmail = createAsyncThunk('users/fetchUSerByEmail', async(payload, {getState}) =>{
  try{
    const {email, senha} = payload
    const response = await fetch(`${baseUrl}/users?email=${email}&senha=${senha}`);
    const user = await response.json();
    console.log("Este é o usuario do userslice apos o fetch");
    console.log(user);
    return user;
  } catch(error){
    throw error;
  }
});

/**
 * Async Thunk para deletar um usuário pelo ID
 * @param {string} idUser - O id do usuário a ser deletado
 * @returns {Promise} - Promise com o id do usuario deletado
 */

export const deleteUserServer = createAsyncThunk('users/deleteUserServer', async (idUser, {getState}) => {
    await httpDelete(`${baseUrl}/users/${idUser}`);
    return idUser;
});

/**
 * Async Thunk para verificar se o e-mail já existe no servidor
 * @param {string} email - O e-mail a ser verificado
 * @returns {Promise} - Promise com um valor booleano para se o retorna é maior do que 0
 */

export const emailExistServer = createAsyncThunk('users/emailExistServer', async (email, {getState}) => {
  const response = await fetch (`${baseUrl}/users?email=${email}`);
  const existe = await response.json();
  return existe.length > 0;
});

/**
 * Async Thunk para adicionar um novo usuário
 * @param {Object} user - O usuário a ser adicionado
 * @returns {Promise} - Promise com o usuário adicionado
 */

export const addUserServer = createAsyncThunk('users/addUserServer', async (user, {getState}) => {
    await httpPost(`${baseUrl}/users`, user);
    return user
});

/**
 * Async Thunk para atualizar um usuário existente
 * @param {Object} user - O usuário a ser atualizado
 * @returns {Promise} - Promise com a informação do usuário atualizado
 */

export const updateUserServer = createAsyncThunk('users/updateUsersServer', async (user, {getState}) => {
    return await httpPut(`${baseUrl}/users/${user.id}`, user);
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
            userAdapter.removeOne(state, action.payload);
          })
          .addCase(addUserServer.fulfilled, (state,action) => {
            state.status = 'saved';
            userAdapter.addOne(state,action.payload);
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
          .addCase(fetchUserByEmail.fulfilled,(state,action) => {
            state.status = 'saved';
            state.currentUser = action.payload;
            if(state.currentUser){
              toast.info("Usuario Logado", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 2000,
                })
            }
            
            
          })
          .addCase(emailExistServer.fulfilled,(state,action) =>{
            state.status = 'saved';
            
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