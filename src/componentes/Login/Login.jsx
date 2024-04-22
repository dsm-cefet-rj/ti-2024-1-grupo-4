import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { fetchUser, fetchUserByEmail} from '../../redux/user/UserSlice';

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';


function Login_page () {
  const userState = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const history = useNavigate();
  const status = userState.status;
  const users = userState.entities;
  const erro = userState.error;
  const location = useLocation();

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().email('Precisa ser um e-mail').required('Preencha o e-mail'),
    senha: yup.string().required('Preencha a senha'),
    
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  })

  

  const onSubmit= (e) => {
    const {email, senha} = e;
    dispatch(fetchUserByEmail({email,senha})).then((result) => {
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
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="fulano@silva.com" {...register("email")}></input>
                  {errors && errors.email && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.email.message}</p>}

                </div>
                <div className="col">
                  <label className="senha">Senha</label>
                  <input type="password" className="form-control" id="inputPassword2" placeholder="Senha" {...register("senha")}></input>
                  {errors && errors.senha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.senha.message}</p>}
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
