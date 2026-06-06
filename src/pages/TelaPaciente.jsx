import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ETAPAS } from '../data/mockData';
import { usePacientes } from '../context/PacientesContext';
import Header from '../components/Header';
import EtapaProgress from '../components/EtapaProgress';
import TextToSpeechButton from '../components/TextToSpeechButton';
import BotaoAjuda from '../components/BotaoAjuda';

/**
 * Tela do Paciente — Acessada via QR Code (sem login).
 * Exibe a etapa atual, botão de text-to-speech e botão "Preciso de ajuda".
 *
 * Sprint 1: Etapa hardcoded + TTS
 * Sprint 2: Polling simulado (troca de etapa a cada 10s) + botão de ajuda
 */
export default function TelaPaciente() {
  const { pacienteId } = useParams();
  const { pacientes, toggleAjuda, atualizarEtapa } = usePacientes();

  // Busca o paciente pelo ID da URL, ou usa o primeiro se não encontrar
  const paciente = pacientes.find((p) => p.id === pacienteId) || pacientes[0];
  const [etapaIndex, setEtapaIndex] = useState(paciente?.etapaAtual || 1);
  const [transicao, setTransicao] = useState(false);

  // Sprint 2: Polling simulado — troca de etapa a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setEtapaIndex((prev) => {
        const next = prev >= ETAPAS.length ? 1 : prev + 1;
        // Atualiza no contexto global
        if (paciente) atualizarEtapa(paciente.id, next);
        return next;
      });
      // Animação de transição
      setTransicao(true);
      setTimeout(() => setTransicao(false), 600);
    }, 10000);

    return () => clearInterval(interval);
  }, [paciente, atualizarEtapa]);

  const etapaAtual = ETAPAS.find((e) => e.id === etapaIndex) || ETAPAS[0];

  const handleAjuda = useCallback(() => {
    if (paciente) toggleAjuda(paciente.id, true);
  }, [paciente, toggleAjuda]);

  // Texto completo para o TTS
  const textoTTS = `${etapaAtual.label}. ${etapaAtual.descricao}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-lg mx-auto w-full gap-6">
        {/* Saudação */}
        <div className="text-center fade-in">
          {paciente && (
            <p className="text-text-secondary text-sm mb-1">
              Olá, <span className="text-primary-light font-medium">{paciente.nome}</span>
            </p>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-text-primary">
            Seu Atendimento
          </h2>
        </div>

        {/* Barra de progresso */}
        <div className="w-full glass-card p-5">
          <EtapaProgress etapaAtual={etapaIndex} />
        </div>

        {/* Card da etapa atual */}
        <div
          className={`
            w-full glass-card p-6 md:p-8 text-center space-y-4
            transition-all duration-500
            ${transicao ? 'scale-[1.02] shadow-xl shadow-primary/10' : ''}
          `}
        >
          <div className="float">
            <span className="text-6xl md:text-7xl block" role="img" aria-label={etapaAtual.label}>
              {etapaAtual.icone}
            </span>
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary-light border border-primary/30">
              Etapa {etapaAtual.id} de {ETAPAS.length}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
              {etapaAtual.label}
            </h3>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              {etapaAtual.descricao}
            </p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="w-full space-y-3">
          <TextToSpeechButton texto={textoTTS} tamanhoGrande />
          <BotaoAjuda onSolicitarAjuda={handleAjuda} />
        </div>

        {/* Info de atualização automática */}
        <p className="text-text-muted text-xs text-center flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
          Atualização automática a cada 10 segundos
        </p>
      </main>
    </div>
  );
}
