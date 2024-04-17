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
            <div key="item.id" className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{produto.nome}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+produto.id} aria-expanded="false" aria-controls={produto.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-brick-red" onClick={handleUpdate}>Atualizar</button>                  
                        </div>
                    </div>
                    <div class="collapse" id={produto.id}>
                        <div class="card card-body">
                        <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Produto"></input>
                            <input type="number" className="form-control" id="preco" name="preco" value={formData.preco} onChange={handleChange} step="any" min="0.1" placeholder="Preço do Produto"></input>
                            <textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="5" placeholder="Descrição do Produto"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProdutoItemUpdate;