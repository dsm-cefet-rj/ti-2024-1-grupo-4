import React from 'react'
import ReactDOM from 'react-dom/client' 
import Home_page from './pages/Home_page.jsx';
import Login_page from './componentes/Login/Login.jsx';
import Register_page from './componentes/cadastro/cadastro.jsx';
import App from './App.jsx';


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
    path:"app",
    element:<App/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CarrinhoProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </CarrinhoProvider>,
)
