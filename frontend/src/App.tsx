import React from 'react';
import { SlidingNavigation } from './components/navigation/SlidingNavigation';
import { CinematicLandingPage } from './components/CinematicLandingPage';
import { FinancialWorldCanvas } from './components/three/FinancialWorldCanvas';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { UnifiedPortfolioPage } from './pages/UnifiedPortfolioPage';
import { PortfolioDoctorPage } from './pages/PortfolioDoctorPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { PatternDiscoveryPage } from './pages/PatternDiscoveryPage';
import { AlternativeAssetsPage } from './pages/AlternativeAssetsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AuditReportsPage } from './pages/AuditReportsPage';
import { usePortfolioStore } from './store/portfolioStore';

export const App: React.FC = () => {
  const { activeRoute, isSidebarExpanded } = usePortfolioStore();

  const renderActiveView = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <DashboardOverviewPage />;
      case 'portfolio':
        return <UnifiedPortfolioPage />;
      case 'analysis':
        return <PortfolioDoctorPage />;
      case 'simulate':
        return <DigitalTwinPage />;
      case 'discover':
        return <PatternDiscoveryPage />;
      case 'alternative':
        return <AlternativeAssetsPage />;
      case 'ai':
        return <AIAssistantPage />;
      case 'audit':
        return <AuditReportsPage />;
      case 'landing':
      default:
        return <CinematicLandingPage />;
    }
  };

  const isLanding = activeRoute === 'landing';

  return (
    <div className={`min-h-screen ${isLanding ? 'bg-[#030712]' : 'bg-transparent'} text-gray-100 flex relative`}>
      {/* 3D Living Financial District Canvas running persistently for all Internal Pages */}
      {!isLanding && (
        <FinancialWorldCanvas isInternal={true} pageRoute={activeRoute} />
      )}

      {/* Sliding Collapsible Navigation Rail (72px collapsed, 230px expanded) */}
      <SlidingNavigation />

      {/* Main Content Area: dynamically resizes without ever being permanently obscured */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ease-in-out relative z-10 ${
          isLanding
            ? 'pl-[72px]'
            : isSidebarExpanded
            ? 'pl-[230px]'
            : 'pl-[72px]'
        }`}
      >
        {renderActiveView()}
      </main>
    </div>
  );
};

export default App;
