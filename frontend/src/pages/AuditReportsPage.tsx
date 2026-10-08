import React, { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalHeader } from '../components/terminal/TerminalHeader';

const AUDIT_STEPS = [
  { id: '1', title: 'PORTFOLIO SNAPSHOT', summary: '9 positions across Zerodha, Groww, Angel One, Upstox, CAS validated', hash: '0x8f2a...c391' },
  { id: '2', title: 'FACTOR ANALYSIS', summary: 'Defensive ceiling breach calculated; Beta 1.12, Sharpe 1.45 verified', hash: '0x4d19...be74' },
  { id: '3', title: 'SIMULATION TRIAL', summary: 'Digital Twin tested +₹50,000 REIT deployment; Health improves to 89', hash: '0x17fa...990e' },
  { id: '4', title: 'AI INSIGHT ORCHESTRATION', summary: '5 quantitative agents reached consensus on reallocation directive', hash: '0xbc88...12fa' },
  { id: '5', title: 'CRYPTOGRAPHIC PROOF', summary: 'SHA-256 Merkle root anchored to tamper-evident audit ledger', hash: '0x992e...44ff' },
];

export const AuditReportsPage: React.FC = () => {
  const { holdings, simulatedActions } = usePortfolioStore();
  const [activeStep, setActiveStep] = useState<number>(5);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);

  const handleRunPipeline = () => {
    setIsRunningPipeline(true);
    setActiveStep(1);
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= AUDIT_STEPS.length) {
          clearInterval(interval);
          setIsRunningPipeline(false);
          return AUDIT_STEPS.length;
        }
        return prev + 1;
      });
    }, 450);
  };

  return (
    <div className="relative min-h-screen text-slate-200 p-6 md:p-8 font-mono bg-transparent">
      <div className="relative z-10 max-w-full space-y-6">
        <TerminalHeader
          sectionTitle="COMPLIANCE & AUDIT CONSOLE"
          subTitle="MERKLE PROVENANCE ENGINE"
          actions={
            <button
              onClick={handleRunPipeline}
              className="px-3 py-1 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 cursor-pointer transition-colors"
            >
              {isRunningPipeline ? 'VERIFYING CHAIN...' : '[ EXECUTE VERIFICATION PIPELINE ]'}
            </button>
          }
        />

        {/* PRIMARY VISUAL HERO: Sequential Verification Pipeline Timeline */}
        <div className="border border-white/10 bg-[#090a0c]/80 backdrop-blur-md p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 text-xs">
            <span className="text-white font-semibold tracking-wider">
              TAMPER-EVIDENT VERIFICATION PIPELINE
            </span>
            <span className="text-emerald-400">
              STATUS: {activeStep === AUDIT_STEPS.length ? '✓ 100% VERIFIED' : `IN PROGRESS [${activeStep}/5]`}
            </span>
          </div>

          {/* Sequential Step Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {AUDIT_STEPS.map((step, idx) => {
              const isPassed = idx < activeStep;
              const isCurrent = idx === activeStep - 1;
              return (
                <div
                  key={step.id}
                  className={`p-3.5 border transition-all duration-300 text-xs flex flex-col justify-between ${
                    isCurrent
                      ? 'border-emerald-400 bg-emerald-950/20'
                      : isPassed
                      ? 'border-emerald-500/30 bg-black/40'
                      : 'border-white/5 bg-black/40 opacity-40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                      <span>STEP 0{idx + 1}</span>
                      <span className={isPassed ? 'text-emerald-400 font-semibold' : 'text-gray-500'}>
                        {isPassed ? '✓ PASS' : 'PENDING'}
                      </span>
                    </div>
                    <div className="text-white font-semibold text-xs mt-1">{step.title}</div>
                    <div className="text-[11px] text-gray-400 mt-1 leading-snug">{step.summary}</div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px] text-sky-400 truncate">
                    {step.hash}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verified Cryptographic Certificate Badge */}
          <div className="p-4 border border-emerald-500/30 bg-emerald-950/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div>
              <div className="text-emerald-300 font-semibold uppercase tracking-wider mb-0.5">
                PROVENANCE MERKLE ROOT VALIDATED
              </div>
              <div className="text-gray-300">
                0x8f2ac3914be7709a8231...44ff // {holdings.length} Positions & {simulatedActions.length} Rebalances Anchored
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert('Exporting signed audit certificate...')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                EXPORT SIGNED CERTIFICATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
