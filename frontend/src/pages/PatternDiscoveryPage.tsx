import React, { useState } from 'react';
import { LightweightCandleChart } from '../components/charts/LightweightCandleChart';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalHeader } from '../components/terminal/TerminalHeader';

const CANDIDATES = ['TCS', 'INFY', 'HDFCBANK', 'RELIANCE'];

const MATCHES = [
  { era: 'OCT 2021 BREAKOUT', similarity: 92, outcome: '+14.6% OVER NEXT 45 SESSIONS', regime: 'Bullish flag post consolidation' },
  { era: 'JUL 2023 ACCUMULATION', similarity: 87, outcome: '+9.2% OVER NEXT 30 SESSIONS', regime: 'Institutional accumulation' },
  { era: 'FEB 2024 DOUBLE TOP', similarity: 81, outcome: '-3.4% BRIEF MEAN REVERSION', regime: 'Resistance test retest' },
];

const ALTERNATIVES = [
  { name: 'Embassy Office Parks REIT', type: 'REIT', yield: '7.8% Dividend Yield', correlation: '0.24 vs Nifty', risk: 'Low-Med' },
  { name: 'Powergrid Infrastructure InvIT', type: 'InvIT', yield: '9.4% Cash Flow Yield', correlation: '0.18 vs Nifty', risk: 'Low' },
  { name: 'Bharat Bond ETF April 2030', type: 'Bond', yield: '7.42% Fixed YTM', correlation: '-0.12 vs Nifty', risk: 'AAA Sovereign' },
];

export const PatternDiscoveryPage: React.FC = () => {
  const { selectedAssetForDiscovery, setSelectedAssetForDiscovery, addSimulatedInvestment } = usePortfolioStore();
  const [selectedMatch, setSelectedMatch] = useState<string>(MATCHES[0].era);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  return (
    <div className="relative min-h-screen text-slate-200 p-6 md:p-8 font-mono bg-transparent">
      <div className="relative z-10 max-w-full space-y-6">
        <TerminalHeader
          sectionTitle="MARKET RESEARCH TERMINAL"
          subTitle="DTW HISTORICAL PATTERN RETRIEVAL"
          actions={
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 mr-1">TICKER:</span>
              {CANDIDATES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedAssetForDiscovery(t)}
                  className={`px-2 py-0.5 cursor-pointer ${
                    selectedAssetForDiscovery === t ? 'bg-white/10 text-white font-semibold' : 'text-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        />

        {/* PRIMARY VISUAL HERO: Massive Candlestick Chart Dominating the Workspace (65% Height) */}
        <div className="border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between pb-2 border-b border-white/10 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold text-sm">{selectedAssetForDiscovery} // PRIMARY SERIES</span>
              <span className="text-sky-400 text-xs">ACTIVE WINDOW: CANDLES [35:50] EXTRACTED</span>
            </div>
            <button
              onClick={handleScan}
              className="px-3 py-1 border border-sky-500/40 text-sky-300 hover:bg-sky-500/10 cursor-pointer transition-colors text-xs"
            >
              {isScanning ? 'SCANNING 15Y ARCHIVE...' : 'TRIGGER DTW ARCHIVE SCAN'}
            </button>
          </div>

          <LightweightCandleChart
            height={460}
            selectedWindow={{ start: 35, end: 50 }}
          />
        </div>

        {/* Historical Matches & Alternative Asset Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Historical Similarity Matches */}
          <div className="lg:col-span-7 border border-white/10 bg-[#090a0c]/90 p-5 space-y-4">
            <div className="pb-3 border-b border-white/10 flex justify-between items-center text-xs">
              <span className="text-white font-semibold tracking-wider">HISTORICAL MATCHING PATTERNS</span>
              <span className="text-gray-400 text-[11px] font-mono">15-YEAR NIFTY ARCHIVE</span>
            </div>

            <div className="space-y-2 text-xs">
              {MATCHES.map((m) => {
                const isSelected = selectedMatch === m.era;
                return (
                  <div
                    key={m.era}
                    onClick={() => setSelectedMatch(m.era)}
                    className={`p-3 border transition-colors cursor-pointer ${
                      isSelected ? 'border-sky-500/50 bg-sky-950/20' : 'border-white/5 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-white font-semibold">{m.era}</span>
                      <span className="text-sky-400 font-bold">{m.similarity}% SIMILARITY</span>
                    </div>
                    <div className="text-emerald-400 text-[11px] font-semibold">{m.outcome}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">{m.regime}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alternative Yield Assets */}
          <div className="lg:col-span-5 border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-5 space-y-4">
            <div className="pb-3 border-b border-white/10 flex justify-between items-center text-xs">
              <span className="text-white font-semibold tracking-wider">PORTFOLIO FIT CANDIDATES</span>
              <span className="text-emerald-400 text-[11px]">UNCORRELATED YIELD</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {ALTERNATIVES.map((alt) => (
                <div key={alt.name} className="p-3 border border-white/5 bg-black/40 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">{alt.name}</div>
                    <div className="text-[10px] text-gray-500">{alt.correlation} // {alt.risk}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold">{alt.yield}</div>
                    <button
                      onClick={() => addSimulatedInvestment({
                        type: 'BUY',
                        assetName: alt.name,
                        assetType: alt.type as any,
                        amount: 50000,
                        sector: alt.type === 'REIT' ? 'Real Estate / REIT' : alt.type === 'InvIT' ? 'Infrastructure / InvIT' : 'Sovereign / Debt',
                      })}
                      className="text-[11px] text-sky-400 hover:underline cursor-pointer"
                    >
                      [+ INJECT TWIN]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
