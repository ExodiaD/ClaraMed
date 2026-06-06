import { useRef, useEffect } from 'react';
import { ETAPAS } from '../data/mockData';

/**
 * Indicador visual de progresso por etapas.
 * Mostra todas as etapas com destaque na atual.
 *
 * Sprint 4: Refatorado para responsividade mobile.
 * - Mobile: scroll horizontal com auto-scroll para etapa ativa.
 * - Desktop: layout completo inline.
 */
export default function EtapaProgress({ etapaAtual }) {
  const total = ETAPAS.length;
  const progressPercent = (etapaAtual / total) * 100;
  const scrollRef = useRef(null);

  // Auto-scroll to active step on mobile
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [etapaAtual]);

  return (
    <div className="w-full space-y-4" role="progressbar" aria-valuenow={etapaAtual} aria-valuemin={1} aria-valuemax={total} aria-label={`Progresso do atendimento: etapa ${etapaAtual} de ${total}`}>
      {/* Barra de progresso */}
      <div className="relative w-full h-3 bg-surface-lighter/50 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #0ea5e9, #6366f1, #8b5cf6)',
          }}
        />
        <div
          className="absolute top-0 left-0 h-full rounded-full animate-pulse opacity-50"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #0ea5e9, #6366f1, #8b5cf6)',
          }}
        />
      </div>

      {/* Steps dots — horizontal scroll on mobile */}
      <div
        ref={scrollRef}
        className="flex gap-1 sm:gap-0 sm:justify-between items-start px-1 overflow-x-auto scroll-hidden snap-x snap-mandatory pb-2 sm:pb-0"
      >
        {ETAPAS.map((etapa) => {
          const isAtiva = etapa.id === etapaAtual;
          const isCompleta = etapa.id < etapaAtual;

          return (
            <div
              key={etapa.id}
              data-active={isAtiva}
              className={`
                flex flex-col items-center gap-1.5 group snap-center
                flex-shrink-0 w-16 sm:w-auto sm:flex-shrink
              `}
            >
              <div
                className={`
                  w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base
                  transition-all duration-500
                  ${isAtiva
                    ? 'bg-gradient-to-br from-primary to-accent text-white scale-110 sm:scale-125 shadow-lg shadow-primary/30 ring-2 ring-primary/40'
                    : isCompleta
                      ? 'bg-success/20 text-success border border-success/40'
                      : 'bg-surface-lighter/40 text-text-muted border border-surface-lighter/60'
                  }
                `}
                title={etapa.label}
                aria-label={`${etapa.label}${isAtiva ? ' — etapa atual' : isCompleta ? ' — concluída' : ' — pendente'}`}
              >
                {isCompleta ? '✓' : etapa.icone}
              </div>
              <span
                className={`
                  text-[10px] sm:text-xs text-center leading-tight max-w-[60px]
                  transition-colors duration-300
                  ${isAtiva ? 'text-primary-light font-semibold' : isCompleta ? 'text-success' : 'text-text-muted'}
                `}
              >
                {etapa.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
