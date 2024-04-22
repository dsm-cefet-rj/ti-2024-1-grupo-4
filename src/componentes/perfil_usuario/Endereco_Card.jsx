import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProdutoServer } from '../../redux/produtos/ProdutosSlice';

function ProdutoItemUpdate({ produto }) {
    const dispatch = useDispatch();
    const handleUpdate = () => {
        dispatch(updateProdutoServer(formData))
    }


    const [formData, setFormData] = useState({
        id: produto.id,
        nome: produto.nome,
        imgUrl: '/img/food.jpg',
        preco: produto.preco,
        descricao: produto.descricao,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
           <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div> 
        </>
    );
}
export default ProdutoItemUpdate;