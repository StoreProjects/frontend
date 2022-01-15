import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// SCREENS
import CartScreen from './pages/cart/pages/CartScreen';
import HomeScreen from './pages/home/pages/HomeScreen';
import LoginScreen from './pages/login/pages/LoginScreen';
import PlaceOrderScreen from './pages/order/pages/PlaceOrderScreen';
import PaymentScreen from './pages/payment/pages/PaymentScreen';
import ProductScreen from './pages/product/pages/ProductScreen';
import RegisterScreen from './pages/register/pages/RegisterScreen';
import ShippingScreen from './pages/shipping/pages/ShippingScreen';
import { Navbar } from './shared/navbar/Navbar';
// REACT-TOASTIFY
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetailScreen from './pages/order/pages/OrderDetailScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Navbar /> } >
          <Route index element={ <HomeScreen /> } />
          <Route path='/login' element={ <LoginScreen /> } />
          <Route path='/register' element={ <RegisterScreen /> } />
          <Route path='/explorer' element={<div>explorer works!</div>} />
          <Route path='/product/:id' element={ <ProductScreen /> } />
          <Route path='/cart'>
            <Route path=':id' element={ <CartScreen /> } />
            <Route path="" element={ <CartScreen /> } />
          </Route>
          <Route path='/shipping' element={ <ShippingScreen /> } />
          <Route path='/payment' element={ <PaymentScreen /> } />
          <Route path='/placeOrder' element={ <PlaceOrderScreen /> } />
          <Route path='/orderDetail/:id' element={ <OrderDetailScreen /> } />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App;
