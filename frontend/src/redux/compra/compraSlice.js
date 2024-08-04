import{createSlice,createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {httpDelete, httpGet, httpPut, httpPost} from '../../utils';
import {baseUrl} from '../../baseUrl';

const compraAdapter = createEntityAdapter();

/**
 * O initial state guarda durante o preenchimento do forms, 
 * as informações ficam guardadas e podem ser alteradas com facilidade
 */
const initialState = compraAdapter.getInitialState({
    user: null,
    endereco: null,
    pagamento: null,
    produtos: null,
    step:0,
    status:'not_loaded',
    error:null

})
//'loading'
//'failed'
//'saved'

/**
 * 
 * @param {Object} state - recebe o valor que o usuário está no formulário
 * @param {Object} input - Recebe a informação do form
 * @returns o estado do currentUser
 */
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

/**
 * Reducer para configurar o status
 * @param {Object} state - O estado atual
 * @param {any} payload - O novo status
 * @returns {Object} - O novo estado
 */
function setStatusReducer(state,payload){
    return {...state.status,status:payload};
}

/**
 * Thunk assíncrono para adicionar um pedido no servidor
 * @param {Object} pedido - O pedido a ser adicionado
 * @returns {Promise} - Promise que retorna o pedido adicionado
 */

export const addPedidoServer = createAsyncThunk('pedido/addPedidoServer', async (pedido, {getState}) => {
    return await httpPost(`${baseUrl}/pedido`, pedido);
});

/**
 * Slice que gerencia o estado da compra.
 */  

const compraSlice = createSlice({
    name:'compra',
    initialState,
    reducers:{
        /**
         * Redutor para configurar o endereço
         * @param {Object} state - O estado atual
         * @param {Object} action - A ação despachada
         */
        setEndereco: (state, action)=>{
            state.endereco = action.payload;
        },
        /**
         * Redutor para configurar o usuário
         * @param {Object} state - O estado atual
         * @param {Object} action - A ação despachada
         */
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        /**
         * Redutor para configurar o pagamento
         * @param {Object} state - O estado atual
         * @param {Object} action - A ação despachada
         */
        setPagamento:(state, action)=>{
            state.pagamento = action.payload;
        },
        /**
         * Redutor para configurar os produtos
         * @param {Object} state - O estado atual
         * @param {Object} action - A ação despachada
         */
        setProdutos:(state,action)=>{
            state.produtos = action.payload;
        },
        /**
         * Redutor para resetar as informações
         * @param {Object} state - O estado atual
         */
        resetInfo:(state)=> resetInfoReducer(state),
        /**
         * Redutor para configurar o status
         * @param {Object} state - O estado atual
         * @param {Object} action - A ação despachada
         */
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
setEndereco,
setPagamento,
setProdutos,
setUser
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