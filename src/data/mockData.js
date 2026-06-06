// ========================================================
// ClaraMed — Dados mockados para simulação do frontend
// ========================================================

/**
 * Etapas do atendimento no pronto atendimento.
 * Cada etapa possui um id, rótulo exibido ao paciente,
 * descrição em linguagem acessível e um ícone emoji.
 */
export const ETAPAS = [
  {
    id: 1,
    label: 'Recepção',
    descricao: 'Você foi registrado(a) na recepção. Em breve será chamado(a) para a triagem.',
    icone: '🏥',
  },
  {
    id: 2,
    label: 'Triagem',
    descricao: 'Você está na triagem. A equipe vai verificar seus sinais vitais e prioridade de atendimento.',
    icone: '🩺',
  },
  {
    id: 3,
    label: 'Aguardando Atendimento',
    descricao: 'Você está na fila de atendimento. Por favor, aguarde na sala de espera.',
    icone: '⏳',
  },
  {
    id: 4,
    label: 'Em Atendimento',
    descricao: 'Você está sendo atendido(a) pelo médico(a). Fique tranquilo(a).',
    icone: '👨‍⚕️',
  },
  {
    id: 5,
    label: 'Exames',
    descricao: 'Seus exames foram solicitados. Você será encaminhado(a) ao setor correspondente.',
    icone: '🔬',
  },
  {
    id: 6,
    label: 'Aguardando Resultado',
    descricao: 'Seus exames estão sendo analisados. Por favor, aguarde na sala de espera.',
    icone: '📋',
  },
  {
    id: 7,
    label: 'Retorno Médico',
    descricao: 'O médico(a) vai conversar com você sobre os resultados. Aguarde ser chamado(a).',
    icone: '🗣️',
  },
  {
    id: 8,
    label: 'Alta',
    descricao: 'Seu atendimento foi finalizado. Procure a recepção para orientações de saída.',
    icone: '✅',
  },
];

/**
 * Pacientes mockados para o painel da equipe médica.
 */
export const PACIENTES_MOCK = [
  {
    id: 'pac-001',
    nome: 'Maria Silva',
    idade: 45,
    etapaAtual: 1,
    prioridade: 'urgente',
    horarioChegada: '08:15',
    precisaAjuda: false,
  },
  {
    id: 'pac-002',
    nome: 'João Santos',
    idade: 32,
    etapaAtual: 3,
    prioridade: 'normal',
    horarioChegada: '09:02',
    precisaAjuda: true,
  },
  {
    id: 'pac-003',
    nome: 'Ana Oliveira',
    idade: 67,
    etapaAtual: 4,
    prioridade: 'emergência',
    horarioChegada: '07:45',
    precisaAjuda: false,
  },
  {
    id: 'pac-004',
    nome: 'Carlos Ferreira',
    idade: 28,
    etapaAtual: 2,
    prioridade: 'normal',
    horarioChegada: '09:30',
    precisaAjuda: false,
  },
  {
    id: 'pac-005',
    nome: 'Lúcia Mendes',
    idade: 55,
    etapaAtual: 6,
    prioridade: 'urgente',
    horarioChegada: '08:50',
    precisaAjuda: true,
  },
  {
    id: 'pac-006',
    nome: 'Pedro Almeida',
    idade: 72,
    etapaAtual: 5,
    prioridade: 'emergência',
    horarioChegada: '07:30',
    precisaAjuda: false,
  },
  {
    id: 'pac-007',
    nome: 'Fernanda Costa',
    idade: 19,
    etapaAtual: 7,
    prioridade: 'normal',
    horarioChegada: '10:10',
    precisaAjuda: false,
  },
  {
    id: 'pac-008',
    nome: 'Roberto Lima',
    idade: 60,
    etapaAtual: 8,
    prioridade: 'urgente',
    horarioChegada: '06:55',
    precisaAjuda: false,
  },
];

/**
 * Credenciais mockadas para o login da equipe médica.
 */
export const CREDENCIAIS_MOCK = {
  email: 'medico@claramed.com',
  senha: '123456',
  nome: 'Dr. Ricardo Souza',
  cargo: 'Médico Plantonista',
};

/**
 * Retorna o label da prioridade com cor associada.
 */
export const PRIORIDADE_CONFIG = {
  normal: { label: 'Normal', cor: 'text-sky-400', bg: 'bg-sky-500/20', border: 'border-sky-500/30' },
  urgente: { label: 'Urgente', cor: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
  'emergência': { label: 'Emergência', cor: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' },
};
