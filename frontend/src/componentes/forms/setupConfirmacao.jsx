import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'
import qrcode from '../../assets/img/qr-code-plus.png'


import {resetInfo,addPedidoServer,setStatus} from "../../redux/compra/compraSlice"
import {useSelector,useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect, useState,useRef} from 'react'
import { selectProductsTotalPrice } from '../../redux/cart/cart.selector.js';
import { addEntregaServer, resetInfoEntrega } from '../../redux/entrega/entregaSlice.js'

/**
 * @module forms/setupConfirmacao
 * 
 */
/**
 * @function
 * @description Função para a impressão da página esperando pagamento
 * 
 * @param {Object} step - Step atual na barra de progresso em pagamento
 * @param {Object} value - Opção de pagamento selecionado
 * @returns {void} Está função não retorna valor
 */

function setupConfirmacao({step,value}) {
    const status = useSelector((rootReducer) => rootReducer.compraSlice.status);
    const status_ent = useSelector((rootReducer) => rootReducer.entregaSlice.status);
    const {instrucoes } = useSelector((rootReducer) => rootReducer.entregaSlice) || {};
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const { endereco } = useSelector((rootReducer) => rootReducer.entregaSlice) || {};
    const { status_entrega } = useSelector((rootReducer) => rootReducer.entregaSlice) || {};
    const pagamento = useSelector((rootReducer) => rootReducer.compraSlice.pagamento) || {};
    const user = useSelector((rootReducer) => rootReducer.compraSlice.user) || {};
    const { products } = useSelector((rootReducer) => rootReducer.cartSlicer);
    const productsTotalPrice = useSelector(selectProductsTotalPrice);
    const [isComplete, setIsComplete] = useState(false);

    const dispatch = useDispatch();
    const closeButtonRef = useRef(null);


   
    const handlePedidoAdd = async () => {
        try {

            await new Promise((resolve) => setTimeout(resolve, 5000));
            const pedidoResponse = await dispatch(
                addPedidoServer({ user, products, pagamento, valorTotal: productsTotalPrice })
            ).unwrap();
            const pedidoId = pedidoResponse.id;

            const entregaId = await dispatch(addEntregaServer({
                endereco,
                status: status_entrega,
                userKey: currentUser,
                pedido: pedidoId,
                instrucoes: instrucoes,
            })).unwrap();
            
            if (entregaId) {
                dispatch(resetInfo());
                dispatch(resetInfoEntrega());
                setIsComplete(true);

            }
            
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const handleSetStatusLoading = () => {
        dispatch(setStatus('loading'));
    }
    const renderStatus = (value)=>{

        if(value == 'pix'){
            if(isComplete){
                return(
                    <>
                        <svg className="path_icon bs-tacao-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={'200px'} width={"200px"} >
                            <path fill='#5a964c' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                        <h3 className='text-verde-certo pt-3'>Pagamento Realizado</h3>

                        <Link to="/">
                                <span className="btn btn-brick-red w-100 mb-2 pb-2" ref={closeButtonRef} onClick={handleClose}>Fechar</span> {/**onClick={setStatus('not_loaded')} */}
                            </Link>
                        
                    </>
                )
            } else {
                //loading
                return(
                    <>
                        <img src={qrcode}></img>
                        <h3 className='text-verde-certo pt-3'>Esperando o Pagamento</h3>
                    </>
                )
            }
        }else{
            //cartao
            if(isComplete){
        
               return(
                    <>
                        <svg className="path_icon bs-tacao-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={'200px'} width={"200px"} >
                            <path fill='#5a964c' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                        </svg>
                        <h3 className='text-verde-certo pt-3'>Pagamento Realizado</h3>
                        <Link to="/">
                                <span className="btn btn-brick-red w-100 mb-2 pb-2" ref={closeButtonRef} onClick={handleClose} >Fechar</span> {/**onClick={setStatus('not_loaded')} */}
                            </Link>
                    </>
               )
            }else {
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
            }
        }  
    }

    useEffect(() => {
        renderStatus(value);
    }, [status]);

    useEffect(() => {
        if(status === 'loading'){
            handlePedidoAdd();
        }
        if(status === 'saved'){
            dispatch(resetInfo());
        }
    }, [status]);

    useEffect(() => {
      handleSetStatusLoading();
    }, [step])

    const handleClose = () => {
        // Função que será chamada tanto pelo botão quanto pelo Enter
        setStatus('not_loaded');
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && closeButtonRef.current) {
                closeButtonRef.current.click();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


  return (
      <>
          <div className='position-relative pt-2'>
              <Progressbar step={step} />
          </div>
          {console.log(status + " status antes do handlepedido")}
         
          <div className='container-fluid'>
              <div className="align-items-center row bg-banana-mania text-center m-5 pb-5">
                {renderStatus(value)}
              </div>
          </div>
      </>
  )
}

export default setupConfirmacao