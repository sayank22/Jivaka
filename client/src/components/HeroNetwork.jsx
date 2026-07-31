import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useMotionPreference';

const NODE_COUNT = 24;
const LINK_DISTANCE = 1.15;

const POSITION_OFFSETS = { left: -1.25, center: 0, right: 1.25 };

function getThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  const toColor = (name) => {
    const [hue, saturation, lightness] = styles.getPropertyValue(name).trim().split(/\s+/);
    return new THREE.Color().setHSL(Number(hue) / 360, Number.parseFloat(saturation) / 100, Number.parseFloat(lightness) / 100);
  };
  return { node: toColor('--primary'), line: toColor('--secondary') };
}

function createNetwork() {
  const nodes = Array.from({ length: NODE_COUNT }, (_, index) => {
    const seed = index + 1;
    return {
      x: ((seed * 47) % 100) / 27 - 1.85,
      y: ((seed * 71) % 100) / 36 - 1.38,
      z: ((seed * 31) % 100) / 100 - 0.5,
      phase: seed * 0.71,
    };
  });
  const pairs = [];
  nodes.forEach((node, index) => nodes.slice(index + 1).forEach((other, offset) => {
    if (Math.hypot(node.x - other.x, node.y - other.y) < LINK_DISTANCE) pairs.push([index, index + offset + 1]);
  }));
  return { nodes, pairs };
}

function NetworkScene({ colors, position, reducedMotion }) {
  const nodesRef = useRef(null);
  const linesRef = useRef(null);
  const pointer = useRef(new THREE.Vector2(4, 4));
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { nodes, pairs } = useMemo(createNetwork, []);
  const linePositions = useMemo(() => new Float32Array(pairs.length * 6), [pairs]);
  const currentPositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const { size } = useThree();
  const horizontalOffset = size.width < 640 ? 0 : POSITION_OFFSETS[position];

  useEffect(() => {
    const onPointerMove = (event) => pointer.current.set((event.clientX / window.innerWidth) * 4 - 2, -(event.clientY / window.innerHeight) * 2.8 + 1.4);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    nodes.forEach((node, index) => {
      let x = node.x;
      let y = node.y;
      if (!reducedMotion) {
        x += Math.sin(time * 0.23 + node.phase) * 0.055;
        y += Math.cos(time * 0.19 + node.phase * 1.4) * 0.065;
      }
      const dx = x + horizontalOffset - pointer.current.x;
      const dy = y - pointer.current.y;
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 0.85 - distance) * 0.065;
      if (distance > 0.001) { x += (dx / distance) * influence; y += (dy / distance) * influence; }
      currentPositions[index * 3] = x;
      currentPositions[index * 3 + 1] = y;
      currentPositions[index * 3 + 2] = node.z;
      dummy.position.set(x + horizontalOffset, y, node.z);
      dummy.scale.setScalar(1 + Math.max(0, 0.65 - distance) * 0.23);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(index, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
    pairs.forEach(([from, to], index) => {
      linePositions.set(currentPositions.subarray(from * 3, from * 3 + 3), index * 6);
      linePositions.set(currentPositions.subarray(to * 3, to * 3 + 3), index * 6 + 3);
      linePositions[index * 6] += horizontalOffset;
      linePositions[index * 6 + 3] += horizontalOffset;
    });
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <group>
    <lineSegments ref={linesRef}><bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry><lineBasicMaterial color={colors.line} transparent opacity={0.22} depthWrite={false} /></lineSegments>
    <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color={colors.node} transparent opacity={0.82} depthWrite={false} /></instancedMesh>
  </group>;
}

const HeroNetwork = ({ position = "center" }) => {
  const reducedMotion = useReducedMotion();
  const [colors, setColors] = useState(getThemeColors);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(getThemeColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const positionClasses = {
    left: 'left-0 top-0 bottom-0 w-[46%]',
    right: 'right-0 top-0 bottom-0 w-[46%]',
    center: 'inset-0 w-full',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 opacity-85 ${positionClasses[position] ?? positionClasses.center}`}
    >
      <Canvas
        frameloop={reducedMotion ? 'demand' : 'always'}
        dpr={[1, dpr]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4], fov: 54 }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)}>
          <NetworkScene colors={colors} position={position} reducedMotion={reducedMotion} />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};

export default HeroNetwork;
