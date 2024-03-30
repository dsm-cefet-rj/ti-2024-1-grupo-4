import { createContext, useState } from "react";
import itemsLoja from '../componentes/data/itemsLoja.json';

export const CarrinhoContext = createContext(null)

function getCarrinhoDefault() {
    let carrinho = {}
    for (let i = 1; i < itemsLoja.length + 2; i++) { /* +2 no lenght pq não estava pegando o ultimo produto */
        carrinho[i] = 0;
    }
    return carrinho;
}



export function CarrinhoProvider(props) {
    const [itemsCarrinho, setItemsCarrinho] = useState(getCarrinhoDefault());

    function addToCarrinho(itemId) {
        setItemsCarrinho((prev)=>({...prev, [itemId]: prev[itemId] + 1}))
    }

    function removeFromCarrinho(itemId) {
        setItemsCarrinho((prev)=>({...prev, [itemId]: prev[itemId] - 1}))
    }

    const contextValue = {itemsCarrinho, addToCarrinho, removeFromCarrinho}
    
    return <CarrinhoContext.Provider value={contextValue}>
        {props.children}
    </CarrinhoContext.Provider>
}