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

/**
 * @module forms/setupconta_function
 * 
 */
/**
 * @function
 * @description Função para a impressão do login na página pagamento
 * 
 * @param {Object} prevstep 
 * @param {Object} nextStep - Próxima step na barra de pagamento 
 * @param {Object} step - Atual step na barra de pagamento
 * @returns {void} Está função não retorna valor
 */

function setupconta_function({ prevStep, nextStep, step }) {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
  const { userInfo } = useSelector((rootReducer) => rootReducer.userSlice) || {};

  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(setUser({nome: userInfo.nome, email: userInfo.email, userKey: currentUser}))
    console.log(data)
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