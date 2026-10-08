export type AssetType = 'Equity' | 'ETF' | 'REIT' | 'InvIT' | 'Bond' | 'Mutual Fund';

export type BrokerSource = 'Zerodha' | 'Groww' | 'Angel One' | 'Upstox' | 'CAS';

export interface Holding {
  id: string;
  assetName: string;
  isin: string;
  ticker: string;
  assetType: AssetType;
  sector: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  investedValue: number;
  currentValue: number;
  pnl: number;
  pnlPercentage: number;
  sourceBroker: BrokerSource;
  accountId: string;
}

export interface RiskMetrics {
  healthScore: number;
  sharpeRatio: number;
  beta: number;
  annualizedVolatility: number;
  maxDrawdown: number;
  defensiveCeilingBreached: boolean;
  highRiskSectors: string[];
}

export interface SectorExposure {
  sector: string;
  percentage: number;
  value: number;
  warning?: string;
}

export interface AssetAllocation {
  type: AssetType;
  percentage: number;
  value: number;
}

export interface BrokerDistribution {
  broker: BrokerSource;
  percentage: number;
  value: number;
  holdingsCount: number;
}

export interface SimulatedAction {
  id: string;
  type: 'BUY' | 'SELL' | 'REBALANCE';
  assetName: string;
  assetType: AssetType;
  amount: number;
  sector: string;
  timestamp: string;
}

export interface AuditVerificationEntry {
  step: string;
  timestamp: string;
  hash: string;
  status: 'VERIFIED' | 'PENDING';
  payloadSummary: string;
}
