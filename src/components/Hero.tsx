import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import drone from "@/assets/drone.mp4.asset.json";

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
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ transform: `scale(1.1) translate(${pos.x * -15}px, ${pos.y * -15}px)` }}
        src={drone.url}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="space-y-8 max-w-4xl"
        >
          <div className="flex items-center gap-3 text-aqua text-xs uppercase tracking-[0.4em]">
            <span className="w-8 h-px bg-aqua" />
            Portfólio · 2026
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extralight leading-[1.05] text-balance">
            Por trás de grandes obras,<br/>
            <span className="text-aqua italic font-thin">existem grandes decisões.</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-xl font-light leading-relaxed">
            Participação em alguns dos maiores projetos de saneamento e infraestrutura do Brasil.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projetos" className="group relative px-10 py-4 bg-aqua text-primary-foreground uppercase tracking-[0.25em] text-xs font-medium overflow-hidden">
              <span className="relative z-10">Conheça os Projetos</span>
              <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity delay-200 uppercase tracking-[0.25em] text-xs font-medium">Conheça os Projetos</span>
            </a>
            <a href="#sobre" className="px-10 py-4 border border-foreground/20 text-foreground/80 uppercase tracking-[0.25em] text-xs hover:border-foreground/60 hover:text-foreground transition-colors">
              Sobre Flávio
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
