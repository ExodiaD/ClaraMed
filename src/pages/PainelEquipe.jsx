import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ETAPAS, PRIORIDADE_CONFIG } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { usePacientes } from '../context/PacientesContext';
import Header from '../components/Header';

/**
 * Painel da equipe médica.
 * Sprint 3: Lista de pacientes mockados, etapa atual, alertas.
 * Sprint 4: QR Code por paciente, acessibilidade.
 * Sprint 5: Skeleton loading para simulação de chamada de API.
 */
export default function PainelEquipe() {
  const { usuario, logout } = useAuth();
  const { pacientes, resolverAlerta, alertasAtivos } = usePacientes();
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('pacientes'); // 'pacientes' | 'alertas'
  const [qrAberto, setQrAberto] = useState(null); // id do paciente com QR aberto
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);

  // Simula busca inicial de dados do backend (Sprint 5)
  useEffect(() => {
    setCarregando(true);
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [abaAtiva]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filtra pacientes por nome (memoizado para performance)
  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((p) =>
      p.nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [pacientes, filtro]);

  const getEtapaLabel = (etapaId) => {
    const etapa = ETAPAS.find((e) => e.id === etapaId);
    return etapa ? etapa : ETAPAS[0];
  };

  // URL base para o QR Code (em produção, seria o domínio real)
  const baseUrl = window.location.origin;

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-text-primary font-medium">{usuario?.nome}</span>
            <span className="text-[10px] text-text-muted">{usuario?.cargo}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 min-h-[44px] rounded-lg bg-red-500/15 text-red-400 text-sm font-medium hover:bg-red-500/25 transition-all cursor-pointer border border-red-500/20 flex items-center"
            aria-label="Sair do painel médico"
          >
            Sair
          </button>
        </div>
      </Header>

      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Dashboard header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Painel de Controle</h2>
            <p className="text-text-secondary text-sm mt-1">
              {pacientes.length} pacientes • {alertasAtivos.length} alerta{alertasAtivos.length !== 1 ? 's' : ''} ativo{alertasAtivos.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Tabs conforming to WAI-ARIA tablist guidelines */}
          <div className="flex rounded-xl overflow-hidden border border-surface-lighter/60 bg-surface-lighter/30" role="tablist" aria-label="Abas do painel">
            <button
              role="tab"
              aria-selected={abaAtiva === 'pacientes'}
              aria-controls="panel-pacientes"
              id="tab-pacientes"
              onClick={() => setAbaAtiva('pacientes')}
              className={`
                px-4 py-2.5 text-sm font-medium transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5
                ${abaAtiva === 'pacientes'
                  ? 'bg-primary/20 text-primary-light'
                  : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              <span aria-hidden="true">👥</span> Pacientes
            </button>
            <button
              role="tab"
              aria-selected={abaAtiva === 'alertas'}
              aria-controls="panel-alertas"
              id="tab-alertas"
              onClick={() => setAbaAtiva('alertas')}
              className={`
                px-4 py-2.5 text-sm font-medium transition-all relative cursor-pointer min-h-[44px] flex items-center gap-1.5
                ${abaAtiva === 'alertas'
                  ? 'bg-red-500/20 text-red-400'
                  : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              <span aria-hidden="true">🔔</span> Alertas
              {alertasAtivos.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse" aria-label={`${alertasAtivos.length} alertas pendentes`}>
                  {alertasAtivos.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ABA: Pacientes */}
        {abaAtiva === 'pacientes' && (
          <div id="panel-pacientes" role="tabpanel" aria-labelledby="tab-pacientes" className="space-y-4 fade-in">
            {/* Busca */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true">🔍</span>
              <input
                type="text"
                aria-label="Buscar paciente por nome"
                placeholder="Buscar paciente por nome..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-lighter/40 border border-surface-lighter/60 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm min-h-[48px]"
              />
            </div>

            {/* Lista de pacientes com Skeleton Loading */}
            <div className="grid gap-3">
              {carregando ? (
                // Skeletons de Pacientes
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="glass-card-light p-4 md:p-5 animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-surface-lighter" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-surface-lighter rounded w-1/3" />
                        <div className="h-3 bg-surface-lighter rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-8 bg-surface-lighter rounded w-24" />
                  </div>
                ))
              ) : (
                pacientesFiltrados.map((paciente) => {
                  const etapa = getEtapaLabel(paciente.etapaAtual);
                  const prio = PRIORIDADE_CONFIG[paciente.prioridade] || PRIORIDADE_CONFIG.normal;

                  return (
                    <div
                      key={paciente.id}
                      className={`
                        glass-card-light p-4 md:p-5
                        transition-all duration-300
                        ${paciente.precisaAjuda ? 'ring-2 ring-red-500/40 shadow-lg shadow-red-500/10' : 'hover:border-primary/20'}
                      `}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Info do paciente */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-surface-lighter to-surface flex items-center justify-center text-2xl" aria-hidden="true">
                            {paciente.precisaAjuda ? (
                              <span className="animate-pulse">🆘</span>
                            ) : (
                              <span>{etapa.icone}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-text-primary truncate">
                                {paciente.nome}
                              </h3>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${prio.bg} ${prio.cor} border ${prio.border}`}>
                                {prio.label}
                              </span>
                              {paciente.precisaAjuda && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse" role="alert">
                                  PEDIDO DE AJUDA
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                              <span>{paciente.idade} anos</span>
                              <span>•</span>
                              <span>Chegada: {paciente.horarioChegada}</span>
                              <span>•</span>
                              <span>ID: {paciente.id}</span>
                            </div>
                          </div>
                        </div>

                        {/* Etapa + Ações */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs min-h-[40px] flex items-center">
                            <span className="text-text-muted">Etapa:&nbsp;</span>
                            <span className="text-primary-light font-medium">{etapa.label}</span>
                          </div>

                          {/* Botão QR Code (com tamanho mínimo de 44x44px) */}
                          <button
                            onClick={() => setQrAberto(qrAberto === paciente.id ? null : paciente.id)}
                            className="w-11 h-11 rounded-lg bg-surface-lighter/50 hover:bg-surface-lighter text-text-secondary hover:text-text-primary transition-all cursor-pointer border border-surface-lighter/60 flex items-center justify-center"
                            aria-label={`Mostrar ou ocultar código QR para acompanhar ${paciente.nome}`}
                            aria-expanded={qrAberto === paciente.id}
                            title="Ver QR Code"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.875 12h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M13.5 12h.75m-.75 3h.75m-.75 3h.75M19.5 13.5V12M21 16.5v-.75m-3 3v-.75m3 3v-.75" />
                            </svg>
                          </button>

                          {/* Botão resolver alerta (com tamanho mínimo de 44x44px) */}
                          {paciente.precisaAjuda && (
                            <button
                              onClick={() => resolverAlerta(paciente.id)}
                              className="px-3 min-h-[44px] rounded-lg bg-success/20 text-success text-xs font-semibold hover:bg-success/30 transition-all cursor-pointer border border-success/30 flex items-center justify-center"
                              aria-label={`Marcar ajuda para ${paciente.nome} como resolvida`}
                            >
                              ✓ Resolver
                            </button>
                          )}
                        </div>
                      </div>

                      {/* QR Code expandido */}
                      {qrAberto === paciente.id && (
                        <div className="mt-4 pt-4 border-t border-surface-lighter/40 slide-up">
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-lg" aria-label={`Imagem do código QR para ${paciente.nome}`}>
                              <QRCodeSVG
                                value={`${baseUrl}/paciente/${paciente.id}`}
                                size={160}
                                level="H"
                                includeMargin={false}
                                bgColor="#ffffff"
                                fgColor="#0f172a"
                              />
                            </div>
                            <div className="text-center sm:text-left space-y-2">
                              <p className="text-sm text-text-primary font-medium">
                                QR Code — {paciente.nome}
                              </p>
                              <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
                                Escaneie este código para acessar a tela de acompanhamento do paciente em tempo real.
                              </p>
                              <p className="text-[10px] text-text-muted font-mono bg-surface-lighter/50 px-3 py-1.5 rounded-lg inline-block break-all">
                                {baseUrl}/paciente/{paciente.id}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {!carregando && pacientesFiltrados.length === 0 && (
                <div className="text-center py-12 text-text-muted">
                  <span className="text-4xl block mb-3" aria-hidden="true">🔍</span>
                  <p>Nenhum paciente encontrado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA: Alertas */}
        {abaAtiva === 'alertas' && (
          <div id="panel-alertas" role="tabpanel" aria-labelledby="tab-alertas" className="space-y-4 fade-in">
            {carregando ? (
              // Skeletons de Alertas
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="glass-card p-5 border-l-4 border-l-red-500 animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-surface-lighter rounded w-1/4" />
                    <div className="h-3 bg-surface-lighter rounded w-1/2" />
                  </div>
                  <div className="h-10 bg-surface-lighter rounded w-36" />
                </div>
              ))
            ) : alertasAtivos.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <span className="text-5xl block mb-4" aria-hidden="true">✅</span>
                <h3 className="text-lg font-semibold text-text-primary">Nenhum alerta ativo</h3>
                <p className="text-text-secondary text-sm mt-2">
                  Todos os pacientes estão sendo atendidos normalmente.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {alertasAtivos.map((paciente) => {
                  const etapa = getEtapaLabel(paciente.etapaAtual);
                  return (
                    <div
                      key={paciente.id}
                      className="glass-card p-5 border-l-4 border-l-red-500 slide-up"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl animate-pulse" aria-hidden="true">🆘</span>
                          <div>
                            <h3 className="font-semibold text-text-primary">{paciente.nome}</h3>
                            <p className="text-xs text-text-secondary mt-0.5">
                              {paciente.idade} anos • Etapa: {etapa.label} • Chegada: {paciente.horarioChegada}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => resolverAlerta(paciente.id)}
                          className="btn-success text-sm py-2 px-4 cursor-pointer min-h-[48px] flex items-center justify-center"
                          aria-label={`Marcar alerta de ${paciente.nome} como resolvido`}
                        >
                          ✓ Marcar como resolvido
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
          {[
            { label: 'Total', valor: pacientes.length, icone: '👥', cor: 'from-primary/20 to-accent/10 border-primary/20' },
            { label: 'Em atendimento', valor: pacientes.filter((p) => p.etapaAtual === 4).length, icone: '👨‍⚕️', cor: 'from-success/20 to-emerald-500/10 border-success/20' },
            { label: 'Aguardando', valor: pacientes.filter((p) => [3, 6].includes(p.etapaAtual)).length, icone: '⏳', cor: 'from-amber-500/20 to-orange-500/10 border-amber-500/20' },
            { label: 'Alta', valor: pacientes.filter((p) => p.etapaAtual === 8).length, icone: '✅', cor: 'from-emerald-500/20 to-green-500/10 border-emerald-500/20' },
          ].map((stat) => (
            <div key={stat.label} className={`glass-card-light p-4 bg-gradient-to-br ${stat.cor} text-center`}>
              <span className="text-2xl" aria-hidden="true">{stat.icone}</span>
              <p className="text-2xl font-bold text-text-primary mt-1">{stat.valor}</p>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
