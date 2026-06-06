/**
 * Header do ClaraMed — Exibido em todas as telas.
 * Design clean, glassmorphism, com branding.
 */
export default function Header({ children }) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo principal
      </a>
      <div className="glass-card border-b border-white/5 rounded-none">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                ClaraMed
              </h1>
              <p className="text-[10px] text-text-muted leading-none">
                Comunicação Hospitalar Inteligente
              </p>
            </div>
          </div>
          {children && <div className="flex items-center gap-3">{children}</div>}
        </div>
      </div>
    </header>
  );
}
