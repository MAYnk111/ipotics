import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';

export const Scene03UnifiedPortfolio: React.FC = () => {
  const { getTotalCurrentValue, getTotalPnL, getAssetAllocations, getSectorExposures, holdings } = usePortfolioStore();

  const totalValue = getTotalCurrentValue();
  const totalPnL = getTotalPnL();
  const allocations = getAssetAllocations();
  const sectors = getSectorExposures();

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
          CONVERGENCE REALIZED
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          Everything in one view.
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Normalized assets, consolidated P&L, real-time exposure and live liquidity metrics assembled from the global stream.
        </p>
      </div>

      {/* Professional Bloomberg Terminal Viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl terminal-panel p-6 border border-white/10"
      >
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">PORTFOLIO VALUATION</div>
              <div className="text-3xl font-semibold text-white font-mono mt-0.5">
                ₹{totalValue.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="pl-6 border-l border-white/10">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">TOTAL RETURN (P&L)</div>
              <div className="text-xl font-semibold text-emerald-400 font-mono mt-0.5">
                +₹{totalPnL.toLocaleString('en-IN')} <span className="text-xs">(+13.92%)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300">
              HEALTH: <span className="text-amber-400 font-bold">78 / 100</span>
            </div>
            <div className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
              STATE: SYNCHRONIZED
            </div>
          </div>
        </div>

        {/* 3 Column Data Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Asset Class Allocation */}
          <div className="border border-white/5 p-4 bg-black/40">
            <div className="text-[11px] font-mono uppercase text-gray-400 tracking-wider mb-4 pb-2 border-b border-white/5">
              Asset Allocation
            </div>
            <div className="space-y-3">
              {allocations.map((a) => (
                <div key={a.type}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">{a.type}</span>
                    <span className="text-white font-semibold">{a.percentage}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: `${a.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Exposure */}
          <div className="border border-white/5 p-4 bg-black/40">
            <div className="text-[11px] font-mono uppercase text-gray-400 tracking-wider mb-4 pb-2 border-b border-white/5">
              Sector Exposure
            </div>
            <div className="space-y-2.5">
              {sectors.slice(0, 5).map((s) => (
                <div key={s.sector} className="flex justify-between items-center text-xs font-mono py-1 border-b border-white/5 last:border-0">
                  <span className="text-gray-300 truncate max-w-[160px]">{s.sector}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${s.percentage > 25 ? 'text-rose-400' : 'text-gray-200'}`}>
                      {s.percentage}%
                    </span>
                    {s.warning && <span className="text-[10px] text-rose-400">!</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Normalized Multi-Broker Holdings */}
          <div className="border border-white/5 p-4 bg-black/40">
            <div className="flex justify-between items-center text-[11px] font-mono uppercase text-gray-400 tracking-wider mb-4 pb-2 border-b border-white/5">
              <span>Holdings ({holdings.length})</span>
              <span className="text-sky-400 text-[10px]">NORMALIZED</span>
            </div>
            <div className="space-y-2">
              {holdings.slice(0, 4).map((h) => (
                <div key={h.id} className="flex justify-between items-center text-xs p-1.5 border border-white/5 bg-white/[0.01]">
                  <div>
                    <span className="font-mono text-white font-semibold mr-1.5">{h.ticker}</span>
                    <span className="text-[10px] text-gray-500 font-mono">[{h.sourceBroker}]</span>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-gray-200">₹{h.currentValue.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-emerald-400">+{h.pnlPercentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Ledger Telemetry */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span>CONSENSUS SNAPSHOT: ZR-GW-AO-UP-CAS // COMPLETE</span>
          <span className="text-gray-400">ISIN NORMALIZED // ZERO REPLICATION</span>
        </div>
      </motion.div>
    </div>
  );
};
