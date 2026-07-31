import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useMotionPreference';

const NODE_COUNT = 24;
const CONNECTION_DISTANCE = 1.25;

function readThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  const toColor = (token) => {
    const [hue, saturation, lightness] = token.trim().split(/\s+/);
    return new THREE.Color().setHSL(Number(hue) / 360, Number.parseFloat(saturation) / 100, Number.parseFloat(lightness) / 100);
  };
  return {
    node: toColor(styles.getPropertyValue('--primary')),
    line: toColor(styles.getPropertyValue('--secondary')),
  };
}

function createNetwork() {
  const nodes = Array.from({ length: NODE_COUNT }, (_, index) => {
    const seed = index + 1;
    return new THREE.Vector3(
      ((seed * 47) % 100) / 24 - 2,
      ((seed * 71) % 100) / 32 - 1.55,
      ((seed * 37) % 100) / 55 - 0.9,
    );
  });
  const pairs = [];

  nodes.forEach((node, index) => {
    nodes.slice(index + 1).forEach((candidate, offset) => {
      if (node.distanceTo(candidate) < CONNECTION_DISTANCE) pairs.push([index, index + offset + 1]);
    });
  });

  return { nodes, pairs };
}

function Network({ colors, reducedMotion }) {
  const nodesRef = useRef();
  const linesRef = useRef();
  const mouse = useRef(new THREE.Vector2());
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { nodes, pairs } = useMemo(createNetwork, []);
  const positions = useMemo(() => new Float32Array(pairs.length * 6), [pairs]);

  useEffect(() => {
    const onPointerMove = (event) => {
      mouse.current.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const projectedMouse = new THREE.Vector3(mouse.current.x * 2.4, mouse.current.y * 1.55, 0);
    const current = [];

    nodes.forEach((origin, index) => {
      const position = origin.clone();
      if (!reducedMotion) {
        position.x += Math.sin(time * 0.33 + index) * 0.055;
        position.y += Math.cos(time * 0.28 + index * 1.7) * 0.07;
      }
      const distance = position.distanceTo(projectedMouse);
      if (distance < 0.9) position.addScaledVector(position.clone().sub(projectedMouse).normalize(), (0.9 - distance) * 0.045);
      current.push(position);
      dummy.position.copy(position);
      dummy.scale.setScalar(1 + Math.max(0, 0.7 - distance) * 0.22);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(index, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;

    pairs.forEach(([from, to], index) => {
      positions.set(current[from].toArray(), index * 6);
      positions.set(current[to].toArray(), index * 6 + 3);
    });
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    camera.position.z = 4;
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <lineBasicMaterial color={colors.line} transparent opacity={0.32} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.052, 10, 10]} />
        <meshBasicMaterial color={colors.node} transparent opacity={0.9} depthWrite={false} />
      </instancedMesh>
    </group>
  );
}

const HeroNetwork = ({ position = "center" }) => {
  const reducedMotion = useReducedMotion();
  const [colors, setColors] = useState(() => readThemeColors());

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(readThemeColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className={`
    absolute inset-y-0 z-0 pointer-events-none
    ${position === "right" ? "right-0 w-1/2" : ""}
    ${position === "left" ? "left-0 w-1/2" : ""}
    ${position === "center" ? "inset-0" : ""}
  `}>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 4], fov: 54 }}>
        <Network colors={colors} reducedMotion={reducedMotion} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default HeroNetwork;
