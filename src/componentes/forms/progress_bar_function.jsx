import React from 'react'
import './botao.scss'



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
                  <svg className="path_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                  </svg>
              </button>
              <button type="button" className={`position-absolute top-0 start-100 translate-middle btn btn-sm  rounded-pill ${(step >= 4) ? 'btn-bolas-ativa' : 'btn-bolas-desativo'}`} style={{ width: '2.5rem', height: '2.5rem', transition: 'border 2s, color: 1s' }}>
                  <svg fill="#000000" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM22.386 10.146l-9.388 9.446-4.228-4.227c-0.39-0.39-1.024-0.39-1.415 0s-0.391 1.023 0 1.414l4.95 4.95c0.39 0.39 1.024 0.39 1.415 0 0.045-0.045 0.084-0.094 0.119-0.145l9.962-10.024c0.39-0.39 0.39-1.024 0-1.415s-1.024-0.39-1.415 0z"></path></svg>
              </button>
          </div>
      </div>
  )
}

export default progress_bar_function