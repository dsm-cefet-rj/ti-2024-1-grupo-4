import React from 'react'
import ReactDOM from 'react-dom/client' 
//import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home_page from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Cadastro.jsx'
import Pedido from './pages/Pedido.jsx'
import Admin_Page from './pages/Admin_Page.jsx'

import HistoricoPedido from './pages/HistoricoPedido.jsx'
import Usuario from './pages/Usuario.jsx'

import {Provider} from "react-redux";
import {store , persistor} from "./redux/store";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

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
    element: <Login/>,
  },
  {
    path: "Cadastro",
    element: <Registro/>,
  },
  {
    path:"Pedido",
    element:<Pedido/>,
  },
  {
    path:"admin",
    element:<Admin_Page/>,
  },
  {
    path: "historico",
    element: <HistoricoPedido/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
      <Provider store = {store} persistor={persistor}>
        <ToastContainer limit={4} newestOnTop={true}/>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
)
