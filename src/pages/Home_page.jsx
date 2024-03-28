import React from 'react';
import'../../scss/custom.scss';
import'../../scss/pages/home/_home.scss';
import Header from '../componentes/Header/Header';
import Cards_home from '../componentes/cards/Cards_home';

function Home_page() {

    return(
        <>
           <Header></Header>
           <Cards_home></Cards_home>
           
        </>
    );
}

export default Home_page