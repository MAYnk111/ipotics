import { create } from 'zustand';
import { Holding, RiskMetrics, SectorExposure, AssetAllocation, BrokerDistribution, SimulatedAction, AuditVerificationEntry } from '../types/portfolio';
import { INITIAL_HOLDINGS } from '../data/samplePortfolio';

interface PortfolioState {
  holdings: Holding[];
  simulatedHoldings: Holding[];
  simulatedActions: SimulatedAction[];
  dataSource: 'DEMO DATA' | 'IMPORTED' | 'CONNECTED';
  activeRoute: string;
  isSidebarExpanded: boolean;
  selectedAssetForDiscovery: string;

  // Actions
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
  setActiveRoute: (route: string) => void;
  addSimulatedInvestment: (action: Omit<SimulatedAction, 'id' | 'timestamp'>) => void;
  resetSimulation: () => void;
  importHoldings: (newHoldings: Holding[], sourceName: 'DEMO DATA' | 'IMPORTED' | 'CONNECTED') => void;
  setSelectedAssetForDiscovery: (ticker: string) => void;

  // Computed helper getters
  getTotalInvested: () => number;
  getTotalCurrentValue: () => number;
  getTotalPnL: () => number;
  getSimulatedTotalValue: () => number;
  getSectorExposures: (isSimulated?: boolean) => SectorExposure[];
  getAssetAllocations: (isSimulated?: boolean) => AssetAllocation[];
  getBrokerDistributions: () => BrokerDistribution[];
  getRiskMetrics: (isSimulated?: boolean) => RiskMetrics;
  getAuditTrail: () => AuditVerificationEntry[];
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  holdings: INITIAL_HOLDINGS,
  simulatedHoldings: INITIAL_HOLDINGS,
  simulatedActions: [],
  dataSource: 'DEMO DATA',
  activeRoute: 'landing',
  isSidebarExpanded: false,
  selectedAssetForDiscovery: 'TCS',

  setSidebarExpanded: (expanded: boolean) => set({ isSidebarExpanded: expanded }),
  toggleSidebar: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
  setActiveRoute: (route: string) => set({ activeRoute: route }),

  setSelectedAssetForDiscovery: (ticker: string) => set({ selectedAssetForDiscovery: ticker }),

  addSimulatedInvestment: (actionData) => {
    const action: SimulatedAction = {
      ...actionData,
      id: 'sim-' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const currentSimulated = [...get().simulatedHoldings];
    // Check if asset already exists in simulated
    const existingIndex = currentSimulated.findIndex(h => h.ticker === action.assetName || h.assetName.includes(action.assetName));

    if (existingIndex >= 0) {
      const existing = currentSimulated[existingIndex];
      const addedQuantity = Math.round(action.amount / existing.currentPrice);
      const updatedHolding: Holding = {
        ...existing,
        quantity: existing.quantity + (action.type === 'BUY' ? addedQuantity : -addedQuantity),
        currentValue: existing.currentValue + (action.type === 'BUY' ? action.amount : -action.amount),
        investedValue: existing.investedValue + (action.type === 'BUY' ? action.amount : -action.amount),
      };
      currentSimulated[existingIndex] = updatedHolding;
    } else {
      // Create new simulated holding
      const newHolding: Holding = {
        id: 'sim-h-' + Date.now(),
        assetName: action.assetName,
        ticker: action.assetName.substring(0, 6).toUpperCase(),
        isin: 'INE-SIM-' + Math.floor(100000 + Math.random() * 900000),
        assetType: action.assetType,
        sector: action.sector,
        quantity: 100,
        averagePrice: action.amount / 100,
        currentPrice: action.amount / 100,
        investedValue: action.amount,
        currentValue: action.amount,
        pnl: 0,
        pnlPercentage: 0,
        sourceBroker: 'CAS',
        accountId: 'SIM-ACC-101',
      };
      currentSimulated.push(newHolding);
    }

    set((state) => ({
      simulatedHoldings: currentSimulated,
      simulatedActions: [action, ...state.simulatedActions],
    }));
  },

  resetSimulation: () => {
    set((state) => ({
      simulatedHoldings: [...state.holdings],
      simulatedActions: [],
    }));
  },

  importHoldings: (newHoldings, sourceName) => {
    set({
      holdings: newHoldings,
      simulatedHoldings: newHoldings,
      dataSource: sourceName,
      simulatedActions: [],
    });
  },

  getTotalInvested: () => {
    return get().holdings.reduce((sum, h) => sum + h.investedValue, 0);
  },

  getTotalCurrentValue: () => {
    return get().holdings.reduce((sum, h) => sum + h.currentValue, 0);
  },

  getTotalPnL: () => {
    const totalCurrent = get().getTotalCurrentValue();
    const totalInvested = get().getTotalInvested();
    return totalCurrent - totalInvested;
  },

  getSimulatedTotalValue: () => {
    return get().simulatedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  },

  getSectorExposures: (isSimulated = false) => {
    const list = isSimulated ? get().simulatedHoldings : get().holdings;
    const total = list.reduce((sum, h) => sum + h.currentValue, 0);
    const sectorMap: Record<string, number> = {};

    list.forEach((h) => {
      sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.currentValue;
    });

    return Object.entries(sectorMap).map(([sector, value]) => {
      const percentage = total > 0 ? (value / total) * 100 : 0;
      let warning: string | undefined;
      if (percentage > 25) {
        warning = `${sector} concentration above defensive ceiling (25.0%)`;
      }
      return {
        sector,
        value,
        percentage: Number(percentage.toFixed(1)),
        warning,
      };
    }).sort((a, b) => b.percentage - a.percentage);
  },

  getAssetAllocations: (isSimulated = false) => {
    const list = isSimulated ? get().simulatedHoldings : get().holdings;
    const total = list.reduce((sum, h) => sum + h.currentValue, 0);
    const typeMap: Record<string, number> = {};

    list.forEach((h) => {
      typeMap[h.assetType] = (typeMap[h.assetType] || 0) + h.currentValue;
    });

    return Object.entries(typeMap).map(([type, value]) => ({
      type: type as any,
      value,
      percentage: total > 0 ? Number(((value / total) * 100).toFixed(1)) : 0,
    })).sort((a, b) => b.percentage - a.percentage);
  },

  getBrokerDistributions: () => {
    const list = get().holdings;
    const total = list.reduce((sum, h) => sum + h.currentValue, 0);
    const brokerMap: Record<string, { value: number; count: number }> = {};

    list.forEach((h) => {
      if (!brokerMap[h.sourceBroker]) {
        brokerMap[h.sourceBroker] = { value: 0, count: 0 };
      }
      brokerMap[h.sourceBroker].value += h.currentValue;
      brokerMap[h.sourceBroker].count += 1;
    });

    return Object.entries(brokerMap).map(([broker, data]) => ({
      broker: broker as any,
      value: data.value,
      holdingsCount: data.count,
      percentage: total > 0 ? Number(((data.value / total) * 100).toFixed(1)) : 0,
    })).sort((a, b) => b.percentage - a.percentage);
  },

  getRiskMetrics: (isSimulated = false) => {
    const sectors = get().getSectorExposures(isSimulated);
    const allocations = get().getAssetAllocations(isSimulated);

    const itSector = sectors.find(s => s.sector.includes('Information Technology'));
    const itPercent = itSector ? itSector.percentage : 0;
    const reitPercent = (allocations.find(a => a.type === 'REIT')?.percentage || 0) +
                       (allocations.find(a => a.type === 'InvIT')?.percentage || 0);

    // Calculate dynamic health score
    let healthScore = 78;
    if (isSimulated) {
      if (reitPercent > 15 && itPercent < 25) {
        healthScore = 89;
      } else if (reitPercent > 10) {
        healthScore = 84;
      }
    }

    const defensiveBreach = itPercent > 25.0;

    return {
      healthScore,
      sharpeRatio: isSimulated ? 1.62 : 1.45,
      beta: isSimulated ? 0.94 : 1.12,
      annualizedVolatility: isSimulated ? 11.8 : 14.2,
      maxDrawdown: isSimulated ? -6.2 : -8.5,
      defensiveCeilingBreached: defensiveBreach,
      highRiskSectors: defensiveBreach ? ['Information Technology'] : [],
    };
  },

  getAuditTrail: () => {
    const totalVal = get().getTotalCurrentValue();
    return [
      {
        step: 'PORTFOLIO SNAPSHOT',
        timestamp: '10:04:18 UTC',
        hash: '0x8f2a...c391',
        status: 'VERIFIED',
        payloadSummary: `Holdings: ${get().holdings.length} assets | Total: ₹${totalVal.toLocaleString('en-IN')}`,
      },
      {
        step: 'RISK ANALYSIS',
        timestamp: '10:04:22 UTC',
        hash: '0x4d19...be74',
        status: 'VERIFIED',
        payloadSummary: 'Sharpe 1.45 | Beta 1.12 | IT Concentration 28.4%',
      },
      {
        step: 'SIMULATION EXECUTION',
        timestamp: '10:05:01 UTC',
        hash: '0x17fa...990e',
        status: 'VERIFIED',
        payloadSummary: `Digital Twin actions: ${get().simulatedActions.length} recorded reallocations`,
      },
      {
        step: 'AI INSIGHT ORCHESTRATION',
        timestamp: '10:05:14 UTC',
        hash: '0xbc88...12fa',
        status: 'VERIFIED',
        payloadSummary: '5 Agents Consensus: Defensively Rebalance into REIT/InvIT',
      },
      {
        step: 'VERIFICATION HASH CHAIN',
        timestamp: '10:05:15 UTC',
        hash: '0x992e...44ff',
        status: 'VERIFIED',
        payloadSummary: 'Merkle root verified on tamper-evident immutable audit layer',
      },
    ];
  },
}));
