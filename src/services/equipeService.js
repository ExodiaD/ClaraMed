import api from './api';
import { PACIENTES_MOCK, CREDENCIAIS_MOCK } from '../data/mockData';

/**
 * Serviço de Equipe Médica — Centraliza chamadas futuras à API para o painel de controle.
 * Atualmente simula respostas com dados mockados para preparação da Sprint 5.
 */
export const equipeService = {
  /**
   * Realiza autenticação da equipe médica
   * @param {Object} credenciais - Objeto contendo email e senha
   * @returns {Promise<Object>} Dados do usuário e token JWT
   */
  login: async (credenciais) => {
    // Simulação de chamada real:
    // const response = await api.post('/auth/login', credenciais);
    // localStorage.setItem('claramed_token', response.data.token);
    // return response.data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, senha } = credenciais;
        if (email === CREDENCIAIS_MOCK.email && senha === CREDENCIAIS_MOCK.senha) {
          const user = {
            nome: CREDENCIAIS_MOCK.nome,
            email: CREDENCIAIS_MOCK.email,
            cargo: CREDENCIAIS_MOCK.cargo,
          };
          localStorage.setItem('claramed_token', 'mocked_jwt_token_for_claramed');
          resolve({ user, token: 'mocked_jwt_token_for_claramed' });
        } else {
          reject(new Error('E-mail ou senha inválidos.'));
        }
      }, 800);
    });
  },

  /**
   * Obtém a lista completa de pacientes no pronto atendimento
   * @returns {Promise<Array>} Lista de pacientes
   */
  getPacientes: async () => {
    // Simulação de chamada real:
    // const response = await api.get('/equipe/pacientes');
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...PACIENTES_MOCK]);
      }, 600);
    });
  },

  /**
   * Obtém os alertas ativos (pacientes que solicitaram ajuda)
   * @returns {Promise<Array>} Lista de pacientes com alertas ativos
   */
  getAlertas: async () => {
    // Simulação de chamada real:
    // const response = await api.get('/equipe/alertas');
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        const alertas = PACIENTES_MOCK.filter((p) => p.precisaAjuda);
        resolve(alertas);
      }, 500);
    });
  },

  /**
   * Marca o pedido de ajuda de um paciente como resolvido
   * @param {string} pacienteId - ID do paciente
   * @returns {Promise<Object>} Resposta de confirmação
   */
  resolverAlerta: async (pacienteId) => {
    // Simulação de chamada real:
    // const response = await api.delete(`/equipe/alertas/${pacienteId}`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        const paciente = PACIENTES_MOCK.find((p) => p.id === pacienteId);
        if (paciente) {
          paciente.precisaAjuda = false;
        }
        resolve({ success: true, id: pacienteId });
      }, 400);
    });
  },

  /**
   * Atualiza a etapa do atendimento de um paciente
   * @param {string} pacienteId - ID do paciente
   * @param {number} etapaId - ID da nova etapa do atendimento
   * @returns {Promise<Object>} Paciente atualizado
   */
  atualizarEtapa: async (pacienteId, etapaId) => {
    // Simulação de chamada real:
    // const response = await api.put(`/equipe/pacientes/${pacienteId}/etapa`, { etapaId });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        const paciente = PACIENTES_MOCK.find((p) => p.id === pacienteId);
        if (paciente) {
          paciente.etapaAtual = etapaId;
        }
        resolve({ ...paciente });
      }, 400);
    });
  },
};

export default equipeService;
