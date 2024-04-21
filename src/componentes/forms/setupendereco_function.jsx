import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
import { useState, useEffect } from 'react';


import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { formsSchema } from './formsSchema';

/*
const schema = yup
  .object({
    cep: yup.number().required(),
    logradouro: yup.string().required(),
    numEnd: yup.number().positive().required(),
    bairro: yup.string().required(),
    CompEnd: yup.string().required(),
    instrucao_pedido: yup.string().required(),
  })
  .required()
 */

function setupendereco_function({ prevStep, nextStep, step }) {

    const [toggle_botao, setToggleBotao] = useState(false);
    const { register, handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(formsSchema)});

    const onSubmit = data => {
        console.log(data)
        setToggleBotao(true);
      }

      useEffect(() => {
        if (toggle_botao) {
            
          nextStep();
        }
      }, [toggle_botao, nextStep]);

    return (
        <>
            <div className='position-relative pt-2'>
                <Progressbar step={step} />
            </div>


            <div className='container-fluid'>
                <form className='form' onSubmit={handleSubmit(onSubmit)}> {/* HOOKFORM ONSUBMIT */}
                    <div className="align-items-center row bg-banana-mania text-center m-5 ">
                        <h3>Endereço</h3>
                        <hr />
                        <div className='form-container'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label htmlFor='cep'>CEP</label>
                                    <input type='text' className='form-control' id="cep" name='cep'{...register('cep')}/>
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.cep?.message}</p>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='logradouro'>Logradouro</label>
                                    <input type='text' className='form-control' id="logradouro" name='logradouro'{...register('logradouro')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.logradouro?.message}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label htmlFor='numEnd'>Número</label>
                                    <input type='text' className='form-control' id='numEnd' name='numEnd' {...register('numEnd')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.numEnd?.message}</p>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='CompEnd'>Bairro</label>
                                    <input type='text' className='form-control' id='bairro' name='bairro' {...register('bairro')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.bairro?.message}</p>
                                </div>
                                <div className='col-md-12 p-2'>
                                    <label htmlFor='CompEnd'>Complemento</label>
                                    <input type='text' className='form-control' id='CompEnd' name='CompEnd' {...register('CompEnd')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.CompEnd?.message}</p>
                                </div>
                                <div className='p-1'>
                                    <hr />
                                </div>
                                <div className='col-md-12'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Instruções de Entrega</label>
                                        <textarea className="form-control" name='instrucao_pedido' {...register('instrucao_pedido')} id="exampleFormControlTextarea1" rows="1"></textarea>
                                        <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.instrucao_pedido?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='form-container'>
                            <div className='row align-items-center'>
                                <div className='col-md-6 pb-3'>
                                    <button className='btn btn-padrao bg-tacao-300' onClick={() => prevStep()}>Anterior</button>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <button type="submit" className='btn btn-padrao bg-tacao-300'>Próximo</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default setupendereco_function

{/**

onClick={()=>handleSubmitStep()}
*/}