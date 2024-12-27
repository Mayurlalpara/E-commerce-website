import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop.jsx';
import Shopcategory from './pages/Shopcategory.jsx';
import Product from './pages/Product.jsx';
import Loginsighnup from './pages/Loginsighnup.jsx';
import Cart from './pages/Cart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Return from './Components/Footer/Return.jsx';
import About from './Components/Footer/About.jsx';
import Contact from './Components/Footer/Contact.jsx';
import Exchange from './Components/Footer/Exchange.jsx';
import Payment from './Components/pymentUtil/Payment.jsx';
import Dontshow from './dontshow/Dontshow.jsx';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <Dontshow>
          <Navbar></Navbar>
          </Dontshow>
          <Routes>
            <Route path='/' element={<Shop/>} />
            <Route path='/mens' element={<Shopcategory  category="men" />} />
            <Route path='/womens' element={<Shopcategory category="women" />} />
            <Route path='/kids' element={<Shopcategory category="kid" />} />
            <Route path='/product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Loginsighnup />} />
            <Route path='/return' element={<Return></Return>}></Route>
            <Route path='/About' element={<About></About>}></Route>
            <Route path='/contact' element={<Contact></Contact>}></Route>
            <Route path='/exchange' element={<Exchange></Exchange>}></Route>
            <Route path='/payment' element={<Payment></Payment>}></Route>
          </Routes>
          <Dontshow>
          <Footer></Footer>
          </Dontshow>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
