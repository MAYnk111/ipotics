import React from 'react';
import { motion } from 'framer-motion';
import { Plus, RotateCcw } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

export const Scene05DigitalTwin: React.FC = () => {
  const {
    getTotalCurrentValue,
    getSimulatedTotalValue,
    getRiskMetrics,
    addSimulatedInvestment,
    resetSimulation,
    simulatedActions,
  } = usePortfolioStore();

  const realTotal = getTotalCurrentValue();
  const simTotal = getSimulatedTotalValue();
  const realRisk = getRiskMetrics(false);
  const simRisk = getRiskMetrics(true);

  const handleAddREIT = () => {
    addSimulatedInvestment({
      type: 'BUY',
      assetName: 'Embassy Office Parks REIT',
      assetType: 'REIT',
      amount: 50000,
      sector: 'Real Estate / REIT',
    });
  };

  const handleAddInvIT = () => {
    addSimulatedInvestment({
      type: 'BUY',
      assetName: 'Powergrid Infrastructure InvIT',
      assetType: 'InvIT',
      amount: 30000,
      sector: 'Infrastructure / InvIT',
    });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
          PARALLEL REALITY SIMULATION
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          Before you invest. <span className="text-gray-400 font-light">Simulate it.</span>
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Duplicating baseline holdings into a live zero-risk twin. Test capital reallocations before executing on-broker.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Real Portfolio (Frozen) */}
        <div className="terminal-panel p-6 border border-white/10 opacity-75">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
            <span className="text-gray-400 uppercase tracking-wider">REAL PORTFOLIO // BASELINE</span>
            <span className="px-2 py-0.5 border border-white/20 text-gray-400 text-[10px]">
              LOCKED
            </span>
          </div>

          <div className="space-y-4 font-mono">
            <div>
              <div className="text-[10px] text-gray-500 uppercase">CAPITAL</div>
              <div className="text-2xl font-semibold text-white mt-0.5">
                ₹{realTotal.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-gray-500">HEALTH</div>
                <div className="text-lg font-semibold text-amber-400 mt-0.5">{realRisk.healthScore}/100</div>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-gray-500">SHARPE</div>
                <div className="text-lg font-semibold text-white mt-0.5">{realRisk.sharpeRatio}</div>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-gray-500">BETA RISK</div>
                <div className="text-lg font-semibold text-rose-400 mt-0.5">{realRisk.beta}</div>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-gray-500">VOLATILITY</div>
                <div className="text-lg font-semibold text-white mt-0.5">{realRisk.annualizedVolatility}%</div>
              </div>
            </div>

            <div className="p-3 bg-white/[0.01] border border-white/5 text-[11px] text-gray-400">
              STATUS: IT Sector concentration 28.4% exceeds defensive threshold.
            </div>
          </div>
        </div>

        {/* Right Side: Digital Twin (Interactive Sandbox) */}
        <motion.div
          animate={{
            borderColor: simulatedActions.length > 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)',
          }}
          className="terminal-panel p-6 border transition-colors bg-[#030816]/90"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
            <span className="text-sky-400 uppercase tracking-wider font-semibold">DIGITAL TWIN // LIVE SANDBOX</span>
            <span className="px-2 py-0.5 border border-sky-500/30 text-sky-400 text-[10px]">
              MUTABLE
            </span>
          </div>

          <div className="space-y-4 font-mono">
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-[10px] text-gray-500 uppercase">SIMULATED CAPITAL</div>
                <div className="text-2xl font-semibold text-white mt-0.5">
                  ₹{simTotal.toLocaleString('en-IN')}
                </div>
              </div>
              {simTotal > realTotal && (
                <span className="text-xs text-emerald-400">
                  +₹{(simTotal - realTotal).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-sky-950/20 border border-sky-500/20">
                <div className="text-[10px] text-sky-400">HEALTH</div>
                <div className="text-lg font-semibold text-emerald-400 mt-0.5">
                  {simRisk.healthScore}/100
                  {simRisk.healthScore > realRisk.healthScore && (
                    <span className="text-xs text-emerald-400 ml-1.5">(+{simRisk.healthScore - realRisk.healthScore})</span>
                  )}
                </div>
              </div>
              <div className="p-3 bg-sky-950/20 border border-sky-500/20">
                <div className="text-[10px] text-sky-400">SHARPE</div>
                <div className="text-lg font-semibold text-white mt-0.5">{simRisk.sharpeRatio}</div>
              </div>
              <div className="p-3 bg-sky-950/20 border border-sky-500/20">
                <div className="text-[10px] text-sky-400">BETA RISK</div>
                <div className="text-lg font-semibold text-emerald-400 mt-0.5">{simRisk.beta}</div>
              </div>
              <div className="p-3 bg-sky-950/20 border border-sky-500/20">
                <div className="text-[10px] text-sky-400">VOLATILITY</div>
                <div className="text-lg font-semibold text-emerald-400 mt-0.5">{simRisk.annualizedVolatility}%</div>
              </div>
            </div>

            {/* Interactive Scenario Controls */}
            <div className="pt-2">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                Simulate Capital Decisions:
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={handleAddREIT}
                  className="px-3 py-1.5 border border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 cursor-pointer transition-colors flex items-center gap-1 font-mono"
                >
                  <Plus size={12} /> + ₹50,000 REIT
                </button>
                <button
                  onClick={handleAddInvIT}
                  className="px-3 py-1.5 border border-white/20 bg-white/5 text-gray-200 hover:bg-white/10 cursor-pointer transition-colors flex items-center gap-1 font-mono"
                >
                  <Plus size={12} /> + ₹30,000 INVIT
                </button>
                {simulatedActions.length > 0 && (
                  <button
                    onClick={resetSimulation}
                    className="px-3 py-1.5 border border-white/10 text-gray-400 hover:text-white cursor-pointer transition-colors flex items-center gap-1 font-mono"
                  >
                    <RotateCcw size={12} /> RESET
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
