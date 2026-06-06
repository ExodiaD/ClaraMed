import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

/**
 * Tela de login da equipe médica.
 * Sprint 3: Login mockado (sem JWT).
 */
export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { login, erro } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    // Simula delay de rede
    await new Promise((r) => setTimeout(r, 800));

    const sucesso = login(email, senha);
    setCarregando(false);

    if (sucesso) {
      navigate('/painel');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8 fade-in">
          {/* Branding */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/20">
              <span className="text-4xl">👨‍⚕️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Acesso da Equipe
              </h2>
              <p className="text-text-secondary text-sm mt-1">
                Entre com suas credenciais para acessar o painel
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
            {/* Erro */}
            {erro && (
              <div className="slide-up p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm text-center flex items-center justify-center gap-2">
                <span>⚠️</span>
                <span>{erro}</span>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">📧</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@claramed.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-lighter/50 border border-surface-lighter text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label htmlFor="senha" className="block text-sm font-medium text-text-secondary">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">🔒</span>
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-surface-lighter/50 border border-surface-lighter text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors text-lg cursor-pointer"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              disabled={carregando}
              className="
                w-full py-3.5 rounded-xl font-semibold text-white text-base
                bg-gradient-to-r from-primary to-accent
                hover:shadow-lg hover:shadow-primary/30
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
                cursor-pointer
              "
            >
              {carregando ? (
                <>
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <span>🔑</span>
                  Entrar
                </>
              )}
            </button>
          </form>

          {/* Dica de credenciais mockadas */}
          <div className="glass-card-light p-4 text-center text-xs text-text-muted space-y-1">
            <p className="font-medium text-text-secondary">🧪 Ambiente de teste</p>
            <p>E-mail: <span className="text-primary-light font-mono">medico@claramed.com</span></p>
            <p>Senha: <span className="text-primary-light font-mono">123456</span></p>
          </div>
        </div>
      </main>
    </div>
  );
}
