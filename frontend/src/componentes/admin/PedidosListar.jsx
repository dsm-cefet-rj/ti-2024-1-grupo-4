import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deletePedidoServer, updatePedidoServer } from '../../redux/listapedidos/ListaPedidoSlice';


function PedidosListar({ pedido }) {
    const dispatch = useDispatch();

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
        const endereco = pedido.endereco;
        const products = pedido.products;
        const pagamento = pedido.pagamento;
        const valorTotal = pedido.valorTotal;
        const status = value
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
                            <span>Valor total: {pedido.valorTotal}</span>
                            <div className="input-group mb-3">
                                <label className="input-group-text" for="inputGroupSelect01">Status</label>
                                <select className="form-select" id="inputGroupSelect01" value={pedido.status} onChange={(e) => updateStatus(e.target.value)}>
                                    <option selected >{pedido.status}</option>
                                    <option value="Avaliando Pedido">Avaliando Pedido</option>
                                    <option value="Pedido Aceito">Pedido Aceito</option>
                                    <option value="Sendo Preparado">Sendo Preparado</option>
                                    <option value="Saiu para entrega">Saiu para entrega</option>
                                    <option value="Pedido Finalizado">Pedido finalizado</option>
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