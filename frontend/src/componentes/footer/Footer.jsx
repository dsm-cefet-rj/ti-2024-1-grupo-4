import React from 'react'
import { Link } from 'react-router-dom';

/**
 * @module footer/Footer
 */
/**
 * @function
 * @description Função para imprimir o footer da página
 * 
 * @returns {void} Está função não retorna valor
 */
const Footer = () => {
  return (
    <div className='mt-5'>
      <nav className="navbar fixed-bottom align-items-center navbar-light shadow-lg bg-tacao-500">
        <div className="container-fluid d-flex justify-content-center">
         <Link to={"/"} className='nav-link'>
            Feito com amor &#128150;
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Footer