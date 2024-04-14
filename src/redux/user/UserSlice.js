import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

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

export const deleteUserServer = createAsyncThunk('users/deleteUserServer', async (idUser, {getState}) => {
    await httpDelete(`${baseUrl}/users/${idUser}`);
    return idUser;
});

export const addUserServer = createAsyncThunk('users/addUserServer', async (user, {getState}) => {
    return await httpPost(`${baseUrl}/users`, user);
});
// ver o vídeo para ver se o código está ok
export const updateUserServer = createAsyncThunk('users/updateUsersServer', async (user, {getState}) => {
    return await httpPut(`${baseUrl}/users/${user.id}`, user);
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logarUser: (state,action) => {
            state.currentUser = action.payload;
        },
        deslogarUser: (state) => {
            state.currentUser = null;
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

        }

});

export const { logarUser, deslogarUser } = userSlice.actions
export const {
    selectAll: selectAllUser,
    selectById: selectUserById,
    selectIds: selectUsersIds
} = userAdapter.getSelectors(state => state.users)
export default userSlice.reducer