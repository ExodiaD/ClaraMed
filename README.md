# 🏥 ClaraMed — Frontend

O **ClaraMed** é uma plataforma de comunicação inteligente voltada para o pronto atendimento hospitalar. Ele exibe para pacientes e acompanhantes, em linguagem humana, clara e acessível, a etapa atual de seu atendimento — reduzindo a ansiedade da espera sem interferir em nenhuma decisão clínica ou triagem médica.

Esta aplicação foi desenvolvida em **React** + **Vite** com foco absoluto em **acessibilidade** (WCAG AA) e **responsividade mobile**.

---

## 🚀 Sprints de Desenvolvimento

O projeto foi estruturado e desenvolvido em sprints incrementais:

*   **Sprint 1 — Base**: Configuração inicial do projeto React + Vite + Tailwind CSS v4, roteamento com React Router v7, e recurso de leitura de tela com a Web Speech API nativa.
*   **Sprint 2 — Fluxo do Paciente**: Implementação de polling simulado (atualização de estado a cada 10 segundos) e botão interativo "Preciso de ajuda" com confirmação visual e cooldown preventivo.
*   **Sprint 3 — Painel da Equipe**: Tela de login mockada, roteamento protegido de segurança, visualização geral da fila de pacientes, controle de prioridades de triagem e painel de controle de chamados de ajuda pendentes.
*   **Sprint 4 — QR Code e Acessibilidade**:
    *   **Contraste de Cores**: Cores de texto ajustadas para contraste WCAG AA no fundo escuro.
    *   **Responsividade do Progresso**: Barra de progresso do paciente refatorada para scroll horizontal nativo com snap dinâmico e auto-foco na etapa ativa em celulares.
    *   **Text-to-Speech**: Botão de audiodescrição proeminente, com ícone de alto-falante em SVG nítido e animação pulsante sutil.
    *   **Touch Targets**: Todos os elementos interativos possuem área de toque mínima de `44x44px` (ou superior) para acessibilidade motora.
    *   **Navegação por Teclado**: Inclusão de link *"Skip to Content"* para pular o cabeçalho e foco visual (`focus-visible`) demarcado.
*   **Sprint 5 — Preparação de Integração (Camada de Serviços)**:
    *   Criação da pasta `src/services/` com estrutura pronta para consumo de API REST.
    *   Configuração do Axios instanciado com suporte a variáveis de ambiente (`VITE_API_URL`) e injetor automático de token JWT no `localStorage`.
    *   Inclusão de **Skeleton Loaders** animados nas telas de listagem para uma experiência rica e fluida durante o carregamento de dados.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite**
- **Tailwind CSS v4** (Integração oficial via `@tailwindcss/vite`)
- **React Router Dom v7**
- **Axios** (Preparado para integração)
- **qrcode.react** (Geração de QR Codes dinâmicos)
- **Web Speech API** (Nativa do navegador, sem dependências de terceiros)

---

## 📁 Estrutura de Pastas

```text
src/
├── components/          # Componentes globais e reutilizáveis (TTS, Progresso, Botão Ajuda)
├── context/             # Estados globais (Autenticação e Lista de Pacientes)
├── data/                # Dados mockados e configurações
├── pages/               # Telas principais (Paciente, Login, Painel)
├── services/            # Camada de integração com API (Axios e endpoints)
├── App.jsx              # Roteador principal
├── index.css            # Estilos gerais, variáveis de design e regras WCAG AA
└── main.jsx             # Ponto de entrada da aplicação
```

---

## 🔧 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ExodiaD/ClaraMed.git
   cd ClaraMed
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Duplique o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse as principais páginas:**
   - **Visualização do Paciente (Demo)**: `http://localhost:5173/paciente/pac-001`
   - **Login da Equipe**: `http://localhost:5173/login` (Credenciais no card inferior de ajuda)
   - **Painel Médico**: `http://localhost:5173/painel`

---

## ♿ Detalhes de Acessibilidade (Critérios WCAG)

- **Perceptibilidade**: Alternativa em áudio para todos os textos das etapas através do botão **Ouvir em voz alta**.
- **Operabilidade**: Navegável 100% via teclado com demarcação visual de foco e link de atalho para o conteúdo principal.
- **Robustez**: Layout responsivo testado em resoluções mobile estreitas com o componente de progresso adaptativo.
- **Entendimento**: Descrições de status clínico traduzidos para linguagem humana amigável e acessível, evitando terminologia estritamente técnica para leigos.
