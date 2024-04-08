import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Register_page from '../componentes/cadastro/cadastro'

function Registro(){
    return(
        <>
        <div className = 'd-block align-items-center min-vh-100 sticky'>
            <Header/>
            <Register_page/>
            <Footer/>

        </div>
        </>
    )
}

export default Registro