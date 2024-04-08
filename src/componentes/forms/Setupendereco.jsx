import React, { Component } from 'react'
import Progressbar from './progress_bar'
import'./botao.scss'

export class Setupendereco extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    };
    back = e =>{
        e.preventDefault();
        this.props.prevStep();
    };
    render() {
        const { values, inputChange, step } = this.props;
        return (
            <>
                <div className='position-relative pt-2'>
                    <Progressbar step={step} />
                </div>


                <div className='container-fluid'>

                    <div className="align-items-center row bg-banana-mania text-center m-5 ">
                        <h3>Endereço</h3>
                        <hr />
                        <div className='form-container'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label htmlFor='cep'>CEP</label>
                                    <input type='text' className='form-control' name='cep' onChange={inputChange('cep')} value={values.cep} />
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='logradouro'>Logradouro</label>
                                    <input type='text' className='form-control' name='logradouro' onChange={inputChange('logradouro')} value={values.logradouro} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label htmlFor='numEnd'>Número</label>
                                    <input type='text' className='form-control' name='numEnd' onChange={inputChange('numEnd')} value={values.numEnd} />
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='CompEnd'>Bairro</label>
                                    <input type='text' className='form-control' name='bairro' onChange={inputChange('bairro')} value={values.bairro} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <label htmlFor='CompEnd'>Complemento</label>
                                    <input type='text' className='form-control' name='CompEnd' onChange={inputChange('CompEnd')} value={values.CompEnd} />
                                </div>
                                <div className='p-1'>
                                    <hr />
                                </div>
                                <div className='col-md-12'>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Instruções de Entrega</label>
                                        <textarea class="form-control" name='instrucao_pedido' onChange={inputChange('instrucao_pedido')} value={values.instrucao_pedido} id="exampleFormControlTextarea1" rows="1"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='form-container'>
                            <div className='row align-items-center'>
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
            </>
        )
    }
}

export default Setupendereco