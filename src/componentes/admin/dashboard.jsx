import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduto, addProdutoServer, deleteProdutoServer, updateProdutoServer } from '../../redux/produtos/ProdutosSlice';

import * as Yup from 'yup';
import { productSchema } from './ProdutoSchema';


function Dashboard() {

    const handleRegister = () => {
        console.log('teste');
    }

    const dispatch = useDispatch();
    const produtosLoja = useSelector((rootReducer) => rootReducer.produtosSlice.entities);
    const status = useSelector((rootReducer) => rootReducer.produtosSlice.status);
    const error = useSelector((rootReducer) => rootReducer.produtosSlice.error);

    useEffect(() => {
        if (status === 'not_loaded') {
          dispatch(fetchProduto());
        }
    }, [status, dispatch]);

    const [formData, setFormData] = useState({
        nome: '',
        imgUrl: '/img/food.jpg',
        preco: 0,
        descricao: '',
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await productSchema.validate(formData, { abortEarly: false });
            dispatch(addProdutoServer(formData));
            setFormData({ nome: '', imgUrl: '/img/food.jpg', preco: 0, descricao: '' });
            setErrors({});
        } catch (error) {
            const newErrors = {};
            error.inner.forEach(err => {
            newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };
    
    const handleRemoveProduct = (product) => {
        dispatch(deleteProdutoServer(product));
    };
    
    const handleUpdateProduct = (product) => {
        const updatedProduct = { id: product.id, name: 'Updated Product', price: 99.99 };
        dispatch(updateProdutoServer(updatedProduct));
    };



    return(
        <>
            {/* Criar Produto */}
            <div className="modal fade" id="criarProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="criarProdutoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="criarProdutoLabel">Criar Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Produto"></input>
                                </div>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" id="preco" name="preco" value={formData.preco} onChange={handleChange} step="any" min="0.1" placeholder="Preço do Produto"></input>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputImg" className="form-label">Imagem do Produto</label>
                                    <input type="file" className="form-control" id="inputImg"></input>
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="5" placeholder="Descrição do Produto"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-tacao" onClick={handleAddProduct}>Adicionar produto</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Atualizar Produto/Deletar Produto */}
            <div className="modal fade" id="atualizar/deletarProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="atualizar/deletarProdutoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="atualizar/deletarProdutoLabel">Atualizar Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <input className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Escreva para pesquisar nome do Produto..."></input>
                                </div>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" id="preco" name="preco" value={formData.preco} onChange={handleChange} step="any" min="0.1" placeholder="Preço do Produto"></input>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputImg" className="form-label">Imagem do Produto</label>
                                    <input type="file" className="form-control" id="inputImg"></input>
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} rows="5" placeholder="Descrição do Produto"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-tacao" data-bs-toggle="modal" data-bs-dissmis="modal" data-bs-target="#listarProduto">Voltar</button>
                            <button type="button" className="btn btn-brick-red">Deletar</button>
                            <button type="button" className="btn btn-tacao">Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Listar Produto */}
            <div className="modal fade" id="listarProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="listarProdutoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="listarProdutoLabel">Listar Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col">
                                {Object.values(produtosLoja).map((item) => (
                                    <div key="item.id" className="row d-flex">
                                        <div className="card w-100">
                                            <div className="card-body d-flex justify-content-between">
                                                <h5 className="card-title">{item.nome}</h5>
                                                <div className="d-flex justify-content-btween align-items-center">
                                                    <button type="button" className="btn btn-tacao" data-bs-toggle="modal" data-bs-dissmis="modal" data-bs-target="#atualizar/deletarProduto">Info</button>
                                                    {/* Fazer um jeito de preencher o formulario com as informações no clique 
                                                        onClick={setFormData({ nome: item.nome, imgUrl: '/img/food.jpg', preco: item.preco, descricao: item.descricao })}
                                                        React não deixou eu fazer
                                                    */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-tacao">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <button type="button" data-bs-toggle="modal" data-bs-target="#criarProduto"
                    className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                >Criar produto</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#atualizar/deletarProduto"
                    className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                >Atualizar/Deletar produto</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#listarProduto"
                    className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                >Listar produto</button>
                <button type="button"
                    className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                >Listar Cliente</button>
            </div>
        </>

    );
}

export default Dashboard;
