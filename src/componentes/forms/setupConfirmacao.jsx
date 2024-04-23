import React from 'react'
import Progressbar from './progress_bar_function'
import './botao.scss'


import {setInfo,resetInfo} from "../../redux/compra/compraSlice"
import {useSelector,useDispatch} from "react-redux";


function setupConfirmacao({step}) {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    




  return (
      <>
          <div className='position-relative pt-2'>
              <Progressbar step={step} />
          </div>
          
          <div className='container-fluid'>
              <div className="align-items-center row bg-banana-mania text-center m-5 pb-5">
                  <svg className="path_icon bs-tacao-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={'200px'} width={"200px"} >
                      <path fill='#5a964c' d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                  </svg>
                  <h3 className='text-verde-certo pt-3'>Pagamento Realizado</h3>
              </div>
          </div>
      </>
  )
}

export default setupConfirmacao