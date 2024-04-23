import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
import qrcode from '../../assets/img/qr-code-plus.png'


import {setInfo,resetInfo,addPedidoServer} from "../../redux/compra/compraSlice"
import {useSelector,useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from 'react'



function setupConfirmacao({step,value}) {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const status = useSelector((rootReducer) => rootReducer.compraSlice.status);
    const pedido = useSelector((rootReducer) => rootReducer.compraSlice.informacao);

    console.log(status)
    console.log(value)
    const dispatch = useDispatch();
    //delay simulacao
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
   
    const handlePedidoAdd =()=>{
        dispatch(addPedidoServer(pedido));
    }
 

    const renderStatus = (value)=>{

        if(value == 'pix'){
            if( status == 'saved'){
        
                return(
                    <>
                        <svg className="path_icon bs-tacao-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={'200px'} width={"200px"} >
                            <path fill='#5a964c' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                        <h3 className='text-verde-certo pt-3'>Pagamento Realizado</h3>
                    </>
                )
            } else if (status == 'loading') {
                //loading
                return(
                    <>
                        <img src={qrcode}></img>
                        <h3 className='text-verde-certo pt-3'>Esperando o Pagamento</h3>
                    </>
                )
            }else{
                //failed
                return(
                    <>
                        <div className="d-flex justify-content-center">
                            <div className='py-1 my-1 px-3 rounded border border-brick-red bg-tacao-400'>
                                <h3 className='text-brick-red pb-3 pt-3'>Falha no Pagamento</h3>
                                <Link to="/">
                                <span className="btn btn-brick-red w-100 mb-2 pb-2">Fechar</span>
                            </Link>
                            </div>
                         
                        </div>
                    </>

                )
            }
        }else{
            //cartao
            if( status == 'saved'){
        
               return(
                    <>
                        <svg className="path_icon bs-tacao-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={'200px'} width={"200px"} >
                            <path fill='#5a964c' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                        <h3 className='text-verde-certo pt-3'>Pagamento Realizado</h3>
                    </>
               )
            }else if(status == 'loading'){
                //loading
                return(
                    <>
                        <div className="d-flex justify-content-center">
                            <div className='py-5 px-5'>
                            <div class="spinner-border text-verde-certo" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            </div>
                        </div>
                    </>

                )
            }else{
                //failed
                return(
                    <>
                        <div className="d-flex justify-content-center">
                            <div className='py-1 my-1 px-3 rounded border border-brick-red bg-tacao-400'>
                                <h3 className='text-brick-red pb-3 pt-3'>Falha no Pagamento</h3>
                                <Link to="/">
                                <span className="btn btn-brick-red w-100 mb-2 pb-2">Fechar</span>
                            </Link>
                            </div>
                         
                        </div>
                    </>

                )

            }
        }  
    }
    

    useEffect(() => {
        if (status == 'saved') {
            renderStatus(value)
        }
      }, [status, renderStatus]);

  return (
      <>
          <div className='position-relative pt-2'>
              <Progressbar step={step} />
          </div>
         
          <div className='container-fluid'>
              <div className="align-items-center row bg-banana-mania text-center m-5 pb-5">
                {renderStatus(value)}
              </div>
              <button className='btn bg-brick-red-300' onClick={handlePedidoAdd}>SIMULACAO</button>
          </div>
      </>
  )
}

export default setupConfirmacao