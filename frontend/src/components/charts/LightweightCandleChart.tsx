import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, CandlestickData, Time } from 'lightweight-charts';

interface LightweightCandleChartProps {
  height?: number;
  selectedWindow?: { start: number; end: number };
}

// Generate realistic financial daily candlestick series for TCS
export const generateCandleData = (): CandlestickData<Time>[] => {
  const data: CandlestickData<Time>[] = [];
  let basePrice = 3450;
  const startDate = new Date(2025, 5, 1);

  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    // skip weekends
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) continue;

    const dateStr = currentDate.toISOString().split('T')[0];
    const change = (Math.random() - 0.48) * 45;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 25;
    const low = Math.min(open, close) - Math.random() * 25;
    basePrice = close;

    data.push({
      time: dateStr as Time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });
  }
  return data;
};

export const LightweightCandleChart: React.FC<LightweightCandleChartProps> = ({
  height = 380,
  selectedWindow,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#030712' },
        textColor: '#64748b',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      crosshair: {
        vertLine: {
          color: '#38bdf8',
          width: 1,
          style: 3,
          labelBackgroundColor: '#0369a1',
        },
        horzLine: {
          color: '#38bdf8',
          width: 1,
          style: 3,
          labelBackgroundColor: '#0369a1',
        },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.08)',
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.08)',
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#f43f5e',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#f43f5e',
    });

    const rawData = generateCandleData();
    series.setData(rawData);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [height]);

  return (
    <div className="relative w-full border border-white/10 bg-[#030712] p-3 font-mono">
      {/* Precision TradingView Header Bar */}
      <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b border-white/5 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-white tracking-wide">TCS // NSE</span>
          <span className="text-emerald-400">₹3,950.00 (+1.82%)</span>
          <span className="text-gray-500">O: 3,890.00  H: 3,975.00  L: 3,870.00</span>
          <span className="text-gray-500 hidden sm:inline">VOL: 1.42M</span>
        </div>
        <div className="flex items-center gap-1 text-[11px]">
          {['1D', '1W', '1M', '3M', '6M', '1Y'].map((range, idx) => (
            <button
              key={range}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                idx === 2 ? 'bg-white/10 text-white font-semibold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Candlestick Canvas Container */}
      <div ref={chartContainerRef} className="w-full" style={{ height }} />

      {/* Pattern Highlight Overlay if window provided */}
      {selectedWindow && (
        <div className="absolute bottom-5 left-8 px-2.5 py-1 border border-sky-500/30 bg-black/90 text-[10px] text-sky-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-sky-400 animate-pulse"></span>
          CURRENT STRUCTURAL PATTERN EXTRACTED [SESSION 35:50]
        </div>
      )}
    </div>
  );
};
