# Guia Rápido - Poker Manager

## Como Usar o Sistema

### 1. Estudar Hand Ranges

**Acesse:** `/ranges`

- Selecione sua posição na mesa (BTN, CO, MP, EP, SB, BB)
- Veja quais mãos você deve:
  - **3-bet** (vermelho): Re-raise forte
  - **Raise** (verde): Abrir o pote
  - **Call** (azul): Pagar o raise
  - **Fold** (cinza): Descartar

**Exemplo prático:**
- Você está no **Botão (BTN)** com A♠Q♠
- O sistema mostra: **3-bet** (vermelho)
- Ação: Fazer re-raise!

### 2. Registrar Suas Sessões

**Acesse:** `/sessions`

1. Preencha os dados:
   - Data da sessão
   - Tipo: Cash Game ou Torneio
   - Stakes: NL50, NL100, etc
   - Buy-in: Quanto você entrou
   - Cash-out: Quanto você saiu
   - Duração em minutos

2. Clique em "Salvar Sessão"

**O sistema calcula automaticamente:**
- Seu lucro/prejuízo (Cash-out - Buy-in)
- Adiciona ao histórico

### 3. Acompanhar Evolução

**Acesse:** `/dashboard`

**Você verá:**

1. **Cards de Estatísticas:**
   - Bankroll atual
   - Win Rate (% de sessões ganhas)
   - Ganho por hora
   - Total de sessões

2. **Indicador de Saúde:**
   - Verde: Seguro para jogar
   - Amarelo: Atenção
   - Vermelho: Risco alto

3. **Calculadora de Stakes:**
   - Clique nos stakes (NL10, NL25, NL50, etc)
   - Veja quantos buy-ins você tem
   - Sistema avisa se é seguro jogar

4. **Histórico:**
   - Todas suas sessões
   - Lucros e perdas
   - Duração de cada sessão

## Regra dos 30 Buy-ins

**Fundamental para não quebrar!**

- Para jogar **NL50**: Precisa de R$ 1.500 (30 × R$ 50)
- Para jogar **NL100**: Precisa de R$ 3.000 (30 × R$ 100)
- Para jogar **NL25**: Precisa de R$ 750 (30 × R$ 25)

**Por quê?**
- Poker tem muita variância (sorte no curto prazo)
- Mesmo jogando bem, você pode perder várias sessões seguidas
- 30 buy-ins te protege dessa variância

## Estratégia Básica

### Quando Ganhar
- Maximize seus ganhos
- Continue jogando se estiver bem
- Aproveite quando está "correndo bem"

### Quando Perder
- Minimize suas perdas
- **Stop-loss**: Pare após perder 3 buy-ins
- Não jogue "on tilt" (emocionado)
- Volte outro dia

### Progressão de Stakes

**Subir de stake:**
- Só suba quando tiver 30 buy-ins do próximo nível
- Exemplo: Jogando NL50 com R$ 3.000? Pode testar NL100

**Descer de stake:**
- Se cair abaixo de 25 buy-ins, desça
- Não tenha vergonha de jogar stakes menores
- É melhor jogar NL25 seguro que NL100 com medo

## Dicas Profissionais

1. **Estude os ranges** antes de jogar
2. **Registre TODAS as sessões** - sem exceção
3. **Respeite o stop-loss** - nunca quebre essa regra
4. **Acompanhe o dashboard** semanalmente
5. **Use a calculadora** para escolher stakes

## Atalhos do Sistema

- **Página Inicial** → `/` → Visão geral
- **Dashboard** → `/dashboard` → Estatísticas
- **Ranges** → `/ranges` → Estudo de mãos
- **Sessões** → `/sessions` → Adicionar sessão

---

**Lembre-se:**
- Poker é 30% skill, 70% sorte no curto prazo
- No longo prazo (1000+ mãos), o skill vence
- Gestão de bankroll é MAIS importante que skill nas cartas
- Nunca jogue com medo de perder o dinheiro
