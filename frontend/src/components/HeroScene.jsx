import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   Glowing Sun — Volumetric core + layered glow shells
   ═══════════════════════════════════════════════════════ */
const Sun = () => {
    const coreRef = useRef();
    const glow1Ref = useRef();
    const glow2Ref = useRef();
    const glow3Ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const pulse = 1 + Math.sin(t * 0.8) * 0.03;

        if (coreRef.current) {
            coreRef.current.scale.setScalar(pulse);
            coreRef.current.rotation.y = t * 0.05;
        }
        if (glow1Ref.current) glow1Ref.current.scale.setScalar(pulse * 1.15);
        if (glow2Ref.current) {
            glow2Ref.current.scale.setScalar(pulse * 1.45);
            glow2Ref.current.rotation.y = -t * 0.03;
        }
        if (glow3Ref.current) glow3Ref.current.scale.setScalar(pulse * 1.8 + Math.sin(t * 1.2) * 0.04);
    });

    return (
        <group>
            {/* Inner hot core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.18, 64, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffb347"
                    emissiveIntensity={5}
                    roughness={0.1}
                    metalness={0.0}
                    toneMapped={false}
                />
            </mesh>
            {/* Glow layer 1 */}
            <mesh ref={glow1Ref}>
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshBasicMaterial color="#ff9500" transparent opacity={0.3} side={THREE.BackSide} toneMapped={false} />
            </mesh>
            {/* Glow layer 2 — corona */}
            <mesh ref={glow2Ref}>
                <sphereGeometry args={[0.28, 32, 32]} />
                <meshBasicMaterial color="#ff7b00" transparent opacity={0.1} side={THREE.BackSide} toneMapped={false} />
            </mesh>
            {/* Glow layer 3 — outermost haze */}
            <mesh ref={glow3Ref}>
                <sphereGeometry args={[0.36, 32, 32]} />
                <meshBasicMaterial color="#ff5500" transparent opacity={0.03} side={THREE.BackSide} toneMapped={false} />
            </mesh>
        </group>
    );
};

/* ═══════════════════════════════════════════════════════
   Orbiting Planet + Glowing Orbit Path (combined)
   ═══════════════════════════════════════════════════════ */
const OrbitalBody = ({ radius, speed, size, color, emissiveColor, startAngle = 0, tilt = 0 }) => {
    const planetRef = useRef();
    const { pointer } = useThree();

    useFrame((state) => {
        if (!planetRef.current) return;
        const t = state.clock.getElapsedTime();
        const baseAngle = startAngle + t * speed;

        // Base orbit position (elliptical)
        let px = Math.cos(baseAngle) * radius;
        let pz = Math.sin(baseAngle) * radius * 0.45;
        let py = Math.sin(baseAngle) * Math.sin(tilt) * radius * 0.25;

        // Mouse cursor antigravity push
        const mouseX = pointer.x * 3;
        const mouseY = pointer.y * 2;
        const dx = px - mouseX;
        const dy = py - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pushRadius = 1.2;

        if (dist < pushRadius && dist > 0.01) {
            const force = (1 - dist / pushRadius) * 0.25;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
        }

        planetRef.current.position.set(px, py, pz);
        planetRef.current.rotation.y = t * 0.4;
        planetRef.current.rotation.x = t * 0.15;
    });

    return (
        <mesh ref={planetRef}>
                <sphereGeometry args={[size, 64, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={0.8}
                    roughness={0.4}
                    metalness={0.6}
                    toneMapped={false}
                />
        </mesh>
    );
};

/* ═══════════════════════════════════════════════════════
   Starfield — parallax-responsive particles
   ═══════════════════════════════════════════════════════ */
const Starfield = ({ count = 250 }) => {
    const ref = useRef();
    const { pointer } = useThree();

    const positionsRef = useRef(null);
    if (!positionsRef.current) {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // eslint-disable-next-line react-hooks/purity
            arr[i * 3] = (Math.random() - 0.5) * 25;
            // eslint-disable-next-line react-hooks/purity
            arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
            // eslint-disable-next-line react-hooks/purity
            arr[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        positionsRef.current = arr;
    }

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.008 - pointer.x * 0.05;
        ref.current.rotation.x = t * 0.005 - pointer.y * 0.03;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positionsRef.current}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#c8d6e5"
                size={0.02}
                transparent
                opacity={0.55}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

/* ═══════════════════════════════════════════════════════
   Lighting Rig
   ═══════════════════════════════════════════════════════ */
const Lighting = () => (
    <>
        <ambientLight intensity={0.08} />
        <pointLight position={[0, 0, 0]} intensity={4} color="#ff9500" distance={12} decay={2} />
        <pointLight position={[4, 2, 4]} intensity={0.25} color="#00f0ff" />
        <pointLight position={[-3, -1, 3]} intensity={0.2} color="#a855f7" />
    </>
);

/* ═══════════════════════════════════════════════════════
   Main Canvas Export
   ═══════════════════════════════════════════════════════ */
const HeroScene = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
            <Canvas
                camera={{ position: [0, 0.2, 3.5], fov: 35 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, premultipliedAlpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
                style={{ background: 'transparent' }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor(0x000000, 0);
                    scene.background = null;
                }}
            >
                <Lighting />

                {/* Entire orbital system tilted ~40° */}
                <group rotation={[Math.PI / 4.5, 0.15, 0]}>
                    <Sun />

                    {/* Cyan — inner orbit */}
                    <OrbitalBody
                        radius={0.45}
                        speed={0.35}
                        size={0.035}
                        color="#00f0ff"
                        emissiveColor="#0891b2"
                        startAngle={0.5}
                        tilt={0.12}
                    />

                    {/* Violet — mid orbit */}
                    <OrbitalBody
                        radius={0.75}
                        speed={0.2}
                        size={0.05}
                        color="#a855f7"
                        emissiveColor="#7c3aed"
                        startAngle={2.8}
                        tilt={-0.15}
                    />

                    {/* Teal — outer orbit */}
                    <OrbitalBody
                        radius={1.05}
                        speed={0.12}
                        size={0.04}
                        color="#34d399"
                        emissiveColor="#10b981"
                        startAngle={4.8}
                        tilt={0.1}
                    />
                </group>

                {/* Bloom for sun glow */}
                <EffectComposer multisampling={4}>
                    <Bloom
                        intensity={2.0}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default HeroScene;
