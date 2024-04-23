import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
import Login from '../../componentes/Login/Login'

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/compra/compraSlice';

const setupcontaSchema = yup.object().shape({
  user: yup.string().required('O usuário é obrigatório.'),
  password: yup.string().required('A senha é obrigatória.').min(8),
  teste: yup.string().required().min(3),
})


function setupconta_function({ prevStep, nextStep, step }) {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
  const { register, handleSubmit, formState: { errors } } = useForm(
    { validationSchema: setupcontaSchema }
  );
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(setUser(currentUser))
    console.log(data)
    nextStep();
  }
  const handleSubmitStep = data => {
    handleSubmit(data)();
    nextStep();
  }
  return (
    <>
      <div className='position-relative pt-2'>
        <Progressbar
          step={step}
        />
      </div>
      {currentUser ? (onSubmit()) : null}
      <Login />


    </>
  )
}

export default setupconta_function