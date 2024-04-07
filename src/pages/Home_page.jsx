import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from '../componentes/Header/Header.jsx';
import Card from '../componentes/cards/Cards_home.jsx';
import itemsLoja from '../componentes/data/itemsLoja.json';

import {CarrinhoContext} from '../context/CarrinhoContext.jsx';


function Home_Page() {
    const [items, setItems] = useState([]);

    const {itemsCarrinho} = useContext(CarrinhoContext);
    var precoTotal = 0;


    useEffect(() => {
        setItems(itemsLoja);
    }, []);


    return(
        <>
            <Header></Header>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvas" /*Parece muito ruim, mas tá bom */>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasLabel">Itens no Carrinho</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-flex flex-column gap-3" /*Itens no carrinho */>
                        {items.map((item) => {
                            if(itemsCarrinho[item.id] > 0) {
                                return (
                                    <div key="item.id" className="d-flex flex-column">
                                        <Card /*Notação de merda */ {...item}/>
                                    </div>
                                )
                            }
                        })}
                        <div className="container-fluid d-flex justify-content-between">
                            <h4>Total</h4>
                            <h5>R$
                            {items.map((item) => {
                                if(itemsCarrinho[item.id] > 0) {
                                    precoTotal+=Number(item.preco * itemsCarrinho[item.id])
                                }
                            })}
                            {precoTotal.toFixed(2)}
                            </h5>
                        </div>
                    </div>
            </div>
            <div className="bg-banana-mania py-4 px-2">
                <main>
                    <section className="container-fluid m-0">
                        <h2 className="mb-4 text-left">Loja</h2>
                        <div className="row g-3">
                            {items.map((item) => (
                                <div key="item.id" className="col-md-4 col-lg-3 d-flex">
                                    <Card /*Notação de merda */ {...item}/> 
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
export default Home_Page;