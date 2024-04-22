import{createSlice} from "@reduxjs/toolkit";
const initialState = {
    informacao: Array.from({ length: 4 }).fill([]) 
    
}

function setInfoReducer(state,input){
    const index = input.data[1] 
    const temp = {...input,stepInfo:input.data[1]}
    console.log(input)
    console.log(input.data[1])
    console.log(temp)
    //step 0 = endereco;1-pagamento;2-produtos
    if (index >= state.informacao.length || index < 0) {
        console.log(index + "valor do index dentro do if ")

        console.log(()=>state.informacao.length)
        return state;
    }

    switch (index) {
        case 0:
            state.informacao[index] = [];
            state.informacao[index].push(temp);
            break;
        case 1:
            state.informacao[index] = [];
            state.informacao[index].push(temp);
            break;
        case 2:
            state.informacao[index] = [];
            state.informacao[index].push(temp);
            break;
        case 3:
            state.informacao[index] = [];
            state.informacao[index].push(temp);
            break;
        default:
         state;
         break;
    }

}

function resetInfoReducer(state){
    return { ...state, informacao: Array.from({ length: 4 }).fill([]) };
}

const compraSlice = createSlice({
    name:'compra',
    initialState,
    reducers:{
        setInfo:{
            reducer:(state, action) => setInfoReducer(state,action.payload),
            prepare: (data) => ({payload: { data}})
        },
        reseInfo:(state)=> resetInfoReducer(state),
       
    },
});

export const { 
setInfo,
resetInfo,
} = compraSlice.actions;
export default compraSlice.reducer;





/*deslogarUser: (state) => {
            state.currentUser = null;
*/

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


 informacaoEndereco: [],
    informacaoPagamento: [],
    informacaoConfirmacao: [],



function setInfoReducer(state,input,step){
    console.log(step)
    switch (step) {
        case 0:
            return (
                state.informacaoEndereco = input
            )
        case 1:
            return (
                state.informacaoPagamento = input
            )
        case 2:
            return (
                state.informacaoConfirmacao = input
            )
        default:
            break;
    }
}
*/