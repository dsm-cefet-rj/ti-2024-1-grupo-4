import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
import { useState, useEffect } from 'react';


import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import { formsSchema } from './formsSchema';
import { fetchEnderecoByUser, addEnderecoServer} from '../../redux/endereco/enderecoSlice';

import {useDispatch, useSelector} from "react-redux";
import { setEndereco, setInstrucoes } from '../../redux/entrega/entregaSlice';
import Escolha_Endereco from '../cards/Escolha_endereco';
import * as yup from 'yup'
import { toast } from 'react-toastify';

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
    const endereco_status = useSelector((rootReducer) => rootReducer.enderecoSlice.status) || {};
    const { enderecos } = useSelector((rootReducer) => rootReducer.enderecoSlice) || {};
    const { register, handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(formsSchema)});
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    
    const dispatch = useDispatch();

    const enderecoSchema = yup.object().shape({
        CEP: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'CEP deve estar no formato xxxxx-xxx'),
        logradouro: yup.string().required('Logradouro é obrigatório'),
        complemento: yup.string(),
        numero: yup.number().positive().required('Número é obrigatório')
      });

    const { register: registerEndereco, handleSubmit: handleSubmitEndereco, formState: { errors: enderecoErrors } } = useForm({
        resolver: yupResolver(enderecoSchema),
      });

    const onSubmit = (data) => {
      console.log(data)
        const { instrucaoPedido } = data;
        const selectedEndereco = enderecos.find((endereco) => endereco.id === enderecoSelecionado);

        if (selectedEndereco) {
            const { CEP, logradouro, numeroEndereco, complemento } = selectedEndereco;
            dispatch(setEndereco({ CEP, logradouro, numeroEndereco, complemento, userKey: currentUser }));
            dispatch(setInstrucoes(instrucaoPedido));
            console.log(data);
            setToggleBotao(true);
        }else{
          toast.error("Selecione um endereço", {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
            })
        }

        
    };
    const handleSelectAddress = (id) => {
        setEnderecoSelecionado(id);
    };

    const createEndereco = async (data) => {
        const { CEP, logradouro, numero, complemento } = data;
        const userKey = currentUser;
        try{
          enderecoSchema.validate(data)
          await dispatch(addEnderecoServer({ CEP, logradouro, numeroEndereco:numero, complemento, userKey })).unwrap();
          dispatch(fetchEnderecoByUser(currentUser))
    
        } catch (error){
          console.log(error)
        }
        
      }

      useEffect(() => {
        if (toggle_botao) { 
          nextStep();
        }
      }, [toggle_botao, nextStep]);

      useEffect(() => {
        if (endereco_status === 'not_loaded' || endereco_status === 'saved' || endereco_status === 'deleted') {
          dispatch(fetchEnderecoByUser(currentUser))
        } else if (endereco_status === 'failed') {
          setTimeout(() => dispatch(fetchEnderecoByUser(currentUser)))
        }
      }, [endereco_status, enderecos.size])
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <>
        <div className='position-relative pt-2'>
            <Progressbar step={step} />
        </div>


        <div className='container-fluid'>
    <form className='form' onSubmit={handleSubmit(onSubmit)}onKeyDown={handleKeyDown}>
        <div className="align-items-center row bg-banana-mania text-center m-1 ">
        <h2>Endereco</h2>
        <span>Escolha o endereço ou cadastre um novo</span>
        {enderecos ? <>
          {Object.values(enderecos).map((endereco) => (
            <Escolha_Endereco key={endereco.id}
             endereco={endereco}
             enderecoSelecionado={enderecoSelecionado}
             onSelect={handleSelectAddress} />
          ))} </> : null}
        <button type="button" data-bs-toggle="modal" data-bs-target="#criarEndereco"
          className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
          </svg></button>
                        <div className='form-container'>
                            <div className='row'>                             
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
        <div className="modal fade" id="criarEndereco" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="criarProdutoLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="criarProdutoLabel">Adicionar Endereço</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

                <form className='form' onSubmit={handleSubmitEndereco(createEndereco)}>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor='CEP'>CEP:</label>
                    <input type="text" id='CEP' className="form-control" {...registerEndereco("CEP")}></input>
                    {enderecoErrors.endereco?.CEP && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.CEP.message}</p>}
                  </div>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor='logradouro'>Logradouro:</label>
                    <input type="text" id='logradouro' className="form-control" placeholder="Ex: Rua, Avenida, etc." {...registerEndereco("logradouro")}></input>
                    {enderecoErrors.endereco?.logradouro && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.logradouro.message}</p>}
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor='complemento'>Complemento:</label>
                    <input type="text" id='complemento' className="form-control" placeholder="Ex: Apto, Bloco, etc."  {...registerEndereco("complemento")}></input>
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor='numero'>Número:</label>
                    <input type="number" id='numero' className="form-control" {...registerEndereco("numero")}></input>
                    {enderecoErrors.endereco?.numero && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.numero.message}</p>}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-verde-certo">Adicionar Endereco</button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
            </div>
        </>
    )
}

export default setupendereco_function
