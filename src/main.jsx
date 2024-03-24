import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home_page from './pages/Home_page.jsx';
import Login_page from './componentes/Login/Login.jsx';
import Register_page from './componentes/cadastro/cadastro.jsx';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
      path: "Home",
      element: <Home_page/>,
  },
  {
    path: "Login",
    element: <Login_page/>,
  },
  {
    path: "Cadastro",
    element: <Register_page/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
