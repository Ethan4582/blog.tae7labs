import type { PostContent } from "../../types";
import { assets } from "../../asset_data";



export const infinite3DGalleryData: PostContent = {
  author: "SinghAshir65848",
  date: "March 17, 2026",
  difficulty: "Advanced",
  introduction:
    "A tutorial on building an infinite 3D gallery using Three.js and custom GLSL shaders. The gallery renders hundreds of project cards on a single plane with cinematic curvature, hover effects, and momentum-based navigation.",
   liveDemo: "https://t7labs-demo.pages.dev/gallery/infinite-atlas-gallery",
  sourceCode: "https://github.com/Ethan4582/demo-t7labs/tree/master/src/components/Infinite_Atlas_Gallery",
   gif: assets.tutorials.waterRipple.gif,
  sections: [
    {
      id: "initializing-project",
      title: "Initializing the project",
      content: [
        {
          type: "paragraph",
          text: "Create a new Next.js project and install the required dependencies:",
        },
        {
          type: "code",
          language: "bash",
          code: "npx create-next-app@latest 3d-gallery\ncd 3d-gallery\nnpm install three gsap",
        },
        {
          type: "paragraph",
          text: "We'll use TypeScript for type safety. The project structure will be:",
        },
        {
          type: "code",
          language: "plaintext",
          code: `components/
  Infinite_Atlas_Gallery/
    index.tsx
    style.module.scss
    Controls.tsx (optional)
    scripts/
      core.ts
      engine.ts
      utils.ts
    data/
      asset_data.ts
    shaders/
      index.ts (vertex/fragment)`,
        },
      ],
    },
    {
      id: "component-structure",
      title: "Main component and styles",
      content: [
        {
          type: "paragraph",
          text: "The main component initializes the Three.js engine inside a useEffect and provides controls for curvature and zoom.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/index.tsx",
          language: "tsx",
          code: `"use client";

import { useEffect, useRef, useState } from "react";
import { init, cleanup, setConfig } from "./scripts/engine";
import { Controls } from "./Controls";
import styles from "./style.module.scss";

export default function Infinite_Atlas_Gallery() {
  const initialized = useRef(false);
  const [curvature, setCurvature] = useState(0.14);
  const [zoom, setZoom] = useState(1.25);
  const [isFlattened, setIsFlattened] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      init();
    }
    return () => {
      cleanup();
      initialized.current = false;
    };
  }, []);

  const handleCurvatureChange = (val: number) => {
    setCurvature(val);
    setConfig({ curvature: val });
  };

  const handleZoomChange = (val: number) => {
    setZoom(val);
    setConfig({ zoom: val });
  };

  const toggleFlatten = () => {
    const next = !isFlattened;
    setIsFlattened(next);
    setConfig({ isFlattened: next });
  };

  return (
    <section id="gallery" className={styles.container}>
      <div className={styles.vignette}></div>
      <Controls
        curvature={curvature}
        zoom={zoom}
        isFlattened={isFlattened}
        onCurvatureChange={handleCurvatureChange}
        onZoomChange={handleZoomChange}
        onToggleFlatten={toggleFlatten}
      />
    </section>
  );
}`,
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/style.module.scss",
          language: "scss",
          code: `.container {
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  background-color: #000;
  
  &.dragging {
    cursor: grabbing;
  }
}

.vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
}`,
        },
      ],
    },
    {
      id: "project-data",
      title: "Project data",
      content: [
        {
          type: "paragraph",
          text: "Each project is defined by an image, title, year, tags, and a link. We'll store them in an array. The gallery automatically adapts to the number of projects.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/data/asset_data.ts",
          language: "ts",
          code: `export interface Project {
  title: string;
  image: string;
  year: number;
  Tags: string[];
  href: string;
  slug: string;
  bgColor: string;
}

export const projects: Project[] = [
  {
    title: "Motion Study",
    image: "https://picsum.photos/id/1015/900/1200",
    year: 2024,
    Tags: ["EXPERIENCE", "PHYSICAL", "MOTION"],
    href: "/projects/motion-study",
    slug: "motion-study",
    bgColor: "#2a2a2a",
  },
  // Add more projects as needed
];`,
        },
      ],
    },
    {
      id: "shader-code",
      title: "Shader code",
      content: [
        {
          type: "paragraph",
          text: "The vertex shader is a simple pass-through. The fragment shader contains all the logic: distortion, atlas lookup, hover blur, and compositing.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/shaders/index.ts",
          language: "ts",
          code: `export const vertexShader = \`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

export const fragmentShader = \`
  uniform vec2  uOffset;
  uniform vec2  uResolution;
  uniform vec4  uBorderColor;
  uniform vec4  uBackgroundColor;
  uniform vec2  uMousePos;
  uniform float uZoom;
  uniform float uCurvature;
  uniform float uCellSize;
  uniform float uTextureCount;
  uniform sampler2D uImageAtlas;
  uniform sampler2D uTextAtlas;
  varying vec2 vUv;

  float cellHash(vec2 p) {
    p = fract(p * vec2(0.1031, 0.1030));
    p += dot(p, p.yx + 33.33);
    return fract((p.x + p.y) * p.x);
  }

  vec3 blurAtlas(vec2 uv, float r) {
    vec3 c  = texture2D(uImageAtlas, uv).rgb * 4.0;
    c += texture2D(uImageAtlas, uv + vec2( r,  0.)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2(-r,  0.)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2( 0.,  r)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2( 0., -r)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2( r,  r)).rgb;
    c += texture2D(uImageAtlas, uv + vec2(-r,  r)).rgb;
    c += texture2D(uImageAtlas, uv + vec2( r, -r)).rgb;
    c += texture2D(uImageAtlas, uv + vec2(-r, -r)).rgb;
    return c / 16.0;
  }

  void main() {
    vec2 screenUV = (vUv - 0.5) * 2.0;
    float radius = length(screenUV);
    
    float distortion = 1.1;
    if (uCurvature > 0.001) {
      distortion -= uCurvature * radius * radius;
    }
    
    vec2 worldCoord = screenUV * distortion * vec2(uResolution.x / uResolution.y, 1.0);
    worldCoord = worldCoord * uZoom + uOffset;

    vec2 cellPos = worldCoord / uCellSize;
    vec2 cellId  = floor(cellPos);
    vec2 cellUV  = fract(cellPos);

    // Mouse hover detection
    vec2 mUV = (uMousePos / uResolution) * 2.0 - 1.0;
    mUV.y = -mUV.y;
    float mRad = length(mUV);
    float mDistort = 1.1;
    if (uCurvature > 0.001) {
      mDistort -= uCurvature * mRad * mRad;
    }
    vec2 mWorld = mUV * mDistort * vec2(uResolution.x / uResolution.y, 1.0);
    mWorld = mWorld * uZoom + uOffset;
    vec2 mouseCellId = floor(mWorld / uCellSize);

    float cellDist = length((cellId + 0.5) - (mouseCellId + 0.5));
    float hoverI   = (uMousePos.x >= 0.0) ? 1.0 - smoothstep(0.4, 0.7, cellDist) : 0.0;

    // Atlas indexing
    float atlasSize = ceil(sqrt(uTextureCount));
    float totalSlots = atlasSize * atlasSize;
    float texIndex  = floor(cellHash(cellId) * totalSlots);
    texIndex = mod(clamp(texIndex, 0.0, totalSlots - 1.0), totalSlots);
    vec2  atlasPos  = vec2(mod(texIndex, atlasSize), floor(texIndex / atlasSize));

    // Image area (centered in cell)
    float imageSize   = 0.62;
    float imageBorder = (1.0 - imageSize) * 0.5;
    vec2  imageUV     = (cellUV - imageBorder) / imageSize;
    float edgeS       = 0.012;
    vec2  imgMask     = smoothstep(-edgeS, edgeS, imageUV) * smoothstep(-edgeS, edgeS, 1.0 - imageUV);
    float imageAlpha  = imgMask.x * imgMask.y;
    bool  inImage     = imageUV.x >= 0.0 && imageUV.x <= 1.0 && imageUV.y >= 0.0 && imageUV.y <= 1.0;

    // Layer 1: background
    vec3 color = uBackgroundColor.rgb;

    // Layer 2: hover frosted glass
    if (hoverI > 0.0) {
      vec2 bgUV = (cellUV - 0.5) / 1.8 + 0.5;
      bgUV = clamp(bgUV, 0.0, 1.0);
      vec2 bgAtlasUV = (atlasPos + bgUV) / atlasSize;
      bgAtlasUV.y = 1.0 - bgAtlasUV.y;
      vec3 blurred = blurAtlas(bgAtlasUV, 0.04 / atlasSize);
      float luma = dot(blurred, vec3(0.299, 0.587, 0.114));
      blurred = mix(blurred, vec3(luma), 0.35);
      vec3 frostTint = vec3(0.55, 0.57, 0.60);
      vec3 frosted = mix(blurred, frostTint, 0.30);
      frosted *= 1.1;
      color = mix(color, frosted, hoverI * 0.92);
    }

    // Layer 3: sharp image
    if (inImage && imageAlpha > 0.0) {
      vec2 sUV = (atlasPos + imageUV) / atlasSize;
      sUV.y = 1.0 - sUV.y;
      vec3 imgColor = texture2D(uImageAtlas, sUV).rgb;
      float shadow = smoothstep(0.0, 0.06, imageUV.x) * smoothstep(0.0, 0.06, 1.0 - imageUV.x)
                   * smoothstep(0.0, 0.06, imageUV.y) * smoothstep(0.0, 0.06, 1.0 - imageUV.y);
      imgColor *= mix(0.75, 1.0, shadow);
      color = mix(color, imgColor, imageAlpha);
    }

    // Layer 4: text overlay
    vec2 overlayUV = (atlasPos + cellUV) / atlasSize;
    overlayUV.y = 1.0 - overlayUV.y;
    vec4 overlay = texture2D(uTextAtlas, overlayUV);
    color = mix(color, overlay.rgb, overlay.a);

    // Grid border
    float lw = 0.006;
    float gx = smoothstep(0.0, lw, cellUV.x) * smoothstep(0.0, lw, 1.0 - cellUV.x);
    float gy = smoothstep(0.0, lw, cellUV.y) * smoothstep(0.0, lw, 1.0 - cellUV.y);
    color = mix(color, uBorderColor.rgb, (1.0 - gx * gy) * uBorderColor.a);

    // Vignette
    float fade = 1.0 - smoothstep(0.4, 1.6, radius);
    gl_FragColor = vec4(color * fade, 1.0);
  }
\`;`,
        },
      ],
    },
    {
      id: "core-configuration",
      title: "Core configuration and state",
      content: [
        {
          type: "paragraph",
          text: "The `core.ts` file defines the global configuration and reactive state used throughout the engine.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/scripts/core.ts",
          language: "ts",
          code: `import * as THREE from "three";

export interface Config {
  cellSize: number;
  zoomLevel: number;
  lerpFactor: number;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
}

export interface GalleryState {
  scene: THREE.Scene | undefined;
  camera: THREE.OrthographicCamera | undefined;
  renderer: THREE.WebGLRenderer | undefined;
  plane: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | undefined;
  isDragging: boolean;
  isClick: boolean;
  clickStartTime: number;
  previousMouse: { x: number; y: number };
  offset: { x: number; y: number };
  targetOffset: { x: number; y: number };
  mousePosition: { x: number; y: number };
  zoomLevel: number;
  targetZoom: number;
  curvatureLevel: number;
  targetCurvature: number;
  baseCurvature: number;
  textTextures: THREE.CanvasTexture[];
  animationFrameId: number;
  isFlattened: boolean;
}

export const config: Config = {
  cellSize: 0.75,
  zoomLevel: 1.25,
  lerpFactor: 0.075,
  borderColor: "rgba(255, 255, 255, 0.15)",
  backgroundColor: "rgba(0, 0, 0, 1)",
  textColor: "rgba(128, 128, 128, 1)",
  hoverColor: "rgba(255, 255, 255, 0)",
};

export const state: GalleryState = {
  scene: undefined,
  camera: undefined,
  renderer: undefined,
  plane: undefined,
  isDragging: false,
  isClick: true,
  clickStartTime: 0,
  previousMouse: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  targetOffset: { x: 0, y: 0 },
  mousePosition: { x: -1, y: -1 },
  zoomLevel: 1.0,
  targetZoom: 1.0,
  curvatureLevel: 0.14,
  targetCurvature: 0.14,
  baseCurvature: 0.14,
  textTextures: [],
  animationFrameId: 0,
  isFlattened: false,
};

export const DRAG_CURVATURE = 0.20;
export const FLATTENED_DRAG_CURVATURE = 0.08;
export const CELL_TEX_SIZE = 1024;`,
        },
      ],
    },
    {
      id: "engine-initialization",
      title: "Engine initialization and animation loop",
      content: [
        {
          type: "paragraph",
          text: "The `engine.ts` file sets up the Three.js scene, camera, renderer, and shader material. It also starts the animation loop and handles resizing.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/scripts/engine.ts (setup part)",
          language: "ts",
          code: `import * as THREE from "three";
import { state, config, DRAG_CURVATURE, FLATTENED_DRAG_CURVATURE } from "./core";
import { projects } from "../data/asset_data";
import { vertexShader, fragmentShader } from "../shaders";
import { rgbaToArray, loadTextures, createTextureAtlas } from "./utils";

export const init = async () => {
  const container = document.getElementById("gallery");
  if (!container || container.querySelector("canvas")) return;

  state.scene = new THREE.Scene();
  state.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  state.camera.position.z = 1;

  state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  state.renderer.setSize(container.offsetWidth, container.offsetHeight);
  state.renderer.setPixelRatio(window.devicePixelRatio);
  const bgColor = rgbaToArray(config.backgroundColor);
  state.renderer.setClearColor(new THREE.Color(bgColor[0], bgColor[1], bgColor[2]), bgColor[3]);
  container.appendChild(state.renderer.domElement);

  const imageTextures = await loadTextures(state.textTextures);
  const imageAtlas = createTextureAtlas(imageTextures, false);
  const textAtlas = createTextureAtlas(state.textTextures, true);

  const uniforms = {
    uOffset: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
    uBorderColor: { value: new THREE.Vector4(...rgbaToArray(config.borderColor)) },
    uBackgroundColor: { value: new THREE.Vector4(...rgbaToArray(config.backgroundColor)) },
    uMousePos: { value: new THREE.Vector2(-1, -1) },
    uZoom: { value: 1.0 },
    uCurvature: { value: state.curvatureLevel },
    uCellSize: { value: config.cellSize },
    uTextureCount: { value: projects.length },
    uImageAtlas: { value: imageAtlas },
    uTextAtlas: { value: textAtlas },
  };

  state.plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
  );
  state.scene.add(state.plane);

  setupEventListeners();
  animate();
};

export const animate = () => {
  state.animationFrameId = requestAnimationFrame(animate);
  state.offset.x += (state.targetOffset.x - state.offset.x) * config.lerpFactor;
  state.offset.y += (state.targetOffset.y - state.offset.y) * config.lerpFactor;
  state.zoomLevel += (state.targetZoom - state.zoomLevel) * config.lerpFactor;
  state.curvatureLevel += (state.targetCurvature - state.curvatureLevel) * config.lerpFactor;
  if (state.plane?.material.uniforms) {
    state.plane.material.uniforms.uOffset.value.set(state.offset.x, state.offset.y);
    state.plane.material.uniforms.uZoom.value = state.zoomLevel;
    state.plane.material.uniforms.uCurvature.value = state.curvatureLevel;
  }
  if (state.renderer && state.scene && state.camera) {
    state.renderer.render(state.scene, state.camera);
  }
};

export const cleanup = () => {
  if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId);
  const container = document.getElementById("gallery");
  if (container && state.renderer?.domElement) {
    container.contains(state.renderer.domElement) && container.removeChild(state.renderer.domElement);
  }
  if (state.plane) {
    state.plane.geometry.dispose();
    Object.values(state.plane.material.uniforms).forEach((u: any) => {
      if (u?.value instanceof THREE.Texture) u.value.dispose();
    });
    state.plane.material.dispose();
  }
  state.scene?.clear();
  state.renderer?.dispose();
  state.renderer?.forceContextLoss();
  state.textTextures.forEach(t => t.dispose());
  state.textTextures = [];
  state.scene = undefined;
  state.camera = undefined;
  state.renderer = undefined;
  state.plane = undefined;
  state.isDragging = false;
};

export const setConfig = (u: { curvature?: number; zoom?: number; isFlattened?: boolean }) => {
  if (u.curvature !== undefined) {
    state.baseCurvature = u.curvature;
    if (!state.isDragging) state.targetCurvature = u.curvature;
  }
  if (u.zoom !== undefined) {
    config.zoomLevel = u.zoom;
    if (!state.isDragging) state.targetZoom = u.isFlattened ? u.zoom * 0.96 : 1.0;
  }
  if (u.isFlattened !== undefined) {
    state.isFlattened = u.isFlattened;
    state.targetCurvature = u.isFlattened ? 0.0 : state.baseCurvature;
    state.targetZoom = u.isFlattened ? config.zoomLevel * 0.96 : 1.0;
  }
};`,
        },
      ],
    },
    {
      id: "interaction-logic",
      title: "Interaction logic (drag, click, mouse move)",
      content: [
        {
          type: "paragraph",
          text: "Event listeners for mouse and touch are set up in `engine.ts`. Drag updates the target offset, creating momentum. A quick release with little movement is treated as a click, which maps screen coordinates back to a project and navigates.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/scripts/engine.ts (event handlers)",
          language: "ts",
          code: `const startDrag = (x: number, y: number) => {
  state.isDragging = true;
  state.isClick = true;
  state.clickStartTime = Date.now();
  const gallery = document.getElementById("gallery");
  if (gallery) gallery.classList.add("dragging");
  state.previousMouse = { x, y };
  setTimeout(() => state.isDragging && (state.targetZoom = config.zoomLevel), 150);
  state.targetCurvature = state.isFlattened ? FLATTENED_DRAG_CURVATURE : DRAG_CURVATURE;
};

const onPointerUp = (event: MouseEvent | TouchEvent) => {
  state.isDragging = false;
  const gallery = document.getElementById("gallery");
  if (gallery) gallery.classList.remove("dragging");
  state.targetZoom = state.isFlattened ? config.zoomLevel * 0.96 : 1.0;
  state.targetCurvature = state.isFlattened ? 0.0 : state.baseCurvature;

  if (state.isClick && Date.now() - state.clickStartTime < 200) {
    const endX = 'clientX' in event ? (event as MouseEvent).clientX : (event as TouchEvent).changedTouches?.[0]?.clientX;
    const endY = 'clientY' in event ? (event as MouseEvent).clientY : (event as TouchEvent).changedTouches?.[0]?.clientY;
    if (endX !== undefined && endY !== undefined && state.renderer) {
      const rect = state.renderer.domElement.getBoundingClientRect();
      const screenX = ((endX - rect.left) / rect.width) * 2 - 1;
      const screenY = -(((endY - rect.top) / rect.height) * 2 - 1);
      const radius = Math.sqrt(screenX * screenX + screenY * screenY);
      const distortion = 1.1 - state.curvatureLevel * radius * radius;
      const worldX = screenX * distortion * (rect.width / rect.height) * state.zoomLevel + state.offset.x;
      const worldY = screenY * distortion * state.zoomLevel + state.offset.y;
      const cellX = Math.floor(worldX / config.cellSize);
      const cellY = Math.floor(worldY / config.cellSize);

      const atlasSize = Math.ceil(Math.sqrt(projects.length));
      const totalSlots = atlasSize * atlasSize;
      const hash = (p: {x: number, y: number}) => {
        const dot = (Math.floor(p.x) * 12.9898 + Math.floor(p.y) * 78.233);
        return (Math.sin(dot) * 43758.5453) % 1;
      };
      const texIndex = Math.floor(Math.abs(hash({x: cellX, y: cellY})) * totalSlots);
      const actualIndex = (texIndex % projects.length + projects.length) % projects.length;
      if (projects[actualIndex]?.href) window.location.href = projects[actualIndex].href;
    }
  }
};

const handleMove = (currentX: number, currentY: number) => {
  if (!state.isDragging || currentX === undefined || currentY === undefined) return;
  const deltaX = currentX - state.previousMouse.x;
  const deltaY = currentY - state.previousMouse.y;
  if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
    state.isClick = false;
    if (state.targetZoom === 1.0 || (state.isFlattened && state.targetZoom === config.zoomLevel * 0.96)) {
      state.targetZoom = config.zoomLevel;
    }
  }
  state.targetOffset.x -= deltaX * 0.003;
  state.targetOffset.y += deltaY * 0.003;
  state.previousMouse = { x: currentX, y: currentY };
};

// Setup listeners in setupEventListeners() ...`,
        },
      ],
    },
    {
      id: "utility-functions",
      title: "Utility functions",
      content: [
        {
          type: "paragraph",
          text: "The `utils.ts` file contains helpers for loading textures, creating atlases, and converting color strings to arrays.",
        },
        {
          type: "code",
          name: "components/Infinite_Atlas_Gallery/scripts/utils.ts",
          language: "ts",
          code: `import * as THREE from "three";
import { projects } from "../data/asset_data";
import { CELL_TEX_SIZE } from "./core";

export const rgbaToArray = (rgba: string): [number, number, number, number] => {
  const match = rgba.match(/[\\d.]+/g);
  if (!match) return [0, 0, 0, 1];
  const [r, g, b, a] = match.map(Number);
  return [r / 255, g / 255, b / 255, a ?? 1];
};

export const loadTextures = async (textTextures: THREE.CanvasTexture[]) => {
  const promises = projects.map((p, index) => {
    return new Promise<THREE.Texture>((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = p.image;
      img.onload = () => {
        const tex = new THREE.Texture(img);
        tex.needsUpdate = true;
        resolve(tex);
      };
    });
  });
  const imageTextures = await Promise.all(promises);

  // Generate text textures (simplified – you would draw actual text)
  projects.forEach((p, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = CELL_TEX_SIZE;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(p.title, 20, 100);
    ctx.fillText(p.year.toString(), 20, 200);
    p.Tags.forEach((tag, j) => {
      ctx.fillText(tag, 20, 300 + j * 50);
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    textTextures.push(tex);
  });

  return imageTextures;
};

export const createTextureAtlas = (
  textures: THREE.Texture[],
  isText: boolean
): THREE.CanvasTexture => {
  const size = Math.ceil(Math.sqrt(textures.length)) * CELL_TEX_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  textures.forEach((tex, i) => {
    const col = i % Math.ceil(Math.sqrt(textures.length));
    const row = Math.floor(i / Math.ceil(Math.sqrt(textures.length)));
    const x = col * CELL_TEX_SIZE;
    const y = row * CELL_TEX_SIZE;

    if (isText) {
      ctx.drawImage(tex.image, x, y, CELL_TEX_SIZE, CELL_TEX_SIZE);
    } else {
      const img = tex.image as HTMLImageElement;
      const scale = Math.min(CELL_TEX_SIZE / img.width, CELL_TEX_SIZE / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, x + (CELL_TEX_SIZE - w) / 2, y + (CELL_TEX_SIZE - h) / 2, w, h);
    }
  });

  return new THREE.CanvasTexture(canvas);
};`,
        },
      ],
    },
    {
      id: "using-the-component",
      title: "Using the component",
      content: [
        {
          type: "paragraph",
          text: "Import the gallery component into any page. Make sure the container has the ID 'gallery' (the component adds it automatically).",
        },
        {
          type: "code",
          name: "app/page.tsx",
          language: "tsx",
          code: `import Infinite_Atlas_Gallery from '@/components/Infinite_Atlas_Gallery';

export default function Home() {
  return (
    <main>
      <Infinite_Atlas_Gallery />
    </main>
  );
}`,
        },
        {
          type: "paragraph",
          text: "You can adjust the number of projects in `asset_data.ts` – the gallery automatically adapts. The curvature, zoom, and flatten toggle can be controlled via the `Controls` component (you can build your own UI or omit it).",
        },
      ],
    },
  ],
};