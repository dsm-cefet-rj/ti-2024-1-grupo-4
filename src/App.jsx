import Header from './componentes/Header/Header'
import Home from './componentes/Home/Home'
import About from './componentes/about/About'
import Footer from './componentes/Footer/Footer'
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
