import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Lista from '../componentes/Lista/setuplista_function'

import { useSelector, useDispatch } from 'react-redux';
import rootReducer from '../../redux/root-reducer.js';


const pedidosRegistrados = useSelector((rootReducer) => rootReducer.pedidoSlice.entities);
const HistoricoPedido = () => {
    return (
      <>
        <div className='d-block align-items-center min-vh-100  sticky'>
          <Header/>
          <div className="row g-3">
                {Object.values(pedidosRegistrados).map((Pedido) => (
                        
                    <div key="Pedido.id" className="col-md-4 col-lg-3 d-flex">
                        <Lista {...Pedido} />
                    </div>
                ))}
          </div>
          <div className='mt-5'></div>
          <Footer/>
        </div>
      </>
    )
  }
  
  export default HistoricoPedido