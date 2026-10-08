import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalHeader } from '../components/terminal/TerminalHeader';
import { InteractiveMarketWallChart } from '../components/charts/InteractiveMarketWallChart';
import { Holding } from '../types/portfolio';

const TICKER_BAR = [
  { symbol: 'NIFTY 50', val: '24,812.40', chg: '+1.24%', isUp: true },
  { symbol: 'SENSEX', val: '81,385.10', chg: '+0.82%', isUp: true },
  { symbol: 'TCS', val: '3,950.00', chg: '+1.63%', isUp: true },
  { symbol: 'INFY', val: '1,625.00', chg: '-0.42%', isUp: false },
  { symbol: 'RELIANCE', val: '3,080.00', chg: '+0.91%', isUp: true },
  { symbol: 'HDFCBANK', val: '1,680.00', chg: '+1.10%', isUp: true },
  { symbol: 'EMBASSY', val: '385.00', chg: '+0.45%', isUp: true },
];

export const UnifiedPortfolioPage: React.FC = () => {
  const {
    holdings,
    dataSource,
    getTotalCurrentValue,
    getTotalPnL,
    getAssetAllocations,
    getBrokerDistributions,
  } = usePortfolioStore();

  const [selectedAsset, setSelectedAsset] = useState<Holding>(holdings[0]);
  const [filterBroker, setFilterBroker] = useState<string>('ALL');

  const totalCurrent = getTotalCurrentValue();
  const totalPnL = getTotalPnL();
  const allocations = getAssetAllocations();
  const brokers = getBrokerDistributions();

  const filteredHoldings = holdings.filter(
    (h) => filterBroker === 'ALL' || h.sourceBroker === filterBroker
  );

  return (
    <div className="relative min-h-screen text-slate-200 p-6 md:p-8 font-mono bg-transparent">
      <div className="relative z-10 max-w-full space-y-5">
        {/* 2. Precision Terminal Header */}
        <TerminalHeader sectionTitle="PORTFOLIO WORKSTATION" subTitle={dataSource} />

        {/* 3. Continuously Running Market Ticker Rail */}
        <div className="w-full overflow-hidden border-y border-white/10 bg-[#090a0c]/80 backdrop-blur-md py-2 text-xs flex items-center">
          <div className="flex gap-8 whitespace-nowrap animate-none overflow-x-auto scrollbar-none px-2 w-full">
            {TICKER_BAR.map((t) => (
              <div key={t.symbol} className="flex items-center gap-2 shrink-0">
                <span className="text-gray-400 font-semibold">{t.symbol}</span>
                <span className="text-white">{t.val}</span>
                <span className={t.isUp ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                  {t.chg}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Top Financial Metrics (Thin 1px dividers, zero rounded cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-3 border-b border-white/10 text-xs">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">PORTFOLIO VALUATION</div>
            <div className="text-2xl font-semibold text-white mt-0.5">₹{totalCurrent.toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">9 CONSOLIDATED POSITIONS</div>
          </div>

          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">CONSOLIDATED RETURN (P&L)</div>
            <div className="text-2xl font-semibold text-emerald-400 mt-0.5">
              +₹{totalPnL.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-500 mt-0.5">+13.92% UNREALIZED GAIN</div>
          </div>

          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">HEALTH SCORE</div>
            <div className="text-2xl font-semibold text-amber-400 mt-0.5">78 / 100</div>
            <div className="text-[11px] text-rose-400 mt-0.5">IT DEFENSIVE CEILING ALERT</div>
          </div>

          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">ACTIVE BROKERS</div>
            <div className="text-2xl font-semibold text-white mt-0.5">5 REPOSITORIES</div>
            <div className="text-[11px] text-sky-400 mt-0.5">ZERODHA, GROWW, ANGEL, UPSTOX, CAS</div>
          </div>
        </div>

        {/* 5. PRIMARY VISUAL HERO: Large Candlestick Market Wall (50-60% Viewport Area) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <InteractiveMarketWallChart
              ticker={selectedAsset.ticker}
              assetName={selectedAsset.assetName}
              currentPrice={selectedAsset.currentPrice}
              height={380}
            />
          </div>

          {/* Asset Allocation & Broker Breakdown Side Terminal */}
          <div className="lg:col-span-4 border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-4 space-y-4">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider pb-2 border-b border-white/5 flex justify-between">
                <span>ASSET ALLOCATION</span>
                <span className="text-sky-400">% TOTAL</span>
              </div>
              <div className="space-y-2 mt-2">
                {allocations.map((a) => (
                  <div key={a.type}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-300">{a.type}</span>
                      <span className="text-white font-semibold">{a.percentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5">
                      <div className="h-full bg-sky-500" style={{ width: `${a.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider pb-2 border-b border-white/5 flex justify-between">
                <span>BROKER AGGREGATION</span>
                <span className="text-gray-400">POSITIONS</span>
              </div>
              <div className="space-y-1.5 mt-2 text-xs">
                {brokers.map((b) => (
                  <div key={b.broker} className="flex justify-between items-center py-0.5">
                    <span className="text-gray-300">{b.broker}</span>
                    <span className="text-white">{b.percentage}% ({b.holdingsCount})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6. Holdings Table with Live Chart Binding */}
        <div className="border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white tracking-wider">HOLDINGS LEDGER</span>
              <span className="text-gray-500 text-[11px]">// CLICK ROW TO SHIFT PRIMARY CHART</span>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <span className="text-gray-500 mr-1">FILTER:</span>
              {['ALL', 'Zerodha', 'Groww', 'Angel One', 'Upstox', 'CAS'].map((b) => (
                <button
                  key={b}
                  onClick={() => setFilterBroker(b)}
                  className={`px-2 py-0.5 cursor-pointer ${
                    filterBroker === b ? 'bg-white/10 text-white font-semibold' : 'hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-[10px] uppercase tracking-wider">
                  <th className="py-2 font-normal">TICKER / ASSET</th>
                  <th className="py-2 font-normal">TYPE</th>
                  <th className="py-2 font-normal">SECTOR</th>
                  <th className="py-2 font-normal">BROKER</th>
                  <th className="py-2 font-normal text-right">QTY</th>
                  <th className="py-2 font-normal text-right">AVG</th>
                  <th className="py-2 font-normal text-right">PRICE</th>
                  <th className="py-2 font-normal text-right">CURRENT VALUE</th>
                  <th className="py-2 font-normal text-right">RETURN (P&L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredHoldings.map((h) => {
                  const isSelected = selectedAsset.id === h.id;
                  return (
                    <tr
                      key={h.id}
                      onClick={() => setSelectedAsset(h)}
                      className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                        isSelected ? 'bg-white/[0.06] border-l-2 border-sky-400' : ''
                      }`}
                    >
                      <td className="py-2.5 pl-2">
                        <div className="font-semibold text-white">{h.ticker}</div>
                        <div className="text-[10px] text-gray-400 truncate max-w-[180px]">{h.assetName}</div>
                      </td>
                      <td className="py-2.5 text-gray-400 text-[11px]">{h.assetType}</td>
                      <td className="py-2.5 text-gray-400 text-[11px] truncate max-w-[140px]">{h.sector}</td>
                      <td className="py-2.5">
                        <span className="text-sky-400">{h.sourceBroker}</span>
                        <span className="block text-[10px] text-gray-600 font-mono">{h.accountId}</span>
                      </td>
                      <td className="py-2.5 text-right text-gray-300">{h.quantity}</td>
                      <td className="py-2.5 text-right text-gray-400">₹{h.averagePrice.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 text-right text-white font-medium">₹{h.currentPrice.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 text-right text-white font-semibold">₹{h.currentValue.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 text-right text-emerald-400">
                        <div>+₹{h.pnl.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-emerald-500">+{h.pnlPercentage}%</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
