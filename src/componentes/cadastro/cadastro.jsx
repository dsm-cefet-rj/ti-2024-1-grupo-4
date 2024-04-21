import './cadastro.css';
import React, { useEffect, useState } from 'react';
import { addUserServer, emailExistServer, fetchUser } from '../../redux/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
//import {CadastroSchema} from './CadastroSchema';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";


function Register_page() {

  const[error, setError] = useState(false);
  const[errorMSG, setErrorMSG] = useState('');
  const userState = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const users = userState.entities;
  const status = userState.status;


  const dispatch = useDispatch();
  
  useEffect(() => {
    if(status === 'not_loaded' || status === 'saved' || status === 'deleted' ){
      dispatch(fetchUser())
    } else if(status ==='failed'){
        setTimeout(()=>dispatch(fetchUser()))
    }
  }, [status,dispatch]);

  const schema =  yup.object().shape(
    {
        email: yup.string().email().max(30).required(),
        nome: yup.string().max(50).required(),
        senha: yup.string().min(5).max(20).required(),
        repSenha: yup.string().oneOf([yup.ref('senha'),null]).required(),
        endereco: yup.object().when({
          is: (endereco) => Object.values(endereco).some(Boolean),
          then: yup.object().shape({
            logradouro: yup.string().required('Street is required'),
            CEP: yup.string().required('City is required'),
            complemento: yup.string().required('Postal code is required'),
            numero: yup.string().required('Country is required'),
          }),
          otherwise: yup.object().shape({
            logradouro: yup.string(),
            CEP: yup.string(),
            complemento: yup.string(),
            numero: yup.string(),
          }),
        }),
        
    }).required()

    const { register, handleSubmit, errors } = useForm({
      resolver: yupResolver(schema),
    })

  const onSubmit = (data) => {
    const {email, nome, senha, repSenha} = data;
    dispatch(emailExistServer(email)).then((result) => {
      if(result.payload){
        setErrorMSG('Este e-mail já está cadastrado');
        setError(true);
      } else{
        dispatch(addUserServer({nome, email, senha, admin:false}));
        history('/');
      }
    });

  };

  return (
    <>

      
      <div className='container d-flex'>

      <div className="bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style= {{width:"900px"}} >


          <h2 className='p-0 m-0'>Cadastro</h2>
          {error == true && 
              <div className="bg-brick-red text-banana-mania rounded-3 text-center">{errorMSG}</div>}
          <form className="row g-3 col" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <label className="form-label" >Email</label>
              <input type="email" {...register("email")} className="form-control"></input>
            </div>
            <div className="col-md-6">
              <label className="form-label" >Nome</label>
              <input type="text" {...register("nome")} className="form-control"></input>
              
            </div>
            <div className="col-md-6">
              <label className="form-label">Senha</label>
              <input type="password" {...register("senha")} className="form-control"></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Repita Senha</label>
              <input type="password" {...register("repSenha")} className="form-control"></input>
            </div>
            
          

          
          <h2>Endereço (Opcional)</h2>
          <div className="col-md-4">
              <label className="form-label">CEP</label>
              <input type="text" className="form-control" {...register("CEP")}></input>
            </div>
            <div className="col-8">
              <label className="form-label">Logradouro</label>
              <input type="text" className="form-control" placeholder="Ex: Rua, Avenida, etc." {...register("logradouro")}></input>
            </div>
            <div className="col-6">
              <label className="form-label">Complemento</label>
              <input type="text" className="form-control" placeholder="Ex: Apto, Bloco, etc." {...register("complemento")}></input>
            </div>
            <div className="col-6">
              <label className="form-label">Número</label>
              <input type="number" className="form-control" {...register("numero")}></input>
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
/*          <form className="row g-3 col" onSubmit = {handleSubmit(onSubmit)}>

            <div className="col-md-4">
              <label className="form-label">CEP</label>
              <input type="text" className="form-control" value = {CEP} onChange={e => setCEP(e.target.value)}></input>
            </div>
            <div className="col-8">
              <label className="form-label">Logradouro</label>
              <input type="text" className="form-control" placeholder="Ex: Rua, Avenida, etc." value = {logradouro} onChange={e => setLogradouro(e.target.value)}></input>
            </div>
            <div className="col-6">
              <label className="form-label">Complemento</label>
              <input type="text" className="form-control" placeholder="Ex: Apto, Bloco, etc." value = {complemento} onChange={e => setComplemento(e.target.value)}></input>
            </div>
            <div className="col-6">
              <label className="form-label">Número</label>
              <input type="number" className="form-control" value = {numero} onChange={e => setNumero(Math.max(0,e.target.value))}></input>
            </div>

            
            
          </form>
          const schema =  yup.object().shape(
  {
      email: yup.string().email().required().max(30),
      nome: yup.string().required().max(50),
      senha: yup.string().required().min(5).max(20),
      repSenha: yup.string().oneOf([yup.value("password"), null]).required()

  }
);*/
export default Register_page;