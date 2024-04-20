import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Perfil_Usuario from '../componentes/perfil_usuario/perfil_usuario'

function Usuario(){
    return(
        <>
        <div className='position-relative'>
            <Header/>
            <Perfil_Usuario/>
            <Footer/>

        </div>
        </>
    )
}

export default Usuario