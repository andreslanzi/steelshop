import DetailsPage from './pages/DetailsPage/DetailsPage';
import { Routes, Route } from 'react-router-dom';
import ProductFormPage from './pages/ProductFormPage';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage/CartPage';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage/LoginPage';
import ProductsPage from './pages/ProductsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import { RequireAuth } from 'react-auth-kit';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Navbar setIsOpen={setIsOpen} />
        <Routes>
          <Route
            path={'/'}
            element={
              <RequireAuth loginPath={'/login'}>
                <ProductsPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/details/:product_id"
            element={
              <RequireAuth loginPath={'/login'}>
                <DetailsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/new"
            element={
              <RequireAuth loginPath={'/login'}>
                <ProductFormPage />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth loginPath={'/login'}>
                <CartPage />
              </RequireAuth>
            }
          />
          <Route
            path="/manage"
            element={
              <RequireAuth loginPath={'/login'}>
                <AdminPage />
              </RequireAuth>
            }
          />
          <Route path="/payment_success" element={<SuccessPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ShoppingCartProvider>
    </QueryClientProvider>
  );
}

export default App;
