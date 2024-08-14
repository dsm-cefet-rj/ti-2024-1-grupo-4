import './cadastro.css';
import React, { useEffect, useState } from 'react';
import { addUserServer} from '../../redux/user/UserSlice';
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


  const status = useSelector((rootReducer) => rootReducer.userSlice.status)|| {};
  const {currentUser} = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  
  const dispatch = useDispatch();
  const history = useNavigate();
  
  useEffect(() => {
    if(status === 'not_loaded' || status === 'saved' || status === 'deleted' ){
      dispatch(fetchUser())
    } else if(status ==='failed'){
        setTimeout(()=>dispatch(fetchUser()))
    }
  }, [status,dispatch]);

  const schema = yup.object().shape({
    email: yup.string().email('Precisa ser um e-mail').required(),
    nome: yup.string().max(50).required(),
    senha: yup.string().min(5, 'A quantidade de caracteres da senha é de no mínimo 5').required(),
    repSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais').required('Este campo deve ser preenchido'),
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
    const { email, nome, senha, repSenha, cep, logradouro, numeroEndereco, complemento } = data;
  
    try {
      // Step 1: Attempt to add the new user to the server (signup function handles email existence check)
      const userAddedResult = await dispatch(addUserServer({ nome, email, senha, admin: false })).unwrap();
  
      if (userAddedResult) {
        // Step 2: After user is added, fetch the user by email and password (or just use the result)
        const userResult = await dispatch(fetchUserByEmail({ email, senha })).unwrap();
  
        if (userResult) {
          const userKey = userResult._id; // Assuming MongoDB returns _id as the identifier
  
          // Step 3: Add the address to the server
          const addressAddedResult = await dispatch(addEnderecoServer({ cep, logradouro, numeroEndereco, complemento, userKey })).unwrap();
  
          if (addressAddedResult) {
            toast.info("Usuário e endereço cadastrados com sucesso", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
            // Step 4: Redirect to the homepage or another relevant page
            history('/');
          } else {
            toast.error("Erro ao adicionar endereço", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          }
        }
      } else {
        toast.error("Erro ao adicionar usuário", {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (error.message === "Email já cadastrado") {
        toast.warning("Este e-mail já está cadastrado", {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      } else {
        console.error("Error:", error);
        toast.error("Erro ao cadastrar usuário", {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      }
    }
  };
  
  

  return (
    <>

      
      <div className='container d-flex'>

      <div className="bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style= {{width:"900px"}} >

          <h2 className='p-0 m-0'>Cadastro</h2>
          <form className="row g-3 col" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <label className="form-label" htmlFor='email'>Email</label>
              <input type="email" id = 'email' {...register("email")} className="form-control"></input>
              {errors && errors.email && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.email.message}</p>}
            </div>
            <div className="col-md-6">
              <label className="form-label" >Nome</label>
              <input type="text" {...register("nome")} className="form-control"></input>
              {errors && errors.nome && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.nome.message}</p>}
              
            </div>
            <div className="col-md-6">
              <label className="form-label">Senha</label>
              <input type="password" {...register("senha")} className="form-control"></input>
              {errors && errors.senha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.senha.message}</p>}
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