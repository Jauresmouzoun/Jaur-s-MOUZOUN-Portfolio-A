import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

let _cachedSoftwareGl: boolean | null = null;
let _cachedWebGLAvailable: boolean | null = null;

export function detectSoftwareWebGL(): boolean {
  if (_cachedSoftwareGl !== null) return _cachedSoftwareGl;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      _cachedSoftwareGl = true;
      return true;
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    _cachedSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return _cachedSoftwareGl;
  } catch {
    _cachedSoftwareGl = true;
    return true;
  }
}

export function isWebGLAvailable(): boolean {
  if (_cachedWebGLAvailable !== null) return _cachedWebGLAvailable;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const ok = Boolean(gl);
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    _cachedWebGLAvailable = ok;
    return ok;
  } catch {
    _cachedWebGLAvailable = false;
    return false;
  }
}

export function createStudioRenderer(isSoftwareGl: boolean, alpha = false): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: !isSoftwareGl,
    alpha,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export function setupStudioEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmremGenerator.dispose();
  return envTex;
}

export function afterDraw(
  renderer: THREE.WebGLRenderer,
  cb: () => void,
  timerRef: { current: number }
): void {
  const gl = renderer.getContext() as WebGL2RenderingContext | null;
  if (!gl || typeof gl.fenceSync !== 'function') {
    timerRef.current = window.setTimeout(cb, 80);
    return;
  }
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();
  const poll = () => {
    const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
    if (state === gl.UNSIGNALED) {
      timerRef.current = window.setTimeout(poll, 5);
    } else {
      if (sync) gl.deleteSync(sync);
      timerRef.current = window.setTimeout(cb, 80);
    }
  };
  timerRef.current = window.setTimeout(poll, 5);
}

export function createRadialShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(2, 6, 23, 0.55)');
    grad.addColorStop(0.55, 'rgba(2, 6, 23, 0.22)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createPedestalDialTexture(
  renderer: THREE.WebGLRenderer,
  accentHex = '#38bdf8',
  labels: string[] = ['F1 · 48.2%', 'F2 · 24.5%', 'F3 · 13.9%', 'KMO = 0.72']
): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;

    // Subtle concentric calibration rings
    for (let r = 110; r <= 440; r += 110) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Radial tick marks
    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      const isMajor = i % 6 === 0;
      const rIn = isMajor ? 415 : 430;
      const rOut = 450;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * rIn, cy + Math.sin(angle) * rIn);
      ctx.lineTo(cx + Math.cos(angle) * rOut, cy + Math.sin(angle) * rOut);
      ctx.strokeStyle = isMajor ? accentHex : 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = isMajor ? 3 : 1.5;
      ctx.stroke();
    }

    // Crosshairs
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 440, cy);
    ctx.lineTo(cx + 440, cy);
    ctx.moveTo(cx, cy - 440);
    ctx.lineTo(cx, cy + 440);
    ctx.stroke();

    // Quadrant labels
    ctx.font = '600 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const positions = [
      [cx, cy - 375],
      [cx + 355, cy - 28],
      [cx, cy + 375],
      [cx - 345, cy - 28],
    ];
    labels.slice(0, 4).forEach((lbl, idx) => {
      const [px, py] = positions[idx];
      ctx.fillText(lbl, px, py);
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

export function createClimateGridTexture(
  renderer: THREE.WebGLRenderer,
  yearLabels: string[] = ['2005', '2010', '2015', '2020', '2024']
): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0b1324';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
    ctx.lineWidth = 1.5;
    for (let x = 64; x <= width - 64; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, height - 40);
      ctx.stroke();
    }
    for (let y = 40; y <= height - 40; y += 54) {
      ctx.beginPath();
      ctx.moveTo(64, y);
      ctx.lineTo(width - 64, y);
      ctx.stroke();
    }

    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#7dd3fc';
    ctx.textAlign = 'center';
    yearLabels.forEach((lbl, idx) => {
      const px = 96 + (idx / Math.max(1, yearLabels.length - 1)) * (width - 192);
      ctx.fillText(lbl, px, height - 18);
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

export function createTerrainDetailTexture(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#2d4a36';
    ctx.fillRect(0, 0, size, size);

    // Topographic contour isolines
    ctx.strokeStyle = 'rgba(217, 179, 130, 0.14)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      const r = 35 + i * 24;
      ctx.ellipse(size * 0.48, size * 0.45, r * 1.15, r * 0.85, 0.25, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    const mat = mesh.material;
    if (mat) {
      const mats = Array.isArray(mat) ? mat : [mat];
      mats.forEach((m) => {
        const std = m as THREE.MeshStandardMaterial;
        std.map?.dispose();
        std.roughnessMap?.dispose();
        std.normalMap?.dispose();
        std.dispose();
      });
    }
  });
}
