import React, { useEffect, useState }  from 'react';
import food from '../../assets/img/food.jpg';
import categ from '../data/categ.json'

const Cards_home = () => {
        const [items, setItems] = useState([]);
    
        useEffect(() => {
            setItems(categ);
        }, []);
    
  return (
    <div>
        <body className="bg-banana-mania py-4 px-2">
                <main>
                    <section className="container-fluid bg-banana-mania m-0">
                        <h2 className="mb-4">Categoria1</h2>
                        <div className="row g-3">
                            {items.map((item) => (
                                <div className="col-md-4 d-flex">
                                    <div className="card">
                                        <img className="card-img-top" src={food} alt=""></img>
                                        <div className="card-body d-flex flex-column justify-content-between align-items-stretch">
                                            <h5 className="card-title">{item.nome}</h5>
                                            <p className="card-text">{item.descricao}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">R${item.preco}</small>
                                                <button type="button" className="btn btn-primary bg-equator ">Adicione</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </body>
    </div>
  )
}

export default Cards_home