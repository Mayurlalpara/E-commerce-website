import './App.css'
import Navbar from './Components/Navbar/Navbar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './pages/Shop.jsx';
import Shopcategory from './pages/Shopcategory.jsx';
import Product from './pages/Product.jsx';
import Loginsighnup from './pages/Loginsighnup.jsx';
import Cart from './pages/Cart.jsx';
function App() {

  return (
    <>
      <div>
        <BrowserRouter>
       
        <Navbar></Navbar>
        <Routes>
        <Route path='/' element={<Shop></Shop>}/>
          <Route path='/mens' element={<Shopcategory category="men"/>}/>
          <Route path='/womens' element={<Shopcategory category="women"/>}/>
          <Route path='/kids' element={<Shopcategory category="kids"/>}/>
          <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Loginsighnup/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
