import React from 'react'
import './botao.scss'

/**
 * @module forms/progress_bar_function
 * 
 */
/**
 * @function
 * @description Função para a impressão da barra de progresso usada em pagamento
 * 
 * @param {Object} step - Step atual na barra de progresso em pagamento
 * @returns {void} Está função não retorna valor
 */
function progress_bar_function({step}) {
  return (
      <div>
          <div className="position-relative m-4">
              <div className="progress" style={{ height: '1px' }}>
                  <div className="progress-bar bg-neon-carrot-800" role="progressbar" style={{ width: (step * 25) + '%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <button type="button" className={`position-absolute top-0 start-0 translate-middle btn btn-sm rounded-pill ${(step >= 0) ? 'btn-bolas-ativa' : 'btn-bolas-desativo'}`} style={{ width: '2.5rem', height: '2.5rem', transition: 'width 0.8s ' }}>
                  <svg className="path_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>

              </button>
              <button type="button" className={`position-absolute top-0 start-25 translate-middle btn btn-sm rounded-pill ${(step >= 1) ? 'btn-bolas-ativa' : 'btn-bolas-desativo'}`} style={{ width: '2.5rem', height: '2.5rem', transition: 'border 0.8s' }}>
                  <svg className="path_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                  </svg>
              </button>
              <button type="button" className={`position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill ${(step >= 2) ? 'btn-bolas-ativa' : 'btn-bolas-desativo'}`} style={{ width: '2.5rem', height: '2.5rem', transition: 'border 0.8s, color: 0.8s' }}>
                  <svg className="path_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
              </button>
              <button type="button" className={`position-absolute top-0 start-75 translate-middle btn btn-sm  rounded-pill ${(step >= 3) ? 'btn-bolas-ativa' : 'btn-bolas-desativo'}`} style={{ width: '2.5rem', height: '2.5rem', transition: 'border 1s, color: 1s' }}>
                  <svg fill="#000000"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 236.764 236.764" >
                    <path d="M110.035,151.039c0.399,3.858,3.655,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231 l-3.458-33.468c-0.426-4.121-4.11-7.114-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L110.035,151.039z"></path>
                    <path d="M156.971,157.729c0.262,0.027,0.522,0.04,0.78,0.04c3.795,0,7.052-2.872,7.451-6.73l3.458-33.468 c0.426-4.121-2.569-7.806-6.689-8.231c-4.121-0.419-7.806,2.569-8.231,6.689l-3.458,33.468 C149.855,153.618,152.85,157.303,156.971,157.729z"></path> <path d="M98.898,190.329c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.801,0,23.216-10.417,23.216-23.221C122.114,200.743,111.699,190.329,98.898,190.329z M98.898,221.764 c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215 C107.114,218.076,103.428,221.764,98.898,221.764z"></path>
                    <path d="M176.339,190.329c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.415,23.221,23.216,23.221 c12.802,0,23.218-10.417,23.218-23.221C199.557,200.743,189.141,190.329,176.339,190.329z M176.339,221.764 c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215 C184.557,218.076,180.87,221.764,176.339,221.764z"></path>
                    <path d="M221.201,84.322c-1.42-1.837-3.611-2.913-5.933-2.913H65.773l-6.277-24.141c-0.86-3.305-3.844-5.612-7.259-5.612h-30.74 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.941l6.221,23.922c0.034,0.15,0.073,0.299,0.116,0.446l23.15,89.022 c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.211-89.25 C223.111,88.55,222.621,86.158,221.201,84.322z M186.258,170.659H88.982l-19.309-74.25h135.894L186.258,170.659z"></path>
                    <path d="M106.603,39.269l43.925,0.002L139.06,50.74c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197 c1.919,0,3.839-0.732,5.303-2.197l24.263-24.263c2.929-2.929,2.929-7.678,0-10.606l-24.28-24.28c-2.929-2.929-7.678-2.929-10.607,0 c-2.929,2.929-2.929,7.678,0,10.607l11.468,11.468l-43.907-0.002h0c-4.142,0-7.5,3.358-7.5,7.5 C99.104,35.911,102.461,39.269,106.603,39.269z"></path></svg>
              </button>
              <button type="button" className={`position-absolute top-0 start-100 translate-middle btn btn-sm  rounded-pill ${(step >= 4) ? 'btn-bolas-ativa' : 'btn-bolas-desativo'}`} style={{ width: '2.5rem', height: '2.5rem', transition: 'border 2s, color: 1s' }}>
              <svg className="path_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                  </svg>
              </button>

          </div>
      </div>
  )
}

export default progress_bar_function

{/**


*/}