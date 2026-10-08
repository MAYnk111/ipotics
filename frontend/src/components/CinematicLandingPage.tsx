import React, { useEffect, useRef, useState } from 'react';
import { FinancialWorldCanvas } from './three/FinancialWorldCanvas';
import { Scene01FinancialWorld } from './scenes/Scene01FinancialWorld';
import { Scene02FragmentedInvestments } from './scenes/Scene02FragmentedInvestments';
import { Scene03UnifiedPortfolio } from './scenes/Scene03UnifiedPortfolio';
import { Scene04PortfolioDoctor } from './scenes/Scene04PortfolioDoctor';
import { Scene05DigitalTwin } from './scenes/Scene05DigitalTwin';
import { Scene06PatternDiscovery } from './scenes/Scene06PatternDiscovery';
import { Scene07AlternativeAssets } from './scenes/Scene07AlternativeAssets';
import { Scene08AgenticAI } from './scenes/Scene08AgenticAI';
import { Scene09AuditVerification } from './scenes/Scene09AuditVerification';
import { Scene10FinalCTA } from './scenes/Scene10FinalCTA';

export const CinematicLandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#020408] text-white">
      {/* Persistent 3D Financial Earth & Orbital World */}
      <FinancialWorldCanvas scrollProgress={scrollProgress} />

      {/* Persistent Top Navigation Bar for Landing Mode */}
      <header className="fixed top-0 left-0 right-0 h-14 z-30 flex items-center justify-between px-8 border-b border-white/5 bg-[#020408]/60 backdrop-blur-md">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="font-semibold tracking-wider text-white">INVESTOS</span>
          <span className="text-gray-500">TERMINAL OS</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-mono text-gray-400">
          <span>ORBITAL TRACK: <span className="text-white">{(scrollProgress * 100).toFixed(0)}%</span></span>
          <span className="hidden sm:inline text-emerald-400 font-semibold">FEED: LIVE</span>
        </div>
      </header>

      {/* Scrollable Story Narrative Layer */}
      <div className="relative z-10 flex flex-col pt-14">
        {/* Scene 01: 0 - 10% The Financial World */}
        <section className="min-h-screen flex items-center">
          <Scene01FinancialWorld progress={scrollProgress} />
        </section>

        {/* Scene 02: 10 - 25% Fragmented Investments */}
        <section className="min-h-screen flex items-center">
          <Scene02FragmentedInvestments progress={scrollProgress} />
        </section>

        {/* Scene 03: 25 - 40% Unified Portfolio */}
        <section className="min-h-screen flex items-center">
          <Scene03UnifiedPortfolio />
        </section>

        {/* Scene 04: 40 - 52% Portfolio Doctor */}
        <section className="min-h-screen flex items-center">
          <Scene04PortfolioDoctor />
        </section>

        {/* Scene 05: 52 - 66% Digital Twin */}
        <section className="min-h-screen flex items-center">
          <Scene05DigitalTwin />
        </section>

        {/* Scene 06: 66 - 78% Historical Pattern Discovery */}
        <section className="min-h-screen flex items-center">
          <Scene06PatternDiscovery />
        </section>

        {/* Scene 07: 78 - 86% Alternative Assets */}
        <section className="min-h-screen flex items-center">
          <Scene07AlternativeAssets />
        </section>

        {/* Scene 08: 86 - 93% Agentic AI Orchestration */}
        <section className="min-h-screen flex items-center">
          <Scene08AgenticAI />
        </section>

        {/* Scene 09: 93 - 97% Cryptographic Audit Trail */}
        <section className="min-h-screen flex items-center">
          <Scene09AuditVerification />
        </section>

        {/* Scene 10: 97 - 100% Final Convergence CTA */}
        <section className="min-h-screen flex items-center">
          <Scene10FinalCTA />
        </section>
      </div>
    </div>
  );
};
