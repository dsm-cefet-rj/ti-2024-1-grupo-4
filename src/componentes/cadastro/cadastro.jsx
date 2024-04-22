import './cadastro.css';
import React, { useEffect, useState } from 'react';
import { addUserServer, emailExistServer, fetchUser, fetchUserByEmail, userSlice } from '../../redux/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
//import {CadastroSchema} from './CadastroSchema';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addEnderecoServer } from '../../redux/endereco/enderecoSlice';


function Register_page() {

  const[error, setError] = useState(false);
  const[errorMSG, setErrorMSG] = useState('');
  const[end, setEnd] = useState(false);
  const userState = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const {currentUser} = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const users = userState.entities;
  const status = userState.status;
  const userKey = currentUser?.id || null;
  



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
    CEP: yup.string().required('CEP é obrigatório'),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    complemento: yup.string(),
    numero: yup.number().positive().required('Número é obrigatório')
    
  });

    const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(schema),
    })

  const onSubmit = (data) => {
    const { email, nome, senha, repSenha, CEP, logradouro, numero, complemento } = data;
  
    dispatch(emailExistServer(email)).then((result) => {
      if (result.payload) {
        toast.warning("Este e-mail já está cadastrado", {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      } else {
        dispatch(addUserServer({ nome, email, senha, admin: false })).then((userAdded) => {
          if (userAdded.payload) {
            dispatch(fetchUserByEmail({ email, senha })).then((user) => {
              if (user.payload) {
                const userKey = user.payload.id;
                dispatch(addEnderecoServer({ CEP, logradouro, numero, complemento, userKey })).then((addressAdded) => {
                  if (addressAdded.payload) {
                    toast.info("Usuário e endereço cadastrados com sucesso", {
                      position: "bottom-left",
                      className: "text-spicy-mix bg-banana-mania shadow",
                      autoClose: 2000,
                    });
                    history('/');
                  } else {
                    toast.error("Erro ao adicionar endereço", {
                      position: "bottom-left",
                      className: "text-spicy-mix bg-banana-mania shadow",
                      autoClose: 2000,
                    });
                  }
                });
              }
            }).catch((error) => {
              console.log("Error fetching user: ", error);
              toast.error("Erro ao buscar usuário", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 2000,
              });
            });
          } else {
            toast.error("Erro ao adicionar usuário", {
              position: "bottom-left",
              className: "text-spicy-mix bg-banana-mania shadow",
              autoClose: 2000,
            });
          }
        });
      }
    }).catch((error) => {
      console.log("Error:", error);
      toast.error("Erro ao cadastrar usuário", {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
      });
    });
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
              <input type="text" {...register("email")} className="form-control"></input>
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
              <input type="text" className="form-control" {...register("CEP")}></input>
              {errors.endereco?.CEP && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.CEP.message}</p>}
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
              <input type="number" className="form-control" {...register("numero")}></input>
              {errors.endereco?.numero && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errors.endereco.numero.message}</p>}
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