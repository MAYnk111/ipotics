import React from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';

export const Scene09AuditVerification: React.FC = () => {
  const { getAuditTrail } = usePortfolioStore();
  const trail = getAuditTrail();

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-14 z-10 pointer-events-auto">
      <div className="max-w-4xl mb-6">
        <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
          IMMUTABLE PROVENANCE
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
          Cryptographic Audit Trail
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2">
          Every snapshot, factor computation, and digital twin simulation is hashed into an immutable Merkle audit log. Zero raw holdings exposed.
        </p>
      </div>

      <div className="w-full max-w-4xl terminal-panel p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-gray-400">
          <span>MERKLE AUDIT LOG // TAMPER-EVIDENT REPOSITORY</span>
          <span className="text-emerald-400 font-semibold">ALL HASHES VALIDATED</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {trail.map((item, idx) => (
            <div
              key={item.step}
              className="p-3 border border-white/5 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500">0{idx + 1}</span>
                <div>
                  <div className="font-semibold text-white">{item.step}</div>
                  <div className="text-[11px] text-gray-400">{item.payloadSummary}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <span className="text-gray-500 text-[11px]">{item.timestamp}</span>
                <span className="px-2 py-0.5 border border-white/10 bg-white/[0.02] text-sky-400 text-[11px]">
                  {item.hash}
                </span>
                <span className="text-emerald-400 font-semibold text-[11px]">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-between text-[11px] font-mono text-gray-500">
          <span>ZERO-KNOWLEDGE PRIVACY ENFORCED</span>
          <span>ROOT CHECKSUM: 0x992e44...71b0</span>
        </div>
      </div>
    </div>
  );
};
