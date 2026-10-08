import React from 'react';
import { ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

export const Scene10FinalCTA: React.FC = () => {
  const { setActiveRoute } = usePortfolioStore();

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl">
        <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-3">
          CONVERGENCE REALITY
        </div>
        <h2 className="text-5xl sm:text-7xl font-medium tracking-tight text-white mb-4">
          Your portfolio is fragmented.
          <span className="block text-gray-500 font-light mt-1">
            Your intelligence shouldn't be.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 max-w-xl font-normal leading-relaxed mb-8">
          Enter the live terminal. Run multi-broker simulations, discover historically similar candlestick patterns, and stress-test every allocation with zero capital risk.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveRoute('portfolio')}
            className="px-6 py-3.5 bg-white text-black font-medium text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer font-mono"
          >
            EXPLORE DEMO TERMINAL
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveRoute('portfolio')}
            className="px-6 py-3.5 border border-white/20 bg-transparent text-gray-300 font-medium text-xs tracking-wider uppercase hover:border-white/40 transition-colors cursor-pointer font-mono"
          >
            CONNECT ACCOUNTS
          </button>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap gap-8 text-[11px] font-mono text-gray-500">
          <span>// SOC2 & ISO COMPLIANT</span>
          <span>// CLIENT-SIDE SIMULATION ENGINE</span>
          <span>// ZERO COMMITTED REAL CAPITAL RISK</span>
        </div>
      </div>
    </div>
  );
};
