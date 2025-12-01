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
          <span className="text-3xl">💡</span>
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
