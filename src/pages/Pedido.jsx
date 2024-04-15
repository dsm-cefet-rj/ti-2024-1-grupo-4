import React from 'react'
import Form from '../componentes/forms/forms_function'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'

//currentUser?(setStep({step:step+1})):{}

const Pedido = () => {
  return (
    <>
      <div className='d-block align-items-center min-vh-100  sticky'>
        <Header/>
        <div className='mt-5'></div>
          <Form />
        <div className='mt-5'></div>
        <Footer/>
      </div>
    </>
  )
}

export default Pedido