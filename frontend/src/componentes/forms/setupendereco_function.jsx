import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
import { useState, useEffect } from 'react';


import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import { formsSchema } from './formsSchema';


import {useDispatch, useSelector} from "react-redux";
import { setEndereco } from '../../redux/entrega/entregaSlice';

/**
 * @module forms/setupendereco_function
 * 
 */
/**
 * @function
 * @description Função para a impressão do endereço a selecionar na página pagamento
 * 
 * @param {Object} prevstep 
 * @param {Object} nextStep - Próxima step na barra de pagamento 
 * @param {Object} step - Atual step na barra de pagamento
 * @returns {void} Está função não retorna valor
 */

function setupendereco_function({ prevStep, nextStep, step }) {

    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const [toggle_botao, setToggleBotao] = useState(false);
    
    const { register, handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(formsSchema)});
    const dispatch = useDispatch();

    const onSubmit = data => {
        const {CEP, logradouro, numeroEndereco, bairro} = data;
        dispatch(setEndereco({CEP, logradouro, numeroEndereco, bairro, userKey:currentUser}));
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
                                    <input type='text' className='form-control' id="cep" name='cep'{...register('CEP')}/>
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.CEP?.message}</p>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='logradouro'>Logradouro</label>
                                    <input type='text' className='form-control' id="logradouro" name='logradouro'{...register('logradouro')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.logradouro?.message}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label htmlFor='numeroEndereco'>Número</label>
                                    <input type='text' className='form-control' id='numeroEndereco' name='numeroEndereco' {...register('numeroEndereco')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.numeroEndereco?.message}</p>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='bairro'>Bairro</label>
                                    <input type='text' className='form-control' id='bairro' name='bairro' {...register('bairro')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.bairro?.message}</p>
                                </div>
                                <div className='col-md-12 p-2'>
                                    <label htmlFor='complemento'>Complemento</label>
                                    <input type='text' className='form-control' id='complemento' name='complemento' {...register('complemento')} />
                                    <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.complemento?.message}</p>
                                </div>
                                <div className='p-1'>
                                    <hr />
                                </div>
                                <div className='col-md-12'>
                                    <div className="mb-3">
                                        <label htmlFor="instrucaoPedido" className="form-label">Instruções de Entrega</label>
                                        <textarea className="form-control" name='instrucaoPedido' {...register('instrucaoPedido')} id="exampleFormControlTextarea1" rows="1"></textarea>
                                        <p className='text-decoration-underline  rounded text-brick-red-400'>{errors.instrucaoPedido?.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='form-container'>
                            <div className='row align-items-center'>
                               
                                <div className='col-md-12 pb-3 align-items-center'>
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
