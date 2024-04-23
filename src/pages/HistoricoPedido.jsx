import React from 'react'
import Header from '../componentes/header/Header.jsx'
import Footer from '../componentes/footer/Footer.jsx'
import Lista from '../componentes/Lista/setuplista_function.jsx'

import { useSelector, useDispatch } from 'react-redux';
import { fetchPedido } from '../redux/listapedidos/ListaPedidoSlice.js';
import rootReducer from '../redux/root-reducer.js';
import { useEffect } from 'react';
import { fetchEnderecoByUser } from '../redux/endereco/enderecoSlice.js';



const HistoricoPedido = () => {
    const {pedidos} = useSelector((rootReducer)=> rootReducer.pedidoSlice);
    const dispatch = useDispatch();
    const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
    const error = useSelector((rootReducer) => rootReducer.pedidoSlice.error);
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};

    useEffect(() => {
        if (status === 'not_loaded' || status === 'saved' || status === 'deleted') {
          dispatch(fetchEnderecoByUser(currentUser.id));
        }
    }, [status, dispatch]);

    return (
      <>
        <div className='d-block align-items-center min-vh-100  sticky'>
          <Header/>
          <div className="row g-3">
                {pedidos? Object.values(pedidos).map((Pedido) => (
                        
                    <div key="Pedido.id" className="col-md-4 col-lg-3 d-flex m-3">
                        <Lista {...Pedido} />
                    </div>
                )):<span>Você não tem pedidos</span>}
          </div>
          <div className='mt-5'></div>
          <Footer/>
        </div>
      </>
    )
  }
  
  export default HistoricoPedido