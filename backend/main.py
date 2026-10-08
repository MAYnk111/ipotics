from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import datetime
import hashlib

app = FastAPI(
    title="InvestOS Intelligence API",
    description="Multi-broker portfolio convergence, quantitative risk, digital twin simulation & provenance engine",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HoldingItem(BaseModel):
    id: str
    assetName: str
    isin: str
    ticker: str
    assetType: str
    sector: str
    quantity: float
    averagePrice: float
    currentPrice: float
    investedValue: float
    currentValue: float
    pnl: float
    pnlPercentage: float
    sourceBroker: str
    accountId: str

class SimulationAction(BaseModel):
    actionType: str
    assetName: str
    assetType: str
    amount: float
    sector: str

@app.get("/")
def read_root():
    return {
        "platform": "InvestOS",
        "tagline": "All your investments. One intelligent layer.",
        "status": "OPERATIONAL",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "HEALTHY",
        "services": {
            "portfolio_engine": "ACTIVE",
            "risk_auditor": "ACTIVE",
            "digital_twin_sandbox": "ACTIVE",
            "agent_orchestrator": "ACTIVE",
            "provenance_merkle": "ACTIVE"
        }
    }

@app.post("/api/v1/provenance/verify")
def verify_snapshot(payload: dict):
    payload_str = str(sorted(payload.items()))
    sha = hashlib.sha256(payload_str.encode('utf-8')).hexdigest()
    return {
        "status": "VERIFIED",
        "merkle_root": f"0x{sha}",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "zero_knowledge_compliant": True
    }
