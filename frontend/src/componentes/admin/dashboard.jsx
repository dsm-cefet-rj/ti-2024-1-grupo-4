import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduto, addProdutoServer, deleteProdutoServer, updateProdutoServer } from '../../redux/produtos/ProdutosSlice';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { productSchema } from './ProdutoSchema';
import {fetchPedido} from '../../redux/listapedidos/ListaPedidoSlice'
import ProdutoItemDelete from './ProdutoItemDelete';
import ProdutoItemUpdate from './ProdutoItemUpdate';
import { fetchUser } from '../../redux/user/UserSlice';
import ClienteListar from './ClienteListar';
import rootReducer from '../../redux/root-reducer';
import PedidosListar from './PedidosListar';

/**
 * @module admin/dashboard
 */

/**
 * @function
 * @description Função para a impressão da página dashboard (admin)
 * 
 * @returns {void} Está função não retorna valor
 */
function Dashboard() {

    const handleRegister = () => {
        console.log('teste');
    }

    const dispatch = useDispatch();
    const produtosLoja = useSelector((rootReducer) => rootReducer.produtosSlice.produtosLoja);
    const users = useSelector((rootReducer) => rootReducer.userSlice.entities);
    const pedidos = useSelector((rootReducer)=> rootReducer.pedidoSlice.pedidosAdmin);
    const statusProdutos = useSelector((rootReducer) => rootReducer.produtosSlice.status);
    const statusClientes = useSelector((rootReducer) => rootReducer.userSlice.status);
    const statusPedidos = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
    const error = useSelector((rootReducer) => rootReducer.produtosSlice.error);
    
    useEffect(() => {
        if (statusProdutos === 'not_loaded' || statusProdutos === 'updated'  || statusProdutos === 'saved' || statusProdutos === 'deleted'  )
            dispatch(fetchProduto());
        if ((statusPedidos === 'not_loaded' || statusPedidos === 'saved' || statusPedidos === 'deleted')) {
              dispatch(fetchPedido());
        }
    }, [statusProdutos, dispatch, statusPedidos]);

    const [img, setImg] = useState("/img/food.jpg");

    const [formData, setFormData] = useState({
        nome: '',
        imgUrl: img,
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
            setFormData({ nome: '', imgUrl: img, preco: 0, descricao: '' });
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
            });
            setErrors(newErrors);
        }
    };
    const handleListarClientes =  (e) => {
        e.preventDefault();

            dispatch(fetchUser());

    }
    const handleListarPedidos =  (e) => {
        e.preventDefault();

            dispatch(fetchPedido());
   
    }

    async function handleImageChange(event) {
        const inputFile = document.querySelector("#ft_input");
        const pictureImage = document.querySelector(".ft_input");
        const pictureImgTxt = "Escolha uma Imagem";

        if(!inputFile || !pictureImage) {
            throw new Error(
                "DOM elements not found. #ft_input e .ft_image não existem."
            );
        }

        const file = event.target.files[0];

        if(file.size > 50000) {
            toast.warning("Tamanho do arquivo excede 50KB", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 4000,
            });
        }

        if(file) {
            const reader = new FileReader();

            try {
                const imageData = await new Promise((resolve, reject) => {
                    reader.addEventListener("load", () => resolve(reader.result));
                    reader.addEventListener("error", reject);
                    reader.readAsDataURL(file);
                });

                pictureImage.innerHTML = ""; //Imagem DEFAULT
                const img = document.createElement("img");
                img.src = imageData;
                img.classList.add("ft_img");
                pictureImage.appendChild(img);
                setImg(img.src);
                console.log(img.src);
                setFormData({
                    ...formData,
                    ["imgUrl"]: img.src,
                });
            } catch (error) {
                console.error("Error loading image: ", error);
                pictureImage.innerHTML = pictureImgTxt;
            }
        } else {
            pictureImage.innerHTML = pictureImgTxt;
        }
        inputFile.addEventListener("change", handleImageChange);
    }


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
                                    <label htmlFor="ft_input" className="form-label">Imagem do Produto</label>
                                    <input type="file" className="form-control ft_input" id="ft_input" accept='image/' onChange={handleImageChange}></input>
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="5" placeholder="Descrição do Produto"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-verde-certo" onClick={handleAddProduct}>Adicionar produto</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Atualizar Produto */}
            <div className="modal fade" id="atualizarProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="atualizarProdutoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="atualizarProdutoLabel">Atualizar Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col">
                                {Object.values(produtosLoja).map((item) => (
                                    <ProdutoItemUpdate produto={item}/>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Deletar Produto */}
            <div className="modal fade" id="deletarProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deletarProdutoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deletarProdutoLabel">Deletar Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col">
                                {Object.values(produtosLoja).map((item) => (
                                    <ProdutoItemDelete produto={item}/>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Listar Clientes*/}
            <div className="modal fade" id="listarClientes" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="listarClientesLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="listarClientesLabel">Listar Clientes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button> 
                        </div>
                        <div className="modal-body">
                            <div className="col">
                                {Object.values(users).map((item) => (
                                    <ClienteListar key = {item.id} user={item}/>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Listar Pedidos*/}
            <div className="modal fade" id="listarPedidos" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="listarPedidosLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="listarPedidosLabel">Listar Pedidos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className="col">
                                {Object.values(pedidos).map((pedido) => (
                                    <PedidosListar key = {pedido.id} pedido={pedido}/>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className='row justify-content-center'>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#criarProduto"
                        className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                    >Criar produto</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#atualizarProduto"
                        className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                    >Atualizar produto</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#deletarProduto"
                        className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                    >Deletar produto</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#listarClientes"
                        className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                        onClick={handleListarClientes}
                    >Listar Cliente</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#listarPedidos"
                        className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
                        onClick={handleListarPedidos}
                    >Listar Pedidos</button>      
                </div>
            </div>
        </>

    );
}

export default Dashboard;
