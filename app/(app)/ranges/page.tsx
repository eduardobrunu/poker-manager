import SimpleRangeHelper from "@/components/features/SimpleRangeHelper";

// Força renderização dinâmica
export const dynamic = 'force-dynamic';

export default function RangesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Quais Mãos Jogar?
        </h1>
        <p className="text-gray-400">
          Guia rápido para saber o que fazer em cada posição
        </p>
      </div>

      <SimpleRangeHelper />

      {/* Dica Extra */}
      <div className="mt-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Dica de Ouro para Iniciantes</h3>
            <p className="text-gray-300 text-sm">
              Quando estiver em dúvida, <strong className="text-yellow-400">jogue menos mãos</strong>. 
              É melhor foldar uma mão marginal do que perder dinheiro em situações difíceis. 
              Com o tempo você vai entender quando pode ampliar seu range!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
