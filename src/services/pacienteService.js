import api from './api';
import { PACIENTES_MOCK } from '../data/mockData';

/**
 * Serviço de Paciente — Centraliza chamadas futuras à API relacionadas ao paciente.
 * Atualmente simula respostas com dados mockados para preparação da Sprint 5.
 */
export const pacienteService = {
  /**
   * Busca os detalhes de um paciente específico (via ID ou token contido no QR Code)
   * @param {string} pacienteId - ID ou token do paciente
   * @returns {Promise<Object>} Detalhes do paciente
   */
  getPaciente: async (pacienteId) => {
    // Simulação de chamada real:
    // const response = await api.get(`/pacientes/${pacienteId}`);
    // return response.data;
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const paciente = PACIENTES_MOCK.find((p) => p.id === pacienteId);
        if (paciente) {
          resolve({ ...paciente });
        } else {
          reject(new Error('Paciente não encontrado.'));
        }
      }, 500); // 500ms delay para simular rede
    });
  },

  /**
   * Envia um alerta de "Preciso de ajuda" para a equipe médica
   * @param {string} pacienteId - ID do paciente que solicita ajuda
   * @returns {Promise<Object>} Resposta de confirmação
   */
  postAlerta: async (pacienteId) => {
    // Simulação de chamada real:
    // const response = await api.post(`/pacientes/${pacienteId}/ajuda`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        // Altera o estado do mock localmente
        const paciente = PACIENTES_MOCK.find((p) => p.id === pacienteId);
        if (paciente) {
          paciente.precisaAjuda = true;
        }
        resolve({ success: true, message: 'Alerta enviado com sucesso.' });
      }, 400);
    });
  },
};

export default pacienteService;
