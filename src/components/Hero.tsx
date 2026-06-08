import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import drone from "@/assets/site-hero.mp4.asset.json";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setPos({ x: (e.clientX - r.width/2) / r.width, y: (e.clientY - r.height/2) / r.height });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover md:object-[center_15%] scale-110"
        style={{ transform: `scale(1.1) translate(${pos.x * -15}px, ${pos.y * -15}px)` }}
        src={drone.url}
      />
      {/* Dark overlay for legibility — stronger at edges */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="space-y-8 max-w-4xl translate-y-[15vh]"
        >
          <div className="flex items-center gap-3 text-aqua text-xs uppercase tracking-[0.4em]">
            <span className="relative w-8 h-px bg-aqua overflow-hidden">
              <span className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-aqua animate-travel-line" />
            </span>
            Portfólio · 2026
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.05] text-balance text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            As soluções por trás das <span className="text-aqua italic font-thin">maiores obras de infraestrutura</span> do Brasil.
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl font-light leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Especialista em válvulas industriais e tubulações PEAD aplicadas em sistemas de saneamento, indústria e grandes projetos de engenharia.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projetos" className="group relative px-10 py-4 bg-aqua text-primary-foreground uppercase tracking-[0.25em] text-xs font-medium overflow-hidden">
              <span className="relative z-10">Ver Projetos</span>
              <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity delay-200 uppercase tracking-[0.25em] text-xs font-medium">Ver Projetos</span>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/40 text-[10px] uppercase tracking-[0.4em] scroll-hint"
      >
        Scroll
      </motion.div>
    </section>
  );
}
