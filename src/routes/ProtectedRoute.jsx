
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../store/slices/authSlice';
import { Layout } from '../components/layout/Layout';

export function ProtectedRoute() {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

