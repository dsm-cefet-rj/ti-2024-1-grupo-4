import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {logUser} from '../../redux/user/UserSlice';

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';

/**
 * Página de login de clientes da loja
 * @component
 * 
 */

function Login_page () {
  const history = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  /**
   * Schema Yup para validação das informações do form
   */
  const schema = yup.object().shape({
    username: yup.string().email('Precisa ser um e-mail').required('Preencha o e-mail'),
    password: yup.string().required('Preencha a senha'),
    
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  })

  
  /**
   * Função para verificar as informações do usuário
   * @param {Object} e - Informações do 
   */
  const onSubmit= (e) => {
    dispatch(logUser(e)).then((result) => {
      if(result.payload){
        if(location.pathname === '/login'){
          history('/');
        }
      }else{
        toast.error("Usuário ou senha inválidos", {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      }
    }).catch((err) => {
      toast.error("Erro: " + err, {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
      });
    });
  }; 

  return (
    <>
        
        <div className="container d-flex">
          <div className="bg-banana-mania text-center m-5 p-3 rounded-4 shadow">
            <div className="form col" style= {{width:"300px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill m-3" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>

              <h1>Login</h1>
              <form className="g-3 col" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="username" id="username" className="form-control"  placeholder="fulano@silva.com" {...register("username")}></input>
                  {errors && errors.email && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.username.message}</p>}

                </div>
                <div className="col">
                  <label className="senha">Senha</label>
                  <input type="password" name="password" id="password" className="form-control"  placeholder="Senha" {...register("password")}></input>
                  {errors && errors.senha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.password.message}</p>}
                </div>
                <div className=" div-botao col">
                  <button type="submit" className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow-sm">Login</button>
                </div>
                <hr />
                <div>
                  <p>Não tem uma conta? <Link to="/Cadastro" className="class-registro">Registre-se</Link></p>
                </div>
              </form>

            </div>
          </div>
        </div>
    </>
    

  );
}

export default Login_page;
