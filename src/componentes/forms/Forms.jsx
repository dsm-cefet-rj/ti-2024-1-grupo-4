import React, { Component } from 'react'
import Setupconta from './Setupconta';

export class Forms extends Component {
    state ={
        step:1,
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
        lista_pedido_carrinho:''//precisa ver isso aqui como fica 

    };

    nextStep=()=>{
        const{ step } = this.state;
        this.setState({step: step + 1});
    };
    prevStep = () =>{
        const {step} = this.state;
        this.setState({step: step -1});
    };
    inputChange = input => e => {
        this.setState({[input]: e.target.value});
    }

  render() {
    const{step} = this.state;
    const {user,password,cep,logradouro,numEnd,CompEnd,T_pagamento,num_cartao,nome_cartao,datacartao,codcartao,lista_pedido_carrinho} = this.state;
    const values = {user,password,cep,logradouro,numEnd,CompEnd,T_pagamento,num_cartao,nome_cartao,datacartao,codcartao,lista_pedido_carrinho};
    switch(step){
        case 1:
            return (
                <div>
                  <Setupconta
                    nextStep = {this.nextStep}
                    inputChange = {this.inputChange}
                    values = {values}
                  />
                </div>
              );
    }
  }
}

export default Forms