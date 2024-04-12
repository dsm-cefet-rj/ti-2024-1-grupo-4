import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    status: 'not_loaded',
    error:null
};

function fulfillUserReducer(userState,userFetched){
    userState.status = 'loaded';
    userState.users = userFetched;
}

export const updateProjetoServer = createAsyncThunk('users/updateUserServer',
    async(user) => {
        let response = await fetch('http://localhost:5173/users' + user.id,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content.Type':'application/json;charset-utf-8'
                                    },
                                    body: JSON.stringify(user)
                                });
        if(response.ok){
            return user;
        } else{
            throw new Error('Erro ao atualizar projeto');
        }
});

export const fetchUser = createAsyncThunk('user/fetchUser',
    async() => {
        try{
            let response = await fetch('http://localhost:5173/users');
            let users = await response.json();
            return users;
        } catch(error){
            return [];
        }
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
            fulfillUserReducer(state, action.payload);
          });

        }

});

export const { logarUser, deslogarUser } = userSlice.actions
export default userSlice.reducer;