"use client";
import { useEffect, useRef, useCallback } from "react";

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  size: number;
  color: string;
  shape: "rect" | "circle";
  opacity: number;
  life: number;
};

const COLORS = [
  "#3b82f6", "#06b6d4", "#8b5cf6", "#10b981",
  "#f59e0b", "#ec4899", "#60a5fa", "#a78bfa",
];

function spawnParticles(
  canvas: HTMLCanvasElement,
  count: number,
  originX?: number,
  originY?: number
): ConfettiParticle[] {
  const ox = originX ?? canvas.width / 2;
  const oy = originY ?? canvas.height / 4;
  return Array.from({ length: count }, () => ({
    x: ox + (Math.random() - 0.5) * 80,
    y: oy,
    vx: (Math.random() - 0.5) * 12,
    vy: -(Math.random() * 8 + 4),
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 7 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: Math.random() > 0.5 ? "rect" : "circle",
    opacity: 1,
    life: 1,
  }));
}

/* ── Hook ─────────────────────────────────────────────────── */
export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const rafRef = useRef<number>();

  const fire = useCallback((x?: number, y?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current.push(...spawnParticles(canvas, 120, x, y));
  }, []);

  useEffect(() => {
    /* Create a fixed overlay canvas */
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      position: fixed; inset: 0; pointer-events: none;
      z-index: 9999; width: 100vw; height: 100vh;
    `;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.01);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.99;
        p.angle += p.spin;
        p.life -= 0.013;
        p.opacity = Math.max(0, p.life * 1.4);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return { fire };
}

/* ── Standalone component version ─────────────────────────── */
export default function ConfettiOnMount({ delay = 800 }: { delay?: number }) {
  const { fire } = useConfetti();

  useEffect(() => {
    const t = setTimeout(() => {
      fire(window.innerWidth / 2, window.innerHeight / 3);
      setTimeout(() => fire(window.innerWidth * 0.2, window.innerHeight / 2), 200);
      setTimeout(() => fire(window.innerWidth * 0.8, window.innerHeight / 2), 350);
    }, delay);
    return () => clearTimeout(t);
  }, [fire, delay]);

  return null;
}
