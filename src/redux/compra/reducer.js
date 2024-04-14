const initialState = {
    step:0,
    user:'',
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
    lista_pedido_carrinho:''
};

const compraReducer = (state = initialState, action) => {
    if(action.type === "user/login"){
        return {...state, currentUser:action.payload};
    }

    return state;

};
export default compraReducer;