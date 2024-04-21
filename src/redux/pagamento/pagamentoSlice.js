import{createSlice} from "@reduxjs/toolkit";
const initialState = {
    informacao: [],
}


const pagamentoSlice = createSlice({
    name:'pagamento',
    initialState,
    reducers:{
        setInfo

    },
});

export const { 

} = pagamentoSlice.actions;
export default pagamentoSlice.reducer;