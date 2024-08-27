import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deletePedidoServer, updatePedidoServer } from '../../redux/listapedidos/ListaPedidoSlice';
import { fetchEntregaByPedido } from '../../redux/entrega/entregaSlice.js';
/**
 * @module admin/PedidosListar
 */

/**
 * Tipo da entidade 'pedido'
 * @typedef {Object} pedido
 * @property {string} id - id do pedido
 * @property {string} endereco - endereco para envio do pedido
 * @property {Array} products - lista dos produtos no pedido
 * @property {Object} pagamento - forma de pagamento do pedido
 * @property {number} valorTotal - valor total do pedido
 * @property {Object} status - status do pedido
 */
/**
 * @function
 * @description Função para a impressão da lista de todos os pedidos efetuados na loja
 * 
 * @param {pedido} pedido 
 * @returns 
 */
function PedidosListar({ pedido }) {
    const dispatch = useDispatch();
    const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
    const entrega = useSelector((rootReducer) => rootReducer.entregaSlice.entrega[pedido.id]);

    useEffect(() => {
        if (!entrega || (status === 'not_loaded' || status === 'saved' || status === 'deleted')) {
          dispatch(fetchEntregaByPedido(pedido.id));
        }
    }, [status, dispatch, pedido.id]);
    const handleDelete = () => {
        dispatch(deletePedidoServer(pedido.id))
            .then((result) => {
                if (result.payload) {
                    toast.info("Pedido deletado!", {
                        position: "bottom-left",
                        className: "text-spicy-mix bg-banana-mania shadow",
                        autoClose: 2000,
                    });
                }
            })
            .catch((error) => {
                toast.error("Erro: " + error, {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 2000,
                });
            });
    };

    const updateStatus = (value) => {
        const id = pedido.id;
        const user = pedido.user;
        const endereco = entrega.endereco;
        const products = pedido.products;
        const pagamento = pedido.pagamento;
        const valorTotal = pedido.valorTotal;
        const status = entrega.status;
        dispatch(updatePedidoServer({id, user, endereco, products, pagamento, valorTotal, status}))
    }
    


    return (
        <>
            <div key={pedido.id} className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">Pedido id: {pedido.id}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button className="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#" + pedido.id} aria-expanded="false" aria-controls={pedido.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-brick-red" onClick={handleDelete}>Deletar</button>
                        </div>
                    </div>
                    <div className="collapse" id={pedido.id}>
                        <div className="card card-body">
                            <span>Nome do Cliente: {pedido.user.nome} </span>
                            <span>Valor total: {pedido.valorTotal.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}</span>

                            {entrega ? (
                                <>
                                <span>CEP: {entrega.endereco.CEP}</span>
                                <span>Local: {entrega.endereco.logradouro}, {entrega.endereco.numeroEndereco}</span>
                                <span>Bairro: {entrega.endereco.bairro}</span>
                                {entrega.endereco.complemento ? (<span>Complemento: {entrega.endereco.complemento}</span>) : null}
                                
                                {entrega.instrucoes ? ( <span>Instruções: {entrega.instrucoes}</span>): null}
                                </>
                            ) : (
                                <span>Carregando informações de entrega...</span>
                            )}
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                                <select className="form-select" id="inputGroupSelect01" value={status} onChange={(e) => updateStatus(e.target.value)}>
                                    <option value="Avaliando Pedido">Avaliando Pedido</option>
                                    <option value="Pedido Aceito">Pedido Aceito</option>
                                    <option value="Sendo Preparado">Sendo Preparado</option>
                                    <option value="Saiu para entrega">Saiu para entrega</option>
                                    <option value="Pedido Finalizado">Pedido finalizado</option>
                                    <option value="Pedido Finalizado">Pedido Cancelado</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PedidosListar;