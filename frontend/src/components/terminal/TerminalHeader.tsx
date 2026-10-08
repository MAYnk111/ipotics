import React, { useState, useEffect } from 'react';

interface TerminalHeaderProps {
  sectionTitle: string;
  subTitle?: string;
  actions?: React.ReactNode;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ sectionTitle, subTitle, actions }) => {
  const [timeStr, setTimeStr] = useState<string>('10:42:18 IST');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString('en-IN', { hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono gap-4">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-gray-400">INVESTOS // </span>
          <span className="text-white font-semibold tracking-wider uppercase">{sectionTitle}</span>
          {subTitle && <span className="text-sky-400 ml-2">[{subTitle}]</span>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-[11px] text-gray-400">
        <div>
          <span className="text-gray-500">MARKET: </span>
          <span className="text-gray-200">NSE / BSE</span>
        </div>
        <div>
          <span className="text-gray-500">FEED: </span>
          <span className="text-emerald-400 font-semibold">LIVE</span>
        </div>
        <div>
          <span className="text-gray-500">LATENCY: </span>
          <span className="text-gray-200">1.2MS</span>
        </div>
        <div>
          <span className="text-gray-500">TIME: </span>
          <span className="text-gray-200">{timeStr}</span>
        </div>
        {actions && <div className="pl-4 border-l border-white/10">{actions}</div>}
      </div>
    </header>
  );
};
