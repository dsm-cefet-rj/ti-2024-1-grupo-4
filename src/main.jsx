import React from 'react'
import ReactDOM from 'react-dom/client' 
//import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home_page from './pages/Home_page.jsx';
import Login_page from './componentes/Login/Login.jsx';
import Register_page from './componentes/cadastro/cadastro.jsx';
import Pedido from './pages/Pedido.jsx';
import Progressbar from './componentes/progressbar/progressbar.jsx';
import Teste from './componentes/progressbar/teste_template.jsx'


import { CarrinhoProvider } from './context/CarrinhoContext.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home_page/>,
  },
  {
    path: "Login",
    element: <Login_page/>,
  },
  {
    path: "Cadastro",
    element: <Register_page/>,
  },
  {
    path:"Pedido",
    element:<Pedido/>,
  },
  {
    path:"app2",
    element:<Progressbar/>,
  },
  {
    path:"teste",
    element:<Teste/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CarrinhoProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </CarrinhoProvider>,
)
