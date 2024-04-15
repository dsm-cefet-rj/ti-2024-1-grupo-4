import './cadastro.css';
import React, { useEffect, useState } from 'react';
import { addUserServer, emailExistServer, fetchUser } from '../../redux/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
//import {CadastroSchema} from './CadastroSchema';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";


function Register_page() {

  const[senha, setSenha] = useState('');
  const[email, setEmail] = useState('');
  const[nome, setNome] = useState('');
  const[repSenha, setRepSenha] = useState(''); 
  const[logradouro, setLogradouro] = useState('');
  const[numero, setNumero] = useState('');
  const[CEP, setCEP] = useState('');
  const[complemento, setComplemento] = useState('');
  const[error, setError] = useState(false);
  const[errorMSG, setErrorMSG] = useState('');
  const[admin, setAdm] = useState(false);
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



  const handleSubmit = (e) => {
    if (!email || !senha) {
      e.preventDefault();
      setErrorMSG("Preencha todos os campos");
      setError(true);
      return;
    }
    e.preventDefault();

    dispatch(emailExistServer(email)).then((result) => {
      if(result.payload){
        setErrorMSG('Este e-mail já está cadastrado');
        setError(true);
      } else{
        dispatch(addUserServer({nome, email, senha, admin}));
        history('/');
      }
    });

  }; 

  return (
    <>

      
      <div className='container'>

      <div className="bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style={{ width: '60%', height: '90%' }}>


          <h2>Cadastro</h2>
          {error == true && 
              <div className="bg-brick-red text-banana-mania rounded-3 text-center">{errorMSG}</div>}
          <form className="row g-3 col">
            <div className="col-md-6">
              <label className="form-label" >Email</label>
              <input type="email" className="form-control" placeholder = "fulano@silva.com" value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className="col-md-6">
              <label className="form-label" >Nome</label>
              <input type="text" className="form-control" placeholder = "fulano da silva" value={nome} onChange={e => setNome(e.target.value)}></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Senha</label>
              <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)}></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Repita Senha</label>
              <input type="password" className="form-control" value={repSenha} onChange={e => setRepSenha(e.target.value)}></input>
            </div>
          </form>

          
          <h2>Endereço (Opcional)</h2>



          <div className="col-12">
              <button type="button" onClick = {handleSubmit}  className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50">Cadastre-se</button>
            </div>
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