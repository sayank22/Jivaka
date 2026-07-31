import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useMotionPreference';

const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;
const fragmentShader = `
  uniform float uTime; uniform float uReducedMotion; uniform vec3 uColor; varying vec2 vUv;
  float bell(float value, float center, float width) { float distance = (value - center) / width; return exp(-distance * distance); }
  float ecg(float x) { float phase = fract(x); return bell(phase, .17, .04) * .10 - bell(phase, .365, .014) * .16 + bell(phase, .400, .010) * .72 - bell(phase, .440, .018) * .24 + bell(phase, .670, .070) * .17; }
  void main() {
    float time = uTime * (1.0 - uReducedMotion);
    float heartbeat = 1.0 + smoothstep(.82, 1.0, sin(time * 1.4) * .5 + .5) * .16;
    float y = .50 + ecg(vUv.x * 1.65 - time * .22) * heartbeat * .33;
    float distanceToLine = abs(vUv.y - y);
    float antiAlias = fwidth(distanceToLine) * 1.5;
    float line = 1.0 - smoothstep(.0035, .0035 + antiAlias, distanceToLine);
    float glow = 1.0 - smoothstep(.008, .060, distanceToLine);
    float edges = smoothstep(0.0, .16, vUv.x) * smoothstep(1.0, .80, vUv.x);
    gl_FragColor = vec4(uColor, (line * .78 + glow * .18) * edges);
  }
`;

function readPrimaryColor() {
  const [hue, saturation, lightness] = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim().split(/\s+/);
  return new THREE.Color().setHSL(Number(hue) / 360, Number.parseFloat(saturation) / 100, Number.parseFloat(lightness) / 100);
}

function EcgShader({ color, reducedMotion }) {
  const materialRef = useRef(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uReducedMotion: { value: reducedMotion ? 1 : 0 }, uColor: { value: color } }), [color, reducedMotion]);
  useEffect(() => { materialRef.current.uniforms.uColor.value = color; materialRef.current.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0; }, [color, reducedMotion]);
  useFrame(({ clock }) => { if (materialRef.current) materialRef.current.uniforms.uTime.value = clock.getElapsedTime(); });
  return <mesh frustumCulled={false}><planeGeometry args={[2, 2]} /><shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} extensions={{ derivatives: true }} /></mesh>;
}

const HeroEcg = () => {
  const reducedMotion = useReducedMotion();
  const [color, setColor] = useState(readPrimaryColor);
  useEffect(() => { const observer = new MutationObserver(() => setColor(readPrimaryColor())); observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); return () => observer.disconnect(); }, []);
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-95"><Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 1], fov: 50 }}><EcgShader color={color} reducedMotion={reducedMotion} /></Canvas></div>;
};

export default HeroEcg;
