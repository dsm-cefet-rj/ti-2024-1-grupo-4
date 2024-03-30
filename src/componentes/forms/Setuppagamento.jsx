import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class Setuppagamento extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    };
    back = e =>{
        e.preventDefault();
        this.props.prevStep();
    };
  render() {
    const{values,inputChange} = this.props;
    return (
      <>
      <div className='form-container'>
        <div className='form-group'>
            <label htmlFor='T_pagamento'> /*tipo pagamento, ver depois com botao  */  </label>
            <input type='text' className='form-control' name='cep' onChange={inputChange('cep')} value={values.cep}/>
        </div>
        <div className='form-group'>
            <label htmlFor='num_cartao'>Número do Cartão</label>
            <input type='text' className='form-control' name='num_cartao' onChange={inputChange('num_cartao')} value={values.num_cartao}/>
        </div>
        <div className='form-group'>
            <label htmlFor='nome_cartao'>Nome do Titular</label>
            <input type='text' className='form-control' name='nome_cartao' onChange={inputChange('nome_cartao')} value={values.nome_cartao}/>
        </div>
        <div className='form-group'>
            <label htmlFor='datacartao'>Data de Expiração</label>
            <input type='text' className='form-control' name='datacartao' onChange={inputChange('datacartao')} value={values.datacartao}/>
        </div>
        <div className='form-group'>
            <label htmlFor='codcartao'>CVV/CVC</label>
            <input type='text' className='form-control' name='codcartao' onChange={inputChange('codcartao')} value={values.codcartao}/>
        </div>
      </div>
    <br/>
            <div className='row'>
                <div className='col-6'>
                    <div className='text-right'>
                        <Button className='btn custom-button bg-equator' onClick={this.back}>Anterior</Button>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='text-right'>
                        <Button className='btn custom-button bg-equator' onClick={this.continue}>Revisar Pedido</Button>
                    </div>
                </div>

            </div>
        </>
    )
  }
}

export default Setuppagamento