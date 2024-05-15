import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Perfil_Usuario from '../componentes/perfil_usuario/perfil_usuario'

function Usuario() {
    return (
        <>
            <div className='d-block align-items-center min-vh-100 sticky'>
                <Header />
                <Perfil_Usuario />
                <Footer />

            </div>
        </>
    )
}

export default Usuario