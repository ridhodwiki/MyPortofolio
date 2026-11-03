"use client";

import { useEffect, useRef, useState } from "react";

type VantaEffect = {
  destroy: () => void;
  restart: () => void;
  scene: { traverse: (callback: (node: unknown) => void) => void };
  colors: number[];
  renderer?: { dispose: () => void; forceContextLoss: () => void };
};

function readToken(name: string, fallback: number): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r, g, b] = raw.split(/\s+/).map(Number);
  if ([r, g, b].some((v) => Number.isNaN(v))) return fallback;
  return (r << 16) | (g << 8) | b;
}

let geometryGuardInstalled = false;
function installGeometryGuard(three: typeof import("three")) {
  if (geometryGuardInstalled) return;
  geometryGuardInstalled = true;
  const compute = three.BufferGeometry.prototype.computeBoundingSphere;
  // Vanta generates some degenerate rings whose Float32 positions overflow to
  // Infinity. Replace those values before three computes their bounding sphere.
  three.BufferGeometry.prototype.computeBoundingSphere = function (this: import("three").BufferGeometry) {
    const position = this.getAttribute("position");
    const array = position?.array as Float32Array | undefined;
    if (array) {
      let dirty = false;
      for (let i = 0; i < array.length; i++) {
        if (!Number.isFinite(array[i])) {
          array[i] = 0;
          dirty = true;
        }
      }
      if (dirty) position.needsUpdate = true;
    }
    return compute.call(this);
  };
}

export default function VantaRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const update = () => setLight(document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let effect: VantaEffect | null = null;
    let cancelled = false;

    Promise.all([import("vanta/dist/vanta.rings.min"), import("three")]).then(([vanta, THREE]) => {
      if (cancelled || !containerRef.current) return;
      const backgroundColor = readToken("--c-base", 0x0b1020);
      const palette = [
        readToken("--c-primary", 0x6c8cff),
        readToken("--c-primary-dim", 0x4f6fe0),
        readToken("--c-line", 0x2c3550),
      ];

      installGeometryGuard(THREE);

      effect = vanta.default({
        el,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor,
        color: palette[0],
        pauseButton: false,
      }) as VantaEffect;

      // Vanta picks ring colors from the instance array, not from `color`.
      effect.colors = palette;
      effect.restart();

      // Vanta targets three r134 lighting units; r155+ renders the rings darker.
      // A few generated rings have NaN vertices, so skip frustum culling to
      // avoid three warning about their bounding sphere on every frame.
      effect.scene.traverse((node) => {
        if (node instanceof THREE.Light) node.intensity *= 3;
        if (node instanceof THREE.Mesh) node.frustumCulled = false;
      });
    });

    return () => {
      cancelled = true;
      // Vanta only removes its canvas; release the WebGL context explicitly so
      // theme switches do not exhaust the browser context limit.
      effect?.renderer?.dispose();
      effect?.renderer?.forceContextLoss();
      effect?.destroy();
    };
  }, [light]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 h-[120vh] w-full overflow-hidden bg-[rgb(var(--c-base))] transition-opacity duration-500 ${
        light ? "opacity-45" : "opacity-75"
      }`}
    />
  );
}
