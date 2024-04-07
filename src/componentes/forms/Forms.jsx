import React, { Component } from 'react'
import Setupconta from './Setupconta';
import Setupendereco from './Setupendereco';
import Setuppagamento from './Setuppagamento';
import './style.scss';

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
 
    const { step } = this.state;
    const {user, password, cep, logradouro, numEnd, CompEnd, T_pagamento, num_cartao, nome_cartao, datacartao, codcartao, lista_pedido_carrinho } = this.state;
    const values = { user, password, cep, logradouro, numEnd, CompEnd, T_pagamento, num_cartao, nome_cartao, datacartao, codcartao, lista_pedido_carrinho };

    switch (step) {
      case 1:
        return (
          <>

            <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-equator shadow-lg' style={{ top: '100px' }}>
              <div className='mt-10'>
                <Setupconta
                  nextStep={this.nextStep}
                  inputChange={this.inputChange}
                  values={values}
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (

          <>
            <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-equator shadow-lg rounded ' style={{ top: '100px' }}>
              <div className='container-sm col-sm-4 bg-equator mt-10'>
                <Setupendereco
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  inputChange={this.inputChange}
                  values={values}
            />
              
            </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-equator shadow-lg rounded 'style={{top: '100px'}}>
              <div className='container-sm col-sm-4 bg-equator mb-10'>
            <Setuppagamento
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              inputChange={this.inputChange}
              values={values}
            />
            </div>
                </div>
          
          </>
        );
      case 4:
        return (
          <div className='d-flex align-items-center min-vh-100 bg-banana-mania'>
          <div className='container-sm col-sm-4 bg-equator mb-10'>
          </div>
          </div>

        );
    }
  }
}

export default Forms