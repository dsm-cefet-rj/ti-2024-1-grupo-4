import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formsSchema } from './formsSchema';

//import {useSelector,useDispatch} from "react-redux";
//import{nextStep, prevStep,setT_pagamento, setCodcartao, setDatacartao, setNome_cartao, setNum_cartao} from '../../redux/compra/compraSlice';

function setuppagamento_function({prevStep,nextStep,step}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    //a
    console.log(data)
  }
  const handleSubmitStep=data=>{
    nextStep();
    handleSubmit(data)();
  }
  /*
  const { step,num_cartao,codcartao,datacartao,nome_cartao} = useSelector((rootReducer) => rootReducer.compraReducer);
  const dispatch = useDispatch();

  const handleT_pagamento = input => (e) => {
    dispatch(setT_pagamento(e.target.value))
  }
  const handleCodcartao = input => (e) => {
    dispatch(setCodcartao(e.target.value))
  }
  const handleDatacartao = input => (e) => {
    dispatch(setDatacartao(e.target.value))
  }
  const handleNome_cartao = input => (e) => {
    dispatch(setNome_cartao(e.target.value))
  }
  const handleNum_cartao = input => (e) => {
    dispatch(setNum_cartao(e.target.value))
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
 //ele ta pegando o valor do botoa pressionado como ON ou OFF

  return (
    <>

      <div className='position-relative pt-2'>
        <Progressbar
          step={step}
        />
      </div>
      <div className='container-fluid'>

        <div className="align-items-center row bg-banana-mania text-center m-5 ">
          <h3>Pagamento</h3>
          <hr />

          <div className='form-container'>
            <label htmlFor='T_pagamento'>
              <h4>Forma de Pagamento</h4>
              <div className="d-flex align-items-center">


                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                  <input type="radio" className="btn-check" name="cartao" {...register("T_pagamento")} id="btnradio1" autoComplete="off" unchecked='true' />
                  <label className="btn btn-outline-padrao" htmlFor="btnradio1">Cartão de Crédito</label>

                  <input type="radio" className="btn-check" name="ca"{...register("T_pagamento")} id="btnradio2"  autoComplete="off" unchecked='true' />
                  <label className="btn btn-outline-padrao " htmlFor="btnradio2">Cartão de Débito</label>

                  <input type="radio" className="btn-check" name="te"{...register("T_pagamento")} id="btnradio3" autoComplete="off" unchecked='true' />
                  <label className="btn btn-outline-padrao" htmlFor="btnradio3">PIX</label>
                </div>
              </div>
            </label>



            <div className='pt-5'>
              <div className='row align-items-center'>
                <div className='col-md-6'>
                  <label htmlFor='num_cartao'>Número do Cartão</label>
                  <input type='text' className='form-control'{...register("num_cartao")} name='num_cartao'/>
                </div>

                <div className='col-md-6'>
                  <label htmlFor='nome_cartao'>Nome do Titular</label>
                  <input type='text' className='form-control'{...register("nome_cartao")} name='nome_cartao' />
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6'>
                  <label htmlFor='datacartao'>Data de Expiração</label>
                  <input type='text' className='form-control'{...register("datacartao")} name='datacartao' />
                </div>
                <div className='col-md-6'>
                  <label htmlFor='codcartao'>CVV/CVC</label>
                  <input type='text' className='form-control'{...register("codcartao")} name='codcartao'/>
                </div>
              </div>
            </div>
            <br />


            <div className='form-container pt-2'>
              <div className=''>
                <hr />
                <div className='row align-items-center mt-5'>
                  <div className='col-md-6 pb-3'>
                    <button className='btn btn-padrao bg-tacao-300' onClick={()=>prevStep()}>Anterior</button>

                  </div>
                  <div className='col-md-6 pb-3'>

                    <button className='btn btn-padrao bg-tacao-300' onClick={() =>handleSubmitStep(onSubmit)}>Próximo</button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default setuppagamento_function