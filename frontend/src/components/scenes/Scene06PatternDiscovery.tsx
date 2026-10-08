import React, { useState } from 'react';
import { LightweightCandleChart } from '../charts/LightweightCandleChart';

const HISTORICAL_MATCHES = [
  {
    era: 'OCT 2021 — BREAKOUT CONTINUATION',
    similarity: 92,
    outcome: '+14.6% OVER 45 SESSIONS',
    regime: 'Bullish flag post consolidation',
  },
  {
    era: 'JUL 2023 — POST-EARNINGS RANGE COMPRESSION',
    similarity: 87,
    outcome: '+9.2% OVER 30 SESSIONS',
    regime: 'Institutional accumulation corridor',
  },
  {
    era: 'FEB 2024 — RESISTANCE TEST RETEST',
    similarity: 81,
    outcome: '-3.4% PULLBACK BEFORE REBOUND',
    regime: 'Mean reversion channel',
  },
];

export const Scene06PatternDiscovery: React.FC = () => {
  const [scanning, setScanning] = useState(false);

  const triggerScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
          TIME-SERIES MORPHOLOGICAL RETRIEVAL
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          Historical Pattern Discovery
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Real Lightweight Candlestick engine indexing 15 years of Indian and global market structure to discover historically similar precedents.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Real Candlestick Chart Viewport */}
        <div className="lg:col-span-8 space-y-3">
          <LightweightCandleChart
            height={400}
            selectedWindow={{ start: 35, end: 50 }}
          />

          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 p-3 bg-black/60 border border-white/10">
            <span>ALGORITHM: DYNAMIC TIME WARPING (DTW) + COSINE SIMILARITY</span>
            <button
              onClick={triggerScan}
              className="px-3 py-1 border border-sky-500/40 text-sky-300 hover:bg-sky-500/10 cursor-pointer transition-colors"
            >
              {scanning ? 'SCANNING 15Y ARCHIVE...' : 'RE-SCAN PATTERNS'}
            </button>
          </div>
        </div>

        {/* Historical Matches Ledger */}
        <div className="lg:col-span-4 space-y-4">
          <div className="terminal-panel p-5 border border-white/10">
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              HISTORICAL SIMILARITY MATCHES
            </div>

            <div className="space-y-3 font-mono text-xs">
              {HISTORICAL_MATCHES.map((match) => (
                <div
                  key={match.era}
                  className="p-3 border border-white/5 bg-black/40 hover:border-sky-500/30 transition-colors"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-gray-200 font-semibold">{match.era}</span>
                    <span className="text-sky-400 font-bold">{match.similarity}%</span>
                  </div>
                  <div className="text-emerald-400 text-[11px] mt-1">{match.outcome}</div>
                  <div className="text-gray-500 text-[10px] mt-0.5">{match.regime}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border border-white/10 bg-black/40 text-[11px] font-mono text-gray-500 leading-relaxed">
            PROBABILISTIC OBSERVATION: Structural historical pattern matching is informational and does not constitute guaranteed directional prediction.
          </div>
        </div>
      </div>
    </div>
  );
};
