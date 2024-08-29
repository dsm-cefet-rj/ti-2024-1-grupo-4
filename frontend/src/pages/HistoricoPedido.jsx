import React from 'react'
import Header from '../componentes/header/Header.jsx'
import Footer from '../componentes/footer/Footer.jsx'
import Lista from '../componentes/Lista/setuplista_function.jsx'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPedidosByUser} from '../redux/listapedidos/ListaPedidoSlice.js';

/**
 * Retorna a página HistoricoPedido
 * 
 */
const HistoricoPedido = () => {
    const pedidos = useSelector((rootReducer)=> rootReducer.pedidoSlice.pedidos);
    const dispatch = useDispatch();
    const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
    const error = useSelector((rootReducer) => rootReducer.pedidoSlice.error);
    const currentUser = useSelector((rootReducer) => rootReducer.userSlice.currentUser) || {};

    useEffect(() => {
        if ((status === 'not_loaded' || status === 'saved' || status === 'deleted')) {
          dispatch(fetchPedidosByUser(currentUser));
        }
        if (status === 'loaded'){
          const timer = setTimeout(() => {
            dispatch(fetchPedidosByUser(currentUser));
          }, 2000);
          return () => clearTimeout(timer);
        }
    }, [status, dispatch]);

    return (
      <>
        <div className=''>
          <Header/>
          <div className="d-flex flex-column">
          {pedidos && Object.keys(pedidos).length > 0? <>
            {Object.values(pedidos).map((Pedido) => (
                        
                        <div key={Pedido.id} className="card m-2 p-2 bg-banana-mania">
                            <Lista {...Pedido} />
                        </div>
                    ))}
             </>:(
          <div className="text-center bg-banana-mania m-5 p-3 rounded-4 shadow">
            <h5 className="mb-4">Você ainda não tem pedidos</h5>
            <p className="mb-4">Os seus pedidos e informações de entrega irão aparecer aqui!</p>
            <Link to="/" className="btn btn-tacao border-tacao shadow-sm">
              Ver produtos
            </Link>
          </div>
        )}
                
          </div>
          <Footer/>
        </div>
      </>
    )
  }
  
  export default HistoricoPedido