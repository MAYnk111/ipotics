import React from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Copy, 
  Search, 
  Layers, 
  Bot 
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export const DashboardOverviewPage: React.FC = () => {
  const { 
    getTotalCurrentValue, 
    getTotalPnL, 
    getRiskMetrics, 
    holdings, 
    setActiveRoute,
    getAssetAllocations 
  } = usePortfolioStore();

  const totalValue = getTotalCurrentValue();
  const totalPnL = getTotalPnL();
  const risk = getRiskMetrics(false);
  const allocations = getAssetAllocations(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-sky-400">INVESTOS TERMINAL</span>
          <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Executive Investment Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Unified multi-broker surveillance across Indian equities, REITs, InvITs, and debt.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveRoute('simulate')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-sky-500/20"
          >
            LAUNCH DIGITAL TWIN
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs font-mono text-gray-400 uppercase">PORTFOLIO VALUATION</div>
          <div className="text-3xl font-bold font-mono text-white mt-1">₹{totalValue.toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-400 font-mono mt-1">+₹{totalPnL.toLocaleString('en-IN')} (+13.9%)</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs font-mono text-gray-400 uppercase">HEALTH SCORE</div>
          <div className="text-3xl font-bold font-mono text-amber-400 mt-1">{risk.healthScore} / 100</div>
          <div className="text-xs text-amber-300 font-mono mt-1">Defensive Ceiling Warning</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs font-mono text-gray-400 uppercase">SHARPE RATIO</div>
          <div className="text-3xl font-bold font-mono text-white mt-1">{risk.sharpeRatio}</div>
          <div className="text-xs text-gray-400 font-mono mt-1">Risk Adjusted Alpha</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs font-mono text-gray-400 uppercase">BROKER NODES</div>
          <div className="text-3xl font-bold font-mono text-sky-400 mt-1">5 SOURCES</div>
          <div className="text-xs text-gray-400 font-mono mt-1">Zerodha, Groww, Angel, Upstox, CAS</div>
        </div>
      </div>

      {/* Fast Navigation Shortcut Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveRoute('analysis')}
          className="glass-panel-elevated p-6 rounded-2xl border border-white/10 hover:border-rose-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <Activity size={22} className="text-rose-400 group-hover:scale-110 transition-transform" />
            <ArrowRight size={16} className="text-gray-500 group-hover:text-rose-400 transition-colors" />
          </div>
          <h2 className="text-lg font-bold text-white">Portfolio Doctor</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Diagnose 28.4% IT concentration exposure and test defensive ceiling fixes.
          </p>
        </div>

        <div 
          onClick={() => setActiveRoute('simulate')}
          className="glass-panel-elevated p-6 rounded-2xl border border-white/10 hover:border-sky-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <Copy size={22} className="text-sky-400 group-hover:scale-110 transition-transform" />
            <ArrowRight size={16} className="text-gray-500 group-hover:text-sky-400 transition-colors" />
          </div>
          <h2 className="text-lg font-bold text-white">Digital Twin Sandbox</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Test reallocating +₹50k into commercial REITs without risking real broker capital.
          </p>
        </div>

        <div 
          onClick={() => setActiveRoute('discover')}
          className="glass-panel-elevated p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <Search size={22} className="text-violet-400 group-hover:scale-110 transition-transform" />
            <ArrowRight size={16} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
          </div>
          <h2 className="text-lg font-bold text-white">Pattern Discovery</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Search 15-year historical candlestick analog library using DTW correlation algorithms.
          </p>
        </div>
      </div>
    </div>
  );
};
