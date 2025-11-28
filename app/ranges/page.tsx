import Link from "next/link";
import HandRangeGrid from "@/components/features/HandRangeGrid";

// Força renderização dinâmica
export const dynamic = 'force-dynamic';

export default function RangesPage() {
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
              <Link href="/ranges" className="text-white bg-green-600 px-3 py-2 rounded-md">
                Hand Ranges
              </Link>
              <Link href="/sessions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Sessões
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-3xl font-bold text-white">
              Hand Range Helper - Texas Hold'em
            </h1>
          </div>
          <p className="text-gray-400">
            Quais mãos jogar em cada posição (2 cartas na mão). Otimizado para Cash Game e Rush & Cash.
          </p>
          <p className="text-xs text-green-400 mt-1">
            ✓ Não serve para Omaha (4 cartas)
          </p>
        </div>

        <HandRangeGrid />

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white">Dicas de Uso</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">●</span>
                <span><strong className="text-green-400">3-bet</strong> = Re-raise (fazer raise depois que alguém já deu raise)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">●</span>
                <span><strong className="text-green-400">Raise</strong> = Abrir com raise quando ninguém entrou no pote</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">●</span>
                <span><strong className="text-blue-400">Call</strong> = Pagar quando alguém já deu raise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">●</span>
                <span><strong className="text-gray-400">Fold</strong> = Descartar a mão</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-bold text-white">Como Ler</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong>AA, KK</strong> = Pares (pocket pairs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong>AKs</strong> = Áz-Rei <span className="text-green-400">suited</span> (mesmo naipe) ♠️♠️</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong>AKo</strong> = Áz-Rei <span className="text-blue-400">offsuit</span> (naipes diferentes) ♠️♥️</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Quanto melhor a posição (BTN), mais mãos você pode jogar</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
