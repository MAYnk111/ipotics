import React from 'react';
import { Plus } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const ASSET_CLASSES = [
  {
    name: 'Embassy Office Parks REIT',
    type: 'REIT',
    yield: '7.8% Dividend Yield',
    correlation: '0.24 vs Nifty',
    rating: 'CRISIL AAA',
    recommendedAdd: 50000,
    desc: 'Commercial business park campuses with 90% mandatory cash flow dividend distributions.',
  },
  {
    name: 'Powergrid Infrastructure InvIT',
    type: 'InvIT',
    yield: '9.4% Cash Flow Yield',
    correlation: '0.18 vs Nifty',
    rating: 'ICRA AAA',
    recommendedAdd: 30000,
    desc: 'Interstate power transmission assets backed by sovereign counterparty payment security.',
  },
  {
    name: 'Bharat Bond ETF April 2030',
    type: 'Bond',
    yield: '7.42% YTM',
    correlation: '-0.12 vs Nifty',
    rating: 'AAA Sovereign Backed',
    recommendedAdd: 40000,
    desc: 'Target-maturity debt fund holding AAA public sector enterprise paper.',
  },
];

export const Scene07AlternativeAssets: React.FC = () => {
  const { addSimulatedInvestment } = usePortfolioStore();

  const handleAdd = (asset: typeof ASSET_CLASSES[0]) => {
    addSimulatedInvestment({
      type: 'BUY',
      assetName: asset.name,
      assetType: asset.type as any,
      amount: asset.recommendedAdd,
      sector: asset.type === 'REIT' ? 'Real Estate / REIT' : asset.type === 'InvIT' ? 'Infrastructure / InvIT' : 'Sovereign / Debt',
    });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
          UNCORRELATED YIELD GENERATION
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          Alternative Yield Assets
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Discover commercial REITs, infrastructure InvITs, and target-maturity bonds to hedge equity beta and capture defensive distributions.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {ASSET_CLASSES.map((asset) => (
          <div
            key={asset.name}
            className="terminal-panel p-5 border border-white/10 flex flex-col justify-between hover:border-sky-500/30 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs font-mono">
                <span className="px-1.5 py-0.5 border border-white/20 text-gray-300 text-[10px]">{asset.type}</span>
                <span className="text-emerald-400 font-semibold">{asset.yield}</span>
              </div>

              <h3 className="text-base font-semibold text-white mb-2">{asset.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">{asset.desc}</p>

              <div className="space-y-1.5 py-3 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Correlation:</span>
                  <span className="text-sky-300">{asset.correlation}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Credit Profile:</span>
                  <span className="text-gray-200">{asset.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <button
                onClick={() => handleAdd(asset)}
                className="w-full py-2 border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus size={13} /> ADD TO DIGITAL TWIN (+₹{asset.recommendedAdd.toLocaleString('en-IN')})
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs font-mono text-gray-400 max-w-5xl">
        STATE SYNC: Adding assets directly rebalances your live Digital Twin simulation in shared memory.
      </div>
    </div>
  );
};
