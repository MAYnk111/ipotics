import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlobeProps {
  scrollProgress: number; // 0 to 1
}

// Procedurally generate realistic terrestrial continental landmass texture with night city lights
function createRealisticEarthCanvas(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean abyss (near black oceanic crust)
  ctx.fillStyle = '#020612';
  ctx.fillRect(0, 0, width, height);

  // Helper to convert lat/lon (-90..90, -180..180) to canvas x,y
  const toXY = (lat: number, lon: number) => ({
    x: ((lon + 180) / 360) * width,
    y: ((90 - lat) / 180) * height,
  });

  // Draw simplified realistic continent polygons (dark slate charcoal)
  ctx.fillStyle = '#091122';
  ctx.strokeStyle = '#12233f';
  ctx.lineWidth = 1.2;

  const drawPolygon = (coords: [number, number][]) => {
    if (coords.length === 0) return;
    ctx.beginPath();
    const first = toXY(coords[0][0], coords[0][1]);
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < coords.length; i++) {
      const pt = toXY(coords[i][0], coords[i][1]);
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // Eurasia & Africa
  drawPolygon([
    [70, -10], [72, 30], [70, 70], [74, 130], [60, 170], [45, 140],
    [35, 120], [22, 115], [10, 105], [5, 95], [15, 80], [24, 68],
    [15, 50], [12, 44], [-35, 20], [-34, 18], [5, 2], [15, -17],
    [32, -10], [36, -5], [44, -9], [50, 2], [60, 5]
  ]);

  // India & South Asia subcontinent
  drawPolygon([
    [35, 74], [28, 77], [22, 88], [15, 80], [8, 77],
    [15, 74], [22, 69], [25, 70], [30, 72]
  ]);

  // North America
  drawPolygon([
    [72, -165], [70, -130], [55, -60], [45, -65], [25, -80],
    [15, -92], [20, -105], [30, -115], [50, -125], [60, -150]
  ]);

  // South America
  drawPolygon([
    [12, -75], [5, -52], [-10, -35], [-23, -42], [-45, -65],
    [-55, -68], [-40, -73], [-20, -70], [0, -80]
  ]);

  // Australia
  drawPolygon([
    [-12, 130], [-15, 145], [-25, 153], [-38, 146], [-35, 115],
    [-22, 114], [-15, 124]
  ]);

  // Major Global Financial Center Nocturnal Market Lights
  const financialCapitals = [
    { lat: 18.92, lon: 72.83, intensity: 1.0, r: 5 }, // Mumbai / Dalal St
    { lat: 28.61, lon: 77.20, intensity: 0.9, r: 4 }, // New Delhi
    { lat: 12.97, lon: 77.59, intensity: 0.95, r: 4 }, // Bangalore
    { lat: 51.50, lon: -0.12, intensity: 1.0, r: 5 }, // London
    { lat: 40.71, lon: -74.00, intensity: 1.0, r: 5 }, // New York
    { lat: 35.67, lon: 139.65, intensity: 1.0, r: 5 }, // Tokyo
    { lat: 1.35, lon: 103.81, intensity: 0.95, r: 4 }, // Singapore
    { lat: 22.31, lon: 114.16, intensity: 1.0, r: 4 }, // Hong Kong
    { lat: 25.20, lon: 55.27, intensity: 0.9, r: 4 }, // Dubai
    { lat: 50.11, lon: 8.68, intensity: 0.85, r: 4 }, // Frankfurt
    { lat: 47.37, lon: 8.54, intensity: 0.85, r: 3 }, // Zurich
    { lat: 37.77, lon: -122.41, intensity: 0.9, r: 4 }, // San Francisco
  ];

  financialCapitals.forEach((city) => {
    const pt = toXY(city.lat, city.lon);
    // Subtle golden/cyan nocturnal bloom
    const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, city.r * 2.5);
    grad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.5)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, city.r * 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export const FinancialGlobe: React.FC<GlobeProps> = ({ scrollProgress }) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const networkLinesRef = useRef<THREE.LineSegments>(null);

  // Generate realistic earth canvas texture once
  const earthTexture = useMemo(() => {
    if (typeof document !== 'undefined') {
      return createRealisticEarthCanvas();
    }
    return null;
  }, []);

  // Generate precision financial routing arcs connecting actual market centers
  const { linePositions, marketNodes } = useMemo(() => {
    const lines: number[] = [];
    const nodes: number[] = [];
    const radius = 2.4;

    const latLonToVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const routes: [ [number, number], [number, number] ][] = [
      [[18.92, 72.83], [51.50, -0.12]], // Mumbai -> London
      [[18.92, 72.83], [1.35, 103.81]], // Mumbai -> Singapore
      [[18.92, 72.83], [25.20, 55.27]], // Mumbai -> Dubai
      [[51.50, -0.12], [40.71, -74.00]], // London -> New York
      [[40.71, -74.00], [37.77, -122.41]], // New York -> SF
      [[37.77, -122.41], [35.67, 139.65]], // SF -> Tokyo
      [[35.67, 139.65], [22.31, 114.16]], // Tokyo -> Hong Kong
      [[22.31, 114.16], [1.35, 103.81]], // Hong Kong -> Singapore
      [[51.50, -0.12], [50.11, 8.68]], // London -> Frankfurt
    ];

    routes.forEach(([src, dst]) => {
      const p1 = latLonToVector3(src[0], src[1], radius);
      const p2 = latLonToVector3(dst[0], dst[1], radius);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(radius + Math.min(0.6, distance * 0.18));

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const pts = curve.getPoints(24);
      for (let i = 0; i < pts.length - 1; i++) {
        lines.push(pts[i].x, pts[i].y, pts[i].z);
        lines.push(pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
      }

      nodes.push(p1.x, p1.y, p1.z);
      nodes.push(p2.x, p2.y, p2.z);
    });

    return {
      linePositions: new Float32Array(lines),
      marketNodes: new Float32Array(nodes),
    };
  }, []);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      // Steady financial earth rotation + scroll progression
      globeGroupRef.current.rotation.y += delta * 0.08;
      globeGroupRef.current.rotation.x = 0.22 + scrollProgress * 0.35;
    }
  });

  return (
    <group ref={globeGroupRef} position={[0, -0.1, 0]}>
      {/* Photorealistic Dark Earth Sphere with Night Texture */}
      <mesh>
        <sphereGeometry args={[2.38, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture || undefined}
          color="#0b1329"
          roughness={0.82}
          metalness={0.25}
        />
      </mesh>

      {/* Restrained Oceanic Atmosphere Scattering */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.48, 48, 48]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Thin Financial Geodesic Connection Arcs */}
      <lineSegments ref={networkLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={Math.max(0.15, 0.45 - scrollProgress * 0.2)}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Key Financial Center Surface Markers */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[marketNodes, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#fef08a"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Restrained Technical Equator Reference Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.45, 2.455, 64]} />
        <meshBasicMaterial
          color="#1e293b"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};
