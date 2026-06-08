import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Cinematic scroll-driven 2D butterfly valve opening + flow particles. */
export function ValveScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]); // disc opening
  const flowOpacity = useTransform(scrollYProgress, [0.3, 0.7, 1], [0, 0.8, 1]);
  const flowSpeed = useTransform(scrollYProgress, [0, 1], [12, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-deep grain">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-aqua text-xs uppercase tracking-[0.4em] flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />A Engenharia por trás do fluxo
        </div>

        {/* Flow particles */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: flowOpacity }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-aqua-glow"
              style={{
                top: `${20 + (i * 1.5) % 60}%`,
                left: -100,
                width: `${40 + (i * 7) % 80}px`,
                opacity: 0.4 + (i % 4) * 0.15,
                filter: "blur(1px)",
              }}
              animate={{ x: ["0vw", "120vw"] }}
              transition={{
                duration: 3 + (i % 5),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Valve */}
        <svg viewBox="-200 -200 400 400" className="relative w-[80vmin] h-[80vmin] z-10">
          <defs>
            <radialGradient id="discGrad">
              <stop offset="0" stopColor="oklch(0.65 0.02 245)" />
              <stop offset="1" stopColor="oklch(0.3 0.02 245)" />
            </radialGradient>
            <radialGradient id="bodyGrad" cx="50%" cy="40%">
              <stop offset="0" stopColor="oklch(0.25 0.04 250)" />
              <stop offset="1" stopColor="oklch(0.1 0.02 250)" />
            </radialGradient>
            <filter id="valveGlow"><feGaussianBlur stdDeviation="2" /></filter>
          </defs>
          {/* outer body */}
          <circle r="180" fill="url(#bodyGrad)" stroke="oklch(0.72 0.16 235 / 0.4)" strokeWidth="1" />
          <circle r="160" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" />
          <circle r="140" fill="oklch(0.08 0.02 250)" />
          {/* aqua inner glow ring */}
          <circle r="140" fill="none" stroke="oklch(0.72 0.16 235 / 0.5)" strokeWidth="1" filter="url(#valveGlow)" />
          {/* shaft */}
          <rect x="-4" y="-160" width="8" height="320" fill="oklch(0.45 0.02 245)" />
          {/* disc */}
          <motion.ellipse
            cx="0" cy="0" rx="130"
            style={{ scaleY: useTransform(rotate, (r) => Math.cos((r * Math.PI) / 180)) }}
            fill="url(#discGrad)"
            stroke="oklch(0.72 0.16 235 / 0.6)"
            strokeWidth="1"
            ry={1}
          />
          {/* center axis */}
          <circle r="8" fill="oklch(0.78 0.2 220)" filter="url(#valveGlow)" />
          {/* ticks */}
          {Array.from({length:24}).map((_,i)=>{
            const a = (i*15) * Math.PI/180;
            const x1 = Math.cos(a)*170, y1 = Math.sin(a)*170;
            const x2 = Math.cos(a)*180, y2 = Math.sin(a)*180;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(1 0 0 / 0.2)" strokeWidth="1" />;
          })}
        </svg>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center px-6"
        >
          <p className="font-display text-2xl md:text-4xl font-extralight italic text-aqua text-balance max-w-3xl">
            "Controlar o fluxo é controlar toda a operação."
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/40"
        >
          Continue rolando
        </motion.div>
      </div>
    </section>
  );
}
