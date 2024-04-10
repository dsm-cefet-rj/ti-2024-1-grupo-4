import React, { useEffect, useState } from 'react';

function Dashboard(){

    const handleRegister = () =>{
        console.log('teste');
    }


    return(
        <div className = "container">
            <button type="button"  
            className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50" 
            >Criar produto</button>
            <button type="button"  
            className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50" 
            >Cadastrar produto</button>
            <button type="button"  
            className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50" 
            >Deletar produto</button>
            <button type="button"  
            className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50" 
            >Listar produto</button>
            <button type="button"  
            className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50" 
            >Listar Cliente</button>
        </div>
    );
}

export default Dashboard;
