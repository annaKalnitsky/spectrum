import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList/ProductList';
import CartPage from '././pages/CartPage/CartPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { CartProvider } from './services/functions';
import Menu from './components/header/Menu';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <div>
            <Menu />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
