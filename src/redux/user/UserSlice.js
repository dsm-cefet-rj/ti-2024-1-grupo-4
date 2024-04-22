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

export const fetchUser = createAsyncThunk('users/fetchUser', async (_, {getState}) => {
    console.log(getState());
    return await httpGet(`${baseUrl}/users`);
});

export const fetchUserByEmail = createAsyncThunk('users/fetchUSerByEmail', async(payload, {getState}) =>{
  try{
    const {email, senha} = payload
    const response = await fetch(`${baseUrl}/users?email=${email}&senha=${senha}`);
    const user = await response.json();
    return user[0];
  } catch(error){
    throw error;
  }
});

export const deleteUserServer = createAsyncThunk('users/deleteUserServer', async (idUser, {getState}) => {
    await httpDelete(`${baseUrl}/users/${idUser}`);
    return idUser;
});

export const emailExistServer = createAsyncThunk('users/emailExistServer', async (email, {getState}) => {
  const response = await fetch (`${baseUrl}/users?email=${email}`);
  const existe = await response.json();
  return existe.length > 0;
});

export const addUserServer = createAsyncThunk('users/addUserServer', async (user, {getState}) => {
    await httpPost(`${baseUrl}/users`, user);
    return user
});

export const updateUserServer = createAsyncThunk('users/updateUsersServer', async (user, {getState}) => {
    return await httpPut(`${baseUrl}/users/${user.id}`, user);
});

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
          .addCase(updateUserServer.fulfilled, (state, action) => {
            state.status = 'saved';
            userAdapter.upsertOne(state, action.payload);
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