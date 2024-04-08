import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Login_page from '../componentes/Login/Login'

function Login(){
    return(
        <>
        <div className = 'd-block align-items-center min-vh-100 sticky'>
            <Header/>
            <Login_page/>
            <Footer/>

        </div>
        </>
    )
}

export default Login