import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnderecoServer, updateEnderecoServer } from '../../redux/endereco/enderecoSlice';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';

/**
 * @module perfil_usuario
 */
/**
 * Tipo da entidade 'endereco'
 * @typedef {Object} endereco
 * @property {string} id - id do endereco
 * @property {string} CEP - CEP do endereco cadastrado
 * @property {string} logradouro - logradouro do endereco cadastrado
 * @property {string} numero - numero do endereco cadastrado
 * @property {string} complemento - complemento do endereco cadastrado
 * @property {string} userKey - id do cliente que cadastrou o endereco
 */
/**
 * @function
 * @description Função que recebe um endereco e imprime as informações em formato de card
 * 
 * @param {endereco} endereco 
 * @returns {void} Está função não retorna valor
 */

function Endereco_Card({ endereco }) {
    const dispatch = useDispatch();
    const [logradouro, setLogradouro] = useState(endereco.logradouro);
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const handleUpdate = () => {
        dispatch(updateEnderecoServer(formData))
    }
    const schema = yup.object().shape({
        CEP: yup.string().required('CEP é obrigatório'),
        logradouro: yup.string().required('Logradouro é obrigatório'),
        complemento: yup.string(),
        numero: yup.number().positive().required('Número é obrigatório')
    });

    const enderecoUpdate = (data) =>{
        const {CEP, logradouro, numero, complemento} = data;
        const userKey = currentUser.id;
        const id = endereco.id;
        schema.validate(data).then((validData)=>{
          dispatch(updateEnderecoServer({id,CEP, logradouro, numero, complemento, userKey})).then((user)=>{
            if(user.payload){
               setLogradouro(logradouro);
                toast.info("Endereço alterado", {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 2000,
                }); 
            }
          }).catch((error)=>{
            toast.error("Erro: "+ error, {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 2000,
              });
          }) 
        })
        .catch((error)=>{
          toast.error("Erro: "+ error, {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
          });
        })
    }

    const handleRemove = () => {
        const id = endereco.id;
        dispatch(deleteEnderecoServer(id))
    }

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    })

    return (
        <>
            <div className="row d-flex">
                <div className="card w-100 col g-1 bg-banana-mania shadow-sm border-banana-mania" key = {endereco.id}>
                  <form onSubmit  = {handleSubmit(enderecoUpdate)}>
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{logradouro}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#" + endereco.id} aria-expanded="false" aria-controls={endereco.id}>Mostrar mais</button>
                            <button type="submit" className="btn btn-verde-certo">Atualizar</button>
                            <button type="button" className="btn btn-brick-red" onClick={handleRemove}>Deletar</button>    
                        </div>
                    </div>
                    <div class="collapse" id={endereco.id}>
                        <div class="card card-body">
                            <label className="form-label">CEP</label>
                            <input type="text" className="form-control" {...register("CEP")} defaultValue={endereco.CEP}></input>
                            {errors.CEP && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.CEP.message}</p>}

                            <label className="form-label">Logradouro</label>
                            <input type="text" className="form-control" placeholder="Ex: Rua, Avenida, etc." {...register("logradouro")} defaultValue={endereco.logradouro}></input>
                            {errors.logradouro && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.logradouro.message}</p>}

                            <label className="form-label">Complemento</label>
                            <input type="text" className="form-control" placeholder="Ex: Apto, Bloco, etc." {...register("complemento")} defaultValue={endereco.complemento}></input>

                            <label className="form-label">Número</label>
                            <input type="number" className="form-control" {...register("numero")} defaultValue={endereco.numero}></input>
                            {errors.endereco?.numero && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.numero.message}</p>}
                        </div>
                    </div>
                  </form>                    
                </div>
            </div>
        </>
    );
}
export default Endereco_Card;