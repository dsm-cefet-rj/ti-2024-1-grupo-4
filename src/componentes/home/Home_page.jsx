import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from '../header/Header.jsx';
import Card from '../cards/Cards_home.jsx';
import itemsLoja from '../data/itemsLoja.json';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import rootReducer from '../../redux/root-reducer.js';
import CartItem from '../cartItem/cartItem.jsx';
import Footer from '../footer/Footer.jsx';

import { selectProductsTotalPrice } from '../../redux/cart/cart.selector.js'; //c
import { selectProductsCount } from '../../redux/cart/cart.selector.js';


function Home_Page() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(itemsLoja);
    }, []);

    const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

    const productsTotalPrice = useSelector(selectProductsTotalPrice);
    const productsCount = useSelector(selectProductsCount);



    return (
        <>
        
            {/* Header */}
            <div className="sticky-top p-2 px-4 shadow-sm bg-tacao d-flex align-items-center justify-content-between gap-2">
                <Header></Header>
                <button type="button" className="btn btn-outline-banana-mania text-brick-red" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_15_35)"> <rect width="24" height="24"></rect> <path d="M5.33331 6H19.8672C20.4687 6 20.9341 6.52718 20.8595 7.12403L20.1095 13.124C20.0469 13.6245 19.6215 14 19.1172 14H16.5555H9.44442H7.99998" stroke="#000000" strokeLinejoin="round"></path> <path d="M2 4H4.23362C4.68578 4 5.08169 4.30341 5.19924 4.74003L8.30076 16.26C8.41831 16.6966 8.81422 17 9.26638 17H19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="10" cy="20" r="1" stroke="#000000" strokeLinejoin="round"></circle> <circle cx="17.5" cy="20" r="1" stroke="#000000" strokeLinejoin="round"></circle> </g> <defs> <clipPath id="clip0_15_35"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                    ({productsCount})
                </button>
            </div>
            
            {/* Carrinho */}
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
                        <h5>{productsTotalPrice.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}</h5>
                    </div>
                    <Link to = "/pedido">
                        <span className="btn btn-brick-red w-100">Confirmar</span>
                    </Link>
                </div>
            </div>
            
            
            <div>
                {/* Loja */}
                <div className="bg-banana-mania py-4 px-2">
                    <main>
                        <section className="container-fluid m-0">
                            <h2 className="mb-4 text-left">Loja</h2>
                            <div className="row g-3">
                                {items.map((item) => (
                                    <div key="item.id" className="col-md-4 col-lg-3 d-flex">
                                        <Card {...item} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
            
            <Footer></Footer>
        </>
    );
}
export default Home_Page;