import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { PACIENTES_MOCK } from '../data/mockData';

const PacientesContext = createContext(null);

export function PacientesProvider({ children }) {
  const [pacientes, setPacientes] = useState(PACIENTES_MOCK);

  const atualizarEtapa = useCallback((pacienteId, novaEtapa) => {
    setPacientes((prev) =>
      prev.map((p) =>
        p.id === pacienteId ? { ...p, etapaAtual: novaEtapa } : p
      )
    );
  }, []);

  const toggleAjuda = useCallback((pacienteId, valor) => {
    setPacientes((prev) =>
      prev.map((p) =>
        p.id === pacienteId ? { ...p, precisaAjuda: valor } : p
      )
    );
  }, []);

  const resolverAlerta = useCallback((pacienteId) => {
    setPacientes((prev) =>
      prev.map((p) =>
        p.id === pacienteId ? { ...p, precisaAjuda: false } : p
      )
    );
  }, []);

  const alertasAtivos = useMemo(() => {
    return pacientes.filter((p) => p.precisaAjuda);
  }, [pacientes]);

  return (
    <PacientesContext.Provider
      value={{ pacientes, atualizarEtapa, toggleAjuda, resolverAlerta, alertasAtivos }}
    >
      {children}
    </PacientesContext.Provider>
  );
}

export function usePacientes() {
  const context = useContext(PacientesContext);
  if (!context) {
    throw new Error('usePacientes deve ser usado dentro de PacientesProvider');
  }
  return context;
}
