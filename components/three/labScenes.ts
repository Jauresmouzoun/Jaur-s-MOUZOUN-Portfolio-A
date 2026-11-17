import * as THREE from 'three';
import {
  createClimateGridTexture,
  createPedestalDialTexture,
  createRadialShadowTexture,
  createTerrainDetailTexture,
} from './threeUtils';
import { LabSceneId } from '../../data/portfolioData';
import { Language } from '../../context/AppContext';

export interface LabSceneOptions {
  showSecondaryLayer: boolean;
  climateMetric: 'precipitation' | 'humidity';
  lightingMood: 'studio' | 'golden';
}

export interface CameraPreset {
  id: string;
  labelFr: string;
  labelEn: string;
  position: [number, number, number];
  target: [number, number, number];
}

export interface BuiltLabScene {
  root: THREE.Group;
  presets: CameraPreset[];
  update: (elapsed: number, explodeFactor: number, options: LabSceneOptions) => void;
}

const _scratchColor = new THREE.Color();
const _scratchDummy = new THREE.Object3D();

function addContactShadow(parent: THREE.Group, radius = 5.5, y = 0.004) {
  const tex = createRadialShadowTexture();
  const geo = new THREE.PlaneGeometry(radius * 2, radius * 2);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(geo, mat);
  shadow.position.y = y;
  parent.add(shadow);
}

/* ============================================================================
 * SCENE 1: NAMIBIA PCA 3D FACTORIAL SPACE (F1 × F2 × F3, 86.6% Variance)
 * ========================================================================== */
function buildNamibiaPCAScene(renderer: THREE.WebGLRenderer, lang: Language): BuiltLabScene {
  const root = new THREE.Group();
  addContactShadow(root, 5.2, 0.005);

  // Layer 1: Calibrated Lathe Pedestal Base
  const pedestalGroup = new THREE.Group();
  const lathePoints = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(3.9, 0),
    new THREE.Vector2(4.05, 0.14),
    new THREE.Vector2(3.85, 0.28),
    new THREE.Vector2(0, 0.28),
  ];
  const baseGeo = new THREE.LatheGeometry(lathePoints, 64);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.8,
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  pedestalGroup.add(baseMesh);

  // Engraved dial face on top of pedestal (polygonOffset avoids z-fighting)
  const dialTex = createPedestalDialTexture(renderer, '#38bdf8', [
    'F1 · 48.2%',
    'F2 · 24.5%',
    'F3 · 13.9%',
    'KMO = 0.72',
  ]);
  const dialGeo = new THREE.CircleGeometry(3.75, 64);
  dialGeo.rotateX(-Math.PI / 2);
  const dialMat = new THREE.MeshStandardMaterial({
    map: dialTex,
    roughness: 0.72,
    metalness: 0.15,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialMesh.position.y = 0.285;
  dialMesh.receiveShadow = true;
  pedestalGroup.add(dialMesh);

  // Brushed brass trim ring
  const trimRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.88, 0.045, 16, 72),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.22, metalness: 0.92 })
  );
  trimRing.rotation.x = Math.PI / 2;
  trimRing.position.y = 0.28;
  pedestalGroup.add(trimRing);
  root.add(pedestalGroup);

  // Layer 2: Orthogonal Factor Axes Rig (F1, F2, F3)
  const axesGroup = new THREE.Group();
  axesGroup.position.y = 2.6;
  const axisMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.85 });
  const tipMatF1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3, metalness: 0.65 });
  const tipMatF2 = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.65 });
  const tipMatF3 = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.65 });

  const createAxis = (dir: THREE.Vector3, length: number, tipMat: THREE.Material, label: string, detail: string) => {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, length, 14), axisMat);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.3, 18), tipMat);
    tip.position.y = length / 2 + 0.15;
    tip.layers.enable(1);
    tip.userData = { label, detail };
    g.add(shaft, tip);

    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    g.quaternion.copy(quat);
    return g;
  };

  axesGroup.add(
    createAxis(new THREE.Vector3(1, 0, 0), 4.6, tipMatF1, 'Axe F1 (48.2 %)', lang === 'fr' ? 'Croissance économique & infrastructures' : 'Economic growth & infrastructure'),
    createAxis(new THREE.Vector3(0, 1, 0), 4.2, tipMatF2, 'Axe F2 (24.5 %)', lang === 'fr' ? 'Développement humain & santé' : 'Human development & health'),
    createAxis(new THREE.Vector3(0, 0, 1), 4.6, tipMatF3, 'Axe F3 (13.9 %)', lang === 'fr' ? 'Stabilité monétaire & échanges' : 'Monetary stability & trade')
  );

  // Origin hub
  const hub = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2, metalness: 0.9 })
  );
  axesGroup.add(hub);
  root.add(axesGroup);

  // Layer 3: Translucent Correlation Sphere + Equatorial Rings
  const sphereGroup = new THREE.Group();
  sphereGroup.position.y = 2.6;
  const corrSphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.15, 40, 32),
    new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.05,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  corrSphere.renderOrder = 2;
  sphereGroup.add(corrSphere);

  const eqRingMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.4,
    metalness: 0.6,
    transparent: true,
    opacity: 0.45,
  });
  const eq1 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.015, 10, 72), eqRingMat);
  const eq2 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.015, 10, 72), eqRingMat);
  eq2.rotation.x = Math.PI / 2;
  const eq3 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.015, 10, 72), eqRingMat);
  eq3.rotation.y = Math.PI / 2;
  sphereGroup.add(eq1, eq2, eq3);
  root.add(sphereGroup);

  // Layer 4: 9 WDI Variable Loading Vectors (composite stem + diamond tip)
  const vectorsGroup = new THREE.Group();
  vectorsGroup.position.y = 2.6;
  const wdiVariables = [
    { name: 'PIB / habitant', nameEn: 'GDP per capita', vec: [1.75, 0.85, 0.45], color: 0x38bdf8, corr: 'r = 0.91' },
    { name: 'Espérance de vie', nameEn: 'Life expectancy', vec: [1.45, 1.35, -0.3], color: 0x10b981, corr: 'r = 0.88' },
    { name: 'Accès électricité', nameEn: 'Electricity access', vec: [1.82, 0.65, 0.3], color: 0x38bdf8, corr: 'r = 0.93' },
    { name: 'Taux d’urbanisation', nameEn: 'Urbanization rate', vec: [1.65, 0.4, 0.72], color: 0x0ea5e9, corr: 'r = 0.86' },
    { name: 'Scolarisation sec.', nameEn: 'Secondary enrollment', vec: [1.15, 1.45, 0.22], color: 0x34d399, corr: 'r = 0.84' },
    { name: 'Inflation (IPC)', nameEn: 'Inflation (CPI)', vec: [-0.95, 0.42, 1.55], color: 0xf59e0b, corr: 'r = 0.79' },
    { name: 'Ouverture commerciale', nameEn: 'Trade openness', vec: [0.55, -0.75, 1.62], color: 0xfbbf24, corr: 'r = 0.81' },
    { name: 'IDE (% PIB)', nameEn: 'FDI (% GDP)', vec: [0.42, -0.45, 1.45], color: 0xf59e0b, corr: 'r = 0.74' },
    { name: 'Emploi services', nameEn: 'Services employment', vec: [1.55, 0.7, -0.55], color: 0x38bdf8, corr: 'r = 0.85' },
  ];

  const stemGeo = new THREE.CylinderGeometry(0.025, 0.025, 1, 10);
  const headGeo = new THREE.OctahedronGeometry(0.11, 0);

  wdiVariables.forEach((v) => {
    const end = new THREE.Vector3(v.vec[0], v.vec[1], v.vec[2]);
    const len = end.length();
    const dir = end.clone().normalize();
    const vecG = new THREE.Group();

    const mat = new THREE.MeshStandardMaterial({
      color: v.color,
      roughness: 0.3,
      metalness: 0.6,
      emissive: v.color,
      emissiveIntensity: 0.25,
    });
    const stem = new THREE.Mesh(stemGeo, mat);
    stem.scale.set(1, len, 1);
    stem.position.copy(dir).multiplyScalar(len / 2);
    stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

    const head = new THREE.Mesh(headGeo, mat);
    head.position.copy(end);
    head.castShadow = true;
    head.layers.enable(1);
    head.userData = {
      label: lang === 'fr' ? v.name : v.nameEn,
      detail: `WDI Variable · ${v.corr}`,
    };

    vecG.add(stem, head);
    vectorsGroup.add(vecG);
  });
  root.add(vectorsGroup);

  // Layer 5: 25 Yearly Country Trajectory Spheres (2000–2024) via InstancedMesh + Tube
  const trajGroup = new THREE.Group();
  trajGroup.position.y = 2.6;
  const yearPoints: THREE.Vector3[] = [];
  for (let i = 0; i < 25; i++) {
    const t = i / 24;
    const x = -1.6 + t * 3.3 + Math.sin(t * Math.PI * 2) * 0.25;
    const y = -0.8 + t * 1.85 + Math.cos(t * 5) * 0.14;
    const z = -0.9 + Math.sin(t * Math.PI * 1.4) * 1.15;
    yearPoints.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(yearPoints);
  const trajTube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 64, 0.025, 10, false),
    new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.35, metalness: 0.5 })
  );
  trajGroup.add(trajTube);

  const yearInstanced = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.075, 14, 14),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.4 }),
    25
  );
  const cStart = new THREE.Color('#38bdf8');
  const cEnd = new THREE.Color('#f43f5e');
  for (let i = 0; i < 25; i++) {
    _scratchDummy.position.copy(yearPoints[i]);
    _scratchDummy.scale.setScalar(i === 0 || i === 24 ? 1.4 : 1);
    _scratchDummy.updateMatrix();
    yearInstanced.setMatrixAt(i, _scratchDummy.matrix);
    _scratchColor.copy(cStart).lerp(cEnd, i / 24);
    yearInstanced.setColorAt(i, _scratchColor);
  }
  yearInstanced.instanceMatrix.needsUpdate = true;
  if (yearInstanced.instanceColor) yearInstanced.instanceColor.needsUpdate = true;
  yearInstanced.computeBoundingSphere();
  trajGroup.add(yearInstanced);
  root.add(trajGroup);

  const presets: CameraPreset[] = [
    { id: 'iso', labelFr: 'Vue Isométrique', labelEn: 'Isometric', position: [6.4, 5.1, 6.8], target: [0, 2.3, 0] },
    { id: 'f1f2', labelFr: 'Plan F1 × F2', labelEn: 'F1 × F2 Plane', position: [0, 2.6, 8.2], target: [0, 2.6, 0] },
    { id: 'f1f3', labelFr: 'Plan F1 × F3', labelEn: 'F1 × F3 Plane', position: [0.2, 8.8, 0.2], target: [0, 2.3, 0] },
  ];

  const update = (elapsed: number, explodeFactor: number, options: LabSceneOptions) => {
    pedestalGroup.position.y = -explodeFactor * 0.75;
    axesGroup.position.y = 2.6;
    sphereGroup.position.y = 2.6 + explodeFactor * 0.9;
    sphereGroup.visible = options.showSecondaryLayer;
    vectorsGroup.position.y = 2.6 + explodeFactor * 0.35;
    trajGroup.position.y = 2.6 + explodeFactor * 1.45;
    eq1.rotation.z = elapsed * 0.12;
  };

  return { root, presets, update };
}

/* ============================================================================
 * SCENE 2: COTONOU CLIMATE TIME-SERIES 3D RELIEF (2005–2024 NASA POWER)
 * ========================================================================== */
function buildClimateSeriesScene(renderer: THREE.WebGLRenderer, lang: Language): BuiltLabScene {
  const root = new THREE.Group();
  addContactShadow(root, 6.2, 0.005);

  // Layer 1: Beveled Slate Plinth (ExtrudeGeometry with bevels)
  const plinthGroup = new THREE.Group();
  const shape = new THREE.Shape();
  const pw = 8.4;
  const pd = 5.4;
  shape.moveTo(-pw / 2, -pd / 2);
  shape.lineTo(pw / 2, -pd / 2);
  shape.lineTo(pw / 2, pd / 2);
  shape.lineTo(-pw / 2, pd / 2);
  shape.closePath();

  const plinthGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 3,
  });
  plinthGeo.rotateX(Math.PI / 2);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.42,
    metalness: 0.75,
  });
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.position.y = 0.38;
  plinthMesh.castShadow = true;
  plinthMesh.receiveShadow = true;
  plinthGroup.add(plinthMesh);

  // Procedural calibrated grid texture on plinth top
  const gridTex = createClimateGridTexture(renderer, ['2005', '2010', '2015', '2020', '2024']);
  const gridPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(8.1, 5.1),
    new THREE.MeshStandardMaterial({
      map: gridTex,
      roughness: 0.78,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  gridPlane.rotation.x = -Math.PI / 2;
  gridPlane.position.y = 0.445;
  gridPlane.receiveShadow = true;
  plinthGroup.add(gridPlane);
  root.add(plinthGroup);

  // Layer 2: 3D Spatio-Temporal Surface (20 Years × 12 Months)
  const surfaceGroup = new THREE.Group();
  surfaceGroup.position.y = 0.48;

  const cols = 38; // 20 years (2005–2024) interpolated smoothly
  const rows = 22; // 12 months bimodal coastal climate
  const reliefGeo = new THREE.PlaneGeometry(7.6, 4.4, cols, rows);
  reliefGeo.rotateX(-Math.PI / 2);

  const posAttr = reliefGeo.attributes.position;
  const vCount = posAttr.count;
  const vColors = new Float32Array(vCount * 3);
  reliefGeo.setAttribute('color', new THREE.BufferAttribute(vColors, 3));

  const reliefMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.35,
    metalness: 0.25,
    side: THREE.DoubleSide,
  });
  const reliefMesh = new THREE.Mesh(reliefGeo, reliefMat);
  reliefMesh.castShadow = true;
  reliefMesh.receiveShadow = true;
  reliefMesh.layers.enable(1);
  reliefMesh.userData = {
    label: lang === 'fr' ? 'Surface NASA POWER (2005–2024)' : 'NASA POWER Surface (2005–2024)',
    detail: lang === 'fr' ? 'Cycle bimodal Mai–Juin / Sept–Oct' : 'Bimodal May–Jun / Sep–Oct cycle',
  };
  surfaceGroup.add(reliefMesh);

  const wireOverlay = new THREE.Mesh(
    reliefGeo,
    new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  wireOverlay.position.y = 0.015;
  surfaceGroup.add(wireOverlay);
  root.add(surfaceGroup);

  // Layer 3: Structural Break Glass Planes (2015 & 2020 Regime Shifts)
  const breaksGroup = new THREE.Group();
  breaksGroup.position.y = 0.48;
  const breakMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    roughness: 0.12,
    metalness: 0.1,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  [-0.2, 1.85].forEach((xPos, idx) => {
    const breakPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.3), breakMat);
    breakPlane.rotation.y = Math.PI / 2;
    breakPlane.position.set(xPos, 1.15, 0);
    breakPlane.renderOrder = 3;
    breakPlane.layers.enable(1);
    breakPlane.userData = {
      label: idx === 0 ? 'Rupture 2015' : 'Rupture 2020',
      detail: lang === 'fr' ? 'Changement de régime pluviométrique' : 'Precipitation regime structural shift',
    };
    breaksGroup.add(breakPlane);
  });
  root.add(breaksGroup);

  // Layer 4: Holt-Winters Forecast Ribbon (TubeGeometry) + Anomaly Markers
  const forecastGroup = new THREE.Group();
  forecastGroup.position.y = 0.48;
  const hwPoints: THREE.Vector3[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const z = -2.1 + t * 4.2;
    const month = t * 12;
    const bimodal = Math.exp(-((month - 5.5) ** 2) / 2.6) * 1.75 + Math.exp(-((month - 9.5) ** 2) / 2.2) * 1.05;
    hwPoints.push(new THREE.Vector3(3.95, 0.45 + bimodal, z));
  }
  const hwCurve = new THREE.CatmullRomCurve3(hwPoints);
  const hwTube = new THREE.Mesh(
    new THREE.TubeGeometry(hwCurve, 48, 0.065, 12, false),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.7,
    })
  );
  hwTube.layers.enable(1);
  hwTube.userData = {
    label: lang === 'fr' ? 'Prévision Holt-Winters (2025)' : 'Holt-Winters Forecast (2025)',
    detail: lang === 'fr' ? 'Lissage exponentiel triple saisonnier' : 'Triple exponential seasonal smoothing',
  };
  forecastGroup.add(hwTube);
  root.add(forecastGroup);

  const cDry = new THREE.Color('#0ea5e9');
  const cWet = new THREE.Color('#f59e0b');
  const cHumidLow = new THREE.Color('#0284c7');
  const cHumidHigh = new THREE.Color('#10b981');

  let currentMetric: 'precipitation' | 'humidity' | null = null;
  const applyMetricRelief = (metric: 'precipitation' | 'humidity') => {
    if (currentMetric === metric) return;
    currentMetric = metric;
    const colAttr = reliefGeo.attributes.color as THREE.BufferAttribute;

    for (let i = 0; i < vCount; i++) {
      const vx = posAttr.getX(i); // -3.8 to 3.8 (Years 2005–2024)
      const vz = posAttr.getZ(i); // -2.2 to 2.2 (Jan–Dec)
      const yearNorm = (vx + 3.8) / 7.6;
      const month = ((vz + 2.2) / 4.4) * 11 + 1;

      let h = 0.25;
      if (metric === 'precipitation') {
        const majorPeak = Math.exp(-((month - 5.6) ** 2) / 2.2) * (1.55 + yearNorm * 0.45);
        const minorPeak = Math.exp(-((month - 9.4) ** 2) / 1.9) * (0.95 + Math.sin(yearNorm * 9) * 0.22);
        const harmonic = Math.sin(yearNorm * 14 + month) * 0.12;
        h = 0.22 + majorPeak + minorPeak + Math.max(0, harmonic);
        const cNorm = THREE.MathUtils.clamp((h - 0.2) / 2.1, 0, 1);
        _scratchColor.copy(cDry).lerp(cWet, cNorm);
      } else {
        const humidWave = 0.95 + Math.sin((month - 2.5) * 0.45) * 0.45 + yearNorm * 0.25 + Math.cos(yearNorm * 10 + month) * 0.1;
        h = 0.35 + humidWave;
        const cNorm = THREE.MathUtils.clamp((h - 0.8) / 1.3, 0, 1);
        _scratchColor.copy(cHumidLow).lerp(cHumidHigh, cNorm);
      }

      posAttr.setY(i, h);
      colAttr.setXYZ(i, _scratchColor.r, _scratchColor.g, _scratchColor.b);
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    reliefGeo.computeVertexNormals();
  };

  applyMetricRelief('precipitation');

  const presets: CameraPreset[] = [
    { id: 'iso', labelFr: 'Vue Perspective', labelEn: 'Perspective', position: [6.8, 5.2, 6.8], target: [0, 1.1, 0] },
    { id: 'years', labelFr: 'Profil 2005–2024', labelEn: '2005–2024 Trend', position: [0, 3.2, 8.6], target: [0, 1.1, 0] },
    { id: 'season', labelFr: 'Cycle Saison', labelEn: 'Seasonal Cycle', position: [8.8, 3.0, 0], target: [0, 1.1, 0] },
  ];

  const update = (_elapsed: number, explodeFactor: number, options: LabSceneOptions) => {
    applyMetricRelief(options.climateMetric);
    plinthGroup.position.y = -explodeFactor * 0.55;
    surfaceGroup.position.y = 0.48 + explodeFactor * 0.25;
    breaksGroup.position.y = 0.48 + explodeFactor * 1.15;
    forecastGroup.position.y = 0.48 + explodeFactor * 0.85;
    forecastGroup.visible = options.showSecondaryLayer;
  };

  return { root, presets, update };
}

/* ============================================================================
 * SCENE 3: BENINEXPLORE — COMPOSITE ECOTOURISM & HERITAGE DIORAMA
 * ========================================================================== */
function buildBeninExploreScene(renderer: THREE.WebGLRenderer, lang: Language): BuiltLabScene {
  const root = new THREE.Group();
  addContactShadow(root, 6.0, 0.005);

  // Layer 1: Beveled Topographic Island Plinth
  const terrainGroup = new THREE.Group();
  const islandShape = new THREE.Shape();
  islandShape.moveTo(-4.2, -2.6);
  islandShape.quadraticCurveTo(0, -3.3, 4.2, -2.2);
  islandShape.quadraticCurveTo(4.7, 0.5, 3.8, 2.7);
  islandShape.quadraticCurveTo(-0.3, 3.3, -4.1, 2.3);
  islandShape.quadraticCurveTo(-4.8, 0.1, -4.2, -2.6);

  const terrainGeo = new THREE.ExtrudeGeometry(islandShape, {
    depth: 0.45,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.12,
    bevelSegments: 4,
  });
  terrainGeo.rotateX(Math.PI / 2);

  const terrainTex = createTerrainDetailTexture(renderer);
  const terrainMat = new THREE.MeshStandardMaterial({
    map: terrainTex,
    roughness: 0.86,
    metalness: 0.05,
  });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.position.y = 0.55;
  terrainMesh.castShadow = true;
  terrainMesh.receiveShadow = true;
  terrainGroup.add(terrainMesh);

  // Elevated Northern Sandstone Plateau
  const plateauGeo = new THREE.CylinderGeometry(1.75, 2.15, 0.55, 28);
  const plateauMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.9, metalness: 0.04 });
  const plateau = new THREE.Mesh(plateauGeo, plateauMat);
  plateau.position.set(-1.6, 0.82, -0.85);
  plateau.castShadow = true;
  plateau.receiveShadow = true;
  terrainGroup.add(plateau);
  root.add(terrainGroup);

  // Layer 2: Coastal Lagoon Water Plane
  const waterGroup = new THREE.Group();
  const lagoonGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.08, 42);
  const lagoonMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.12,
    metalness: 0.12,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.84,
  });
  const lagoon = new THREE.Mesh(lagoonGeo, lagoonMat);
  lagoon.position.set(1.55, 0.61, 1.15);
  lagoon.receiveShadow = true;
  lagoon.layers.enable(1);
  lagoon.userData = {
    label: 'Cité Lacustre / Lagune',
    detail: lang === 'fr' ? 'Circuits écotouristiques côtiers' : 'Coastal ecotourism water trails',
  };
  waterGroup.add(lagoon);
  root.add(waterGroup);

  // Layer 3: Composite Heritage Tata Somba Pavilion (7 distinct parts!)
  const heritageGroup = new THREE.Group();
  heritageGroup.position.set(-1.6, 1.09, -0.85);

  const clayMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.88, metalness: 0.04 });
  const thatchMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.94, metalness: 0.02 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.24, metalness: 0.9 });

  // Central connecting courtyard wall
  const wallMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.82, 0.55, 24), clayMat);
  wallMesh.position.y = 0.275;
  wallMesh.castShadow = true;
  heritageGroup.add(wallMesh);

  // 4 Cylindrical Turrets + Lathe Conical Thatch Roofs
  const turretOffsets: [number, number, number][] = [
    [-0.65, 0, -0.45],
    [0.65, 0, -0.45],
    [-0.55, 0, 0.55],
    [0.55, 0, 0.55],
  ];
  const turretBodyGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.82, 18);
  const roofProfile = [
    new THREE.Vector2(0, 0.48),
    new THREE.Vector2(0.18, 0.22),
    new THREE.Vector2(0.38, 0),
    new THREE.Vector2(0, 0),
  ];
  const roofGeo = new THREE.LatheGeometry(roofProfile, 24);

  turretOffsets.forEach(([tx, ty, tz]) => {
    const turret = new THREE.Mesh(turretBodyGeo, clayMat);
    turret.position.set(tx, ty + 0.41, tz);
    turret.castShadow = true;
    turret.receiveShadow = true;

    const roof = new THREE.Mesh(roofGeo, thatchMat);
    roof.position.set(tx, ty + 0.82, tz);
    roof.castShadow = true;

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), brassMat);
    finial.position.set(tx, ty + 1.3, tz);

    heritageGroup.add(turret, roof, finial);
  });

  // Portal Arch & Interactive Hitbox
  const portal = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.44, 0.14), brassMat);
  portal.position.set(0, 0.22, 0.78);
  portal.layers.enable(1);
  portal.userData = {
    label: 'Architecture Tata Somba',
    detail: lang === 'fr' ? 'Patrimoine classé & circuits Nord-Bénin' : 'Cultural heritage & Northern Benin trails',
  };
  heritageGroup.add(portal);
  root.add(heritageGroup);

  // Layer 4: Ecotourism Circuit Route (TubeGeometry) + 3 Interactive Checkpoints + AI Griot Beacon
  const circuitGroup = new THREE.Group();
  const routeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.6, 1.25, 0.05),
    new THREE.Vector3(-0.3, 0.72, 1.05),
    new THREE.Vector3(1.55, 0.72, 1.15),
    new THREE.Vector3(2.45, 0.72, -0.45),
    new THREE.Vector3(0.45, 0.72, -1.65),
  ]);
  const routeTube = new THREE.Mesh(
    new THREE.TubeGeometry(routeCurve, 64, 0.045, 12, false),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.45,
      roughness: 0.25,
      metalness: 0.7,
    })
  );
  circuitGroup.add(routeTube);

  const stops = [
    { pos: [1.55, 0.9, 1.15], label: 'Marché Artisanal', detail: lang === 'fr' ? 'Marketplace des artisans locaux' : 'Local artisans marketplace', color: 0xf59e0b },
    { pos: [2.45, 0.9, -0.45], label: 'Chatbot IA « Griot »', detail: lang === 'fr' ? 'Guide culturel IA générative' : 'Generative AI cultural storyteller', color: 0x38bdf8 },
    { pos: [0.45, 0.9, -1.65], label: 'Réserve Écotouristique', detail: lang === 'fr' ? 'Réservation de circuits en direct' : 'Live eco-circuit booking', color: 0x10b981 },
  ];
  const beacons: THREE.Mesh[] = [];
  stops.forEach((s) => {
    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.MeshStandardMaterial({
        color: s.color,
        emissive: s.color,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.8,
      })
    );
    beacon.position.set(s.pos[0], s.pos[1], s.pos[2]);
    beacon.castShadow = true;
    beacon.layers.enable(1);
    beacon.userData = { label: s.label, detail: s.detail };
    circuitGroup.add(beacon);
    beacons.push(beacon);
  });
  root.add(circuitGroup);

  // Layer 5: 26 Savanna & Palm Trees via InstancedMesh (Trunk + Foliage with ±15% scale & tint variation)
  const treesGroup = new THREE.Group();
  const treeCount = 26;
  const trunkInst = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.04, 0.065, 0.65, 8),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9, metalness: 0.02 }),
    treeCount
  );
  const crownInst = new THREE.InstancedMesh(
    new THREE.DodecahedronGeometry(0.28, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.02 }),
    treeCount
  );
  trunkInst.castShadow = true;
  crownInst.castShadow = true;

  const treeSpots: [number, number][] = [
    [-3.1, 1.4], [-2.7, 1.7], [-3.4, 0.3], [-2.9, -1.7], [-0.4, -2.0],
    [0.9, -2.1], [2.1, -1.8], [3.1, -1.2], [3.3, 0.4], [2.9, 1.5],
    [0.1, 2.2], [-1.3, 2.0], [-2.2, 1.1], [1.2, -0.7], [0.2, -0.9],
    [-0.5, 1.7], [2.6, 0.7], [3.5, -0.2], [-3.6, -0.9], [1.7, -2.2],
    [-1.9, -2.2], [0.8, 2.1], [-2.5, 0.2], [2.1, 1.9], [-0.9, -1.8], [3.1, 0.9],
  ];
  const baseGreen = new THREE.Color('#15803d');
  const warmGreen = new THREE.Color('#4d7c0f');

  treeSpots.forEach(([tx, tz], i) => {
    const s = 0.85 + ((i * 17) % 30) / 100; // ±15% variation
    _scratchDummy.position.set(tx, 0.55 + (0.65 * s) / 2, tz);
    _scratchDummy.scale.set(s, s, s);
    _scratchDummy.rotation.set(0, i * 0.7, 0);
    _scratchDummy.updateMatrix();
    trunkInst.setMatrixAt(i, _scratchDummy.matrix);

    _scratchDummy.position.set(tx, 0.55 + 0.65 * s + 0.14 * s, tz);
    _scratchDummy.scale.set(s * 1.1, s * 0.9, s * 1.1);
    _scratchDummy.updateMatrix();
    crownInst.setMatrixAt(i, _scratchDummy.matrix);

    _scratchColor.copy(baseGreen).lerp(warmGreen, ((i * 23) % 100) / 100);
    crownInst.setColorAt(i, _scratchColor);
  });
  trunkInst.instanceMatrix.needsUpdate = true;
  crownInst.instanceMatrix.needsUpdate = true;
  if (crownInst.instanceColor) crownInst.instanceColor.needsUpdate = true;
  trunkInst.computeBoundingSphere();
  crownInst.computeBoundingSphere();

  treesGroup.add(trunkInst, crownInst);
  root.add(treesGroup);

  const presets: CameraPreset[] = [
    { id: 'overview', labelFr: 'Vue Globale', labelEn: 'Overview', position: [6.8, 5.2, 6.8], target: [0, 0.9, 0] },
    { id: 'heritage', labelFr: 'Tata Somba', labelEn: 'Heritage Site', position: [-3.8, 3.2, 2.6], target: [-1.5, 1.4, -0.8] },
    { id: 'circuit', labelFr: 'Circuit & Lagune', labelEn: 'Lagoon Trail', position: [4.8, 3.1, 4.4], target: [1.1, 0.8, 0.5] },
  ];

  const update = (elapsed: number, explodeFactor: number, options: LabSceneOptions) => {
    terrainGroup.position.y = -explodeFactor * 0.45;
    waterGroup.position.y = explodeFactor * 0.25;
    heritageGroup.position.y = 1.09 + explodeFactor * 0.95;
    circuitGroup.position.y = explodeFactor * 1.45;
    circuitGroup.visible = options.showSecondaryLayer;
    treesGroup.position.y = -explodeFactor * 0.45;

    beacons.forEach((b, idx) => {
      b.rotation.y = elapsed * 1.2 + idx;
      b.position.y = 0.92 + Math.sin(elapsed * 2 + idx) * 0.08;
    });
  };

  return { root, presets, update };
}

export function buildLabScene(
  id: LabSceneId,
  renderer: THREE.WebGLRenderer,
  lang: Language
): BuiltLabScene {
  switch (id) {
    case 'namibia-pca':
      return buildNamibiaPCAScene(renderer, lang);
    case 'climate-series':
      return buildClimateSeriesScene(renderer, lang);
    case 'beninexplore':
      return buildBeninExploreScene(renderer, lang);
  }
}
