import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

export const Scene04PortfolioDoctor: React.FC = () => {
  const { getRiskMetrics, getSectorExposures, setActiveRoute } = usePortfolioStore();
  const metrics = getRiskMetrics(false);
  const sectors = getSectorExposures(false);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">
          DIAGNOSTIC SURVEILLANCE
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          Portfolio Doctor
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Real-time risk factoring: detecting factor concentration, beta correlation, and defensive ceiling enforcement.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Quantitative Ratios Table */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:col-span-5 terminal-panel p-6 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              HEALTH COMPOSITE
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-mono font-semibold text-white">{metrics.healthScore}</span>
              <span className="text-sm font-mono text-gray-500">/ 100</span>
              <span className="text-xs px-2 py-0.5 border border-amber-500/30 text-amber-400 font-mono">
                CONCENTRATION WARN
              </span>
            </div>

            <div className="space-y-3 mt-6 border-t border-white/10 pt-4 font-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">SHARPE RATIO</span>
                <span className="text-white font-semibold">{metrics.sharpeRatio}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">BETA FACTOR</span>
                <span className="text-rose-400 font-semibold">{metrics.beta} (High Sensitivity)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">ANNUAL VOLATILITY</span>
                <span className="text-white font-semibold">{metrics.annualizedVolatility}%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">MAX DRAWDOWN RISK</span>
                <span className="text-rose-400 font-semibold">{metrics.maxDrawdown}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[10px] font-mono text-gray-500 flex justify-between">
            <span>MONTE CARLO SIM: 10,000 RUNS</span>
            <span className="text-emerald-400">CONVERGED</span>
          </div>
        </motion.div>

        {/* Right: Defensive Ceiling Breach Warning */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:col-span-7 terminal-panel p-6 border border-rose-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest mb-1">
              DEFENSIVE CEILING BREACH DETECTED
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              IT Concentration exceeds 25.0% defensive ceiling (Actual: 28.4%)
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-6 font-mono">
              Combined exposure in TCS (Zerodha) and INFY (Groww) totals ₹2,39,250. This creates an unhedged drawdown vulnerability to US tech earnings shocks.
            </p>

            {/* Sector Breakdown */}
            <div className="space-y-2 mb-6 font-mono text-xs">
              {sectors.map((sec) => (
                <div key={sec.sector} className="p-2 border border-white/5 bg-black/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300">{sec.sector}</span>
                    <span className={`font-semibold ${sec.percentage > 25 ? 'text-rose-400' : 'text-gray-200'}`}>
                      {sec.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden">
                    <div
                      className={`h-full ${sec.percentage > 25 ? 'bg-rose-500' : 'bg-sky-500'}`}
                      style={{ width: `${Math.min(100, sec.percentage * 2.5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Prescription */}
          <div className="p-3 bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
            <div className="text-xs font-mono text-gray-300">
              PRESCRIPTION: <span className="text-white">Reallocate +₹50k into commercial REIT / InvIT assets</span>
            </div>

            <button
              onClick={() => setActiveRoute('simulate')}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              SIMULATE
              <ArrowRight size={13} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
