import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const phrases = [
  "Grandes cidades dependem de infraestrutura invisível.",
  "Grandes projetos dependem das decisões certas.",
];

export function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setPhase(1), 2600);
    const t2 = setTimeout(() => setPhase(2), 5200);
    const t3 = setTimeout(() => setShowEnter(true), 6400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Client-only to avoid SSR hydration mismatch from Math.random()
  const particles = useMemo(
    () => mounted ? Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      size: Math.random() < 0.3 ? 2 : 1,
    })) : [],
    [mounted]
  );

  return (
    <div className="fixed inset-0 z-[100] bg-deep grain overflow-hidden">
      {/* Ambient radial glows */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgb(22 139 234 / 0.15), transparent 50%), radial-gradient(circle at 80% 30%, rgb(77 183 255 / 0.1), transparent 50%)",
      }} />

      {/* Ambient particles — "infrastructure is alive" */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-aqua"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgb(116 214 255 / 0.6)",
            }}
            animate={{ opacity: [0, 0.7, 0], y: [0, -20, -40] }}
            transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* TOP PIPELINE — continuous flowing light loop */}
      <div className="absolute top-0 left-0 right-0 px-6 pt-6">
        <svg viewBox="0 0 1000 90" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4db7ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#a6ecff" stopOpacity="1" />
              <stop offset="1" stopColor="#4db7ff" stopOpacity="0" />
            </linearGradient>
            <filter id="flowGlow">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* base pipe */}
          <g stroke="rgb(244 251 255 / 0.12)" strokeWidth="1" fill="none">
            <path d="M0 40 L200 40 L240 20 L520 20 L560 60 L820 60 L860 40 L1000 40" />
            {[200,240,520,560,820,860].map((x,i)=>(
              <circle key={i} cx={x} cy={i%2?20:40} r="3" fill="rgb(77 183 255 / 0.4)" stroke="none" />
            ))}
          </g>
          {/* flowing light loop */}
          <motion.path
            d="M0 40 L200 40 L240 20 L520 20 L560 60 L820 60 L860 40 L1000 40"
            stroke="url(#flowGrad)"
            strokeWidth="2"
            fill="none"
            filter="url(#flowGlow)"
            strokeDasharray="180 2000"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -2180 }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          />
        </svg>
      </div>

      {/* CENTER CONTENT — stable visible fallback, animations are decorative only */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">
          {phase < 2 ? (
            <p
              key={phase}
              className="loader-visible-copy loader-fade-in font-display text-xl md:text-3xl font-light tracking-wide text-balance"
            >
              {phrases[phase]}
            </p>
          ) : (
              <div
                key="name"
                className="loader-fade-in flex flex-col items-center gap-8 w-full"
              >
                <div className="space-y-4">
                  <h1 className="loader-visible-copy font-display text-5xl min-[390px]:text-6xl md:text-8xl font-extralight tracking-[0.22em] md:tracking-[0.3em]">
                    FLÁVIO
                  </h1>

                  {/* FLUID LINES — hydraulic flow under name */}
                  <div className="relative h-10 w-[min(520px,80vw)] mx-auto overflow-hidden">
                    <svg viewBox="0 0 520 40" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="fluidFade" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0" stopColor="oklch(0.78 0.2 230)" stopOpacity="0" />
                          <stop offset="0.5" stopColor="oklch(0.78 0.2 230)" stopOpacity="0.55" />
                          <stop offset="1" stopColor="oklch(0.78 0.2 230)" stopOpacity="0" />
                        </linearGradient>
                        <mask id="fluidMask">
                          <rect width="520" height="40" fill="url(#fluidFade)" />
                        </mask>
                      </defs>
                      <g mask="url(#fluidMask)" stroke="oklch(0.78 0.2 230)" fill="none" strokeWidth="0.7">
                        {[8, 14, 20, 26, 32].map((y, i) => (
                          <motion.path
                            key={i}
                            d={`M-520 ${y} Q-390 ${y - 3} -260 ${y} T0 ${y} T260 ${y} T520 ${y} T780 ${y} T1040 ${y}`}
                            opacity={0.35 - i * 0.04}
                            animate={{ x: [0, 520] }}
                            transition={{
                              duration: 14 + i * 2,
                              ease: "linear",
                              repeat: Infinity,
                              delay: i * 0.6,
                            }}
                          />
                        ))}
                      </g>
                    </svg>
                  </div>

                  <p className="text-xs md:text-sm text-aqua uppercase tracking-[0.28em] md:tracking-[0.4em] leading-relaxed">
                    Especialista em Válvulas Industriais &amp; Tubulações PEAD
                  </p>
                </div>

                {showEnter && (
                  <button
                    onClick={onEnter}
                    className="loader-fade-in premium-cta group relative px-14 py-4 text-foreground uppercase tracking-[0.38em] md:tracking-[0.45em] text-xs font-display"
                  >
                    <span className="relative z-10">Conheça</span>
                    <span className="premium-cta__border" aria-hidden />
                    <span className="premium-cta__sheen" aria-hidden />
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
