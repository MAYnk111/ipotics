import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  Activity, 
  Copy, 
  Search, 
  Layers, 
  Bot, 
  ShieldCheck, 
  ChevronRight,
  ChevronLeft,
  Database
} from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'portfolio', label: 'Unified Portfolio', icon: PieChart },
  { id: 'analysis', label: 'Portfolio Doctor', icon: Activity },
  { id: 'simulate', label: 'Digital Twin', icon: Copy },
  { id: 'discover', label: 'Pattern Discovery', icon: Search },
  { id: 'alternative', label: 'Alternative Assets', icon: Layers },
  { id: 'ai', label: 'AI Orchestrator', icon: Bot },
  { id: 'audit', label: 'Audit / Provenance', icon: ShieldCheck },
];

export const SlidingNavigation: React.FC = () => {
  const { isSidebarExpanded, toggleSidebar, activeRoute, setActiveRoute, dataSource } = usePortfolioStore();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 ease-in-out border-r border-white/10 bg-[#070b14]/90 backdrop-blur-xl flex flex-col justify-between ${
        isSidebarExpanded ? 'w-[230px]' : 'w-[72px]'
      }`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="h-18 flex items-center px-4 border-b border-white/10 justify-between">
          <button 
            onClick={() => setActiveRoute('landing')}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              IO
            </div>
            {isSidebarExpanded && (
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-wider text-white">INVESTOS</span>
                <span className="text-[10px] text-sky-400 font-mono tracking-tight">TERMINAL v2.4</span>
              </div>
            )}
          </button>

          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors"
            title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoute(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                }`}
                title={!isSidebarExpanded ? item.label : undefined}
              >
                <Icon size={20} className={`${isActive ? 'text-sky-400' : 'group-hover:text-gray-100'} shrink-0`} />
                {isSidebarExpanded && (
                  <span className="truncate text-xs tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status / Source */}
      <div className="p-3 border-t border-white/10">
        <div className={`flex items-center gap-2.5 px-2 py-2 rounded-lg bg-black/40 border border-white/5 ${
          !isSidebarExpanded ? 'justify-center' : ''
        }`}>
          <Database size={15} className="text-emerald-400 shrink-0" />
          {isSidebarExpanded && (
            <div className="flex flex-col truncate">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">STATE SYNC</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono">{dataSource}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
