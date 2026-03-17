import type { PostContent } from "../../types";


export const infinite3DGalleryData : PostContent = {
  author: "SinghAshir65848",
  date: "March 17, 2026",
  difficulty: "Advanced",
  introduction:
    "Build a high-performance 3D portfolio gallery using Three.js ,GSAP and GLSL shaders. Supports infinite scrolling, smooth navigation, and interactive hover effects.",
  
  liveDemo: "https://t7labs-demo.pages.dev/gallery/infinite-atlas-gallery",
  sourceCode: "https://github.com/Ethan4582/demo-t7labs/tree/master/src/components/Infinite_Atlas_Gallery",
  notes: "Full component code is not included—this post provides an overview only.\nIf you face any issues, refer to the working source code provided.",
 videoDemo: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/blog_demo/3d_gallery_demo%20_Compress.mp4",
  sections: [
    {
      id: "initializing-project",
      title: "Initializing the project",
      content: [
        {
          type: "paragraph",
          text: "Start by creating a new Next.js application with TypeScript and install the required dependencies:",
        },
        {
          type: "code",
          language: "bash",
          code: "npx create-next-app@latest infinite-gallery --typescript\ncd infinite-gallery\nnpm install three\nnpm install -D sass",
        },
        
      ],
    },
    {
      id: "component-structure",
      title: "Component structure",
      content: [
        {
          type: "paragraph",
          text: "The gallery is organised into a clean folder structure separating logic, data, shaders, and UI:",
        },
        {
          type: "code",
          language: "plaintext",
          code: `components/
  Infinite_Atlas_Gallery/
    index.tsx
    style.module.scss
    Controls.tsx
    shadder.ts          (vertex/fragment shaders)
    scripts/
      core.ts          (types & state)
      engine.ts        (Three.js setup, event loop, interactions)
      utils.ts         (texture atlas generation, helpers)
    data/
      asset_data.ts    (project list)`,
        },
      ],
    },
    {
      id: "asset-data",
      title: "Defining project data",
      content: [
        {
          type: "paragraph",
          text: "Each project contains an image URL, title, year, tags, and a background colour for fallback. We'll use placeholder images from picsum:",
        },
        {
          type: "code",
          name: "data/asset_data.ts",
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
  // ... add more projects as needed
];`,
        },
      ],
    },
    {
      id: "core-state-and-config",
      title: "Core state & configuration",
      content: [
        {
          type: "paragraph",
          text: "We define a central state object and configuration that will be shared across the engine. The `state` holds references to Three.js objects, drag flags, offsets, and animation parameters.",
        },
        {
          type: "code",
          name: "scripts/core.ts",
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
  scene?: THREE.Scene;
  camera?: THREE.OrthographicCamera;
  renderer?: THREE.WebGLRenderer;
  plane?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
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
      title: "Engine initialization & interaction",
      content: [
        {
          type: "paragraph",
          text: "The `engine.ts` file sets up the Three.js scene, loads textures, creates the shader material, and handles drag events. It also contains the animation loop that lerps all values. Below are the key parts; the full code is available in the provided source repository.",
        },
        {
          type: "code",
          name: "scripts/engine.ts (init function)",
          language: "ts",
          code: `import * as THREE from "three";
import { state, config, DRAG_CURVATURE } from "./core";
import { projects } from "../data/asset_data";
import { vertexShader, fragmentShader } from "../shader";
import { rgbaToArray, loadTextures, createTextureAtlas } from "./utils";

export const init = async () => {
  const container = document.getElementById("gallery");
  if (!container || container.querySelector("canvas")) return;

  // Setup scene, camera, renderer
  state.scene = new THREE.Scene();
  state.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  state.camera.position.z = 1;

  state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  state.renderer.setSize(container.offsetWidth, container.offsetHeight);
  state.renderer.setPixelRatio(window.devicePixelRatio);
  const bgColor = rgbaToArray(config.backgroundColor);
  state.renderer.setClearColor(new THREE.Color(bgColor[0], bgColor[1], bgColor[2]), bgColor[3]);
  container.appendChild(state.renderer.domElement);

  // Load textures and create atlases
  const imageTextures = await loadTextures(state.textTextures);
  const imageAtlas = createTextureAtlas(imageTextures, false);
  const textAtlas = createTextureAtlas(state.textTextures, true);

  // Setup shader uniforms
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

  // Create plane with shader material
  state.plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
  );
  state.scene.add(state.plane);

  setupEventListeners();
  animate();
};`,
        },
        {
          type: "code",
          name: "scripts/engine.ts (animate loop)",
          language: "ts",
          code: `export const animate = () => {
  state.animationFrameId = requestAnimationFrame(animate);
  
  // Lerp all values
  state.offset.x += (state.targetOffset.x - state.offset.x) * config.lerpFactor;
  state.offset.y += (state.targetOffset.y - state.offset.y) * config.lerpFactor;
  state.zoomLevel += (state.targetZoom - state.zoomLevel) * config.lerpFactor;
  state.curvatureLevel += (state.targetCurvature - state.curvatureLevel) * config.lerpFactor;

  // Update shader uniforms
  if (state.plane?.material.uniforms) {
    state.plane.material.uniforms.uOffset.value.set(state.offset.x, state.offset.y);
    state.plane.material.uniforms.uZoom.value = state.zoomLevel;
    state.plane.material.uniforms.uCurvature.value = state.curvatureLevel;
  }

  if (state.renderer && state.scene && state.camera) {
    state.renderer.render(state.scene, state.camera);
  }
};`,
        },
      ],
    },
    {
      id: "texture-atlas-utils",
      title: "Texture atlas generation",
      content: [
        {
          type: "paragraph",
          text: "To avoid the browser's texture limit, we combine all project images and text overlays into two large atlases. The `createTextureAtlas` function draws each image into a grid on a single canvas. The text atlas is generated by rendering the project metadata onto a canvas using the Canvas API. Below are the core functions; full code is in the source.",
        },
        {
          type: "code",
          name: "scripts/utils.ts (createTextTexture)",
          language: "ts",
          code: `export const createTextTexture = (project: Project): THREE.CanvasTexture => {
  const S = CELL_TEX_SIZE;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, S, S);

  // Draw title (right-aligned, top)
  ctx.font = \`500 36px "IBM Plex Mono", monospace\`;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.textAlign = "right";
  ctx.fillText(project.title.toUpperCase(), S - 28, 28);

  // Draw tags as pills at bottom-left
  if (project.Tags && project.Tags.length > 0) {
    // ... tag drawing logic
  }

  // Draw year at bottom-right
  ctx.font = \`500 30px "IBM Plex Mono", monospace\`;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.textAlign = "right";
  ctx.fillText(project.year.toString(), S - 28, S - 28);

  return new THREE.CanvasTexture(canvas);
};`,
        },
        {
          type: "code",
          name: "scripts/utils.ts (createTextureAtlas)",
          language: "ts",
          code: `export const createTextureAtlas = (
  textures: THREE.Texture[],
  isText = false
): THREE.CanvasTexture => {
  const atlasSize = Math.ceil(Math.sqrt(textures.length));
  const textureSize = isText ? CELL_TEX_SIZE : 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = atlasSize * textureSize;
  const ctx = canvas.getContext("2d")!;

  // Fill canvas with black if image atlas (optional)
  if (!isText) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Draw each texture into its grid cell
  for (let slot = 0; slot < atlasSize * atlasSize; slot++) {
    const texture = textures[slot % textures.length];
    if (!texture?.image) continue;
    const x = (slot % atlasSize) * textureSize;
    const y = Math.floor(slot / atlasSize) * textureSize;
    ctx.drawImage(texture.image, x, y, textureSize, textureSize);
  }

  return new THREE.CanvasTexture(canvas);
};`,
        },
      ],
    },
    {
      id: "shader-implementation",
      title: "Custom GLSL shaders",
      content: [
        {
          type: "paragraph",
          text: "All visual magic happens in the fragment shader. It computes the infinite grid, curvature distortion, cell hashing, hover blur, and blends the image and text atlases. Due to its length, only the key parts are shown here; the complete shader is available in the source repository.",
        },
        {
          type: "code",
          name: "shader.ts (fragment shader excerpt)",
          language: "glsl",
          code: `export const fragmentShader = \`
  uniform vec2  uOffset;
  uniform vec2  uResolution;
  uniform vec4  uBorderColor;
  uniform float uZoom;
  uniform float uCurvature;
  uniform float uCellSize;
  uniform float uTextureCount;
  uniform sampler2D uImageAtlas;
  uniform sampler2D uTextAtlas;
  varying vec2 vUv;

  // IQ-style hash function for pseudo‑random cell selection
  float cellHash(vec2 p) {
    p = fract(p * vec2(0.1031, 0.1030));
    p += dot(p, p.yx + 33.33);
    return fract((p.x + p.y) * p.x);
  }

  // 9-tap Gaussian blur (used for hover effect)
  vec3 blurAtlas(vec2 uv, float r) {
    vec3 c  = texture2D(uImageAtlas, uv).rgb * 4.0;
    c += texture2D(uImageAtlas, uv + vec2( r, 0.)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2(-r, 0.)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2(0.,  r)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2(0., -r)).rgb * 2.0;
    c += texture2D(uImageAtlas, uv + vec2( r,  r)).rgb;
    c += texture2D(uImageAtlas, uv + vec2(-r,  r)).rgb;
    c += texture2D(uImageAtlas, uv + vec2( r, -r)).rgb;
    c += texture2D(uImageAtlas, uv + vec2(-r, -r)).rgb;
    return c / 16.0;
  }

  void main() {
    // Apply curvature distortion to screen coordinates
    vec2 screenUV = (vUv - 0.5) * 2.0;
    float radius = length(screenUV);
    float distortion = 1.1 - uCurvature * radius * radius;
    vec2 worldCoord = screenUV * distortion * vec2(uResolution.x/uResolution.y, 1.0);
    worldCoord = worldCoord * uZoom + uOffset;

    // Determine which cell we're in
    vec2 cellPos = worldCoord / uCellSize;
    vec2 cellId  = floor(cellPos);
    vec2 cellUV  = fract(cellPos);

    // Hash cell ID to pick a texture from the atlas
    float atlasSize = ceil(sqrt(uTextureCount));
    float totalSlots = atlasSize * atlasSize;
    float texIndex = floor(cellHash(cellId) * totalSlots);
    texIndex = mod(texIndex, totalSlots);
    vec2 atlasPos = vec2(mod(texIndex, atlasSize), floor(texIndex / atlasSize));

    // ... rest of the shader: sample image atlas, apply hover blur, blend text atlas, etc.
    // Full shader available in source code.
    gl_FragColor = vec4(1.0); // placeholder
  }
\`;`,
        },
        {
          type: "paragraph",
          text: "The full shader includes logic for drawing the image card, applying a frosted‑glass blur on hover, overlaying the text atlas, and rendering grid borders. You can find it in the source repository linked above.",
        },
      ],
    },
    {
      id: "main-component-and-controls",
      title: "Main component & interactive controls",
      content: [
        {
          type: "paragraph",
          text: "The `index.tsx` component mounts the gallery and provides a simple UI panel to tweak curvature, zoom, and toggle flatten mode. The controls use `setConfig` to update the engine state.",
        },
        {
          type: "code",
          name: "Infinite_Atlas_Gallery/index.tsx",
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
          name: "Controls.tsx (simplified)",
          language: "tsx",
          code: `export const Controls = ({ 
  curvature, zoom, isFlattened, 
  onCurvatureChange, onZoomChange, onToggleFlatten 
}) => {
  return (
    <div className="absolute bottom-6 left-6 z-50">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl p-4 w-52">
        <h3 className="text-white/80 text-[10px] font-mono mb-4">VIEWPORT</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[9px] font-mono text-white/40">
              <span>Curvature</span>
              <span>{curvature.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="0.4" step="0.01" 
              value={curvature}
              onChange={(e) => onCurvatureChange(parseFloat(e.target.value))}
              disabled={isFlattened}
              className="w-full h-1 bg-white/10 rounded-lg accent-blue-500"
            />
          </div>
          <div>
            <div className="flex justify-between text-[9px] font-mono text-white/40">
              <span>Zoom</span>
              <span>{zoom.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="1" max="2.5" step="0.05" 
              value={zoom}
              onChange={(e) => onZoomChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg accent-blue-500"
            />
          </div>
          <button 
            onClick={onToggleFlatten}
            className={\`w-full py-2 rounded-lg border transition-all text-[9.5px] font-mono uppercase \${
              isFlattened 
                ? "bg-white text-black border-white" 
                : "bg-transparent text-white/80 border-white/20 hover:border-white/40"
            }\`}
          >
            {isFlattened ? "RESTORE CURVE" : "FLATTEN VIEW"}
          </button>
        </div>
      </div>
    </div>
  );
};`,
        },
      ],
    },
    {
      id: "styling",
      title: "Styling",
      content: [
        {
          type: "paragraph",
          text: "The container takes full viewport and includes a subtle vignette overlay. The `dragging` class changes the cursor.",
        },
        {
          type: "code",
          name: "style.module.scss",
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
      id: "using-the-component",
      title: "Using the component",
      content: [
        {
          type: "paragraph",
          text: "Import the gallery into any page. Make sure to wrap the component in a client directive if using Next.js App Router.",
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
        
      ],
    },
    {
      id: "wrapping-up",
      title: "Wrapping Up",
      content: [
        {
          type: "paragraph",
           text: "Credits to the original inspiration @Phantom.studio [urlhttps://www.phantom.land/] . Happy coding!",
        }
      ],
    },
    
  ],
  
};