import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  afterDraw,
  createStudioRenderer,
  detectSoftwareWebGL,
  disposeObject3D,
  isWebGLAvailable,
  setupStudioEnvironment,
} from './threeUtils';
import { Theme } from '../../context/AppContext';

interface Hero3DCanvasProps {
  theme: Theme;
}

// Pre-allocated scratch helpers at module scope (zero GC in render loop)
const _dummy = new THREE.Object3D();
const _targetBg = new THREE.Color();
const _cLow = new THREE.Color('#0369a1');
const _cMid = new THREE.Color('#38bdf8');
const _cHigh = new THREE.Color('#f59e0b');
const _tempColor = new THREE.Color();

export default function Hero3DCanvas({ theme }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<Theme>(theme);
  const [webGLOk, setWebGLOk] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebGLOk(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionScale = prefersReducedMotion ? 0.35 : 1;

    const renderer = createStudioRenderer(isSoftwareGl, false);
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initialBg = themeRef.current === 'dark' ? 0x020617 : 0xf8fafc;
    scene.background = new THREE.Color(initialBg);
    scene.fog = new THREE.FogExp2(initialBg, 0.036);

    const envTexture = setupStudioEnvironment(renderer, scene);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(6.8, 4.3, 9.2);
    camera.lookAt(0.2, -0.3, 0);

    // Studio warm/cool 3-point lighting
    const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x0f172a, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.65);
    keyLight.position.set(7, 10, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.05);
    rimLight.position.set(-7, 4, -6);
    scene.add(rimLight);

    // Root hero 3D econometric group
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0.4, -0.35, 0);
    scene.add(rootGroup);

    // 1. Parametric Econometric Surface
    const segX = 42;
    const segZ = 32;
    const surfaceGeo = new THREE.PlaneGeometry(15, 11, segX, segZ);
    surfaceGeo.rotateX(-Math.PI / 2);

    const posAttr = surfaceGeo.attributes.position;
    const vertexCount = posAttr.count;
    const colors = new Float32Array(vertexCount * 3);
    surfaceGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const surfaceMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.35,
      metalness: 0.42,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    rootGroup.add(surfaceMesh);

    // 2. Wireframe Regression Iso-grid overlay (polygonOffset prevents z-fighting)
    const wireMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === 'dark' ? 0x7dd3fc : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.24 : 0.26,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const wireMesh = new THREE.Mesh(surfaceGeo, wireMat);
    wireMesh.position.y = 0.018;
    rootGroup.add(wireMesh);

    // 3. InstancedMesh statistical observation points (48 points)
    const nodeCount = 48;
    const nodeGeo = new THREE.SphereGeometry(0.095, 14, 14);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.7,
    });
    const nodesInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const nodeCoords: { x: number; z: number; phase: number; offset: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const gx = ((i % 8) - 3.5) * 1.75;
      const gz = (Math.floor(i / 8) - 2.5) * 1.75;
      nodeCoords.push({
        x: gx,
        z: gz,
        phase: i * 0.45,
        offset: 0.28 + ((i * 7) % 10) * 0.045,
      });
    }
    rootGroup.add(nodesInstanced);

    // 4. Floating Ambient Econometric Particle Constellation
    const particleCount = 110;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBaseY = new Float32Array(particleCount);
    const particlePhases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i * 2.39996) % (Math.PI * 2);
      const radius = 2.0 + ((i * 17) % 100) / 14;
      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius * 0.8;
      const py = 0.6 + ((i * 13) % 40) / 10;
      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;
      particleBaseY[i] = py;
      particlePhases[i] = i * 0.37;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: themeRef.current === 'dark' ? 0x7dd3fc : 0x0284c7,
      size: 0.11,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.72 : 0.55,
      sizeAttenuation: true,
    });
    const particlesPoints = new THREE.Points(particlesGeo, particlesMat);
    rootGroup.add(particlesPoints);

    // 5. Composite 3-Part Coordinate Axis Rig (metallic bars + lathe cones)
    const axisRig = new THREE.Group();
    axisRig.position.set(-7.1, 0, 5.1);
    const axisMetalMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.28,
      metalness: 0.85,
    });
    const coneTipMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.25,
      metalness: 0.7,
    });
    const axisSpecs: [number, number, number, number, number, number][] = [
      [3.8, 0, 0, 0, 0, -Math.PI / 2],
      [0, 3.4, 0, 0, 0, 0],
      [0, 0, -3.8, -Math.PI / 2, 0, 0],
    ];
    const barGeo = new THREE.CylinderGeometry(0.028, 0.028, 1, 12);
    const tipGeo = new THREE.ConeGeometry(0.085, 0.26, 16);

    axisSpecs.forEach(([dx, dy, dz, rx, ry, rz]) => {
      const len = Math.hypot(dx, dy, dz);
      const bar = new THREE.Mesh(barGeo, axisMetalMat);
      bar.scale.set(1, len, 1);
      bar.position.set(dx / 2, dy / 2, dz / 2);
      bar.rotation.set(rx, ry, rz);

      const tip = new THREE.Mesh(tipGeo, coneTipMat);
      tip.position.set(dx, dy, dz);
      tip.rotation.set(rx, ry, rz);

      axisRig.add(bar, tip);
    });
    const originSphere = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), coneTipMat);
    axisRig.add(originSphere);
    rootGroup.add(axisRig);

    // Function computing parametric econometric wave height
    const evalSurfaceHeight = (x: number, z: number, t: number) => {
      const cx = Math.sin(t * 0.4) * 1.4;
      const cz = Math.cos(t * 0.32) * 1.1;
      return (
        Math.sin(x * 0.44 + t * 0.95) * Math.cos(z * 0.4 - t * 0.7) * 0.95 +
        Math.sin((x + z) * 0.3 + t * 0.55) * 0.5 +
        Math.exp(-((x - cx) ** 2 + (z + cz) ** 2) * 0.075) * 1.25
      );
    };

    const updateManifold = (t: number) => {
      const colAttr = surfaceGeo.attributes.color as THREE.BufferAttribute;
      for (let i = 0; i < vertexCount; i++) {
        const vx = posAttr.getX(i);
        const vz = posAttr.getZ(i);
        const vy = evalSurfaceHeight(vx, vz, t);
        posAttr.setY(i, vy);

        const norm = THREE.MathUtils.clamp((vy + 1.1) / 2.9, 0, 1);
        if (norm < 0.55) {
          _tempColor.copy(_cLow).lerp(_cMid, norm / 0.55);
        } else {
          _tempColor.copy(_cMid).lerp(_cHigh, (norm - 0.55) / 0.45);
        }
        colAttr.setXYZ(i, _tempColor.r, _tempColor.g, _tempColor.b);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      surfaceGeo.computeVertexNormals();

      for (let i = 0; i < nodeCount; i++) {
        const nc = nodeCoords[i];
        const baseY = evalSurfaceHeight(nc.x, nc.z, t);
        const floatY = baseY + nc.offset + Math.sin(t * 1.6 + nc.phase) * 0.12;
        _dummy.position.set(nc.x, floatY, nc.z);
        const s = 0.85 + Math.sin(t * 1.4 + nc.phase) * 0.22;
        _dummy.scale.setScalar(s);
        _dummy.updateMatrix();
        nodesInstanced.setMatrixAt(i, _dummy.matrix);
      }
      nodesInstanced.instanceMatrix.needsUpdate = true;
      nodesInstanced.computeBoundingSphere();

      const pPos = particlesGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pPos.setY(i, particleBaseY[i] + Math.sin(t * 0.9 + particlePhases[i]) * 0.28);
      }
      pPos.needsUpdate = true;
      particlesPoints.rotation.y = t * 0.04;
      rootGroup.rotation.y = Math.sin(t * 0.22) * 0.12;
    };

    // Initial geometry evaluation & pre-warm shader compilation
    updateManifold(0);
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer parallax tracking
    const pointerTarget = { x: 0, y: 0 };
    const pointerDamped = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerTarget.x = nx;
      pointerTarget.y = ny;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize listener + ResizeObserver for responsive container sizing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleResize) : null;
    resizeObserver?.observe(container);

    // Pause animation when Hero is completely scrolled off-screen to preserve GPU/battery
    let isHeroVisible = true;
    const visibilityObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const visible = entries[0]?.isIntersecting ?? true;
              const wasVisible = isHeroVisible;
              isHeroVisible = visible;
              if (visible && !wasVisible && !isDisposed && !isContextLost) {
                clock.getDelta();
                scheduleNextFrame();
              }
            },
            { threshold: 0.02 }
          )
        : null;
    visibilityObserver?.observe(container);

    // WebGL context loss safety
    let isContextLost = false;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      isContextLost = true;
      setContextLost(true);
      cancelAnimationFrame(frameId);
      clearTimeout(timerRef.current);
    };
    const onContextRestored = () => {
      isContextLost = false;
      setContextLost(false);
      clock.getDelta();
      if (isHeroVisible && !isDisposed) {
        scheduleNextFrame();
      }
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const clock = new THREE.Clock();
    let frameId = 0;
    const timerRef = { current: 0 };
    let isDisposed = false;
    let simTime = 0;

    const scheduleNextFrame = () => {
      if (isDisposed || isContextLost || !isHeroVisible) return;
      if (isSoftwareGl) {
        afterDraw(renderer, tick, timerRef);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      if (isDisposed || isContextLost || !isHeroVisible) return;
      const dt = Math.min(clock.getDelta(), 0.12);
      simTime += dt * motionScale;
      updateManifold(simTime);

      // Smooth exponential damping for theme colors & camera sway
      const isDark = themeRef.current === 'dark';
      _targetBg.setHex(isDark ? 0x020617 : 0xf8fafc);
      (scene.background as THREE.Color).lerp(_targetBg, 1 - Math.exp(-6 * dt));
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(scene.background as THREE.Color);
      }
      wireMat.color.setHex(isDark ? 0x7dd3fc : 0x0284c7);
      wireMat.opacity = isDark ? 0.24 : 0.25;
      surfaceMat.opacity = isDark ? 0.88 : 0.76;
      particlesMat.color.setHex(isDark ? 0x7dd3fc : 0x0284c7);
      particlesMat.opacity = isDark ? 0.72 : 0.55;

      pointerDamped.x = THREE.MathUtils.damp(pointerDamped.x, pointerTarget.x, 4.5, dt);
      pointerDamped.y = THREE.MathUtils.damp(pointerDamped.y, pointerTarget.y, 4.5, dt);

      const ambientOrbitX = Math.sin(simTime * 0.28) * 0.55;
      const ambientOrbitY = Math.cos(simTime * 0.22) * 0.25;
      camera.position.x = 6.8 + ambientOrbitX + pointerDamped.x * 1.15;
      camera.position.y = 4.3 + ambientOrbitY - pointerDamped.y * 0.65;
      camera.lookAt(0.2, -0.3, 0);

      renderer.render(scene, camera);
      scheduleNextFrame();
    };

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timerRef.current);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      disposeObject3D(rootGroup);
      envTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <div ref={mountRef} className="w-full h-full" />
      {(!webGLOk || contextLost) && (
        <div className="absolute inset-0 bg-gradient-to-br from-steel-500/15 via-transparent to-sky-500/15 animate-pulse" />
      )}
    </div>
  );
}
