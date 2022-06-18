import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
//Screen
import PrivateScreen from './components/auth-screens/PrivateScreen';
import LoginScreen from './components/auth-screens/LoginScreen';
import RegisterScreen from './components/auth-screens/RegisterScreen';
import Layout from './components/src/Layout';
import Profile from './components/src/Profile';
import Product from './components/src/Product';
import Home from './components/src/Home';
import AddProduct from './components/src/AddProduct';
import ProductList from './components/src/ProductList.js';
import ProductUpdate from './components/src/ProductUpdate.js';
import ProductDetail from './components/src/ProductDetail.js';
import PublicScreen from './components/auth-screens/PublicScreen';
import Cart from './components/src/Cart.js';
import Buy from './components/src/Buy.js';



const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='/' element={<PublicScreen />}>
        <Route path='home' element={<PrivateScreen />}>
          <Route path='profile' element={<Profile />} />

          <Route path='product' element={<Product />} />

          <Route path='add-product' element={<AddProduct />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='product-update/:id' element={<ProductUpdate />} />
          <Route path='product-detail/:id' element={<ProductDetail />} />

          <Route path='cart/:id' element={<Cart />} />
          <Route path='buy/:id' element={<Buy />} />
          <Route path='' element={<Home />} />
        </Route>

        <Route path='' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='product-detail/:id' element={<ProductDetail />} />

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
