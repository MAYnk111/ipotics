import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalHeader } from '../components/terminal/TerminalHeader';

const AGENTS = [
  { id: 'portfolio', name: 'PORTFOLIO AGENT', status: 'ACTIVE', role: 'Holdings Audit', desc: 'Normalized 9 positions across 5 broker nodes.' },
  { id: 'risk', name: 'RISK AGENT', status: 'ALERT', role: 'Factor Ceiling', desc: 'IT sector at 28.4% breaches 25% defensive limit.' },
  { id: 'research', name: 'RESEARCH AGENT', status: 'ACTIVE', role: 'Macro Surveillance', desc: 'Evaluating inflation cushion in commercial real estate.' },
  { id: 'simulation', name: 'SIMULATION AGENT', status: 'ACTIVE', role: 'Scenario Rebalance', desc: 'Modeled +₹50k REIT injection: Sharpe reaches 1.62.' },
  { id: 'alt_asset', name: 'ALT ASSET AGENT', status: 'ACTIVE', role: 'Yield Screening', desc: 'Screened Embassy REIT (7.8%) and Powergrid InvIT (9.4%).' },
];

export const AIAssistantPage: React.FC = () => {
  const { setActiveRoute } = usePortfolioStore();
  const [activeQuery, setActiveQuery] = useState('How can I reduce concentration risk?');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState<number | null>(null);

  const handleAsk = (query: string) => {
    setActiveQuery(query);
    setIsProcessing(true);
    setActiveAgentIndex(0);

    // Sequential agent activation animation
    const interval = setInterval(() => {
      setActiveAgentIndex((prev) => {
        if (prev === null || prev >= AGENTS.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return null;
        }
        return prev + 1;
      });
    }, 400);
  };

  return (
    <div className="relative min-h-screen text-slate-200 p-6 md:p-8 font-mono bg-transparent">
      <div className="relative z-10 max-w-full space-y-6">
        <TerminalHeader sectionTitle="AI OPERATIONS ROOM" subTitle="INVESTOS ORCHESTRATOR" />

        {/* PRIMARY VISUAL HERO: Agent Orchestrator Operations Room HUD */}
        <div className="border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-violet-400 rounded-none animate-pulse" />
              <span className="text-white font-semibold tracking-wider">INVESTOS ORCHESTRATION FABRIC</span>
            </div>
            <span className="text-violet-400 text-xs">5 QUANTITATIVE ENGINES CONNECTED</span>
          </div>

          {/* Central Orchestrator & Connected Operational Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 pt-2">
            {AGENTS.map((ag, idx) => {
              const isWorking = activeAgentIndex === idx || (isProcessing && activeAgentIndex !== null);
              return (
                <div
                  key={ag.id}
                  className={`p-3.5 border transition-all duration-300 text-xs ${
                    activeAgentIndex === idx
                      ? 'border-violet-400 bg-violet-950/30'
                      : ag.status === 'ALERT'
                      ? 'border-rose-500/30 bg-black/40'
                      : 'border-white/10 bg-black/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-400 uppercase">{ag.name}</span>
                    <span className={`text-[9px] px-1 py-0.2 border ${
                      ag.status === 'ALERT' ? 'border-rose-500/40 text-rose-400' : 'border-emerald-500/40 text-emerald-400'
                    }`}>
                      {ag.status}
                    </span>
                  </div>
                  <div className="text-white font-semibold text-xs mt-1">{ag.role}</div>
                  <div className="text-[11px] text-gray-400 mt-1 leading-relaxed">{ag.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Synthesis Console & Actions */}
          <div className="p-4 border border-violet-500/30 bg-violet-950/20 text-xs space-y-3 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-violet-500/20 pb-2">
              <span className="text-violet-300 font-semibold uppercase tracking-wider">
                SYNTHESIZED QUANTITATIVE DIRECTIVE
              </span>
              <span className="text-gray-400 text-[11px]">QUERY: "{activeQuery}"</span>
            </div>

            <p className="text-gray-200 text-sm leading-relaxed">
              Information Technology concentration (28.4%) exceeds defensive threshold. Combined consensus of 5 specialized agents recommends deploying +₹50k into commercial REITs to reduce portfolio beta to 0.94 and elevate health score to 89.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveRoute('simulate')}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                SIMULATE REBALANCE IN TWIN →
              </button>
              <button
                onClick={() => setActiveRoute('analysis')}
                className="px-4 py-2 border border-white/20 text-gray-200 hover:text-white text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                EXPLAIN DEFENSIVE CEILING
              </button>
              <button
                onClick={() => setActiveRoute('discover')}
                className="px-4 py-2 border border-white/20 text-gray-200 hover:text-white text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                DISCOVER YIELD ASSETS
              </button>
            </div>
          </div>
        </div>

        {/* Preset Query Dispatcher */}
        <div className="border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-4 text-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-gray-400">DISPATCH TEST SCENARIOS:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAsk('How can I reduce concentration risk?')}
              className="px-3 py-1.5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            >
              #ReduceConcentration
            </button>
            <button
              onClick={() => handleAsk('Stress-test equity downside in rate hike')}
              className="px-3 py-1.5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            >
              #DownsideStressTest
            </button>
            <button
              onClick={() => handleAsk('Find uncorrelated cash flow assets')}
              className="px-3 py-1.5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            >
              #UncorrelatedYield
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
