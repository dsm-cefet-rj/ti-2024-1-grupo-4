import React from 'react'
import Header from '../componentes/header/Header'
import Footer from '../componentes/footer/Footer'
import Dashboard from '../componentes/admin/dashboard'

function Admin_Page() {
    return (
        <>
            <div className='d-block align-items-center min-vh-100 sticky'>
                <Header />
                <div className='' >

                    <Dashboard />
                </div>

                <Footer />

            </div>
        </>
    )
}

export default Admin_Page