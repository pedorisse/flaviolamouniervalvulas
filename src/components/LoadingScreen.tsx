import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const phrases = [
  "Grandes cidades dependem de infraestrutura invisível.",
  "Grandes projetos dependem das decisões certas.",
];

export function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2600);
    const t2 = setTimeout(() => setPhase(2), 5200);
    const t3 = setTimeout(() => setShowEnter(true), 6400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-deep grain flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.55 0.18 230 / 0.15), transparent 50%), radial-gradient(circle at 80% 30%, oklch(0.72 0.16 235 / 0.1), transparent 50%)",
      }} />

      <div className="relative w-full max-w-5xl px-6">
        {/* Wireframe pipeline */}
        <svg viewBox="0 0 1000 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="oklch(0.72 0.16 235)" stopOpacity="0" />
              <stop offset="0.5" stopColor="oklch(0.78 0.2 230)" stopOpacity="1" />
              <stop offset="1" stopColor="oklch(0.72 0.16 235)" stopOpacity="0" />
            </linearGradient>
            <filter id="pipeGlow">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* outer pipeline shapes */}
          <g stroke="oklch(1 0 0 / 0.15)" strokeWidth="1" fill="none">
            <path d="M0 100 L200 100 L260 60 L500 60 L560 140 L800 140 L860 100 L1000 100" />
            <path d="M0 110 L200 110 L260 70 L500 70 L560 150 L800 150 L860 110 L1000 110" />
            {/* joints */}
            {[200,260,500,560,800,860].map((x,i)=>(<circle key={i} cx={x} cy={i%2?70:60} r="6" />))}
          </g>
          {/* flowing light */}
          <motion.path
            d="M0 105 L200 105 L260 65 L500 65 L560 145 L800 145 L860 105 L1000 105"
            stroke="url(#pipeGrad)"
            strokeWidth="3"
            fill="none"
            filter="url(#pipeGlow)"
            strokeDasharray="1200"
            initial={{ strokeDashoffset: 1200 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 6, ease: "easeInOut" }}
          />
          <motion.circle
            r="5" fill="oklch(0.85 0.18 220)" filter="url(#pipeGlow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 6, ease: "easeInOut" }}
            style={{ offsetPath: "path('M0 105 L200 105 L260 65 L500 65 L560 145 L800 145 L860 105 L1000 105')" } as React.CSSProperties}
          />
        </svg>

        <div className="mt-16 text-center min-h-[120px]">
          <AnimatePresence mode="wait">
            {phase < 2 && (
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.9 }}
                className="font-display text-xl md:text-3xl text-foreground/90 font-light tracking-wide text-balance"
              >
                {phrases[phase]}
              </motion.p>
            )}
            {phase === 2 && (
              <motion.div
                key="name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="space-y-3"
              >
                <h1 className="font-display text-6xl md:text-8xl font-extralight tracking-[0.3em] text-foreground">FLÁVIO</h1>
                <p className="text-xs md:text-sm text-aqua uppercase tracking-[0.4em]">Especialista em Válvulas Industriais & Tubulações PEAD</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showEnter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={onEnter}
                className="group relative px-12 py-4 border border-aqua/40 text-foreground uppercase tracking-[0.3em] text-xs font-display hover:border-aqua transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Entrar</span>
                <span className="absolute inset-0 bg-aqua/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
