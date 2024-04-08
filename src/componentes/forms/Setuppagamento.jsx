import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Progressbar from './progress_bar'

export class Setuppagamento extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    setTipoPagamento = valor => {
        this.props.setTipoPagamento(valor);
    };
    render() {
        const { values, inputChange, step } = this.props;
        return (
            <>
                
                <div className='position-relative pt-2'>
                    <Progressbar
                        step={step}
                    />
                </div>
                <div className='container-fluid'>

                    <div className="align-items-center row bg-banana-mania text-center m-5 ">
                        <h3>Pagamento</h3>
                        <hr />

                        <div className='form-container'>
                            <label htmlFor='T_pagamento'>
                                <h4>Forma de Pagamento</h4>
                                <div class="row align-items-center">


                                    <div class="" role="group" aria-label="Basic radio toggle button group">

                                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" onClick={() => this.setTipoPagamento('cartao_credito')} autocomplete="off" unchecked />
                                        <label class="btn btn-outline-primary" for="btnradio1">Cartão de Crédito</label>

                                        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" onClick={() => this.setTipoPagamento('cartao_debito')} autocomplete="off" unchecked />
                                        <label class="btn btn-outline-primary " for="btnradio2">Cartão de Débito</label>

                                        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" onClick={() => this.setTipoPagamento('pix')} autocomplete="off" unchecked />
                                        <label class="btn btn-outline-primary w-50" for="btnradio3">PIX</label>
                                    </div>
                                </div>
                            </label>



                                <div className='pt-5'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label htmlFor='num_cartao'>Número do Cartão</label>
                                            <input type='text' className='form-control' name='num_cartao' onChange={inputChange('num_cartao')} value={values.num_cartao} />
                                        </div>

                                        <div className='col-md-6'>
                                            <label htmlFor='nome_cartao'>Nome do Titular</label>
                                            <input type='text' className='form-control' name='nome_cartao' onChange={inputChange('nome_cartao')} value={values.nome_cartao} />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>

                                            <label htmlFor='datacartao'>Data de Expiração</label>
                                            <input type='text' className='form-control' name='datacartao' onChange={inputChange('datacartao')} value={values.datacartao} />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor='codcartao'>CVV/CVC</label>
                                            <input type='text' className='form-control' name='codcartao' onChange={inputChange('codcartao')} value={values.codcartao} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                

                                <div className='form-container pt-2'>
                                    <div className=''>
                                    <hr/>
                                    <div className='row align-items-center mt-5'>
                                        <div className='col-md-6 pb-3'>
                                            <button className='btn btn-padrao bg-tacao-300' onClick={this.back}>Anterior</button>

                                        </div>
                                        <div className='col-md-6 pb-3'>

                                            <button className='btn btn-padrao bg-tacao-300' onClick={this.continue}>Próximo</button>

                                        </div>

                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </>
        )
    }
}

export default Setuppagamento