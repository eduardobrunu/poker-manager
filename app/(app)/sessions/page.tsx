'use client';

import { useRouter } from 'next/navigation';
import QuickSessionForm from "@/components/features/QuickSessionForm";
import BeginnerTips from "@/components/features/BeginnerTips";

// Força renderização dinâmica
export const dynamic = 'force-dynamic';

export default function SessionsPage() {
  const router = useRouter();

  const handleSessionSaved = () => {
    // Recarrega para atualizar dados
    router.refresh();
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Registrar Sessão
        </h1>
        <p className="text-gray-400">
          Adicione sua sessão de poker em 3 passos simples
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <QuickSessionForm onSessionSaved={handleSessionSaved} />
        </div>

        {/* Sidebar com Dicas */}
        <div className="lg:col-span-1">
          <BeginnerTips />
        </div>
      </div>
    </main>
  );
}