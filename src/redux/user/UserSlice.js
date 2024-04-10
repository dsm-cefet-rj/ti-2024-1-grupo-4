import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null
  };


function fulfillUserReducer(userState, userFetched){
    return userFetched;
}



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
    /*extraReducers: {
        [fetchUser.fulfilled]:(state,action) => {state = action.payload},
        //fulfilled é o estado do promise, quando o async for complletado o reducer vai ser chamado
    }*/

})

export const { logarUser, deslogarUser } = userSlice.actions
export default userSlice.reducer;