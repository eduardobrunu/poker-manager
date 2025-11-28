import Link from "next/link";
import BankrollCalculator from "@/components/features/BankrollCalculator";
import { USD_TO_BRL } from "@/lib/bankroll-calculator";

// Força renderização dinâmica
export const dynamic = 'force-dynamic';

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-green-400">Poker Manager</Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Dashboard
              </Link>
              <Link href="/ranges" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Hand Ranges
              </Link>
              <Link href="/sessions" className="text-white bg-green-600 px-3 py-2 rounded-md">
                Sessões
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h1 className="text-3xl font-bold text-white">
                  Registrar Sessão
                </h1>
              </div>
              <p className="text-gray-400">
                Adicione uma nova sessão de poker ao seu histórico
              </p>
            </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Data */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Tipo de Jogo */}
              <div>
                <label htmlFor="gameType" className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Jogo
                </label>
                <select
                  id="gameType"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Cash Game">Cash Game</option>
                  <option value="Rush & Cash">Rush & Cash (Fast-Fold)</option>
                  <option value="Torneio">Torneio</option>
                  <option value="Spin & Gold">Spin & Gold</option>
                  <option value="Flip & Go">Flip & Go</option>
                  <option value="Mystery Bounty">Mystery Bounty</option>
                  <option value="Sit & Go">Sit & Go</option>
                </select>
              </div>

              {/* Variante */}
              <div>
                <label htmlFor="gameVariant" className="block text-sm font-medium text-gray-300 mb-2">
                  Variante
                </label>
                <select
                  id="gameVariant"
                  defaultValue="Texas Holdem"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Texas Holdem">Texas Hold'em (Recomendado)</option>
                  <option value="Omaha">Omaha (4 cartas)</option>
                  <option value="6+ Short Deck">6+ Short Deck</option>
                  <option value="All-In or Fold">All-In or Fold</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold'em é o mais jogado - 2 cartas na mão</p>
              </div>

              {/* Stakes */}
              <div>
                <label htmlFor="stakes" className="block text-sm font-medium text-gray-300 mb-2">
                  Stakes
                </label>
                <input
                  type="text"
                  id="stakes"
                  placeholder="Ex: NL50, NL100"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Local */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                  Local
                </label>
                <select
                  id="location"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="GGPoker Online">GGPoker Online</option>
                  <option value="GGPoker Live">GGPoker Live</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Buy-in */}
              <div>
                <label htmlFor="buyIn" className="block text-sm font-medium text-gray-300 mb-2">
                  Buy-in
                </label>
                <div className="flex gap-2">
                  <select
                    id="currency"
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="USD">USD $</option>
                    <option value="BRL">BRL R$</option>
                  </select>
                  <input
                    type="number"
                    id="buyIn"
                    placeholder="100.00"
                    step="0.01"
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Cash-out */}
              <div>
                <label htmlFor="cashOut" className="block text-sm font-medium text-gray-300 mb-2">
                  Cash-out
                </label>
                <input
                  type="number"
                  id="cashOut"
                  placeholder="150.00"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Duração */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  id="duration"
                  placeholder="180"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Mãos Jogadas */}
              <div>
                <label htmlFor="handsPlayed" className="block text-sm font-medium text-gray-300 mb-2">
                  Mãos Jogadas (opcional)
                </label>
                <input
                  type="number"
                  id="handsPlayed"
                  placeholder="Ex: 250"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Veja o histórico de mãos no GGPoker para preencher. Ou deixe vazio se não souber.
                </p>
              </div>

              {/* Notas */}
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Notas (opcional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Observações: torneio (GGMasters, WSOP Online), colocação, mãos importantes, etc."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Salvar Sessão
              </button>
              <Link
                href="/dashboard"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-4">Cotação: US$ 1,00 = R$ {USD_TO_BRL.toFixed(2)}</p>
        </div>

        {/* Calculadora rápida */}
        <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-blue-300">Dicas GGPoker</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong className="text-blue-400">Cash Game:</strong> Texas Hold'em tradicional - 60 mãos/hora em média</p>
            <p><strong className="text-blue-400">Rush & Cash:</strong> Hold'em fast-fold - 200 mãos/hora (3x mais rápido!)</p>
            <p><strong className="text-blue-400">Spin & Gold:</strong> Torneio rápido de 3 jogadores com multiplicador aleatório</p>
            <p><strong className="text-blue-400">Flip & Go:</strong> All-in pré-flop, depois joga normal - formato turbo</p>
            <p className="text-xs text-blue-300 mt-3">💡 Dica: Rush & Cash é ótimo para jogar mais mãos em menos tempo!</p>
          </div>
        </div>
      </div>

      {/* Calculadora Lateral */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <BankrollCalculator initialBankrollUSD={100} />
        </div>
      </div>
    </div>
      </main>
    </div>
  );
}