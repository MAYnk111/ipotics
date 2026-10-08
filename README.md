# INVESTOS — Cinematic Investment Intelligence Platform

> **"All your investments. One intelligent layer."**

InvestOS is an AI-powered investment intelligence platform that unifies fragmented multi-broker accounts into one consolidated portfolio layer and provides real-time quantitative diagnostics, digital twin rebalance simulation, algorithmic candlestick pattern discovery, multi-agent AI consensus, and cryptographic audit provenance.

---

## 🌟 Architecture & Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **3D Cinematic Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation**: GSAP, ScrollTrigger, Framer Motion
- **Financial Charting**: Lightweight Charts v5 (OHLC Candlesticks, volume, crosshair, DTW pattern matching)
- **State Architecture**: Zustand shared application state connecting landing narratives and working product views
- **Icons & Styling**: Tailwind CSS, Lucide React

### Backend
- **Framework**: FastAPI (Python 3.13)
- **Engines**: Quantitative Risk Engine, Monte Carlo Simulator, DTW Pattern Finder, Merkle Provenance Verifier
- **Libraries**: NumPy, Pandas, Scikit-Learn, Pydantic, Uvicorn

---

## 🚀 Running the Project

### 1. Frontend Development Server
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend API Server
```bash
# In the project root:
.\venv\Scripts\uvicorn backend.main:app --reload --port 8000
```
API Documentation will be live at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🎬 Cinematic Scroll Story (Landing Page)
1. **Scene 01 — The Financial World**: Dark terrestrial globe with restrained cyan/blue atmosphere, geodesic financial network lines, and dynamic camera flight.
2. **Scene 02 — Fragmented Investments**: Floating broker data nodes (Zerodha, Groww, Angel One, Upstox, CAS) converging physically toward the InvestOS core.
3. **Scene 03 — Unified Portfolio**: Normalized portfolio valuation (₹8,42,650), consolidated P&L, multi-broker asset allocation, and health score assembly.
4. **Scene 04 — Portfolio Doctor**: Quantitative risk audit showing 28.4% IT concentration breaching defensive threshold ceilings (25.0%), Sharpe 1.45, Beta 1.12, and action prescriptions.
5. **Scene 05 — Digital Twin**: Side-by-side sandbox. The real portfolio is frozen while the digital twin is fully interactive (+₹50k REIT injection dynamically increases health score from 78 to 89).
6. **Scene 06 — Pattern Discovery**: Real Lightweight Charts candlestick series with Euclidean / DTW algorithmic historical analog matches (92%, 87%, 81%).
7. **Scene 07 — Alternative Assets**: Uncorrelated yield discovery (commercial REITs, power InvITs, sovereign debt) linked directly to the digital twin state.
8. **Scene 08 — Agentic AI**: 5 specialized quantitative agents (Portfolio, Risk, Research, Simulation, Alternative Assets) orchestrating consensus over an event fabric.
9. **Scene 09 — Audit & Provenance**: Zero-knowledge Merkle root verification chain validating snapshots, risk calculations, and simulation integrity.
10. **Scene 10 — Final CTA**: Return to dark financial horizon with direct navigation into the live workspace.

---

## 💻 Working Product Application
- **Sliding Navigation Rail**: Collapsible from 72px to 230px without ever obscuring the workspace.
- **Unified Portfolio (`/portfolio`)**: Multi-broker holdings table, ISIN level normalization, CSV/CAS import simulation, and broker distribution metrics.
- **Portfolio Doctor (`/analysis`)**: Quantitative factor audit, Monte Carlo confidence intervals, and defensive ceiling prescriptions.
- **Digital Twin (`/simulate`)**: Live interactive cloned portfolio sandbox with custom asset injection and real-time metric recalculation.
- **Pattern Discovery (`/discover`)**: Interactive candlestick chart with multi-asset selection and 15-year historical analog scans.
- **Alternative Assets (`/alternative`)**: Curated list of REITs, InvITs, and bonds with 1-click injection into the simulation model.
- **AI Orchestrator (`/ai`)**: Multi-agent inter-communication traces and query dispatcher.
- **Audit Reports (`/audit`)**: Tamper-evident cryptographic provenance hashes and certificate export.
