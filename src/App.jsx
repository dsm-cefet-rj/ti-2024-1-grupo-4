import Header from './componentes/header/Header'
import Home from './componentes/home/Home'
import About from './componentes/about/About'
import Footer from './componentes/footer/Footer'
import '../scss/custom.scss';

function App(){
  return (
    <>
      <div>
      <Header/>
      <Home/>
      <About/>
      <Footer/>
      </div>
    </>
  )}
export default App
