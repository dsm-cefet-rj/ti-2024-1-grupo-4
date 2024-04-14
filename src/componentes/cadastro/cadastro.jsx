import './cadastro.css';
import React, { useEffect, useState } from 'react';
import { addUserServer } from '../../redux/user/UserSlice';
import { useDispatch } from 'react-redux';
import {CadastroSchema} from './CadastroSchema';
import {yupResolver} from '@hookform/resolvers';
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
  const[adm, setAdm] = useState(false);
  const dispatch = useDispatch();


  const handleSubmit =  async(e) => {
    e.preventDefault();
    try{
      dispatch(addUserServer({email, senha, nome, adm}));
    } catch(error){
      console.error('Error adding user: ', error.message);
    }
  
  };

  return (
    <>

      
      <div className='container'>

      <div className="bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style={{ width: '60%', height: '90%' }}>


          <h2>Cadastro</h2>
          {error == true && 
              <div className="bg-brick-red text-banana-mania m-1 p-1 rounded-3 text-center">{errorMSG}</div>}
          <form className="row g-3 col" onSubmit = {handleSubmit}>
            <div className="col-md-6">
              <label className="form-label" >Email</label>
              <input type="email" className="form-control" placeholder = "fulano@silva.com" value = {email} onChange={e => setEmail(e.target.value)} required></input>
            </div>
            <div className="col-md-6">
              <label className="form-label" >Nome</label>
              <input type="text" className="form-control" placeholder = "fulano da silva" value = {nome} onChange={e => setNome(e.target.value)} required></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Senha</label>
              <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Repita a Senha</label>
              <input type="password" className= "form-control" value = {repSenha} onChange={e => setRepSenha(e.target.value)} required></input>
            </div>
            <h2>Endereço (Opcional)</h2>
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

            
            <div className="col-12">
              <button type="submit"  className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50">Cadastre-se</button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default Register_page;