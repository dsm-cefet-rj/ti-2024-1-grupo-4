import React from 'react'
import Form from '../componentes/forms/Forms'
import Header from '../componentes/Header/Header'
import Footer from '../componentes/Footer/Footer'

const Pedido = () => {
  return (
    <>
      <div className='d-block align-items-center min-vh-100 bg-banana-mania sticky'>
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