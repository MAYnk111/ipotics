import React from 'react';
import { 
  Layers, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  TrendingUp, 
  DollarSign 
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const DIVERSIFICATION_OPPORTUNITIES = [
  {
    id: 'reit-1',
    name: 'Embassy Office Parks REIT',
    type: 'REIT',
    yield: '7.8% Dividend Yield',
    risk: 'Low to Medium Risk',
    recommended: 50000,
    metrics: { occupancy: '87%', walt: '7.1 Years', rating: 'CRISIL AAA' },
    thesis: 'Premier commercial business parks leased to Fortune 500 multinationals with mandatory 90% NDCF payout distribution.',
  },
  {
    id: 'invit-1',
    name: 'Powergrid Infrastructure InvIT',
    type: 'InvIT',
    yield: '9.4% Cash Flow Yield',
    risk: 'Low Risk',
    recommended: 30000,
    metrics: { availability: '99.8%', contracts: 'Long Term', rating: 'ICRA AAA' },
    thesis: 'Perpetual interstate power transmission assets backed by government off-takers and counterparty security mechanisms.',
  },
  {
    id: 'bond-1',
    name: 'Bharat Bond ETF April 2030',
    type: 'Bond',
    yield: '7.42% YTM',
    risk: 'Sovereign / AAA',
    recommended: 40000,
    metrics: { maturity: 'April 2030', expenseRatio: '0.0005%', rating: 'AAA PSUs' },
    thesis: 'Target maturity debt ETF investing exclusively in AAA-rated public sector undertakings, immune to credit default risk.',
  },
  {
    id: 'reit-2',
    name: 'Brookfield India Real Estate Trust',
    type: 'REIT',
    yield: '8.1% Yield',
    risk: 'Medium Risk',
    recommended: 25000,
    metrics: { occupancy: '84%', footprint: '25.5M sq ft', rating: 'CRISIL AA+' },
    thesis: 'Institutional grade office campuses across Mumbai, NCR, and Kolkata benefiting from institutional IT expansion.',
  },
];

export const AlternativeAssetsPage: React.FC = () => {
  const { addSimulatedInvestment, setActiveRoute } = usePortfolioStore();

  const handleInject = (item: typeof DIVERSIFICATION_OPPORTUNITIES[0]) => {
    addSimulatedInvestment({
      type: 'BUY',
      assetName: item.name,
      assetType: item.type as any,
      amount: item.recommended,
      sector: item.type === 'REIT' ? 'Real Estate / REIT' : item.type === 'InvIT' ? 'Infrastructure / InvIT' : 'Sovereign / Debt',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400">ALTERNATIVE ASSETS</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-950/60 border border-sky-500/30 text-sky-400">
              UNCORRELATED YIELD
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Institutional Diversification Candidates</h1>
          <p className="text-sm text-gray-400 mt-1">
            Discover listed REITs, InvITs, and target-maturity debt to lower equity beta and generate defensive cash yields.
          </p>
        </div>

        <button
          onClick={() => setActiveRoute('simulate')}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors shadow-md shadow-sky-500/20"
        >
          VIEW IN DIGITAL TWIN
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DIVERSIFICATION_OPPORTUNITIES.map((opp) => (
          <div
            key={opp.id}
            className="glass-panel-elevated p-6 rounded-2xl border border-sky-500/20 flex flex-col justify-between hover:border-sky-400/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono font-semibold text-sky-300">
                  {opp.type}
                </span>
                <span className="text-sm font-bold font-mono text-emerald-400">{opp.yield}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">{opp.name}</h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">{opp.thesis}</p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono mb-4">
                {Object.entries(opp.metrics).map(([key, val]) => (
                  <div key={key}>
                    <div className="text-gray-500 uppercase">{key}</div>
                    <div className="text-gray-200 font-bold mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleInject(opp)}
              className="w-full py-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Plus size={14} /> ADD TO DIGITAL TWIN (+₹{opp.recommended.toLocaleString('en-IN')})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
