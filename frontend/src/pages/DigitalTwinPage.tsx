import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalHeader } from '../components/terminal/TerminalHeader';

export const DigitalTwinPage: React.FC = () => {
  const {
    getTotalCurrentValue,
    getSimulatedTotalValue,
    getRiskMetrics,
    addSimulatedInvestment,
    resetSimulation,
    simulatedActions,
    simulatedHoldings,
    holdings,
  } = usePortfolioStore();

  const [contribution, setContribution] = useState<number>(50000);
  const realTotal = getTotalCurrentValue();
  const simTotal = getSimulatedTotalValue();
  const realRisk = getRiskMetrics(false);
  const simRisk = getRiskMetrics(true);

  const handleApplyScenario = (assetName: string, assetType: any, sector: string) => {
    addSimulatedInvestment({
      type: 'BUY',
      assetName,
      assetType,
      amount: contribution,
      sector,
    });
  };

  return (
    <div className="relative min-h-screen text-slate-200 p-6 md:p-8 font-mono bg-transparent">
      <div className="relative z-10 max-w-full space-y-6">
        <TerminalHeader sectionTitle="QUANTITATIVE SANDBOX" subTitle="DIGITAL TWIN ENGINE" />

        {/* PRIMARY VISUAL HERO: Physical Duplication & Simulation Laboratory */}
        <div className="border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold tracking-wider">PARALLEL REALITY ARCHITECTURE</span>
              <span className="text-gray-500">// REAL PORTFOLIO → DIGITAL DUPLICATE → SIMULATED TWIN</span>
            </div>
            {simulatedActions.length > 0 && (
              <button
                onClick={resetSimulation}
                className="text-gray-400 hover:text-white cursor-pointer text-[11px]"
              >
                [ RESET ALL SIMULATED SCENARIOS ]
              </button>
            )}
          </div>

          {/* Visual Digital Duplicate Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: REAL BASELINE (Frozen) */}
            <div className="lg:col-span-5 p-5 border border-white/10 bg-black/40 space-y-4">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10">
                <span className="text-gray-400 font-semibold tracking-wider">REAL PORTFOLIO [BASELINE]</span>
                <span className="text-[10px] text-gray-500 border border-white/10 px-1.5 py-0.2">FROZEN ON-BROKER</span>
              </div>

              <div>
                <div className="text-[10px] text-gray-500 uppercase">REAL CAPITAL</div>
                <div className="text-2xl font-bold text-white mt-0.5">₹{realTotal.toLocaleString('en-IN')}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-500">HEALTH SCORE</div>
                  <div className="text-lg font-bold text-amber-400 mt-0.5">{realRisk.healthScore}/100</div>
                </div>
                <div className="p-2.5 bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-500">SHARPE RATIO</div>
                  <div className="text-lg font-bold text-white mt-0.5">{realRisk.sharpeRatio}</div>
                </div>
                <div className="p-2.5 bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-500">PORTFOLIO BETA</div>
                  <div className="text-lg font-bold text-rose-400 mt-0.5">{realRisk.beta}</div>
                </div>
                <div className="p-2.5 bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-500">VOLATILITY</div>
                  <div className="text-lg font-bold text-white mt-0.5">{realRisk.annualizedVolatility}%</div>
                </div>
              </div>

              <div className="p-2.5 border border-white/5 text-[11px] text-gray-500 leading-snug">
                9 active holdings across Zerodha, Groww, Angel One, Upstox, CAS locked as historical baseline.
              </div>
            </div>

            {/* Center Dynamic Duplicate Ray Arrow */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 text-center">
              <span className="text-[10px] text-sky-400 uppercase tracking-widest block mb-2">DUPLICATE</span>
              <div className="w-full border-t border-dashed border-sky-500/40 my-2" />
              <span className="text-xs text-gray-400 font-mono">LIVE CLONE</span>
            </div>

            {/* Right: DIGITAL TWIN (Interactive Mutable Sandbox) */}
            <div className="lg:col-span-5 p-5 border border-sky-500/30 bg-sky-950/10 space-y-4">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-sky-500/20">
                <span className="text-sky-400 font-semibold tracking-wider">DIGITAL TWIN [MUTABLE SANDBOX]</span>
                <span className="text-[10px] text-sky-300 border border-sky-500/30 px-1.5 py-0.2">SIMULATION LIVE</span>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <div className="text-[10px] text-sky-400 uppercase">SIMULATED CAPITAL</div>
                  <div className="text-2xl font-bold text-white mt-0.5">₹{simTotal.toLocaleString('en-IN')}</div>
                </div>
                {simTotal > realTotal && (
                  <span className="text-xs text-emerald-400">
                    +₹{(simTotal - realTotal).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-sky-950/30 border border-sky-500/20">
                  <div className="text-[10px] text-sky-400">HEALTH SCORE</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">
                    {simRisk.healthScore}/100
                    {simRisk.healthScore > realRisk.healthScore && (
                      <span className="text-xs text-emerald-400 ml-1.5">(+{simRisk.healthScore - realRisk.healthScore})</span>
                    )}
                  </div>
                </div>
                <div className="p-2.5 bg-sky-950/30 border border-sky-500/20">
                  <div className="text-[10px] text-sky-400">SHARPE RATIO</div>
                  <div className="text-lg font-bold text-white mt-0.5">{simRisk.sharpeRatio}</div>
                </div>
                <div className="p-2.5 bg-sky-950/30 border border-sky-500/20">
                  <div className="text-[10px] text-sky-400">PORTFOLIO BETA</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">{simRisk.beta}</div>
                </div>
                <div className="p-2.5 bg-sky-950/30 border border-sky-500/20">
                  <div className="text-[10px] text-sky-400">VOLATILITY</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">{simRisk.annualizedVolatility}%</div>
                </div>
              </div>

              {/* Dynamic Interactive Rebalance Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">CONTRIBUTION SIZE:</span>
                  <div className="flex gap-1.5">
                    {[10000, 25000, 50000, 100000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setContribution(amt)}
                        className={`px-2 py-0.5 text-[11px] cursor-pointer ${
                          contribution === amt ? 'bg-sky-500 text-black font-semibold' : 'border border-white/10 text-gray-400'
                        }`}
                      >
                        ₹{amt / 1000}K
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleApplyScenario('Embassy Office Parks REIT', 'REIT', 'Real Estate / REIT')}
                    className="p-2 border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-left cursor-pointer transition-colors"
                  >
                    + REIT (Commercial Yield)
                  </button>
                  <button
                    onClick={() => handleApplyScenario('Powergrid Infrastructure InvIT', 'InvIT', 'Infrastructure / InvIT')}
                    className="p-2 border border-white/20 bg-white/5 hover:bg-white/10 text-gray-200 text-left cursor-pointer transition-colors"
                  >
                    + INVIT (Power Distribution)
                  </button>
                  <button
                    onClick={() => handleApplyScenario('Bharat Bond ETF 2030', 'Bond', 'Sovereign / Debt')}
                    className="p-2 border border-white/20 bg-white/5 hover:bg-white/10 text-gray-200 text-left cursor-pointer transition-colors"
                  >
                    + AAA BOND ETF (Fixed YTM)
                  </button>
                  <button
                    onClick={() => handleApplyScenario('Nifty BeES ETF', 'ETF', 'Broad Market')}
                    className="p-2 border border-white/20 bg-white/5 hover:bg-white/10 text-gray-200 text-left cursor-pointer transition-colors"
                  >
                    + NIFTY BEES (Index Core)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
