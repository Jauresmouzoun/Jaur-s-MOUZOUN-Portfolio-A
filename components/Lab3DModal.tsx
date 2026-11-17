import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  X,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Layers,
  Eye,
  Sun,
  CloudRain,
  Droplets,
  Compass,
} from 'lucide-react';
import { LabSceneId } from '../data/portfolioData';
import { useApp } from '../context/AppContext';
import {
  afterDraw,
  createStudioRenderer,
  detectSoftwareWebGL,
  disposeObject3D,
  isWebGLAvailable,
  setupStudioEnvironment,
} from './three/threeUtils';
import { buildLabScene, BuiltLabScene, CameraPreset, LabSceneOptions } from './three/labScenes';

interface Lab3DModalProps {
  isOpen: boolean;
  initialScene: LabSceneId;
  onClose: () => void;
}

const _camTargetPos = new THREE.Vector3();
const _camTargetLook = new THREE.Vector3();
const _rayMouse = new THREE.Vector2();

export default function Lab3DModal({ isOpen, initialScene, onClose }: Lab3DModalProps) {
  const { language } = useApp();
  const mountRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState<LabSceneId>(initialScene);
  const [explodeValue, setExplodeValue] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showSecondary, setShowSecondary] = useState<boolean>(true);
  const [climateMetric, setClimateMetric] = useState<'precipitation' | 'humidity'>('precipitation');
  const [lightingMood, setLightingMood] = useState<'studio' | 'golden'>('studio');
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [presets, setPresets] = useState<CameraPreset[]>([]);
  const [hoveredInfo, setHoveredInfo] = useState<{ label: string; detail: string } | null>(null);
  const [webGLOk, setWebGLOk] = useState<boolean>(true);

  // Refs synced to the Three.js loop so UI updates never tear down the WebGL context
  const stateRef = useRef<{
    explodeTarget: number;
    explodeDamped: number;
    autoRotate: boolean;
    options: LabSceneOptions;
    cameraTransition: { active: boolean; pos: THREE.Vector3; target: THREE.Vector3 };
    switchSceneFn: ((id: LabSceneId) => void) | null;
  }>({
    explodeTarget: 0,
    explodeDamped: 0,
    autoRotate: true,
    options: {
      showSecondaryLayer: true,
      climateMetric: 'precipitation',
      lightingMood: 'studio',
    },
    cameraTransition: {
      active: false,
      pos: new THREE.Vector3(6.4, 5.1, 6.8),
      target: new THREE.Vector3(0, 2.3, 0),
    },
    switchSceneFn: null,
  });

  useEffect(() => {
    if (isOpen) {
      setActiveScene(initialScene);
    }
  }, [isOpen, initialScene]);

  useEffect(() => {
    stateRef.current.explodeTarget = explodeValue;
    stateRef.current.autoRotate = autoRotate;
    stateRef.current.options = {
      showSecondaryLayer: showSecondary,
      climateMetric,
      lightingMood,
    };
  }, [explodeValue, autoRotate, showSecondary, climateMetric, lightingMood]);

  // Keyboard shortcuts: Escape to close, H to toggle HUD dock
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key.toLowerCase() === 'h') setDockCollapsed((prev) => !prev);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Main WebGL initialization lifecycle (runs once while modal is open)
  useEffect(() => {
    if (!isOpen) return;
    if (!isWebGLAvailable()) {
      setWebGLOk(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const renderer = createStudioRenderer(isSoftwareGl, false);
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const bgHex = 0x060b16;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.025);

    const envTexture = setupStudioEnvironment(renderer, scene);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    camera.position.set(6.4, 5.1, 6.8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.2;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.autoRotate = !isSoftwareGl && stateRef.current.autoRotate;
    controls.autoRotateSpeed = 0.9;

    // Cancel scripted camera transitions immediately if user interacts
    const onControlsStart = () => {
      stateRef.current.cameraTransition.active = false;
    };
    controls.addEventListener('start', onControlsStart);

    // 3-Point Warm/Cool Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x0f172a, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.85);
    keyLight.position.set(7, 10, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -7;
      keyLight.shadow.camera.right = 7;
      keyLight.shadow.camera.top = 7;
      keyLight.shadow.camera.bottom = -7;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 28;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    rimLight.position.set(-7, 5, -6);
    scene.add(rimLight);

    let currentBuilt: BuiltLabScene | null = null;
    const mountScene = (id: LabSceneId) => {
      if (currentBuilt) {
        scene.remove(currentBuilt.root);
        disposeObject3D(currentBuilt.root);
      }
      currentBuilt = buildLabScene(id, renderer, language);
      scene.add(currentBuilt.root);
      setPresets(currentBuilt.presets);
      setHoveredInfo(null);

      const first = currentBuilt.presets[0];
      if (first) {
        _camTargetPos.set(first.position[0], first.position[1], first.position[2]);
        _camTargetLook.set(first.target[0], first.target[1], first.target[2]);
        stateRef.current.cameraTransition = {
          active: true,
          pos: _camTargetPos.clone(),
          target: _camTargetLook.clone(),
        };
      }
    };

    mountScene(activeScene);
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    stateRef.current.switchSceneFn = mountScene;

    // Layer-filtered throttled raycasting for hovering data points
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    let lastRaycast = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycast < 50 || !currentBuilt) return;
      lastRaycast = now;

      const rect = renderer.domElement.getBoundingClientRect();
      _rayMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _rayMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(_rayMouse, camera);
      const hits = raycaster.intersectObjects(currentBuilt.root.children, true);
      if (hits.length > 0 && hits[0].object.userData?.label) {
        const { label, detail } = hits[0].object.userData;
        setHoveredInfo({ label, detail });
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHoveredInfo(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };
    renderer.domElement.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    const timerRef = { current: 0 };
    let isDisposed = false;

    const tick = () => {
      if (isDisposed) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      // Update lighting mood smoothly
      const isGolden = stateRef.current.options.lightingMood === 'golden';
      keyLight.color.setHex(isGolden ? 0xffc670 : 0xfff1dc);
      keyLight.intensity = isGolden ? 2.2 : 1.85;
      hemiLight.intensity = isGolden ? 0.5 : 0.65;

      // Damped exploded view factor
      stateRef.current.explodeDamped = THREE.MathUtils.damp(
        stateRef.current.explodeDamped,
        stateRef.current.explodeTarget,
        6,
        dt
      );

      if (currentBuilt) {
        currentBuilt.update(elapsed, stateRef.current.explodeDamped, stateRef.current.options);
      }

      // Smooth damped camera preset transitions
      const trans = stateRef.current.cameraTransition;
      if (trans.active) {
        const lambda = 5.5;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, trans.pos.x, lambda, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, trans.pos.y, lambda, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, trans.pos.z, lambda, dt);

        controls.target.x = THREE.MathUtils.damp(controls.target.x, trans.target.x, lambda, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, trans.target.y, lambda, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, trans.target.z, lambda, dt);

        if (camera.position.distanceTo(trans.pos) < 0.04) {
          trans.active = false;
        }
      }

      controls.autoRotate = !isSoftwareGl && stateRef.current.autoRotate;
      controls.update();

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(renderer, tick, timerRef);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timerRef.current);
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', onControlsStart);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      controls.dispose();

      if (currentBuilt) {
        disposeObject3D(currentBuilt.root);
      }
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, language]);

  const handleSelectScene = (id: LabSceneId) => {
    setActiveScene(id);
    setExplodeValue(0);
    setShowSecondary(true);
    stateRef.current.switchSceneFn?.(id);
  };

  const handleSelectPreset = (preset: CameraPreset) => {
    stateRef.current.cameraTransition = {
      active: true,
      pos: new THREE.Vector3(...preset.position),
      target: new THREE.Vector3(...preset.target),
    };
  };

  if (!isOpen) return null;

  const sceneTabs: { id: LabSceneId; titleFr: string; titleEn: string; spec: string }[] = [
    { id: 'namibia-pca', titleFr: 'ACP Namibie', titleEn: 'Namibia PCA', spec: 'F1×F2×F3 · 86.6%' },
    { id: 'climate-series', titleFr: 'Climat Cotonou', titleEn: 'Cotonou Climate', spec: '2005–2024' },
    { id: 'beninexplore', titleFr: 'BeninExplore', titleEn: 'BeninExplore', spec: 'Diorama 3D' },
  ];

  const activeMeta = sceneTabs.find((s) => s.id === activeScene);

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#060b16] text-offwhite select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Laboratoire 3D"
    >
      {/* Dedicated WebGL Mount Container */}
      {webGLOk ? (
        <div ref={mountRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <p className="text-lg font-semibold text-offwhite mb-2">
            {language === 'fr'
              ? 'WebGL est indisponible sur cet appareil.'
              : 'WebGL is unavailable on this device.'}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-steel-600 text-white rounded-lg text-sm font-medium"
          >
            {language === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
          </button>
        </div>
      )}

      {/* Top-Left Compact Header Bar (solid/rgba without backdrop-filter over WebGL) */}
      <div className="fixed top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-20">
        <div className="pointer-events-auto bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-4">
          <div>
            <div className="text-[11px] font-mono text-steel-400 uppercase tracking-wider">
              {activeMeta?.spec}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-offwhite leading-tight">
              {language === 'fr' ? activeMeta?.titleFr : activeMeta?.titleEn}
            </h2>
          </div>
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          <p className="text-xs text-slate-400 hidden sm:block">
            {language === 'fr'
              ? 'Glisser pour pivoter · Molette pour zoomer · H pour masquer le dock'
              : 'Drag to orbit · Scroll to zoom · Press H to hide dock'}
          </p>
        </div>

        <button
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold shadow-lg transition-colors"
          aria-label="Fermer le Labo 3D"
        >
          <X size={16} />
          <span className="hidden sm:inline">{language === 'fr' ? 'Quitter 3D' : 'Exit 3D'}</span>
        </button>
      </div>

      {/* Hover Raycast Inspection Readout (Top-Right below Exit) */}
      {hoveredInfo && (
        <div className="fixed top-20 right-4 z-20 pointer-events-none bg-slate-950/95 border border-steel-500/50 rounded-xl px-4 py-2.5 shadow-xl max-w-xs">
          <div className="text-xs font-bold text-steel-400">{hoveredInfo.label}</div>
          <div className="text-xs text-slate-300 mt-0.5">{hoveredInfo.detail}</div>
        </div>
      )}

      {/* Collapsible Unified Bottom Control Dock */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-[900px] flex flex-col items-center transition-transform duration-300"
        style={{
          transform: `translate(-50%, ${dockCollapsed ? 'calc(100% - 36px)' : '0'})`,
        }}
      >
        {/* Collapse Toggle Handle */}
        <button
          onClick={() => setDockCollapsed((prev) => !prev)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-t-xl bg-slate-950/95 border border-b-0 border-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
        >
          {dockCollapsed ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          <span>
            {dockCollapsed
              ? language === 'fr'
                ? 'Afficher les contrôles'
                : 'Show Controls'
              : language === 'fr'
              ? 'Masquer (H)'
              : 'Hide (H)'}
          </span>
        </button>

        {/* Main Dock Panel (solid rgba, zero backdrop-blur) */}
        <div className="w-full bg-slate-950/92 border border-slate-800 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-2xl flex flex-col gap-3">
          {/* Row 1: Scene Switcher & Camera Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Scene Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
              {sceneTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleSelectScene(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeScene === tab.id
                      ? 'bg-steel-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'fr' ? tab.titleFr : tab.titleEn}
                </button>
              ))}
            </div>

            {/* Camera Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Compass size={14} className="text-slate-400 hidden sm:block" />
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-white whitespace-nowrap transition-colors"
                >
                  {language === 'fr' ? p.labelFr : p.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Exploded View Slider & Scene-Specific Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/90 text-xs">
            {/* Explode Slider */}
            <label className="flex items-center gap-2.5 text-slate-300 font-medium">
              <Layers size={14} className="text-steel-400 shrink-0" />
              <span className="whitespace-nowrap">
                {language === 'fr' ? 'Vue éclatée' : 'Explode'}
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={explodeValue}
                onChange={(e) => setExplodeValue(parseFloat(e.target.value))}
                className="w-24 sm:w-32 accent-sky-400 cursor-pointer"
              />
              <span className="font-mono text-[11px] text-steel-400 tabular-nums w-8">
                {Math.round(explodeValue * 100)}%
              </span>
            </label>

            {/* Scene-Specific & Rotation Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeScene === 'climate-series' && (
                <button
                  onClick={() =>
                    setClimateMetric((prev) =>
                      prev === 'precipitation' ? 'humidity' : 'precipitation'
                    )
                  }
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 whitespace-nowrap transition-colors"
                >
                  {climateMetric === 'precipitation' ? (
                    <CloudRain size={13} className="text-sky-400" />
                  ) : (
                    <Droplets size={13} className="text-emerald-400" />
                  )}
                  <span>
                    {climateMetric === 'precipitation'
                      ? language === 'fr'
                        ? 'Précipitations'
                        : 'Precipitation'
                      : language === 'fr'
                      ? 'Humidité'
                      : 'Humidity'}
                  </span>
                </button>
              )}

              {activeScene === 'beninexplore' && (
                <button
                  onClick={() =>
                    setLightingMood((prev) => (prev === 'studio' ? 'golden' : 'studio'))
                  }
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 whitespace-nowrap transition-colors"
                >
                  <Sun size={13} className="text-amber-400" />
                  <span>
                    {lightingMood === 'studio'
                      ? language === 'fr'
                        ? 'Lumière Studio'
                        : 'Studio Light'
                      : 'Golden Hour'}
                  </span>
                </button>
              )}

              <button
                onClick={() => setShowSecondary((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border whitespace-nowrap transition-colors ${
                  showSecondary
                    ? 'bg-steel-500/15 border-steel-500/50 text-sky-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Eye size={13} />
                <span>
                  {activeScene === 'namibia-pca'
                    ? language === 'fr'
                      ? 'Sphère KMO'
                      : 'KMO Sphere'
                    : activeScene === 'climate-series'
                    ? 'Holt-Winters'
                    : language === 'fr'
                    ? 'Circuit IA'
                    : 'AI Trail'}
                </span>
              </button>

              <button
                onClick={() => setAutoRotate((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border whitespace-nowrap transition-colors ${
                  autoRotate
                    ? 'bg-steel-500/15 border-steel-500/50 text-sky-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <RotateCw size={13} />
                <span>{language === 'fr' ? 'Rotation' : 'Spin'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
