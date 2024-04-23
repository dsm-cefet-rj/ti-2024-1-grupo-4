import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
//import {Link} from 'react-router-dom';
import Login from '../../componentes/Login/Login'

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useSelector, useDispatch} from 'react-redux';
import { setUser } from '../../redux/compra/compraSlice';
//import { formsSchema } from './formsSchema';



//import {useSelector,useDispatch} from "react-redux";
//import{prevStep,nextStep,setUser,setPassword} from '../../redux/compra/compraSlice';
const setupcontaSchema=yup.object().shape({
  user: yup.string().required('O usuário é obrigatório.'),
  password: yup.string().required('A senha é obrigatória.').min(8),
  teste: yup.string().required().min(3),
})


function setupconta_function({prevStep,nextStep,step}) {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
  const { register, handleSubmit,formState:{errors}} = useForm(
    {validationSchema:setupcontaSchema }
  );
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(setUser(currentUser))
    console.log(data)
    nextStep();
  }
  const handleSubmitStep=data=>{
    handleSubmit(data)();
    nextStep();
  }
/*
    const {step,user,password} = useSelector((rootReducer) => rootReducer.compraReducer);
    const dispatch = useDispatch();
    const handleUser = input =>(e) => {
        dispatch(setUser(e.target.value))
    }
    const handlePassword = input =>(e) => {
        dispatch(setPassword(e.target.value))
    }
  const continue_event = (e) => {
    e.preventDefault();
    dispatch(nextStep());
  }
  const back_event = (e) => {
    e.preventDefault();
    dispatch(prevStep());
  }
  */

  //id="floatingInput"
  //id="floatingPassword" 
  

  return (
    <>
      <div className='position-relative pt-2'>
        <Progressbar
          step={step}
        />
      </div>
      <Login/>
      {currentUser ? (onSubmit()) :null }
   
    </>
  )
}

export default setupconta_function

{/*onClick={()=>prevStep()}*/   /**/}

{/*

        <div className="container-fluid position-sticky">
          <div className="bg-equator justify-content-center align-items-center m-1">
            <div className="icone-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
          </div>
        </div>
        <div className='form-group form-control-sm'>
          <div className="form-floating mb-2">
            <input type="text" className="form-control" {...register('user')} name='user'id='user' placeholder='user' />
            <p>{errors.user?.message}</p>
          

            
            <label hrmlfor="floatingInput">Usuário</label>
            
          </div>
          <div className="form-floating mt-3">
            <input type="password" className="form-control" {...register('password')}placeholder="Senha" id='password' name='password' />
            <p>{errors.password?.message}</p>
            <label hrmlfor="floatingPassword">Senha</label>
            
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div >
            <label>teste</label>
            <input type='text' name='teste' {...register('teste',{required:true})}></input>
            {errors.teste && <p>{errors.teste.message}</p>}
          </div>
        </form>
        </div>
        <br />
        <div className='d-flex flex-row-reverse'>
          <div className='col-6'>
            <div className='text-rigth'>
              <button type="button" className="btn btn-padrao" onClick={() =>handleSubmitStep(onSubmit)}>Login</button>
            </div>
          </div>
          <div className='col-6'>
            <div className='text-right'>
            <Link to = "/" className = "nav-link"><button type="button" className="btn btn-padrao">Anterior</button></Link>
            </div>
          </div>
        </div>
    


*/}