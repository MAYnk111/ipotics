import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

interface SceneProps {
  progress: number;
}

export const Scene01FinancialWorld: React.FC<SceneProps> = () => {
  const { setActiveRoute } = usePortfolioStore();

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-8 md:p-14 z-10 pointer-events-auto">
      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 tracking-wider">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-none bg-sky-400" />
          <span>INVESTOS // GLOBAL FINANCIAL SYSTEM</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">MARKET FEEDS: NSE / BSE / NSDL</span>
          <span className="text-gray-200">LATENCY: 1.2MS</span>
        </div>
      </div>

      {/* Hero Headline — Restrained, High Editorial Authority */}
      <div className="max-w-4xl my-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-4"
        >
          CONSOLIDATED WEALTH INTELLIGENCE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-none mb-6"
        >
          All your investments.
          <span className="block text-gray-400 font-light mt-1">
            One intelligent layer.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 max-w-xl font-normal leading-relaxed mb-8"
        >
          A unified quantitative operating environment bringing fragmented Indian broker holdings into a live digital twin with real-time risk factoring and cryptographic audit trails.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => setActiveRoute('portfolio')}
            className="px-6 py-3 rounded bg-white text-black font-medium text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            EXPLORE TERMINAL
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveRoute('portfolio')}
            className="px-6 py-3 rounded border border-white/20 bg-transparent text-gray-300 font-medium text-xs tracking-wider uppercase hover:border-white/40 transition-colors cursor-pointer"
          >
            CONNECT BROKERS
          </button>
        </motion.div>
      </div>

      {/* Bottom Financial Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs font-mono">
        <div>
          <div className="text-gray-400 text-[10px]">TOTAL ASSETS MAPPED</div>
          <div className="text-white font-semibold mt-0.5">₹8,42,650</div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px]">CONNECTED REPOSITORIES</div>
          <div className="text-white font-semibold mt-0.5">5 SOURCES (ZR, GW, AO, UP, CAS)</div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px]">ACTIVE FACTOR AGENTS</div>
          <div className="text-sky-400 font-semibold mt-0.5">5 SPECIALIZED ENGINES</div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px]">VERIFICATION STANDARD</div>
          <div className="text-emerald-400 font-semibold mt-0.5">SHA-256 MERKLE ROOT</div>
        </div>
      </div>
    </div>
  );
};
