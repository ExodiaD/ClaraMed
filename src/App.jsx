import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PacientesProvider } from './context/PacientesContext';
import TelaPaciente from './pages/TelaPaciente';
import TelaLogin from './pages/TelaLogin';
import PainelEquipe from './pages/PainelEquipe';
import RotaProtegida from './components/RotaProtegida';

/**
 * ClaraMed — Aplicação principal.
 * Rotas:
 *   /paciente/:pacienteId  → Tela do paciente (sem login, via QR Code)
 *   /login                 → Login da equipe médica
 *   /painel                → Painel da equipe (protegido)
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Tela do paciente — acessível sem login */}
            <Route path="/paciente/:pacienteId" element={<TelaPaciente />} />

            {/* Login da equipe médica */}
            <Route path="/login" element={<TelaLogin />} />

            {/* Painel da equipe — protegido */}
            <Route
              path="/painel"
              element={
                <RotaProtegida>
                  <PainelEquipe />
                </RotaProtegida>
              }
            />

            {/* Redirecionar raiz para a tela do primeiro paciente (demo) */}
            <Route path="/" element={<Navigate to="/paciente/pac-001" replace />} />

            {/* 404 — redirecionar para raiz */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
