'use client';

import { PokerSession } from '@/types/session';
import { formatCurrency } from '@/lib/session-api';

interface SessionHistoryProps {
  sessions: PokerSession[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stakes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Buy-in
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cash-out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Profit/Loss
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Duração
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(session.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {session.gameType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {session.stakes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatCurrency(session.buyIn, session.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatCurrency(session.cashOut, session.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  <span className={session.profit >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {session.profit >= 0 ? '+' : ''}
                    {formatCurrency(session.profit, session.currency)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {Math.floor(session.duration / 60)}h {session.duration % 60}min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
