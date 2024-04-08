import React, { Component } from 'react'
import Setupconta from './Setupconta';
import Setupendereco from './Setupendereco';
import Setuppagamento from './Setuppagamento';
import './style.scss';

export class Forms extends Component {
    state ={
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
    setTipoPagamento = (valor)=>{
      const {T_pagamento} = this.state;
      this.setState({T_pagamento:valor});
    }


  render() {
 
    const { step } = this.state;
    const {user, password, cep, logradouro, numEnd, CompEnd, T_pagamento, num_cartao, nome_cartao, datacartao,instrucao_pedido,bairro, codcartao, lista_pedido_carrinho } = this.state;
    const values = {user, password, cep, logradouro, numEnd, CompEnd, T_pagamento, num_cartao, nome_cartao, datacartao,instrucao_pedido,bairro, codcartao, lista_pedido_carrinho };
    
    switch (step) {
      case 0:
        return (
          <>

            <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-tacao shadow-lg rounded'>
              <div className='mt-10'>
                <Setupconta
                  nextStep={this.nextStep}
                  inputChange={this.inputChange}
                  values={values}
                  step={step}
                />
              </div>
            </div>
          </>
        );
      case 1:
        return (

          <>
            <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded ' style={{ top: '100px' }}>
              <div className='mt-10'>
                <Setupendereco
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  inputChange={this.inputChange}
                  values={values}
                  step={step}
            />
              
            </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded 'style={{top: '100px'}}>
              <div className='mb-10'>
            <Setuppagamento
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              inputChange={this.inputChange}
              setTipoPagamento = {this.setTipoPagamento}
              values={values}
              step={step}
            />
            </div>
                </div>
          
          </>
        );
      case 3:
        return (
          <>
          <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded 'style={{top: '100px'}}>
            <div className='mb-10'>
          <Setuppagamento
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            setTipoPagamento = {this.setTipoPagamento}
            values={values}
            step={step}
          />
          </div>
              </div>
        
        </>

        );
    }
  }
}

export default Forms

{/*
  const [step, setStep] = useState('');
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

*/}