import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createBuildingFacadeTexture,
  createWetStreetTexture,
  createBuildingTickerTexture,
} from './FinancialDistrictTextures';

interface DistrictProps {
  scrollProgress: number;
}

interface BuildingData {
  id: string;
  x: number;
  z: number;
  w: number;
  h: number;
  d: number;
  color: string;
  windowDensity: number;
  hasTicker?: boolean;
}

export const FinancialDistrictEnvironment: React.FC<DistrictProps> = ({ scrollProgress }) => {
  const trafficHeadlightsRef = useRef<THREE.Points>(null);
  const trafficTaillightsRef = useRef<THREE.Points>(null);
  const tickerMeshRef = useRef<THREE.Mesh>(null);
  const districtGroupRef = useRef<THREE.Group>(null);

  // Generate procedural textures
  const textures = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return {
      facadeDark: createBuildingFacadeTexture('#080d19', 0.28),
      facadeGlass: createBuildingFacadeTexture('#050811', 0.42),
      facadeTungsten: createBuildingFacadeTexture('#0a1122', 0.35),
      wetStreet: createWetStreetTexture(),
      tickerBoard: createBuildingTickerTexture(),
    };
  }, []);

  // Architectural layout representing Mumbai BKC / London Canary Wharf financial street canyon
  const buildings: BuildingData[] = useMemo(() => [
    // Left Financial Street Wall
    { id: 'b-l1', x: -14, z: -10, w: 9, h: 26, d: 10, color: '#060a14', windowDensity: 0.35, hasTicker: true },
    { id: 'b-l2', x: -15, z: -28, w: 10, h: 38, d: 11, color: '#070c18', windowDensity: 0.40 },
    { id: 'b-l3', x: -16, z: -46, w: 11, h: 48, d: 12, color: '#050912', windowDensity: 0.30 },
    { id: 'b-l4', x: -14, z: -66, w: 10, h: 34, d: 10, color: '#060a14', windowDensity: 0.25 },
    { id: 'b-l5', x: -18, z: -88, w: 13, h: 54, d: 14, color: '#040710', windowDensity: 0.38 },

    // Right Financial Street Wall
    { id: 'b-r1', x: 14, z: -8, w: 8, h: 24, d: 9, color: '#070c17', windowDensity: 0.32 },
    { id: 'b-r2', x: 15, z: -26, w: 9, h: 42, d: 10, color: '#060b16', windowDensity: 0.45, hasTicker: true },
    { id: 'b-r3', x: 16, z: -45, w: 10, h: 52, d: 11, color: '#040812', windowDensity: 0.28 },
    { id: 'b-r4', x: 15, z: -65, w: 10, h: 36, d: 10, color: '#060a15', windowDensity: 0.35 },
    { id: 'b-r5', x: 17, z: -86, w: 12, h: 60, d: 13, color: '#050913', windowDensity: 0.40 },

    // Distant City Skyline Towers (Center Background Depth)
    { id: 'b-c1', x: -4, z: -95, w: 8, h: 45, d: 8, color: '#050914', windowDensity: 0.30 },
    { id: 'b-c2', x: 5, z: -105, w: 9, h: 58, d: 9, color: '#040810', windowDensity: 0.35 },
    { id: 'b-c3', x: 0, z: -125, w: 14, h: 72, d: 12, color: '#03060d', windowDensity: 0.25 },
    { id: 'b-c4', x: -10, z: -115, w: 7, h: 38, d: 7, color: '#04070e', windowDensity: 0.20 },
    { id: 'b-c5', x: 11, z: -120, w: 8, h: 42, d: 8, color: '#04070e', windowDensity: 0.20 },
  ], []);

  // Moving street traffic headlights (warm white) & taillights (subtle red)
  const { headPositions, tailPositions, headCount, tailCount } = useMemo(() => {
    const hCount = 35;
    const tCount = 35;
    const hPos = new Float32Array(hCount * 3);
    const tPos = new Float32Array(tCount * 3);

    for (let i = 0; i < hCount; i++) {
      // Inbound lane (left side of street: x between -4 and -1)
      hPos[i * 3 + 0] = -3.2 + Math.random() * 2.2;
      hPos[i * 3 + 1] = 0.25;
      hPos[i * 3 + 2] = -Math.random() * 110;
    }

    for (let i = 0; i < tCount; i++) {
      // Outbound lane (right side of street: x between 1 and 4)
      tPos[i * 3 + 0] = 1.2 + Math.random() * 2.2;
      tPos[i * 3 + 1] = 0.25;
      tPos[i * 3 + 2] = -Math.random() * 110;
    }

    return {
      headPositions: hPos,
      tailPositions: tPos,
      headCount: hCount,
      tailCount: tCount,
    };
  }, []);

  // Subtle traffic animation & ticker scrolling
  useFrame((_, delta) => {
    if (trafficHeadlightsRef.current) {
      const pos = trafficHeadlightsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < headCount; i++) {
        pos[i * 3 + 2] += delta * 12; // Inbound traffic moving toward camera
        if (pos[i * 3 + 2] > 10) {
          pos[i * 3 + 2] = -110;
        }
      }
      trafficHeadlightsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (trafficTaillightsRef.current) {
      const pos = trafficTaillightsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < tailCount; i++) {
        pos[i * 3 + 2] -= delta * 10; // Outbound traffic moving away into distance
        if (pos[i * 3 + 2] < -110) {
          pos[i * 3 + 2] = 10;
        }
      }
      trafficTaillightsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Ticker offset scroll on building facade
    if (textures?.tickerBoard) {
      textures.tickerBoard.offset.x += delta * 0.04;
    }
  });

  return (
    <group ref={districtGroupRef}>
      {/* 1. Wet Asphalt Ground Plane with Street Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -50]} receiveShadow>
        <planeGeometry args={[90, 180]} />
        <meshStandardMaterial
          map={textures?.wetStreet || undefined}
          roughness={0.25}
          metalness={0.7}
          color="#060912"
        />
      </mesh>

      {/* 2. Architectural Skyscrapers Flanking the Financial Avenue */}
      {buildings.map((b, idx) => {
        const facadeTexture =
          idx % 3 === 0
            ? textures?.facadeGlass
            : idx % 2 === 0
            ? textures?.facadeTungsten
            : textures?.facadeDark;

        return (
          <group key={b.id} position={[b.x, b.h / 2, b.z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial
                map={facadeTexture || undefined}
                color={b.color}
                roughness={0.4}
                metalness={0.65}
              />
            </mesh>

            {/* Building Electronic Ticker Ribbon on select buildings */}
            {b.hasTicker && textures?.tickerBoard && (
              <mesh
                ref={tickerMeshRef}
                position={[b.x < 0 ? b.w / 2 + 0.05 : -b.w / 2 - 0.05, -b.h / 4, 0]}
                rotation={[0, b.x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
              >
                <planeGeometry args={[b.d, 3.2]} />
                <meshBasicMaterial map={textures.tickerBoard} transparent opacity={0.9} />
              </mesh>
            )}

            {/* Rooftop Obstruction Warning Beacon */}
            <mesh position={[0, b.h / 2 + 0.2, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
        );
      })}

      {/* 3. Real Street Traffic Headlights (Warm White) */}
      <points ref={trafficHeadlightsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[headPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#fef08a"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Real Street Traffic Taillights (Muted Amber / Ruby Red) */}
      <points ref={trafficTaillightsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[tailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.35}
          color="#f43f5e"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 5. Street Lamps Along Financial Boulevard */}
      {[-8, -25, -45, -65, -85].map((zPos, i) => (
        <group key={`lamps-${i}`}>
          {/* Left street lamp light */}
          <pointLight
            position={[-7.5, 5, zPos]}
            intensity={1.2}
            distance={16}
            color="#fef3c7"
          />
          {/* Right street lamp light */}
          <pointLight
            position={[7.5, 5, zPos]}
            intensity={1.2}
            distance={16}
            color="#fef3c7"
          />
        </group>
      ))}

      {/* 6. Realistic Atmospheric Blue-Hour Fog / Volumetric Mist */}
      <fog attach="fog" args={['#030712', 25, 120]} />
    </group>
  );
};
