import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='mt-5'>
      <nav class="navbar fixed-bottom align-items-center navbar-light bg-light">
        <div class="container-fluid d-flex justify-content-center">
         <Link to={"/"} className='nav-link'> <a class="navbar-brand" href="#">
            Feito com amor &#128150;
            </a></Link>
        </div>
      </nav>
    </div>
  )
}

export default Footer