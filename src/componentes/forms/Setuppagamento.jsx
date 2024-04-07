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
              <div className='form-container form-control-sm'>
                  <div className='form-group'>
                      <label htmlFor='T_pagamento'> /*tipo pagamento, ver depois com botao  */  </label>
                      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

                          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" unchecked />
                          <label class="btn btn-outline-primary" for="btnradio1">Cartão de Crédito</label>

                          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" unchecked />
                          <label class="btn btn-outline-primary" for="btnradio2">Cartão de Débito</label>

                          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" unchecked />
                          <label class="btn btn-outline-primary" for="btnradio3">PIX</label>
                      </div>

                      <input type='text' className='form-control' name='cep' onChange={inputChange('cep')} value={values.cep} />
                  </div>


                  <div className='form-group'>
                      <label htmlFor='num_cartao'>Número do Cartão</label>
                      <input type='text' className='form-control' name='num_cartao' onChange={inputChange('num_cartao')} value={values.num_cartao} />
                  </div>


                  <div className='form-group'>
                      <label htmlFor='nome_cartao'>Nome do Titular</label>
                      <input type='text' className='form-control' name='nome_cartao' onChange={inputChange('nome_cartao')} value={values.nome_cartao} />
                  </div>


                  <div className='col-md-6'>

                      <label htmlFor='datacartao'>Data de Expiração</label>
                      <input type='text' className='form-control' name='datacartao' onChange={inputChange('datacartao')} value={values.datacartao} />

                      <label htmlFor='codcartao'>CVV/CVC</label>
                      <input type='text' className='form-control' name='codcartao' onChange={inputChange('codcartao')} value={values.codcartao} />

                  </div>


                  <div className='row '>
                      <div className='col-md-6'>
                          <div className='text-right'>
                              <Button className='btn custom-button bg-equator' onClick={this.back}>Anterior</Button>
                          </div>
                      </div>
                      <div className='col-md-6'>
                          <div className='text-right'>
                              <Button className='btn custom-button bg-equator' onClick={this.continue}>Revisar Pedido</Button>
                          </div>
                      </div>

                  </div>
              </div>
          </>
    )
  }
}

export default Setuppagamento