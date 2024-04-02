import React, { Component } from 'react'
import Setupconta from './Setupconta';
import Setupendereco from './Setupendereco';
import Setuppagamento from './Setuppagamento';
import Progressbar from '../progressbar/progressbar';

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

    nextStep = () =>{
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
        case 2:
          return(
            <Setupendereco
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              inputChange={this.inputChange}
              values = {values}
            />
          );
        case 3:
          return(
            <Setuppagamento
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              inputChange={this.inputChange}
              values = {values}
            />
          );
          case 4:
            return(
              <Progressbar
                nextStep = {this.nextStep}
                prevStep = {this.prevStep}
                inputChange={this.inputChange}
                values = {values}
              />
            );
    }
  }
}

export default Forms