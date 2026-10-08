import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, AreaSeries, Time } from 'lightweight-charts';

interface AssetMarketChartProps {
  ticker: string;
  assetName: string;
  currentPrice: number;
  height?: number;
}

// Generate deterministic candlestick data based on ticker
function generateDataForTicker(ticker: string) {
  let basePrice = 3450;
  if (ticker === 'INFY') basePrice = 1625;
  if (ticker === 'HDFCBANK') basePrice = 1680;
  if (ticker === 'ICICIBANK') basePrice = 1205;
  if (ticker === 'RELIANCE') basePrice = 3080;
  if (ticker === 'EMBASSY') basePrice = 385;
  if (ticker === 'PGINVIT') basePrice = 100;
  if (ticker === 'NIFTYBEES') basePrice = 255;
  if (ticker === 'BHARATBOND') basePrice = 1422;

  const data = [];
  const startDate = new Date(2025, 4, 1);

  for (let i = 0; i < 90; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const dateStr = d.toISOString().split('T')[0] as Time;

    const delta = (Math.sin(i * 0.28) + Math.cos(i * 0.15)) * (basePrice * 0.012) + (Math.random() - 0.48) * (basePrice * 0.01);
    const open = basePrice;
    const close = basePrice + delta;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.008);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.008);
    basePrice = close;

    data.push({
      time: dateStr,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });
  }
  return data;
}

export const InteractiveMarketWallChart: React.FC<AssetMarketChartProps> = ({
  ticker,
  assetName,
  currentPrice,
  height = 360,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#090a0c' },
        textColor: '#64748b',
        fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.08)',
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.08)',
      },
      crosshair: {
        vertLine: { color: '#38bdf8', width: 1, style: 3 },
        horzLine: { color: '#38bdf8', width: 1, style: 3 },
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#f43f5e',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#f43f5e',
    });

    const candleData = generateDataForTicker(ticker);
    series.setData(candleData);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [ticker, height]);

  return (
    <div className="w-full border border-white/10 bg-[#090a0c] p-4 font-mono">
      {/* Precision Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-white/5 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold tracking-wider text-sm">
            {ticker} // {assetName}
          </span>
          <span className="text-emerald-400 font-bold">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-gray-500 text-[11px] hidden sm:inline">
            EXCHANGE: NSE // TRADING FEED ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          {['1D', '1W', '1M', '3M', '6M', '1Y'].map((tf, i) => (
            <button
              key={tf}
              className={`px-2 py-0.5 cursor-pointer ${
                i === 2 ? 'bg-white/10 text-white font-semibold' : 'hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="w-full" style={{ height }} />
    </div>
  );
};
