import React from 'react'
import Header from '../componentes/header/Header.jsx'
import Footer from '../componentes/footer/Footer.jsx'
import Lista from '../componentes/Lista/setuplista_function.jsx'

import { useSelector, useDispatch } from 'react-redux';
import { fetchPedido } from '../redux/listapedidos/ListaPedidoSlice.js';
import rootReducer from '../redux/root-reducer.js';
import { useEffect } from 'react';



const HistoricoPedido = () => {
    const pedidosRegistrados = useSelector((rootReducer) => rootReducer.pedidoSlice.entities);
    const dispatch = useDispatch();
    const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
    const error = useSelector((rootReducer) => rootReducer.pedidoSlice.error);

    useEffect(() => {
        if (status === 'not_loaded') {
          dispatch(fetchPedido());
        }
    }, [status, dispatch]);

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