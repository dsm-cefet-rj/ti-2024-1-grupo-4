import { useState } from 'react'
import './App.css'
import Header from './componentes/header/Header'
import Home from './componentes/home/Home'
import About from './componentes/about/About'
import Footer from './componentes/footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'; 


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Header/>
      <Home/>
      <About/>
      <Footer/>
      </div>
    </>
  )
}

export default App
