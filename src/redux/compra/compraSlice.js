import{createSlice} from "@reduxjs/toolkit";
const initialState = {
    informacao: [],
}

function setInfoReducer(state,input){
    return state.infomacao = input;
}
function resetInfoReducer(state){
    return state.infomacao = [];
}

const compraSlice = createSlice({
    name:'compra',
    initialState,
    reducers:{
        setInfo:(state,action) => setInfoReducer(state,action.payload),
        reseInfo:(state)=> resetInfoReducer(state),
       
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