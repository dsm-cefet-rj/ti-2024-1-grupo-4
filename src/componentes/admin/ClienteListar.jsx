import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function ClienteListar({ user }) {
    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        id: user.id,
        nome: user.nome,
        email: user.email
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
                        <h5 className="card-title">{user.nome}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+user.id} aria-expanded="false" aria-controls={user.id}>Mostrar mais</button>             
                        </div>
                    </div>
                    <div class="collapse" id={user.id}>
                        <div class="card card-body">
                            <label htmlFor="nome">Nome do Cliente</label>
                            <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Cliente" disabled></input>

                            <label htmlFor="email">E-mail do Cliente</label>
                            <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} step="any" min="0.1" placeholder="E-mail do Cliente" disabled></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ClienteListar;