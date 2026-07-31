import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useMotionPreference';

const POSITION_CLASSES = { left: 'left-0 top-0 bottom-0 w-[46%]', right: 'right-0 top-0 bottom-0 w-[46%]', center: 'inset-0 w-full' };

function getThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  const toColor = (name) => {
    const [hue, saturation, lightness] = styles.getPropertyValue(name).trim().split(/\s+/);
    return new THREE.Color().setHSL(Number(hue) / 360, Number.parseFloat(saturation) / 100, Number.parseFloat(lightness) / 100);
  };
  return { strand: toColor('--primary'), bonds: toColor('--secondary') };
}

function createDna() {
  const nodes = [];
  const bonds = [];
  const levels = 12;
  for (let level = 0; level < levels; level += 1) {
    const angle = (level / (levels - 1)) * Math.PI * 3.2;
    const y = -1.4 + (level / (levels - 1)) * 2.8;
    const first = [Math.cos(angle) * 0.42, y, Math.sin(angle) * 0.42];
    const second = [-first[0], y, -first[2]];
    nodes.push(first, second);
    bonds.push(first, second);
    if (level > 0) {
      bonds.push(nodes[(level - 1) * 2], first, nodes[(level - 1) * 2 + 1], second);
    }
  }
  return { nodes, bonds: new Float32Array(bonds.flat()) };
}

function DnaScene({ colors, reducedMotion }) {
  const groupRef = useRef(null);
  const nodesRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { nodes, bonds } = useMemo(createDna, []);

  useEffect(() => {
    nodes.forEach((node, index) => {
      dummy.position.fromArray(node);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(index, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, nodes]);

  useFrame(({ clock }) => {
    if (!reducedMotion) groupRef.current.rotation.y = clock.getElapsedTime() * 0.22;
  });

  return <group ref={groupRef} rotation={[0.16, 0, -0.08]}>
    <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[bonds, 3]} /></bufferGeometry><lineBasicMaterial color={colors.bonds} transparent opacity={0.36} depthWrite={false} /></lineSegments>
    <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]}><sphereGeometry args={[0.062, 10, 10]} /><meshBasicMaterial color={colors.strand} transparent opacity={0.88} depthWrite={false} /></instancedMesh>
  </group>;
}

const HeroDna = ({ position = 'right' }) => {
  const reducedMotion = useReducedMotion();
  const [colors, setColors] = useState(getThemeColors);
  const [dpr, setDpr] = useState(1.5);
  useEffect(() => {
    const observer = new MutationObserver(() => setColors(getThemeColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return <div aria-hidden="true" className={`pointer-events-none absolute z-0 opacity-80 ${POSITION_CLASSES[position] ?? POSITION_CLASSES.center}`}><Canvas frameloop={reducedMotion ? 'demand' : 'always'} dpr={[1, dpr]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 4], fov: 52 }}><PerformanceMonitor onDecline={() => setDpr(1)}><DnaScene colors={colors} reducedMotion={reducedMotion} /></PerformanceMonitor></Canvas></div>;
};

export default HeroDna;
