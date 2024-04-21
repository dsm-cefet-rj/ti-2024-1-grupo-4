import{createSlice} from "@reduxjs/toolkit";
const initialState = {
    informacao: [],
}


const enderecoSlice = createSlice({
    name:'endereco',
    initialState,
    reducers:{
        setInfo

       
    },
});

export const { 

} = enderecoSlice.actions;
export default enderecoSlice.reducer;