"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Config ──────────────────────────────────────────────── */
const FRAME_COUNT = 90;
const HOLD_DURATION = 650; // ms snap hold
const SNAP_ZONE = 0.035;
const USE_PREEXTRACTED = true; // true = load /frames/frame_XXXX.jpg (fast), false = capture from video

const CARDS = [
  {
    id: 1,
    progress: 0.12,
    side: "right" as const,
    title: "Montage Sur Mesure",
    desc: "PC assemblé pièce par pièce selon vos besoins et budget",
    stat: "100%",
    statLabel: "personnalisé",
    color: "#3b82f6",
  },
  {
    id: 2,
    progress: 0.28,
    side: "left" as const,
    title: "Pâte Thermique Premium",
    desc: "Températures maîtrisées, performances au maximum",
    stat: "−15°C",
    statLabel: "en moyenne",
    color: "#06b6d4",
  },
  {
    id: 3,
    progress: 0.48,
    side: "right" as const,
    title: "Upgrade SSD / RAM",
    desc: "Boostez votre machine en moins de 30 minutes",
    stat: "3×",
    statLabel: "plus rapide",
    color: "#8b5cf6",
  },
  {
    id: 4,
    progress: 0.68,
    side: "left" as const,
    title: "Diagnostic Gratuit",
    desc: "Identification précise de la panne, devis transparent",
    stat: "0 DH",
    statLabel: "diagnostic",
    color: "#10b981",
  },
  {
    id: 5,
    progress: 0.88,
    side: "right" as const,
    title: "Installé & Configuré",
    desc: "Prêt à l'emploi dès la livraison, OS et pilotes inclus",
    stat: "24h",
    statLabel: "livraison",
    color: "#f59e0b",
  },
];

const SPECS = [
  { value: 500, label: "Réparations", suffix: "+" },
  { value: 4, label: "Ans d'expérience", suffix: "+" },
  { value: 24, label: "Délai réparation", suffix: "h" },
  { value: 100, label: "Satisfaction client", suffix: "%" },
];

/* ── Component ───────────────────────────────────────────── */
export default function ScrollVideoSection({ onComplete }: { onComplete?: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [specsVisible, setSpecsVisible] = useState(false);
  const [specVals, setSpecVals] = useState([0, 0, 0, 0]);
  const [scrollPct, setScrollPct] = useState(0);

  const currentFrameRef = useRef(-1);
  const isHoldingRef = useRef(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();

  /* ── Starfield ─────────────────────────────────────────── */
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = { x: number; y: number; r: number; dx: number; dy: number; phase: number; spd: number };
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
      spd: Math.random() * 0.025 + 0.01,
    }));

    let aid: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.x = (s.x + s.dx + canvas.width) % canvas.width;
        s.y = (s.y + s.dy + canvas.height) % canvas.height;
        s.phase += s.spd;
        const op = 0.25 + Math.sin(s.phase) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${op})`;
        ctx.fill();
      });
      aid = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(aid);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Load frames ─────────────────────────────────────────── */
  useEffect(() => {
    if (USE_PREEXTRACTED) {
      /* Fast path: load pre-extracted JPEG files */
      let loaded = 0;
      const imgs: HTMLImageElement[] = [];

      const onLoad = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          // Convert to canvas for uniform draw API
          const canvases = imgs.map((img) => {
            const fc = document.createElement("canvas");
            fc.width = img.naturalWidth;
            fc.height = img.naturalHeight;
            fc.getContext("2d")!.drawImage(img, 0, 0);
            return fc;
          });
          framesRef.current = canvases;
          setLoaded(true);
        }
      };

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.onload = onLoad;
        img.onerror = onLoad; // skip broken frames gracefully
        img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
        imgs.push(img);
      }
    } else {
      /* Fallback: capture from video in browser */
      const video = videoRef.current;
      if (!video) return;

      const run = async () => {
        await new Promise<void>((res) => {
          if (video.readyState >= 1) return res();
          video.addEventListener("loadedmetadata", () => res(), { once: true });
          video.load();
        });

        const dur = video.duration;
        const captured: HTMLCanvasElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
          const t = (i / (FRAME_COUNT - 1)) * dur;
          await new Promise<void>((res) => {
            const handler = () => {
              const fc = document.createElement("canvas");
              fc.width = video.videoWidth;
              fc.height = video.videoHeight;
              fc.getContext("2d")!.drawImage(video, 0, 0);
              captured.push(fc);
              setLoadProgress(Math.round(((i + 1) / FRAME_COUNT) * 100));
              res();
            };
            video.addEventListener("seeked", handler, { once: true });
            video.currentTime = t;
          });
        }

        framesRef.current = captured;
        setLoaded(true);
      };

      run();
    }
  }, []);

  /* ── Draw frame ───────────────────────────────────────── */
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;
    const frame = frames[Math.max(0, Math.min(idx, frames.length - 1))];
    if (!frame) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const fw = frame.width;
    const fh = frame.height;
    const isMobile = window.innerWidth < 768;
    const scale = isMobile
      ? Math.min(cw / fw, ch / fh) * 1.05
      : Math.max(cw / fw, ch / fh);
    const ox = (cw - fw * scale) / 2;
    const oy = (ch - fh * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(frame, ox, oy, fw * scale, fh * scale);
    ctx.restore();
  }, []);

  /* ── Resize canvas ─────────────────────────────────────── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = window.devicePixelRatio || 1;
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  /* ── Scroll logic ─────────────────────────────────────── */
  useEffect(() => {
    if (!loaded) return;

    const onScroll = () => {
      if (isHoldingRef.current) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setScrollPct(Math.round(progress * 100));

      const targetFrame = Math.round(progress * (FRAME_COUNT - 1));
      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
      }

      // Visible cards
      const visible = CARDS.filter(
        (c) => progress >= c.progress - 0.07 && progress <= c.progress + 0.18
      ).map((c) => c.id);
      setVisibleCards(visible);

      // Snap-stop at each card
      const snapTarget = CARDS.find(
        (c) => Math.abs(progress - c.progress) < SNAP_ZONE && !isHoldingRef.current
      );
      if (snapTarget) {
        isHoldingRef.current = true;
        const snapTop = section.offsetTop + snapTarget.progress * total;
        window.scrollTo({ top: snapTop, behavior: "smooth" });
        setActiveCard(snapTarget.id);
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = setTimeout(() => {
          isHoldingRef.current = false;
          setActiveCard(null);
        }, HOLD_DURATION);
      }

      // Completion confetti
      if (progress >= 0.98) onComplete?.();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, drawFrame, onComplete]);

  /* ── Specs observer ────────────────────────────────────── */
  useEffect(() => {
    const el = document.getElementById("scroll-specs");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSpecsVisible(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Count-up ──────────────────────────────────────────── */
  useEffect(() => {
    if (!specsVisible) return;
    const start = Date.now();
    const dur = 1800;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setSpecVals(SPECS.map((s) => Math.round(s.value * ease)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [specsVisible]);

  /* ── Render ──────────────────────────────────────────────*/
  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060d1e]"
      style={{ height: "360vh" }}
    >
      {/* Hidden video source */}
      <video
        ref={videoRef}
        src="/Gaming_PC_exploded_202604062205.mp4"
        muted
        playsInline
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
      />

      {/* Starfield (fixed, behind everything) */}
      <canvas
        ref={starsRef}
        className="fixed inset-0 pointer-events-none z-[1] opacity-50"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Scroll progress bar */}
      {loaded && (
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-none"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      )}

      {/* Loader overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060d1e]">
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="PC-MEKNES" className="w-16 h-16 rounded-xl opacity-80" />
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-400 animate-spin mb-6" />
          <p className="text-blue-300/80 text-sm font-mono tracking-widest mb-4">
            CHARGEMENT {loadProgress}%
          </p>
          <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Sticky viewport ──────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060d1e] to-transparent" />
          {/* Left vignette */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060d1e]/60 to-transparent" />
          {/* Right vignette */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060d1e]/60 to-transparent" />
        </div>

        {/* Section label */}
        <div
          className={`absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center transition-all duration-700 ${
            loaded && scrollPct < 5 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm text-blue-300 text-xs px-4 py-1.5 rounded-full tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Découvrez notre savoir-faire
          </span>
        </div>

        {/* Annotation cards */}
        {CARDS.map((card) => {
          const isVisible = visibleCards.includes(card.id);
          const isActive = activeCard === card.id;
          const onRight = card.side === "right";

          return (
            <div
              key={card.id}
              className={`absolute z-30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
              } ${isActive ? "scale-[1.04]" : "scale-100"}`}
              style={{
                ...(onRight
                  ? { right: "clamp(12px, 4vw, 48px)", top: "50%", transform: `translateY(-50%) ${isActive ? "scale(1.04)" : ""}` }
                  : { left: "clamp(12px, 4vw, 48px)", top: "50%", transform: `translateY(-50%) ${isActive ? "scale(1.04)" : ""}` }),
                maxWidth: "clamp(180px, 24vw, 280px)",
              }}
            >
              {/* Connector line */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-px opacity-40"
                style={{
                  background: `linear-gradient(${onRight ? "to left" : "to right"}, ${card.color}, transparent)`,
                  width: "clamp(20px, 3vw, 40px)",
                  ...(onRight ? { right: "100%", marginRight: "8px" } : { left: "100%", marginLeft: "8px" }),
                }}
              />

              <div
                className="relative rounded-2xl p-4 backdrop-blur-xl overflow-hidden"
                style={{
                  background: "rgba(6,13,30,0.75)",
                  border: `1px solid ${card.color}30`,
                  boxShadow: isActive
                    ? `0 0 24px ${card.color}40, 0 8px 32px rgba(0,0,0,0.5)`
                    : "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                {/* Glow blob */}
                <div
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-xl opacity-30"
                  style={{ background: card.color }}
                />

                {/* Card number */}
                <div
                  className="text-xs font-mono mb-2 opacity-60"
                  style={{ color: card.color }}
                >
                  0{card.id} /
                </div>

                {/* Stat (hidden on mobile) */}
                <div className="hidden sm:block mb-1">
                  <span
                    className="text-2xl font-bold leading-none"
                    style={{ color: card.color }}
                  >
                    {card.stat}
                  </span>
                  <span className="text-white/40 text-xs ml-1">{card.statLabel}</span>
                </div>

                {/* Title */}
                <div className="text-white font-semibold text-sm leading-tight mb-1">
                  {card.title}
                </div>

                {/* Desc (hidden on mobile) */}
                <div className="hidden sm:block text-white/50 text-xs leading-relaxed">
                  {card.desc}
                </div>
              </div>
            </div>
          );
        })}

        {/* Scroll hint */}
        {loaded && scrollPct < 3 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* ── Specs section ──────────────────────────────────── */}
      <div id="scroll-specs" className="relative z-10 -mt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/40" />
            <span className="text-blue-400/60 text-xs tracking-[0.3em] uppercase">Stats</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/40" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SPECS.map((spec, i) => (
              <div
                key={i}
                className="relative text-center p-6 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(59,130,246,0.12)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-cyan-400 mb-1">
                  {specVals[i]}{spec.suffix}
                </div>
                <div className="text-white/40 text-xs tracking-wide">{spec.label}</div>
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.06), transparent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
