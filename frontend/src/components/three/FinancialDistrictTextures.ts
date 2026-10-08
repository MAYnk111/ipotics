import * as THREE from 'three';

// 1. Procedural Building Facade with illuminated office windows
export function createBuildingFacadeTexture(
  primaryColor: string = '#090f1d',
  accentWarmth: number = 0.35
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Deep dark glass & granite framework
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Vertical architectural mullions
  ctx.strokeStyle = '#050912';
  ctx.lineWidth = 4;
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Windows grid
  const cols = 16;
  const rows = 48;
  const winW = 16;
  const winH = 12;
  const padX = 16;
  const padY = 9;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isLit = Math.random() < accentWarmth;
      if (isLit) {
        // Natural nocturnal office colors: warm amber, cool desk flourescent, or soft white
        const rand = Math.random();
        if (rand < 0.5) {
          ctx.fillStyle = 'rgba(254, 240, 138, 0.75)'; // Warm 2700K tungsten office lamp
        } else if (rand < 0.85) {
          ctx.fillStyle = 'rgba(224, 242, 254, 0.65)'; // 4500K corporate desk lighting
        } else {
          ctx.fillStyle = 'rgba(251, 191, 36, 0.85)'; // Amber executive suite lamp
        }
      } else {
        ctx.fillStyle = 'rgba(10, 18, 32, 0.95)'; // Unlit dark glass
      }

      const x = c * (winW + padX) + 6;
      const y = r * (winH + padY) + 12;
      ctx.fillRect(x, y, winW, winH);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 2. Realistic Wet Asphalt Ground with street reflections
export function createWetStreetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark wet tarmac
  ctx.fillStyle = '#030509';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Road markings (subtle road lane lines)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 6;
  ctx.setLineDash([40, 40]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Wet puddles / specular sheen
  for (let i = 0; i < 40; i++) {
    const px = Math.random() * canvas.width;
    const py = Math.random() * canvas.height;
    const rad = 30 + Math.random() * 80;
    const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
    grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.04)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 12);
  return texture;
}

// 3. Realistic Building-mounted Ticker Board Facade (like BKC / Times Square / Dalal St facade screen)
export function createBuildingTickerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#020409';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Digital LED mesh dots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let x = 0; x < canvas.width; x += 4) {
    for (let y = 0; y < canvas.height; y += 4) {
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Ticker text
  ctx.font = 'bold 36px "JetBrains Mono", Consolas, monospace';
  const tickers = [
    { text: 'NIFTY 50  24,812.40 ▲ +114.20 (+0.46%)', color: '#10b981' },
    { text: 'SENSEX  81,385.10 ▲ +340.50 (+0.42%)', color: '#10b981' },
    { text: 'TCS  3,950.00 ▲ +1.82%', color: '#38bdf8' },
    { text: 'RELIANCE  3,080.00 ▲ +0.75%', color: '#10b981' },
    { text: 'INFY  1,625.00 ▼ -0.32%', color: '#f43f5e' },
    { text: 'HDFCBANK  1,680.00 ▲ +1.10%', color: '#10b981' },
  ];

  let posX = 20;
  tickers.forEach((t) => {
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, posX, 70);
    posX += ctx.measureText(t.text).width + 60;
  });

  // Secondary sub-ticker line
  ctx.font = '24px "JetBrains Mono", Consolas, monospace';
  ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
  ctx.fillText('BKC FINANCIAL CORRIDOR // REAL-TIME OMS ROUTING // ACTIVE BROKER NODES: 5 // VOLUME 2.8B SHARES', 20, 160);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
