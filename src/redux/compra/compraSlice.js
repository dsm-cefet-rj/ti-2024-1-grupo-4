import{createSlice} from "@reduxjs/toolkit";
const initialState = {
    informacao: [],
}
function setUserReducer(state,input){
    return {
       state,user:input
    } ;
}
function setBairroReducer(state,input){
    return state.bairro = input;
}

function nextStepReducer(state){
   return state.step+=1;
}
function prevStepReducer(state){
    return state.step-=1;
}

const compraSlice = createSlice({
    name:'compra',
    initialState,
    reducers:{
        setInfo

        setUser:(state,action)=>{
            setUserReducer(state.user,action.payload)
        },
       
    },
});

export const { 

} = compraSlice.actions;
export default compraSlice.reducer;
/*
const [step, setStep] = useState(0);
const [user, setUser] = useState('');
const [password, setPassword] = useState('');
const [cep, setCep] = useState('');
const [logradouro, setLogradouro] = useState('');
const [numEnd, setNumEnd] = useState('');
const [CompEnd, setCompEnd] = useState('');
const [T_pagamento, setT_pagamento] = useState('');
const [num_cartao, setNum_cartao] = useState('');
const [nome_cartao, setNome_cartao] = useState('');
const [datacartao, setDatacartao] = useState('');
const [codcartao, setCodcartao] = useState('');
const [lista_pedido_carrinho, setLista_pedido_carrinho] = useState('');
const [instrucao_pedido, setInstrucao_pedido] = useState('');
const [bairro, setBairro] = useState('');
*/