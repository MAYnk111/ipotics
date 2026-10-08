import React from 'react';
import { motion } from 'framer-motion';

interface SceneProps {
  progress: number;
}

const SOURCES = [
  { broker: 'ZERODHA', val: '₹3,50,300', count: '3 Equities (TCS, HDFCBANK, NIFTYBEES)' },
  { broker: 'GROWW', val: '₹1,50,550', count: '1 Equity (INFY) + 1 REIT (EMBASSY)' },
  { broker: 'ANGEL ONE', val: '₹60,250', count: '1 Equity (ICICIBANK)' },
  { broker: 'UPSTOX', val: '₹1,07,800', count: '1 Equity (RELIANCE)' },
  { broker: 'CAS / NSDL', val: '₹1,73,750', count: '1 InvIT (PGINVIT) + 1 Bond (BHARATBOND)' },
];

export const Scene02FragmentedInvestments: React.FC<SceneProps> = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
          DISPERSED CAPITAL PROBLEM
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white mb-4">
          Your investments are everywhere.
        </h2>
        <p className="text-xl sm:text-2xl text-gray-400 font-light">
          Your intelligence shouldn't be.
        </p>
      </div>

      {/* Structured Financial Source Stream Matrix (Sharp 4px borders, clean telemetry) */}
      <div className="max-w-4xl space-y-2">
        <div className="grid grid-cols-12 text-[10px] font-mono text-gray-500 uppercase px-4 py-2 border-b border-white/10">
          <div className="col-span-3">REPOSITORY</div>
          <div className="col-span-3 text-right">CAPITAL ALLOCATED</div>
          <div className="col-span-6 pl-6">ASSET CLASSES</div>
        </div>

        {SOURCES.map((src, idx) => (
          <motion.div
            key={src.broker}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="grid grid-cols-12 items-center text-xs font-mono px-4 py-3 bg-[#030712]/90 border border-white/5 hover:border-sky-500/30 transition-colors"
          >
            <div className="col-span-3 text-white font-semibold tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-none" />
              {src.broker}
            </div>
            <div className="col-span-3 text-right text-gray-200 font-mono">
              {src.val}
            </div>
            <div className="col-span-6 pl-6 text-gray-400 truncate">
              {src.count}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Convergence Indicator */}
      <div className="mt-8 pt-4 border-t border-white/10 max-w-4xl flex items-center justify-between text-xs font-mono text-gray-400">
        <span className="text-sky-400 font-semibold">→ CONVERGING AT CANONICAL INGESTION POINT</span>
        <span>STATUS: AGGREGATING 5 SOURCES</span>
      </div>
    </div>
  );
};
