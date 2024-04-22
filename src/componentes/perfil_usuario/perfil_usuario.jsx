import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEnderecoServer, fetchEnderecoByUser } from '../../redux/endereco/enderecoSlice';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";
import { updateUserServer, fetchUser, fetchUserByEmail } from '../../redux/user/UserSlice';

import { toast } from 'react-toastify';

function Perfil_Usuario() {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
  const userState = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const status = userState.status;
  const dispatch = useDispatch();

  const userSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email().required('E-mail é obrigatório'),
  });

  const enderecoSchema = yup.object().shape({
    CEP: yup.string().required('CEP é obrigatório'),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    complemento: yup.string(),
    numero: yup.number().positive().required('Número é obrigatório')
  });

  const senhaSchema = yup.object().shape({
    senha: yup.string().test('password-match', 'A senha fornecida não corresponde à senha armazenada', function(value) {
      const storedPassword = currentUser.senha; // Replace this with your stored password
      return value === storedPassword;
    }),
    novaSenha: yup.string().required('A Nova senha deve ser preenchida').min(5,'A quantidade mínima é de 5 dígitos'),
    repSenha: yup.string().oneOf([yup.ref('novaSenha'), null], 'As senhas devem ser iguais').required()
  });


  const { register: registerUser, handleSubmit: handleSubmitUser, formState: { errors: userErrors } } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { register: registerEndereco, handleSubmit: handleSubmitEndereco, formState: { errors: enderecoErrors } } = useForm({
    resolver: yupResolver(enderecoSchema),
  });
  const { register: registerSenha, handleSubmit: handleSubmitSenha, formState: { errors: senhaErrors } } = useForm({
    resolver: yupResolver(senhaSchema),
  });

  const userUpdate = (data) => {
    const {nome, email} = data;
    const id = currentUser.id;
    const senha = currentUser.senha;
    const admin = currentUser.admin;
    
    userSchema.validate(data).then((validData)=>{
      dispatch(updateUserServer({id,nome, email,senha, admin})).then((user)=>{
        dispatch(fetchUserByEmail({email, senha}))
      })
      
    })
    .catch((error)=>{
      toast.error("Erro: " + error, {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
      });
    })

  }

  const enderecoUpdate = (data) =>{
    const {CEP, logradouro, numero, complemento} = data;
    const userKey = currentUser.id;
    enderecoSchema.validate(data).then((validData)=>{
      dispatch(addEnderecoServer({CEP, logradouro, numero, complemento, userKey}))
      toast.info("Senha mudada", {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
      });
    })
    .catch((error)=>{
      toast.error("Erro: "+ error, {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
      });
    })
  }

  const passUpdate = (data) => {
    const {senha, novaSenha, repSenha} = data;
    const id = currentUser.id;
    const email = currentUser.email;
    const nome = currentUser.nome;
    const admin = currentUser.admin;
    senhaSchema.validate(data).then((validData)=>{
      dispatch(updateUserServer({id, nome, email, senha:novaSenha, admin})).then((user)=>{
        dispatch(fetchUserByEmail({email, senha:novaSenha}))
      })
    })
    .catch((error)=>{
      toast.error("Erro: " + error, {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
      });
    })
  }


  useEffect(() => {
    if(status === 'not_loaded' || status === 'saved' || status === 'deleted' ){
      dispatch(fetchEnderecoByUser(currentUser.id))
      dispatch(fetchUser())
    } else if(status ==='failed'){
        setTimeout(()=>dispatch(fetchEnderecoByUser(currentUser.id)))
        setTimeout(()=>dispatch(fetchUser()))
    }
  }, [status,dispatch]);



  
  return (
    <>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "700px" }}>
        <h1>Perfil do Usuário</h1>
        <form onSubmit  = {handleSubmitUser(userUpdate)}>
          <label htmlFor="nome" className='m-2'>Nome do Usuário:</label>
          <input type="text" id = 'nome' className="form-control" {...registerUser("nome")} placeholder="Nome do Cliente"></input>
          {userErrors && userErrors.nome && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{userErrors.nome.message}</p>}

          <label htmlFor="email" className='m-2'>E-mail do usuário:</label>
          <input type="text" className="form-control" {...registerUser("email")} placeholder="Email do Cliente"></input>
          {userErrors && userErrors.email && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{userErrors.email.message}</p>}
          <button type = "submit" id = 'email' className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Informações</button>
          
        </form>
      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "700px" }}>
        <div className = "row">
          <h2>Endereço</h2>
        <form onSubmit  = {handleSubmitEndereco(enderecoUpdate)}>
          <div className="col-md-12">
          <label className="form-label" htmlFor='CEP'>CEP:</label>
          <input type="text" id = 'CEP' className="form-control" {...registerEndereco("CEP")}></input>
          {enderecoErrors.endereco?.CEP && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.CEP.message}</p>}
        </div>
        <div className="col-md-12">
          <label className="form-label" htmlFor = 'logradouro'>Logradouro:</label>
          <input type="text" id = 'logradouro' className="form-control" placeholder="Ex: Rua, Avenida, etc." {...registerEndereco("logradouro")}></input>
          {enderecoErrors.endereco?.logradouro && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.logradouro.message}</p>}
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor='complemento'>Complemento:</label>
          <input type="text" id = 'complemento' className="form-control" placeholder="Ex: Apto, Bloco, etc."  {...registerEndereco("complemento")}></input>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor='numero'>Número:</label>
          <input type="number" id = 'numero' className="form-control" {...registerEndereco("numero")}></input>
          {enderecoErrors.endereco?.numero && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.numero.message}</p>}
        </div>
        <button className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Endereço</button>
        </form>
        </div>
        
        
      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "700px" }}>
        <h2>Mudança de senha</h2>
         <form onSubmit  = {handleSubmitSenha(passUpdate)}>
          <label htmlFor = 'senha' className='m-2'>Digite sua senha:</label>
          <input type="password" id = 'senha' className="form-control" {...registerSenha("senha")}></input>
          {senhaErrors && senhaErrors.senha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{senhaErrors.senha.message}</p>}

          <label htmlFor = 'novaSenha' className='m-2'>Digite a nova senha:</label>
          <input type="password" id = 'novaSenha' className="form-control" {...registerSenha("novaSenha")}></input>
          {senhaErrors && senhaErrors.novaSenha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{senhaErrors.novaSenha.message}</p>}

          <label htmlFor = 'repSenha' className='m-2'>Repita a senha:</label>
          <input type="password" id = 'repSenha' className="form-control"  {...registerSenha("repSenha")}></input>
          {senhaErrors && senhaErrors.repSenha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{senhaErrors.repSenha.message}</p>}
          <button type = 'submit' className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Senha</button>
          

         </form>
      </div>




    </>
  )
};
export default Perfil_Usuario;