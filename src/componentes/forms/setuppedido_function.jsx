import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formsSchema } from './formsSchema';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../cartItem/cartminimal';
import { selectProductsTotalPrice } from '../../redux/cart/cart.selector.js';



function setuppedido_function({ prevStep, nextStep, step }) {
  const { register, handleSubmit, setValue } = useForm();
  const [parametroNumCartao, setParametroNumCartao] = useState('');
  const [toggleValue, setToggleValue] = useState(false);
  const [value, setData] = useState("");

  //carrinho
  const { products } = useSelector((rootReducer) => rootReducer.cartSlicer);
  const productsTotalPrice = useSelector(selectProductsTotalPrice);


  const onSubmit = data => {
    //a
    console.log(data)
  }
  const handleSubmitStep = data => {
    nextStep();
    handleSubmit(data)();
  }


  return (
    <>
      <div className='position-relative pt-2'>
        <Progressbar step={step} />
      </div>
      <div className='container-fluid'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}> {/* HOOKFORM ONSUBMIT */}
          <div className="align-items-center row bg-banana-mania text-center m-5 ">
            <h3>Confirmação</h3>
            <hr />

            <div class="d-flex flex-column flex-shrink-0 bg-white py-3 px-3" style={{ width: "500px" }}>
              <div class="list-group list-group-flush border-bottom scrollarea" style={{ maxHeight: '300px', maxWidth: '500px', overflow: 'auto' }}>

                {products.map(product =>

                  <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
                    <div class="d-flex align-items-center justify-content-between ps-3 pe-3">


                      <div className='grid gap-2 row-gap-2 mb-1'>
                        <CartItem key={product.id} product={product} />
                      </div>

                    </div>
                  </a>
                )}
              </div>
            </div>
            
            <div className='row justify-content-start py-3'>
          
              <h4 >Total a pagar:</h4>
              <h5>{productsTotalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h5>
            </div>
            <hr/>
            <div className='form-container'>
              <div className='row align-items-center'>
                <div className='col-md-6 pb-3'>
                  <button className='btn btn-padrao bg-tacao-300' onClick={() => prevStep()}>Anterior</button>
                </div>
                <div className='col-md-6 pb-3'>
                  <button className='btn btn-padrao bg-tacao-300' onClick={() => handleSubmitStep(onSubmit)}>Confirmar</button>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default setuppedido_function