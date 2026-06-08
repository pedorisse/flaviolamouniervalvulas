import { motion } from "motion/react";
import { useRef } from "react";
import valve from "@/assets/valve.mp4.asset.json";
import presenter from "@/assets/presenter.mp4.asset.json";
import drone from "@/assets/drone.mp4.asset.json";
import heli from "@/assets/helicopter.mp4.asset.json";

const cards = [
  { t: "Funcionamento de válvulas borboleta", s: "Princípio mecânico", src: valve.url },
  { t: "Aplicação de PEAD em saneamento", s: "Campo e especificação", src: presenter.url },
  { t: "Obras de grande porte", s: "Escala e logística", src: drone.url },
  { t: "Usinas e infraestrutura", s: "Operação crítica", src: heli.url },
  { t: "Casos reais de instalação", s: "Visitas técnicas", src: presenter.url },
];

export function Knowledge() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="relative py-32 bg-deep grain overflow-hidden">
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-16">
        <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />Conhecimento de Campo
        </div>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance max-w-2xl">
            Autoridade construída <span className="italic text-aqua">na prática.</span>
          </h2>
          <div className="flex gap-2">
            <button onClick={() => ref.current?.scrollBy({ left: -400, behavior: "smooth" })} className="w-12 h-12 border border-border hover:border-aqua text-foreground/70 hover:text-aqua transition-colors">←</button>
            <button onClick={() => ref.current?.scrollBy({ left: 400, behavior: "smooth" })} className="w-12 h-12 border border-border hover:border-aqua text-foreground/70 hover:text-aqua transition-colors">→</button>
          </div>
        </div>
      </div>

      <div ref={ref} className="flex gap-6 overflow-x-auto px-6 md:px-16 snap-x snap-mandatory pb-8 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="snap-start shrink-0 w-[85vw] md:w-[420px] aspect-[3/4] relative overflow-hidden group cursor-pointer bg-card"
          >
            <video src={c.src} muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.4em] text-aqua">{c.s}</div>
              <div className="font-display text-2xl font-extralight leading-tight">{c.t}</div>
              <div className="pt-2 text-xs uppercase tracking-[0.3em] text-foreground/60 group-hover:text-aqua transition-colors">Assistir →</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
