import { createSlice } from '@reduxjs/toolkit'

const currentUser = null;
function logarUserReducer(usuario){
    currentUser:usuario;
    return currentUser;
}

export const userSlice = createSlice({
    name: 'user',
    initialState: currentUser,
    reducers: {
        logarUser: (state,action) => logarUserReducer(state, action.payload)
    }
})

export const { logarUser } = userSlice.actions
export default userSlice.reducer;