'use client';

import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      href: '/sessions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      title: 'Nova Sessão',
      desc: 'Registrar partida',
      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-400',
      iconBg: 'bg-green-500/20 text-green-400',
    },
    {
      href: '/ranges',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Hand Ranges',
      desc: 'O que jogar?',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-400',
      iconBg: 'bg-blue-500/20 text-blue-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={`bg-gradient-to-br ${action.color} border rounded-2xl p-5 transition-all hover:scale-[1.02] active:scale-[0.98]`}
        >
          <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center mb-3`}>
            {action.icon}
          </div>
          <h3 className="font-bold text-white">{action.title}</h3>
          <p className="text-xs text-gray-400">{action.desc}</p>
        </Link>
      ))}
    </div>
  );
}
