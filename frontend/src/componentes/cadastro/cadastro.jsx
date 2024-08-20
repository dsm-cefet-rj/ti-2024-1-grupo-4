import './cadastro.css';
import React, { useEffect, useState } from 'react';
import { addUserServer, logUser} from '../../redux/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
//import {CadastroSchema} from './CadastroSchema';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addEnderecoServer } from '../../redux/endereco/enderecoSlice';

/**
 * Página de registro do cliente da loja
 * @component
 * 
 */

function Register_page() {

  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice);
  const { currentToken } = useSelector((rootReducer) => rootReducer.userSlice);
  const dispatch = useDispatch();
  const history = useNavigate();
  

  const schema = yup.object().shape({
    username: yup.string().email('Precisa ser um e-mail').required(),
    nome: yup.string().max(50).required(),
    password: yup.string().min(5, 'A quantidade de caracteres da senha é de no mínimo 5').required(),
    repSenha: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').required('Este campo deve ser preenchido'),
    cep: yup.string().required('cep é obrigatório'),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    complemento: yup.string(),
    numeroEndereco: yup.number().positive().required('Número é obrigatório')
    
  });

    const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(schema),
    })

  /**
   * Função para cadastrar o usuário 
   * @param {Object} data - Dados do formulário
   */
  const onSubmit = async (data) => {
    const user = {
      username: data.username,
      password: data.password,
      nome: data.nome,
    }
    const end = {
      cep: data.CEP,
      logradouro: data.logradouro,
      complemento: data.complemento,
      numeroEndereco: data.numeroEndereco,
    }

      dispatch(addUserServer(user)).then((result) => {
        console.log(result)
        if(result.payload){
          toast.info("Usuário Cadastrado!", {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
          });
          dispatch(logUser({username: data.username, password: data.password})).then((result) =>{
            console.log(currentUser);
            console.log(result);
            if(result.payload){
              dispatch(addEnderecoServer({CEP: data.cep,
                logradouro: data.logradouro,
                complemento: data.complemento,
                numeroEndereco: data.numeroEndereco,
                userKey: result.payload._id})).then(()=>{
                  history('/');
                })
            }else{
              console.log(payload)
              toast.error("Tente novamente mais tarde", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 2000,
              });
            }
          })

        }else{
          console.log(payload)
          toast.error("Tente novamente mais tarde", {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
          });
        }
      })

  };
  
  

  return (
    <>

      
      <div className='container d-flex'>

      <div className="bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style= {{width:"900px"}} >

          <h2 className='p-0 m-0'>Cadastro</h2>
          <form className="row g-3 col" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <label className="form-label" htmlFor='email'>Email</label>
              <input type="email" id = 'email' {...register("username")} className="form-control"></input>
              {errors && errors.username && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.username.message}</p>}
            </div>
            <div className="col-md-6">
              <label className="form-label" >Nome</label>
              <input type="text" {...register("nome")} className="form-control"></input>
              {errors && errors.nome && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.nome.message}</p>}
              
            </div>
            <div className="col-md-6">
              <label className="form-label">Senha</label>
              <input type="password" {...register("password")} className="form-control"></input>
              {errors && errors.password && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.password.message}</p>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Repita Senha</label>
              <input type="password" {...register("repSenha")} className="form-control"></input>
              {errors && errors.repSenha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.repSenha.message}</p>}
            </div>
            
          
              
              <h2>Endereço</h2>
            <div className="col-md-4">
              <label className="form-label">CEP</label>
              <input type="text" className="form-control" {...register("cep")}></input>
              {errors.endereco?.cep && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.cep.message}</p>}
            </div>
            <div className="col-8">
              <label className="form-label">Logradouro</label>
              <input type="text" className="form-control" placeholder="Ex: Rua, Avenida, etc." {...register("logradouro")}></input>
              {errors.endereco?.logradouro && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.logradouro.message}</p>}
            </div>
            <div className="col-6">
              <label className="form-label">Complemento</label>
              <input type="text" className="form-control" placeholder="Ex: Apto, Bloco, etc." {...register("complemento")}></input>
            </div>
            <div className="col-6">
              <label className="form-label">Número</label>
              <input type="number" className="form-control" {...register("numeroEndereco")}></input>
              {errors.endereco?.numeroEndereco && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.endereco.numeroEndereco.message}</p>}
            </div>

          


          <div className="col-12">
              <button type="submit" className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow-sm w-50">Cadastre-se</button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register_page;