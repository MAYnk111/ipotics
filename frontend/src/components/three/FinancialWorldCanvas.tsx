import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { FinancialDistrictEnvironment } from './FinancialDistrictEnvironment';
import { BrokerNodes } from './BrokerNodes';

interface WorldCanvasProps {
  scrollProgress?: number;
  isInternal?: boolean;
  pageRoute?: string;
}

const DynamicCameraController: React.FC<{
  scrollProgress?: number;
  isInternal?: boolean;
  pageRoute?: string;
}> = ({ scrollProgress = 0, isInternal = false, pageRoute = '' }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 4.25, -45));

  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    if (!isInternal) {
      // Landing page: EXACT original trajectory
      let targetX = 0;
      let targetY = 8.5;
      let targetZ = 8.0;
      let lookZ = -45;

      if (scrollProgress <= 0.25) {
        const p = scrollProgress / 0.25;
        targetX = 0;
        targetY = 8.5 - p * 3.8; // 8.5 down to 4.7
        targetZ = 8.0 - p * 14;   // 8.0 forward to -6.0
        lookZ = -45 - p * 15;
      } else if (scrollProgress <= 0.60) {
        const p = (scrollProgress - 0.25) / 0.35;
        targetX = -p * 1.5;
        targetY = 4.7 - p * 0.9;  // down to 3.8
        targetZ = -6.0 - p * 16;  // forward to -22
        lookZ = -60 - p * 20;
      } else {
        const p = (scrollProgress - 0.60) / 0.40;
        targetX = -1.5 + p * 1.0;
        targetY = 3.8 + p * 0.4;
        targetZ = -22 - p * 16;   // forward to -38
        lookZ = -80 - p * 25;
      }

      cameraRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
      cameraRef.current.lookAt(0, targetY * 0.5, lookZ);
      return;
    }

    // Internal pages: Route-specific vantage point with continuous living motion
    const t = clock.getElapsedTime();
    let targetX = 0;
    let targetY = 6.0;
    let targetZ = -14;
    let lookTargetX = 0;
    let lookTargetY = 3.5;
    let lookTargetZ = -60;

    switch (pageRoute) {
      case 'portfolio':
        targetX = -1.8 + Math.sin(t * 0.25) * 0.4;
        targetY = 4.6 + Math.cos(t * 0.20) * 0.2;
        targetZ = -16 + Math.sin(t * 0.15) * 0.6;
        lookTargetX = Math.sin(t * 0.18) * 0.3;
        lookTargetY = 3.2;
        lookTargetZ = -65;
        break;
      case 'analysis':
        targetX = 4.8 + Math.cos(t * 0.22) * 0.4;
        targetY = 7.8 + Math.sin(t * 0.18) * 0.25;
        targetZ = -24 + Math.cos(t * 0.14) * 0.5;
        lookTargetX = -2.0;
        lookTargetY = 3.5;
        lookTargetZ = -60;
        break;
      case 'simulate':
        targetX = -3.8 + Math.sin(t * 0.20) * 0.5;
        targetY = 5.2 + Math.cos(t * 0.25) * 0.2;
        targetZ = -34 + Math.sin(t * 0.18) * 0.6;
        lookTargetX = 1.2;
        lookTargetY = 4.0;
        lookTargetZ = -75;
        break;
      case 'discover':
        targetX = 3.2 + Math.cos(t * 0.24) * 0.4;
        targetY = 4.8 + Math.sin(t * 0.16) * 0.2;
        targetZ = -42 + Math.sin(t * 0.20) * 0.5;
        lookTargetX = -1.0;
        lookTargetY = 3.8;
        lookTargetZ = -88;
        break;
      case 'ai':
        targetX = Math.sin(t * 0.16) * 0.8;
        targetY = 11.5 + Math.cos(t * 0.14) * 0.35;
        targetZ = -8 + Math.sin(t * 0.12) * 0.7;
        lookTargetX = 0;
        lookTargetY = 3.8;
        lookTargetZ = -68;
        break;
      case 'audit':
        targetX = Math.sin(t * 0.18) * 0.4;
        targetY = 5.2 + Math.cos(t * 0.22) * 0.15;
        targetZ = -28 + Math.sin(t * 0.15) * 0.5;
        lookTargetX = 0;
        lookTargetY = 3.2;
        lookTargetZ = -82;
        break;
      default:
        targetX = 1.2 + Math.sin(t * 0.20) * 0.4;
        targetY = 6.5 + Math.cos(t * 0.18) * 0.2;
        targetZ = -14 + Math.sin(t * 0.15) * 0.5;
        lookTargetX = 0;
        lookTargetY = 3.5;
        lookTargetZ = -60;
        break;
    }

    cameraRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    currentLookAtRef.current.lerp(new THREE.Vector3(lookTargetX, lookTargetY, lookTargetZ), 0.05);
    cameraRef.current.lookAt(currentLookAtRef.current);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={50} position={[0, 8.5, 8]} />;
};

export const FinancialWorldCanvas: React.FC<WorldCanvasProps> = ({
  scrollProgress = 0,
  isInternal = false,
  pageRoute = '',
}) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#020408]">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#020408']} />
        <DynamicCameraController
          scrollProgress={scrollProgress}
          isInternal={isInternal}
          pageRoute={pageRoute}
        />

        {/* Cinematic Nocturnal Lighting: Moonlight key light + warm street ambiance */}
        <ambientLight intensity={isInternal ? 0.45 : 0.4} color="#0c192c" />
        {/* Cool blue-hour moonlight from upper right sky */}
        <directionalLight position={[20, 45, 10]} intensity={1.8} color="#93c5fd" castShadow />
        {/* Subtle warm bounce light from ground street lamps */}
        <directionalLight position={[-15, 2, -20]} intensity={0.6} color="#fef08a" />

        {/* Real Financial District Environment (Skyscrapers, office windows, wet street, traffic) */}
        <FinancialDistrictEnvironment scrollProgress={scrollProgress} />

        {/* Seamless Broker Convergence Nodes (only on landing page) */}
        {!isInternal && <BrokerNodes scrollProgress={scrollProgress} />}
      </Canvas>
    </div>
  );
};
