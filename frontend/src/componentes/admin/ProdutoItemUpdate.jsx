import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProdutoServer } from '../../redux/produtos/ProdutosSlice';
import { productSchema } from './ProdutoSchema';
import { toast } from 'react-toastify';

/**
 * @module admin/ProdutoItemUpdate
 */
/**
 * Tipo da entidade 'produto'
 * @typedef {Object} produto
 * @property {string} id - id do produto
 * @property {string} nome - nome do produto
 * @property {string} descricao - descrição do produto
 * @property {number} preco - preço do produto
 */
/**
 * @function
 * @description Função que recebe um objeto produto, imprime o produto e suas informações e permite sua atualização
 * 
 * @param {produto} produto 
 * @returns {void} Está função não retorna valor
 */
function ProdutoItemUpdate({ produto }) {
    const dispatch = useDispatch();
    const produtosLoja = useSelector((rootReducer) => rootReducer.produtosSlice.entities);
    const status = useSelector((rootReducer) => rootReducer.produtosSlice.status);
    const error = useSelector((rootReducer) => rootReducer.produtosSlice.error);

    const [errors, setErrors] = useState({});

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await productSchema.validate(formData, { abortEarly: false });
            dispatch(updateProdutoServer(formData));
            setErrors({});
        } catch (error) {
            const newErrors = {};
            error.inner.forEach(err => {
                newErrors[err.path] = err.message;
                toast.error("ERROR no campo "+err.path+": "+err.message, {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 4000,
                });
            })
            setErrors(newErrors);
        }
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
                            <button className="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+produto.id} aria-expanded="false" aria-controls={produto.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-verde-certo" onClick={handleUpdate}>Atualizar</button>                  
                        </div>
                    </div>
                    <div className="collapse" id={produto.id}>
                        <div className="card card-body">
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