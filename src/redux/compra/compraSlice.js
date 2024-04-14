import{createSlice} from "@reduxjs/toolkit";
const initialState = {
    step:0,
    user:"" ,
    password:'',
    cep:'',
    logradouro:'',
    numEnd:'',
    CompEnd:'',
    T_pagamento:'',
    num_cartao:'',
    nome_cartao:'',
    datacartao:'',
    codcartao:'',
    instrucao_pedido:'',
    bairro:'',
    lista_pedido_carrinho:'',
    instrucao:'',
    bairro:''
}
function setUserReducer(state,input){
    return {
       state,user:input
    } ;
}
function setPasswordReducer(state,input){
    return{
        state, password:input
    }; 
}
function setCepReducer(state,input){
    return state.cep = input;
}
function setLogradouroReducer(state,input){
    return state.logradouro = input;
}
function setNumEndReducer(state,input){
    return state.numEnd = input ;
}
function setCompEndReducer(state,input){
    return state.CompEnd = input;
} 
function setT_pagamentoReducer(state,input){
    return  state.T_pagamento = input;
}
function setNum_cartaoReducer(state,input){
    return state.num_cartao = input;
}
function setNome_cartaoReducer(state,input){
    return state.nome_cartao = input;
}
function setDatacartaoReducer(state,input){
    return state.datacartao = input;
}
function setCodcartaoReducer(state,input){
    return state.codcartao = input;
}
function setLista_pedido_carrinhoReducer(state,input){
    return  state.lista_pedido_carrinho = input;
}
function setInstrucao_pedidoReducer(state,input){
    return state.instrucao = input;
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
        setUser:(state,action)=>{
            setUserReducer(state.user,action.payload)
        },
        setPassword:(state,action)=>{
           setPasswordReducer(state.password,action.payload)
        },
        setCep:(state,action)=>{
            setCepReducer(state.cep,action.payload)
        },
        setLogradouro:(state,action)=>{
            setLogradouroReducer(state.logradouro,action.payload)
        },
        setNumEnd:(state,action)=>{
            setNumEndReducer(state.numEnd,action.payload)
        },
        setCompEnd:(state,action)=>{
            setCompEndReducer(state.CompEnd,action.payload)
        },  
        setT_pagamento:(state,action)=>{
            setT_pagamentoReducer(state.T_pagamento, action.payload)
        },
        setNum_cartao:(state,action)=>{
            setNum_cartaoReducer(state.num_cartao, action.payload)
        },
        setNome_cartao:(state,action)=>{
            setNome_cartaoReducer(state.nome_cartao , action.payload)
        },
        setDatacartao:(state,action)=>{
            setDatacartaoReducer(state.datacartao, action.payload)
        },
        setCodcartao:(state,action)=>{
            setCodcartaoReducer(state.codcartao, action.payload)
        },
        setLista_pedido_carrinho:(state,action)=>{
            setLista_pedido_carrinhoReducer(state.lista_pedido_carrinho, action.payload)
        },
        setInstrucao_pedido:(state,action)=>{
            setInstrucao_pedidoReducer(state.instrucao, action.payload)
        },
        setBairro:(state,action)=>{
            setBairroReducer(state.bairro, action.payload)
        },
        nextStep : (state) => {
           nextStepReducer(state);
        },
        prevStep : (state) => {
           prevStepReducer(state);
        },
    },
});

export const { 
    setUser,
    setPassword,
    setBairro,
    setCep,
    setCodcartao,
    setCompEnd,
    setDatacartao,
    setInstrucao_pedido,
    setLista_pedido_carrinho,
    setLogradouro,
    setNome_cartao,
    setNumEnd,
    setNum_cartao,
    setT_pagamento,
    nextStep,
    prevStep
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