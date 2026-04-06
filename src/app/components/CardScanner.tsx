"use client";
import { useEffect, useRef, useState } from "react";

/* ── Particle card scanner ─ pure canvas, no Three.js ─────── */

type Particle = {
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  phase: number;
};

const PARTICLE_COUNT = 2800;
const CARD_FEATURES = [
  { icon: "⚡", label: "Montage Gaming" },
  { icon: "🔧", label: "Réparation Expert" },
  { icon: "💾", label: "Upgrade SSD/RAM" },
  { icon: "🌡️", label: "Gestion Thermique" },
];

export default function CardScanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const progressRef = useRef(0); // 0 = scattered, 1 = formed
  const dirRef = useRef(1);
  const scanLineRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  /* ── Intersection observer ─────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Feature cycle ─────────────────────────────────── */
  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => {
      setActiveFeature((i) => (i + 1) % CARD_FEATURES.length);
    }, 2000);
    return () => clearInterval(t);
  }, [isVisible]);

  /* ── Canvas setup & particle engine ───────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    /* Build target shape: PC/chip silhouette using a grid with cutouts */
    const buildTargets = (w: number, h: number) => {
      const targets: { x: number; y: number; color: string }[] = [];
      const cw = w * 0.55; // card width
      const ch = cw * 0.62; // card height
      const cx = w / 2;
      const cy = h / 2;

      // Helper: is point inside card?
      const inCard = (px: number, py: number) =>
        px > cx - cw / 2 && px < cx + cw / 2 &&
        py > cy - ch / 2 && py < cy + ch / 2;

      // Main card body
      const rows = 42, cols = 70;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = cx - cw / 2 + (c / cols) * cw;
          const py = cy - ch / 2 + (r / rows) * ch;
          if (!inCard(px, py)) continue;

          // Color zones: simulate a PCB
          const nx = (c / cols);
          const ny = (r / rows);

          let color: string;
          // PCB green base
          if (nx > 0.1 && nx < 0.9 && ny > 0.1 && ny < 0.9) {
            color = `hsl(${140 + nx * 40},${50 + ny * 20}%,${20 + nx * 15}%)`;
          } else {
            color = "#1a2a1a";
          }
          // CPU area center
          if (nx > 0.3 && nx < 0.7 && ny > 0.3 && ny < 0.7) {
            color = `hsl(220,${70 + nx * 20}%,${35 + ny * 20}%)`;
          }
          // Gold traces
          if ((Math.floor(r * 1.3) % 5 === 0 || Math.floor(c * 0.9) % 7 === 0) &&
              nx > 0.05 && nx < 0.95) {
            color = `hsl(45,${80 + Math.random() * 10}%,${50 + Math.random() * 15}%)`;
          }
          // Accent highlights
          if (Math.random() < 0.04) {
            color = `hsl(${190 + Math.random() * 40},90%,${65 + Math.random() * 20}%)`;
          }

          targets.push({ x: px, y: py, color });
        }
      }
      return targets;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = container.offsetWidth;
      H = container.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);

      const targets = buildTargets(W, H);

      // Init particles
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const t = targets[i % targets.length];
        const scatter = progressRef.current < 0.5;
        return {
          x: scatter ? Math.random() * W : t.x,
          y: scatter ? Math.random() * H : t.y,
          tx: t.x,
          ty: t.y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.5 + 0.5,
          color: t.color,
          opacity: Math.random() * 0.7 + 0.3,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    resize();
    window.addEventListener("resize", resize);

    /* ── Main animation loop ─────── */
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "rgba(6,13,30,0.92)";
      ctx.fillRect(0, 0, W, H);

      // Progress oscillation when visible
      if (isVisible) {
        progressRef.current += dirRef.current * 0.004;
        if (progressRef.current >= 1) { progressRef.current = 1; dirRef.current = -1; }
        if (progressRef.current <= 0) { progressRef.current = 0; dirRef.current = 1; }
      }

      const prog = progressRef.current;

      // Move & draw particles
      particlesRef.current.forEach((p) => {
        const spring = 0.04 + prog * 0.06;
        const damp = 0.78;
        const jitter = (1 - prog) * 0.8;

        p.vx = p.vx * damp + (p.tx - p.x) * spring + (Math.random() - 0.5) * jitter;
        p.vy = p.vy * damp + (p.ty - p.y) * spring + (Math.random() - 0.5) * jitter;

        // Scatter push when not formed
        if (prog < 0.3) {
          p.vx += (Math.random() - 0.5) * 0.4;
          p.vy += (Math.random() - 0.5) * 0.4;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.phase += 0.03;
        const pulse = 0.7 + Math.sin(p.phase) * 0.3;
        const alpha = p.opacity * pulse * (0.4 + prog * 0.6);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + prog * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Scan line effect
      if (prog > 0.4) {
        scanLineRef.current = (scanLineRef.current + 2) % H;
        const scanY = scanLineRef.current;
        const scanAlpha = (prog - 0.4) * 0.8;

        // Horizontal scan beam
        const grad = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, `rgba(96,165,250,${scanAlpha * 0.6})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 6, W, 12);

        // Corner brackets
        const cx2 = W / 2;
        const cy2 = H / 2;
        const cw2 = W * 0.55;
        const ch2 = cw2 * 0.62;
        const bSize = 18;
        const corners = [
          [cx2 - cw2 / 2, cy2 - ch2 / 2],
          [cx2 + cw2 / 2, cy2 - ch2 / 2],
          [cx2 - cw2 / 2, cy2 + ch2 / 2],
          [cx2 + cw2 / 2, cy2 + ch2 / 2],
        ];
        ctx.strokeStyle = `rgba(96,165,250,${scanAlpha * 0.9})`;
        ctx.lineWidth = 1.5;
        corners.forEach(([bx, by], idx) => {
          const sx = idx % 2 === 0 ? 1 : -1;
          const sy = idx < 2 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(bx, by + sy * bSize);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + sx * bSize, by);
          ctx.stroke();
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("resize", resize);
    };
  }, [isVisible]);

  return (
    <section className="py-24 bg-[#060d1e] relative overflow-hidden">
      {/* Blue ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Précision & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Chaque composant,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              maîtrisé
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            De la résistance au processeur, chaque pièce est diagnostiquée, nettoyée et optimisée avec soin.
          </p>
        </div>

        {/* Canvas + sidebar layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Canvas */}
          <div
            ref={containerRef}
            className="relative w-full lg:w-3/5 rounded-2xl overflow-hidden"
            style={{ height: "clamp(260px, 40vw, 480px)" }}
          >
            <canvas ref={canvasRef} className="absolute inset-0" />
            {/* Overlay label */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-blue-400/40 tracking-widest pointer-events-none">
              PC-MEKNES SCAN v1.0
            </div>
          </div>

          {/* Feature list */}
          <div className="w-full lg:w-2/5 space-y-4">
            {CARD_FEATURES.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  activeFeature === i
                    ? "bg-blue-500/10 border border-blue-500/30 scale-[1.02]"
                    : "bg-white/3 border border-white/5"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-500 ${
                    activeFeature === i
                      ? "bg-blue-500/20"
                      : "bg-white/5"
                  }`}
                >
                  {f.icon}
                </div>
                <span
                  className={`font-medium transition-colors duration-300 ${
                    activeFeature === i ? "text-white" : "text-white/40"
                  }`}
                >
                  {f.label}
                </span>
                {activeFeature === i && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                )}
              </div>
            ))}

            <a
              href="#contact"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 hover:-translate-y-0.5"
            >
              <i className="fas fa-calendar-check text-xs" />
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
