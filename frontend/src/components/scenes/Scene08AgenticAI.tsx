import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const AGENTS = [
  { id: 'portfolio', name: 'PORTFOLIO AGENT', status: 'SYNCHRONIZED', task: 'Verified 9 multi-broker assets across 5 repositories.' },
  { id: 'risk', name: 'RISK AGENT', status: 'ALERT', task: 'Calculated 28.4% IT concentration (defensive threshold: 25.0%).' },
  { id: 'research', name: 'RESEARCH AGENT', status: 'ACTIVE', task: 'Macro surveillance: RBI neutral corridor, US tech yield volatility.' },
  { id: 'simulation', name: 'SIMULATION AGENT', status: 'STANDBY', task: 'Modeled +₹50k REIT injection: beta drops to 0.94, Sharpe 1.62.' },
  { id: 'alternative', name: 'ALTERNATIVE AGENT', status: 'ACTIVE', task: 'Screened Embassy REIT (7.8%) and Powergrid InvIT (9.4%).' },
];

export const Scene08AgenticAI: React.FC = () => {
  const { setActiveRoute } = usePortfolioStore();
  const [activeQuery, setActiveQuery] = useState('How can I reduce concentration risk?');

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
          MULTI-AGENT EVENT FABRIC
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          InvestOS Orchestrator
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Five specialized quantitative engines coordinating concurrently over unified multi-broker state.
        </p>
      </div>

      <div className="w-full max-w-5xl terminal-panel p-6 border border-white/10 space-y-6">
        {/* Active Dispatch Bar */}
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
          <div className="text-gray-400">
            DISPATCH QUERY: <span className="text-white font-semibold">"{activeQuery}"</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveQuery('How can I reduce concentration risk?')}
              className="px-2 py-1 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              #Concentration
            </button>
            <button
              onClick={() => setActiveQuery('Stress test adverse interest rate hike')}
              className="px-2 py-1 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              #StressTest
            </button>
          </div>
        </div>

        {/* 5-Agent Inter-Communication Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="p-3 border border-white/5 bg-black/40 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-gray-400">{agent.name}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 border ${
                      agent.status === 'ALERT'
                        ? 'border-rose-500/40 text-rose-400'
                        : 'border-emerald-500/40 text-emerald-400'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
                <div className="text-[11px] text-gray-300 mt-2 leading-relaxed">{agent.task}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Consensus Result */}
        <div className="p-4 bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            <span className="text-sky-400 font-semibold block mb-0.5">SYNTHESIZED CONSENSUS:</span>
            IT sector concentration (28.4%) exposes capital to unhedged single-sector shocks. Deploy +₹50k into commercial REITs or trim TCS/INFY by 10% to expand health score to 89.
          </div>

          <button
            onClick={() => setActiveRoute('simulate')}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            EXECUTE IN TWIN
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
