
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ProductListPage from './pages/products/ProductList';
import ProductDetailPage from './pages/products/ProductDetail';
import ProductFormPage from './pages/products/ProductForm';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Notification } from './components/common/Notification';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/add" element={<ProductFormPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="products/:id/edit" element={<ProductFormPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Notification />
    </>
  );
}

