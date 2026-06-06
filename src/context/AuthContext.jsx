import { createContext, useContext, useState, useCallback } from 'react';
import { CREDENCIAIS_MOCK } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');

  const login = useCallback((email, senha) => {
    setErro('');
    if (
      email === CREDENCIAIS_MOCK.email &&
      senha === CREDENCIAIS_MOCK.senha
    ) {
      const user = {
        email: CREDENCIAIS_MOCK.email,
        nome: CREDENCIAIS_MOCK.nome,
        cargo: CREDENCIAIS_MOCK.cargo,
      };
      setUsuario(user);
      return true;
    }
    setErro('E-mail ou senha inválidos.');
    return false;
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout, erro }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
