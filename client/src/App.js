import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home"
import { Container } from 'react-bootstrap';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <ToastContainer/>
    <main className='py-3'>
<Container>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:id' element={<SingleProduct/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/shipping' element={<Shipping/>}/>





  </Routes>
</Container>
    </main>
    <Footer/>
    </BrowserRouter>
   
    </>
  );
}

export default App;
