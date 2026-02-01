"use client";

import React, { useEffect, useRef } from "react";
import { 
  WebGLRenderer, 
  ShaderMaterial, 
  Vector2,
  Vector3, 
  Scene, 
  OrthographicCamera, 
  PlaneGeometry,
  Color,
  Mesh,
  Clock,
  SRGBColorSpace
} from "three";
import styles from "./ColorBends.module.css";

type ColorBendsProps = {
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
};

const MAX_COLORS = 8 as const;

const frag = `
precision mediump float;
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;

  // Aspect correction applied before rotation to keep rotation stable relative to screen shape
  float aspect = uCanvas.x / uCanvas.y;
  p.x *= aspect;

  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  
  vec2 q = rp;
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    vec3 col = vec3(0.0);
    float a = 1.0;

    // Optimization: Calculate invariant warps outside the loop
    float kBelow = clamp(uWarpStrength, 0.0, 1.0);
    float kMix = pow(kBelow, 0.3); 
    float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
    
    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            // Simplified loop math
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            
            // Reduced precision of sin waves for performance
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) * 0.25);
            
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) * 0.25);
            float m = mix(m0, m1, kMix);
            
            // Optimized bell curve without double exp if possible, but keeping original look for now
            // Just ensuring we don't overflow
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));
            
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
        // Fallback optimization
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) * 0.25);
            
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) * 0.25);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export default function ColorBends({
  className,
  style,
  rotation = 45,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rotationRef = useRef<number>(rotation);
  const autoRotateRef = useRef<number>(autoRotate);
  const pointerTargetRef = useRef<Vector2>(new Vector2(0, 0));
  const pointerCurrentRef = useRef<Vector2>(new Vector2(0, 0));
  const pointerSmoothRef = useRef<number>(8);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new PlaneGeometry(2, 2);
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new Vector3(0, 0, 0));
    const material = new ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
      },
      premultipliedAlpha: true,
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
      alpha: true,
    });
    rendererRef.current = renderer;
    (renderer as any).outputColorSpace = SRGBColorSpace;
    // CRITICAL: Force 1.0 pixel ratio or lower for performance
    // High resolution on full-screen shaders kills FPS
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const clock = new Clock();

    const handleResize = () => {
      const dpr = renderer.getPixelRatio();
      // Use client dimensions for aspect ratio
      const cw = container.clientWidth || 1;
      const ch = container.clientHeight || 1;
      
      // Limit internal rendering resolution to roughly 720p equivalent max to save GPU
      // This ensures 4K screens don't render 8M pixels per frame
      const maxPixels = 1280 * 720;
      const currentPixels = cw * ch;
      const scale = currentPixels > maxPixels ? Math.sqrt(maxPixels / currentPixels) : 1;
      
      const width = Math.floor(cw * scale);
      const height = Math.floor(ch * scale);

      renderer.setSize(width, height, false); // false = do not update style width/height
      (material.uniforms.uCanvas.value as Vector2).set(width, height);
    };

    handleResize();

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      (window as unknown as Window).addEventListener("resize", handleResize);
    }

    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      (material.uniforms.uRot.value as Vector2).set(c, s);

      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      // Frame-rate independent smoothing
      const amt = Math.min(1, dt * pointerSmoothRef.current * 0.8); 
      cur.lerp(tgt, amt);
      (material.uniforms.uPointer.value as Vector2).copy(cur);
      
      renderer.render(scene, camera);
    };
    
    // Visibility/Intersection Observer to stop rendering when not visible
    let observer: IntersectionObserver | null = null;
    let isVisible = true;
    
    const animate = () => {
      if (!isVisible) return;
      loop();
      rafRef.current = requestAnimationFrame(animate);
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            if (!isVisible) {
                isVisible = true;
                clock.start(); // Resume clock
                rafRef.current = requestAnimationFrame(animate);
            }
        } else {
            isVisible = false;
             if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
             }
        }
      }, { threshold: 0 });
      observer.observe(container);
    }

    // Start loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (observer) observer.disconnect();
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else (window as unknown as Window).removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;

    const toVec3 = (hex: string) => {
      const h = hex.replace("#", "").trim();
      const v =
        h.length === 3
          ? [
              parseInt(h[0] + h[0], 16),
              parseInt(h[1] + h[1], 16),
              parseInt(h[2] + h[2], 16),
            ]
          : [
              parseInt(h.slice(0, 2), 16),
              parseInt(h.slice(2, 4), 16),
              parseInt(h.slice(4, 6), 16),
            ];
      return new Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
    };

    const arr = (colors || [])
      .filter(Boolean)
      .slice(0, MAX_COLORS)
      .map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      const vec = (material.uniforms.uColors.value as Vector3[])[i];
      if (i < arr.length) vec.copy(arr[i]);
      else vec.set(0, 0, 0);
    }
    material.uniforms.uColorCount.value = arr.length;

    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);
  }, [
    rotation,
    autoRotate,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    colors,
    transparent,
  ]);

  useEffect(() => {
    const material = materialRef.current;
    const container = containerRef.current;
    if (!material || !container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener("pointermove", handlePointerMove);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ""}`}
      style={style}
    />
  );
}
