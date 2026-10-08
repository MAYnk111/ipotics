import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalHeader } from '../components/terminal/TerminalHeader';

export const PortfolioDoctorPage: React.FC = () => {
  const { getRiskMetrics, getSectorExposures, setActiveRoute, addSimulatedInvestment } = usePortfolioStore();
  const [isSimulatedRebalance, setIsSimulatedRebalance] = useState(false);

  const metrics = getRiskMetrics(isSimulatedRebalance);
  const sectors = getSectorExposures(isSimulatedRebalance);

  const handleSimulateRebalance = () => {
    setIsSimulatedRebalance(true);
    addSimulatedInvestment({
      type: 'BUY',
      assetName: 'Embassy Office Parks REIT',
      assetType: 'REIT',
      amount: 50000,
      sector: 'Real Estate / REIT',
    });
  };

  // Radial calculation for health score SVG arc
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (metrics.healthScore / 100) * circumference;

  return (
    <div className="relative min-h-screen text-slate-200 p-6 md:p-8 font-mono bg-transparent">
      <div className="relative z-10 max-w-full space-y-6">
        <TerminalHeader sectionTitle="PORTFOLIO DOCTOR" subTitle="DIAGNOSTIC AUDIT" />

        {/* PRIMARY VISUAL HERO: Radial Portfolio Doctor Diagnostic HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-6">
          {/* Center Radial Health Score */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Dynamic Health Arc */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke={isSimulatedRebalance ? '#10b981' : '#f59e0b'}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">HEALTH</span>
                <span className={`text-4xl font-bold font-mono transition-colors duration-500 ${
                  isSimulatedRebalance ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {metrics.healthScore}
                </span>
                <span className="text-[11px] text-gray-500 font-mono">/ 100</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className={`text-xs px-2.5 py-0.5 border ${
                isSimulatedRebalance
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                  : 'border-amber-500/40 text-amber-400 bg-amber-950/20'
              }`}>
                {isSimulatedRebalance ? 'DEFENSIVE REBALANCE ACTIVE' : 'MODERATE CONCENTRATION ALERT'}
              </span>
            </div>
          </div>

          {/* Surrounding Quantitative Gauges */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 border border-white/5 bg-black/40">
              <div className="text-[10px] text-gray-500 uppercase">SHARPE RATIO</div>
              <div className="text-xl font-bold text-white mt-1">{metrics.sharpeRatio}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">+0.45 ABOVE RFR</div>
            </div>

            <div className="p-3 border border-white/5 bg-black/40">
              <div className="text-[10px] text-gray-500 uppercase">PORTFOLIO BETA</div>
              <div className={`text-xl font-bold mt-1 ${isSimulatedRebalance ? 'text-emerald-400' : 'text-rose-400'}`}>
                {metrics.beta}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">VS NIFTY 50</div>
            </div>

            <div className="p-3 border border-white/5 bg-black/40">
              <div className="text-[10px] text-gray-500 uppercase">ANNUAL VOLATILITY</div>
              <div className="text-xl font-bold text-white mt-1">{metrics.annualizedVolatility}%</div>
              <div className="text-[10px] text-gray-400 mt-0.5">252-DAY ROLLING</div>
            </div>

            <div className="p-3 border border-white/5 bg-black/40">
              <div className="text-[10px] text-gray-500 uppercase">MAX DRAWDOWN</div>
              <div className="text-xl font-bold text-rose-400 mt-1">{metrics.maxDrawdown}%</div>
              <div className="text-[10px] text-gray-400 mt-0.5">STRESS VALUE</div>
            </div>
          </div>
        </div>

        {/* Dynamic Sector Exposure with Defensive Ceiling Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-5 space-y-4">
            <div className="pb-3 border-b border-white/10 flex justify-between items-center text-xs">
              <span className="text-white font-semibold tracking-wider">SECTOR CONCENTRATION AUDIT</span>
              <span className="text-rose-400 text-[11px] font-mono">DEFENSIVE CEILING: 25.0%</span>
            </div>

            <div className="space-y-3">
              {sectors.map((sec) => (
                <div key={sec.sector} className="p-3 border border-white/5 bg-black/40 text-xs">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-gray-200">{sec.sector}</span>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-gray-400">₹{sec.value.toLocaleString('en-IN')}</span>
                      <span className={`font-semibold ${sec.percentage > 25 ? 'text-rose-400' : 'text-gray-200'}`}>
                        {sec.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 relative">
                    {/* Defensive ceiling 25% marker needle */}
                    <div className="absolute top-0 bottom-0 left-[25%] w-0.5 bg-rose-500 z-10" title="25% Defensive Threshold" />
                    <div
                      className={`h-full transition-all duration-500 ${
                        sec.percentage > 25 ? 'bg-rose-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.min(100, sec.percentage * 2.5)}%` }}
                    />
                  </div>
                  {sec.warning && (
                    <div className="text-[11px] text-rose-400 mt-1.5">
                      ⚠ {sec.warning} (TCS + INFY cross-broker holdings)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Rebalance Simulation Engine Trigger */}
          <div className="lg:col-span-5 border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-5 space-y-4">
            <div className="pb-3 border-b border-white/10 text-xs text-white font-semibold tracking-wider">
              DOCTOR PRESCRIPTION ENGINE
            </div>

            <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <span className="text-rose-400 font-semibold block mb-1">DEFENSIVE VIOLATION:</span>
                Information Technology allocation of 28.4% exposes portfolio to asymmetric tech corrections.
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                <span className="font-semibold block mb-1">CORRECTIVE ACTION:</span>
                Inject +₹50,000 into Commercial Real Estate (REIT) or Sovereign Infrastructure (InvIT) to normalize portfolio beta below 1.0.
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleSimulateRebalance}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                {isSimulatedRebalance ? 'REBALANCE APPLIED (HEALTH: 89)' : 'SIMULATE REBALANCE IN-PLACE'}
              </button>

              <button
                onClick={() => setActiveRoute('simulate')}
                className="w-full py-2 border border-white/20 text-gray-300 hover:text-white text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                OPEN FULL DIGITAL TWIN SANDBOX →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
