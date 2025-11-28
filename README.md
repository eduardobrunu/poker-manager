# Poker Manager

Sistema profissional de gerenciamento de bankroll para poker desenvolvido em Next.js + TypeScript.

## Funcionalidades Principais

### 1. Calculadora de Bankroll USD
**Gerenciamento profissional de banca em dólares**
- **Conversão USD/BRL** automática (taxa configurável)
- **Cálculo de buy-ins** para cada stake (NL2 a NL100)
- **Recomendações de volume**: mãos diárias, semanais e mensais
- **Indicadores de segurança**: verde (30+ buy-ins), amarelo (20-29), vermelho (<20)
- **Tipos de jogo GGPoker**: Rush & Cash (200 mãos/h), Cash Game (60 mãos/h), torneios
- **Stop-loss automático**: limite de sessões baseado no risco

### 2. Hand Range Helper
Ferramenta interativa que mostra quais mãos jogar em cada posição da mesa:
- Ranges otimizados para 6-max
- Indicação visual de 3-bet, raise, call e fold
- Explicações detalhadas sobre cada posição
- Interface responsiva com hover para detalhes

### 3. Dashboard de Bankroll
Painel completo com estatísticas e análises:
- **Métricas principais**: Bankroll atual, Win Rate, Hourly Rate, Total de sessões
- **Indicador de saúde**: Mostra se você está jogando stakes adequados ao seu bankroll
- **Calculadora USD integrada**: Volume de mãos recomendado, buy-ins disponíveis
- **Histórico de sessões**: Tabela detalhada com todas as suas sessões
- **Regra dos 30**: Alertas visuais quando você está em risco

### 4. Registro de Sessões
Formulário completo para adicionar e gerenciar sessões:
- **Suporte a USD e BRL**: Escolha a moeda do seu buy-in
- Data, tipo de jogo GGPoker, variante, stakes, local
- Buy-in e cash-out com cálculo automático de lucro
- Duração da sessão e **mãos jogadas** (opcional)
- Campo para notas e observações
- Calculadora USD na lateral para planejamento

## Documentação

- **[GUIA.md](./GUIA.md)**: Manual rápido em português com conceitos de poker
- **[CALCULADORA-USD.md](./CALCULADORA-USD.md)**: Guia completo da calculadora de bankroll USD

## Como Usar

### Instalação

```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Acesse <http://localhost:3000>

### Build para Produção

```bash
npm run build
npm start
```

## Navegação do Sistema

- **Página Inicial** (`/`): Visão geral e acesso rápido
- **Dashboard** (`/dashboard`): Estatísticas, gráficos e análises
- **Hand Ranges** (`/ranges`): Tabela de ranges por posição
- **Sessões** (`/sessions`): Registro de novas sessões

## Conceitos de Poker Implementados

### Posições na Mesa

- **BTN** (Botão): Melhor posição, age por último
- **CO** (Cutoff): Segunda melhor posição
- **MP** (Middle Position): Posição intermediária
- **EP** (Early Position): Primeiras posições
- **SB/BB** (Blinds): Posições forçadas

### Gestão de Bankroll

- **Regra dos 30**: Mantenha 30+ buy-ins para o stake
- **Stop-loss**: Pare após perder 3 buy-ins em uma sessão
- **Variância**: Sistema preparado para altos e baixos naturais
- **Estratégia**: Maximize ganhos, minimize perdas

## Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript (strict mode)
- **Estilização**: Tailwind CSS
- **Ícones**: Heroicons (SVG)
- **React**: 19

## Estrutura do Projeto

```text
poker-manager/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard de estatísticas
│   ├── ranges/            # Hand Range Helper
│   ├── sessions/          # Registro de sessões
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/features/   # Componentes das funcionalidades
│   ├── HandRangeGrid.tsx
│   ├── StatsCards.tsx
│   ├── SessionHistory.tsx
│   ├── BankrollHealthCard.tsx
│   └── QuickStats.tsx
├── lib/                   # Utilitários e helpers
│   ├── poker-ranges.ts    # Lógica de ranges
│   └── session-utils.ts   # Cálculos de sessões
└── types/                 # TypeScript types
    ├── poker.ts
    └── session.ts
```

## Próximos Passos Recomendados

1. **Adicionar gráficos**: Integrar Recharts ou Chart.js para visualização de evolução
2. **Persistência de dados**: Implementar localStorage ou banco de dados (Prisma + SQLite)
3. **Filtros avançados**: Adicionar filtros por data, tipo de jogo, stakes
4. **Exportação**: Gerar relatórios em CSV/PDF
5. **Testes**: Adicionar testes com Jest/Testing Library
6. **Autenticação**: Sistema de login para múltiplos usuários

## Licença

ISC

