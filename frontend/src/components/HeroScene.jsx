import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   Glowing Sun — Volumetric core + layered glow shells + wireframe
   ═══════════════════════════════════════════════════════ */
const Sun = () => {
    const coreRef = useRef();
    const glow1Ref = useRef();
    const glow2Ref = useRef();
    const glow3Ref = useRef();
    const wireRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const pulse = 1 + Math.sin(t * 0.8) * 0.03;

        if (coreRef.current) {
            coreRef.current.scale.setScalar(pulse);
            coreRef.current.rotation.y = t * 0.05;
        }
        if (wireRef.current) {
            wireRef.current.scale.setScalar(pulse * 1.05);
            wireRef.current.rotation.y = -t * 0.1;
            wireRef.current.rotation.x = t * 0.05;
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
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffb347"
                    emissiveIntensity={5}
                    roughness={0.1}
                    metalness={0.0}
                    toneMapped={false}
                />
            </mesh>
            {/* Wireframe shell for high-tech look */}
            <mesh ref={wireRef}>
                <icosahedronGeometry args={[0.18, 1]} />
                <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.4} toneMapped={false} />
            </mesh>
            {/* Glow layer 1 */}
            <mesh ref={glow1Ref}>
                <sphereGeometry args={[0.22, 24, 24]} />
                <meshBasicMaterial color="#ff9500" transparent opacity={0.3} side={THREE.BackSide} toneMapped={false} />
            </mesh>
            {/* Glow layer 2 — corona */}
            <mesh ref={glow2Ref}>
                <sphereGeometry args={[0.28, 24, 24]} />
                <meshBasicMaterial color="#ff7b00" transparent opacity={0.1} side={THREE.BackSide} toneMapped={false} />
            </mesh>
            {/* Glow layer 3 — outermost haze */}
            <mesh ref={glow3Ref}>
                <sphereGeometry args={[0.36, 24, 24]} />
                <meshBasicMaterial color="#ff5500" transparent opacity={0.03} side={THREE.BackSide} toneMapped={false} />
            </mesh>
        </group>
    );
};

/* ═══════════════════════════════════════════════════════
   Orbit Paths (Glowing Rings)
   ═══════════════════════════════════════════════════════ */
const OrbitPath = ({ radius, tilt }) => {
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 128; i++) {
            const angle = (i / 128) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius * 0.45;
            const y = Math.sin(angle) * Math.sin(tilt) * radius * 0.25;
            pts.push(new THREE.Vector3(x, y, z));
        }
        return pts;
    }, [radius, tilt]);

    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </line>
    );
};

/* ═══════════════════════════════════════════════════════
   Moons Orbiting Planets
   ═══════════════════════════════════════════════════════ */
const Moon = ({ radius, speed, size, color }) => {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const angle = t * speed;
        // Moon's local orbit around the planet
        ref.current.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.2, Math.sin(angle) * radius);
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.6} toneMapped={false} />
        </mesh>
    );
};

/* ═══════════════════════════════════════════════════════
   Orbiting Planet + Glowing Orbit Path (combined)
   ═══════════════════════════════════════════════════════ */
const OrbitalBody = ({ radius, speed, size, color, emissiveColor, startAngle = 0, tilt = 0, hasRing = false, moons = [] }) => {
    const groupRef = useRef();
    const planetRef = useRef();
    const ringRef = useRef();
    const pushOffset = useRef(new THREE.Vector2(0, 0));
    const { pointer } = useThree();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
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

        let targetPushX = 0;
        let targetPushY = 0;

        if (dist < pushRadius && dist > 0.01) {
            const force = (1 - dist / pushRadius) * 0.3;
            targetPushX = (dx / dist) * force;
            targetPushY = (dy / dist) * force;
        }

        // Buttery smooth lerp for push effect
        pushOffset.current.x = THREE.MathUtils.lerp(pushOffset.current.x, targetPushX, delta * 4);
        pushOffset.current.y = THREE.MathUtils.lerp(pushOffset.current.y, targetPushY, delta * 4);

        px += pushOffset.current.x;
        py += pushOffset.current.y;

        groupRef.current.position.set(px, py, pz);
        if (planetRef.current) {
            planetRef.current.rotation.y = t * 0.4;
            planetRef.current.rotation.x = t * 0.15;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = -t * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={planetRef}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={0.8}
                    roughness={0.4}
                    metalness={0.6}
                    toneMapped={false}
                />
            </mesh>
            
            {hasRing && (
                <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
                    <ringGeometry args={[size * 1.4, size * 2.2, 48]} />
                    <meshStandardMaterial 
                        color={color} 
                        emissive={emissiveColor} 
                        emissiveIntensity={0.3} 
                        transparent 
                        opacity={0.5} 
                        side={THREE.DoubleSide} 
                        toneMapped={false}
                    />
                </mesh>
            )}

            {moons.map((moon, idx) => (
                <Moon key={idx} {...moon} />
            ))}
        </group>
    );
};

/* ═══════════════════════════════════════════════════════
   Starfield — parallax-responsive particles
   ═══════════════════════════════════════════════════════ */
const Starfield = ({ count = 400 }) => {
    const ref = useRef();
    const { pointer } = useThree();

    const positionsRef = useRef(null);
    if (!positionsRef.current) {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 25;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        positionsRef.current = arr;
    }

    useFrame((state, delta) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        const targetY = t * 0.008 - pointer.x * 0.05;
        const targetX = t * 0.005 - pointer.y * 0.03;

        // Smooth interpolation
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, delta * 3);
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, delta * 3);
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
                size={0.03}
                transparent
                opacity={0.8}
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
        <pointLight position={[4, 2, 4]} intensity={0.3} color="#00f0ff" />
        <pointLight position={[-3, -1, 3]} intensity={0.25} color="#a855f7" />
    </>
);

/* ═══════════════════════════════════════════════════════
   Main Interactive System Group
   ═══════════════════════════════════════════════════════ */
const InteractiveSystem = () => {
    const groupRef = useRef();
    const { pointer } = useThree();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        
        // Target rotation based on time and mouse position
        const targetY = 0.15 + t * 0.02 + pointer.x * 0.15;
        const targetX = Math.PI / 4.5 + pointer.y * 0.15;

        // Smoothly interpolate current rotation to target rotation
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 3);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 3);
    });

    return (
        <group ref={groupRef}>
            <Sun />

            {/* Orbit Paths */}
            <OrbitPath radius={0.45} tilt={0.12} />
            <OrbitPath radius={0.75} tilt={-0.15} />
            <OrbitPath radius={1.05} tilt={0.1} />
            <OrbitPath radius={1.4} tilt={-0.05} />

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

            {/* Violet — mid orbit with a ring */}
            <OrbitalBody
                radius={0.75}
                speed={0.2}
                size={0.05}
                color="#a855f7"
                emissiveColor="#7c3aed"
                startAngle={2.8}
                tilt={-0.15}
                hasRing={true}
            />

            {/* Teal — outer orbit with a moon */}
            <OrbitalBody
                radius={1.05}
                speed={0.12}
                size={0.04}
                color="#34d399"
                emissiveColor="#10b981"
                startAngle={4.8}
                tilt={0.1}
                moons={[
                    { radius: 0.12, speed: 2.0, size: 0.01, color: '#ffffff' }
                ]}
            />

            {/* Orange — far outer orbit with multiple moons */}
            <OrbitalBody
                radius={1.4}
                speed={0.08}
                size={0.045}
                color="#ff9500"
                emissiveColor="#ea580c"
                startAngle={1.2}
                tilt={-0.05}
                moons={[
                    { radius: 0.1, speed: 3.0, size: 0.008, color: '#fcd34d' },
                    { radius: 0.16, speed: 1.2, size: 0.012, color: '#cbd5e1' }
                ]}
            />
        </group>
    );
};

/* ═══════════════════════════════════════════════════════
   Main Canvas Export
   ═══════════════════════════════════════════════════════ */
const HeroScene = () => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
            <Canvas
                camera={{ position: [0, 0.2, 3.5], fov: 35 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
                style={{ background: 'transparent' }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor(0x000000, 0);
                    scene.background = null;
                }}
            >
                <Lighting />
                <Starfield count={400} />
                <InteractiveSystem />

                {/* Bloom for glowing elements */}
                <EffectComposer multisampling={4}>
                    <Bloom
                        intensity={2.2}
                        luminanceThreshold={0.15}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default HeroScene;

