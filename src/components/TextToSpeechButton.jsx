import { useState, useRef } from 'react';

/**
 * Botão de text-to-speech usando a Web Speech API nativa.
 * Lê o texto passado via prop em voz alta.
 *
 * Sprint 4: Melhorado para maior visibilidade e acessibilidade.
 * - Ícone SVG grande e nítido (sem depender de emoji)
 * - Efeito de glow pulsante para chamar atenção
 * - Min-height 56px para touch target confortável
 */
export default function TextToSpeechButton({ texto, tamanhoGrande = false }) {
  const [falando, setFalando] = useState(false);
  const utteranceRef = useRef(null);

  const handleFalar = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura em voz alta.');
      return;
    }

    // Se já está falando, para
    if (falando) {
      window.speechSynthesis.cancel();
      setFalando(false);
      return;
    }

    // Cancela qualquer fala anterior
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Tenta encontrar uma voz em português
    const voices = window.speechSynthesis.getVoices();
    const vozPt = voices.find(
      (v) => v.lang.startsWith('pt') && v.localService
    ) || voices.find((v) => v.lang.startsWith('pt'));
    if (vozPt) utterance.voice = vozPt;

    utterance.onend = () => setFalando(false);
    utterance.onerror = () => setFalando(false);

    utteranceRef.current = utterance;
    setFalando(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleFalar}
      aria-label={falando ? 'Parar leitura em voz alta' : 'Ouvir informações em voz alta'}
      aria-pressed={falando}
      title={falando ? 'Parar leitura' : 'Ouvir em voz alta'}
      className={`
        group relative overflow-hidden
        ${tamanhoGrande
          ? 'w-full py-4 px-6 text-lg min-h-[56px]'
          : 'py-3 px-5 text-base min-h-[48px]'
        }
        rounded-xl font-semibold
        transition-all duration-300 cursor-pointer
        flex items-center justify-center gap-3
        ${falando
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-[1.02]'
          : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] tts-glow'
        }
      `}
    >
      {/* SVG Speaker Icon — always crisp, not emoji-dependent */}
      <span className={`flex-shrink-0 ${falando ? 'animate-pulse' : ''}`}>
        {falando ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
            <path d="M6 6h2v12H6zm10 0h2v12h-2z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </span>

      <span className="text-center">
        {falando ? 'Parar leitura' : 'Ouvir em voz alta'}
      </span>

      {/* Ripple effect background when speaking */}
      {falando && (
        <span className="absolute inset-0 rounded-xl" aria-hidden="true">
          <span className="absolute inset-0 rounded-xl animate-ping bg-white/10" />
        </span>
      )}
    </button>
  );
}
