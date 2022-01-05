import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CartScreen from './pages/cart/pages/CartScreen';
import HomeScreen from './pages/home/pages/HomeScreen';
import LoginScreen from './pages/login/pages/LoginScreen';
import ProductScreen from './pages/product/pages/ProductScreen';
import RegisterScreen from './pages/register/pages/RegisterScreen';
import { Navbar } from './shared/navbar/Navbar';

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
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;
