import { useState } from 'react'
import './App.css'
import Header from './componentes/Header/Header'
import Home from './componentes/Home/Home'
import About from './componentes/about/About'
import Footer from './componentes/Footer/Footer'
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
