import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente wrapper que protege rotas que exigem autenticação.
 * Se o usuário não está logado, redireciona para /login.
 */
export default function RotaProtegida({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
