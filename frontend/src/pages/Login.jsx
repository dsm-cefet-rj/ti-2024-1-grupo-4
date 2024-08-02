import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Login_page from '../componentes/Login/Login'
/**
 * Retorna a página Login
 * 
 */
function Login() {
    return (
        <>
            <div className='position-relative'>
                <Header />
                <Login_page />
                <Footer />

            </div>
        </>
    )
}

export default Login