import{createSlice,createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils';
import {baseUrl} from '../../baseUrl';

const initialState = {
    informacao: Array.from({ length: 4 }).fill([]),
    status:'not_loaded',
    error:null

}
//'loading'
//'failed'
//'saved'
function setInfoReducer(state,input){
    const index = input.data[1] 
    const temp = {...input,stepInfo:input.data[1]}
    //step 0 = endereco;1-pagamento;2-produtos
    if (index >= state.informacao.length || index < 0) {
        console.log(index + "valor do index dentro do if ")

        console.log(()=>state.informacao.length)
        return state;
    }
    state.informacao[index] = [];
    state.informacao[index].push(temp);
}
function setStatusReducer(state,payload){
    return {...state.status,status:payload};
}
function resetInfoReducer(state){
    return { ...state.informacao, informacao: Array.from({ length: 4 }).fill([]) };
}


export const addPedidoServer = createAsyncThunk('pedido/addPedidoServer', async (pedido, {getState}) => {
    return await httpPost(`${baseUrl}/pedido`, pedido);
});

  

const compraSlice = createSlice({
    name:'compra',
    initialState,
    reducers:{
        setInfo:{
            reducer:(state, action) => setInfoReducer(state,action.payload),
            prepare: (data) => ({payload: {data}})
        },
        resetInfo:(state)=> resetInfoReducer(state),
        setStatus:(state,action)=> setStatusReducer(state,action.payload),
       
    },
    extraReducers:
        (builder)=>{
            builder
            .addCase(addPedidoServer.pending,(state,action)=>{
                    state.status ='loading';
               
            })
            .addCase(addPedidoServer.rejected,(state,action)=>{
                state.status ='failed';
            })
            .addCase(addPedidoServer.fulfilled,(state,action)=>{
               
                    state.status ='saved';
           
            })

        }

});

export const { 
setInfo,
resetInfo,
setStatus,
} = compraSlice.actions;
export default compraSlice.reducer;





/*deslogarUser: (state) => {
            state.currentUser = null;
*/

/*

       setTimeout(()=>{
                state.status ='saved';
            },2000);
                
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