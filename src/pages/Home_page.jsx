import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from '../componentes/header/Header.jsx';
import Card from '../componentes/cards/Cards_home.jsx';
import itemsLoja from '../componentes/data/itemsLoja.json';

import { useSelector } from 'react-redux';
import rootReducer from '../redux/root-reducer.js';
import CartItem from '../componentes/cartItem/CartItem.jsx';

function Home_Page() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(itemsLoja);
    }, []);

    const { products } = useSelector((rootReducer) => rootReducer.cartReducer);


    return (
        <>
            <Header></Header>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvas" /*Parece muito ruim, mas tá bom */>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">Itens no Carrinho</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column gap-3" /*Itens no carrinho */>
                    {products.map(product => 
                        <CartItem key={product.id} product={product}/>
                    )}
                    <div className="container-fluid d-flex justify-content-between">
                        <h4>Total</h4>
                        <h5>R$

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
                                    <Card /*Notação de merda */ {...item} />
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