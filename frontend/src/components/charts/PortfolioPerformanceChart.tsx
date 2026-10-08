import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries, Time } from 'lightweight-charts';

interface PerformanceChartProps {
  height?: number;
}

export const PortfolioPerformanceChart: React.FC<PerformanceChartProps> = ({ height = 300 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
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

    const series = chart.addSeries(AreaSeries, {
      topColor: 'rgba(56, 189, 248, 0.28)',
      bottomColor: 'rgba(56, 189, 248, 0.01)',
      lineColor: '#38bdf8',
      lineWidth: 2,
    });

    // Realistic portfolio performance time-series data
    const data: { time: Time; value: number }[] = [];
    let baseVal = 741800;
    const start = new Date(2025, 4, 1);
    for (let i = 0; i < 90; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      baseVal += (Math.random() - 0.44) * 4200;
      data.push({
        time: d.toISOString().split('T')[0] as Time,
        value: Math.round(baseVal),
      });
    }

    series.setData(data);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
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
    <div className="w-full border border-white/10 bg-[#030612]/90 p-4 font-mono">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-white/5 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">PORTFOLIO CUMULATIVE RETURN</span>
          <span className="text-emerald-400 font-bold">+₹1,00,850 (+13.92%)</span>
          <span className="text-gray-500 text-[11px] hidden sm:inline">BENCHMARK: NIFTY 50 (+8.4%)</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          {['1M', '3M', '6M', 'YTD', '1Y', 'ALL'].map((r, i) => (
            <button
              key={r}
              className={`px-2 py-0.5 cursor-pointer ${
                i === 2 ? 'bg-white/10 text-white font-semibold' : 'hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="w-full" style={{ height }} />
    </div>
  );
};
