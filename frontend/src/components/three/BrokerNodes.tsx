import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface BrokerNodesProps {
  scrollProgress: number; // 0 to 1
}

interface BrokerNodeData {
  id: string;
  name: string;
  val: string;
  // Positioned naturally alongside the financial district street facades
  pos: [number, number, number];
}

const BROKERS: BrokerNodeData[] = [
  { id: 'zerodha', name: 'ZERODHA', val: '₹3.50L', pos: [-6.5, 4.2, -18] },
  { id: 'groww', name: 'GROWW', val: '₹1.50L', pos: [6.8, 5.0, -22] },
  { id: 'angel', name: 'ANGEL ONE', val: '₹0.60L', pos: [-5.8, 3.8, -32] },
  { id: 'upstox', name: 'UPSTOX', val: '₹1.08L', pos: [6.2, 4.4, -36] },
  { id: 'cas', name: 'CAS / NSDL', val: '₹1.74L', pos: [0, 7.5, -42] },
];

export const BrokerNodes: React.FC<BrokerNodesProps> = ({ scrollProgress }) => {
  // Convergence progression: between 0.18 and 0.45
  const convergenceFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.18) / 0.24)
  );

  // Fade visibility: appears 0.14, solid 0.22-0.42, dissolves into InvestOS terminal at 0.48
  const opacity =
    scrollProgress < 0.12
      ? 0
      : scrollProgress < 0.22
      ? (scrollProgress - 0.12) / 0.10
      : scrollProgress > 0.48
      ? Math.max(0, 1 - (scrollProgress - 0.48) / 0.06)
      : 1;

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle ambient drift
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.15;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {BROKERS.map((broker) => {
        // Target convergence point: center forward in front of camera
        const targetX = 0;
        const targetY = 3.5;
        const targetZ = -12;

        const currentX = THREE.MathUtils.lerp(broker.pos[0], targetX, convergenceFactor);
        const currentY = THREE.MathUtils.lerp(broker.pos[1], targetY, convergenceFactor);
        const currentZ = THREE.MathUtils.lerp(broker.pos[2], targetZ, convergenceFactor);

        return (
          <group key={broker.id} position={[currentX, currentY, currentZ]}>
            {/* Minimal physical electronic marker point */}
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={opacity * 0.95} />
            </mesh>

            {/* Architectural reflection ray back into street canyon as data converges */}
            {convergenceFactor > 0.05 && (
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    args={[
                      new Float32Array([0, 0, 0, broker.pos[0] - currentX, broker.pos[1] - currentY, broker.pos[2] - currentZ]),
                      3,
                    ]}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color="#38bdf8"
                  transparent
                  opacity={opacity * convergenceFactor * 0.35}
                />
              </line>
            )}

            {/* Monospace Financial Node Label */}
            {convergenceFactor < 0.85 && (
              <group position={[0, 0.35, 0]}>
                <Text
                  fontSize={0.24}
                  color="#f8fafc"
                  anchorX="center"
                  anchorY="bottom"
                  fillOpacity={opacity * (1 - convergenceFactor)}
                >
                  {`${broker.name} // ${broker.val}`}
                </Text>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};
