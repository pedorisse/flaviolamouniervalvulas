import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import sao from "@/assets/project-saolourenco.jpg";
import santos from "@/assets/project-santos.jpg";
import biolab from "@/assets/project-biolab.jpg";
import guandu from "@/assets/project-guandu.jpg";

type Pin = { id: string; label: string; sub: string; x: number; y: number; img: string; desc: string; impact: string };

// Coordinates inside the SVG viewBox 0-500 / 0-600 (approximate Brazil silhouette)
const pins: Pin[] = [
  { id: "p1", label: "ETA São Lourenço", sub: "São Paulo", x: 305, y: 445, img: sao,
    desc: "Sistema produtor de larga escala para a Região Metropolitana de São Paulo.",
    impact: "Abastecimento para milhões de pessoas." },
  { id: "p2", label: "Travessia Santos–Guarujá", sub: "Litoral · SP", x: 315, y: 460, img: santos,
    desc: "Travessia subaquática em PEAD com método não destrutivo.",
    impact: "Conectividade hídrica entre cidades costeiras." },
  { id: "p3", label: "Biolab Farmacêutica", sub: "Pouso Alegre · MG", x: 330, y: 425, img: biolab,
    desc: "Infraestrutura crítica para operação farmacêutica.",
    impact: "Confiabilidade industrial 24/7." },
  { id: "p4", label: "ETA Guandu", sub: "Rio de Janeiro · RJ", x: 360, y: 440, img: guandu,
    desc: "A maior estação de tratamento de água potável do mundo.",
    impact: "Abastecimento de quase toda a região metropolitana do Rio." },
];

export function BrazilMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [active, setActive] = useState<Pin | null>(null);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 md:px-16 bg-deep grain overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }} viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-aqua" />Mapa das Grandes Obras
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-extralight leading-[1.05] text-balance">
            Projetos que ajudaram a <span className="italic text-aqua">movimentar o Brasil.</span>
          </h2>
          <p className="text-foreground/65 text-lg mt-6 font-light leading-relaxed max-w-2xl">
            Da infraestrutura hídrica ao setor industrial, cada projeto representa milhares de pessoas impactadas e décadas de operação.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 relative">
            <svg viewBox="0 0 500 600" className="w-full h-auto">
              <defs>
                <radialGradient id="brGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="oklch(0.25 0.05 240 / 0.6)" />
                  <stop offset="1" stopColor="oklch(0.13 0.02 250 / 0.2)" />
                </radialGradient>
                <filter id="pinGlow"><feGaussianBlur stdDeviation="4" /></filter>
              </defs>
              {/* Stylized Brazil silhouette */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
                d="M180 80 L240 70 L300 90 L340 130 L380 140 L420 180 L430 240 L420 300 L400 360 L380 420 L360 470 L330 510 L290 540 L250 545 L210 530 L180 490 L160 450 L150 400 L140 350 L130 300 L120 250 L130 200 L150 150 L170 110 Z"
                fill="url(#brGrad)"
                stroke="oklch(0.72 0.16 235 / 0.4)"
                strokeWidth="1"
              />
              {/* grid lines */}
              <g stroke="oklch(1 0 0 / 0.04)" strokeWidth="0.5">
                {Array.from({length:12}).map((_,i)=>(<line key={"h"+i} x1="0" y1={i*50} x2="500" y2={i*50} />))}
                {Array.from({length:10}).map((_,i)=>(<line key={"v"+i} x1={i*50} y1="0" x2={i*50} y2="600" />))}
              </g>
              {/* connections between pins */}
              {inView && pins.slice(0,-1).map((p, i) => (
                <motion.line
                  key={i}
                  x1={p.x} y1={p.y} x2={pins[i+1].x} y2={pins[i+1].y}
                  stroke="oklch(0.72 0.16 235 / 0.5)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 2 + i * 0.4 }}
                />
              ))}
              {/* pins */}
              {pins.map((p, i) => (
                <motion.g
                  key={p.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 + i * 0.5, type: "spring" }}
                  onClick={() => setActive(p)}
                  className="cursor-pointer"
                >
                  <circle cx={p.x} cy={p.y} r="14" fill="oklch(0.72 0.16 235 / 0.2)" filter="url(#pinGlow)" />
                  <circle cx={p.x} cy={p.y} r="6" fill="oklch(0.78 0.2 220)">
                    <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={p.x} cy={p.y} r="3" fill="white" />
                  <text x={p.x + 18} y={p.y + 4} fill="oklch(0.95 0.005 240)" fontSize="11" className="font-display" style={{ letterSpacing: "0.05em" }}>{p.label}</text>
                </motion.g>
              ))}
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-3">
            {pins.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActive(p)}
                className="w-full text-left group block p-5 border border-border hover:border-aqua/60 transition-colors bg-card/40"
              >
                <div className="flex items-start gap-4">
                  <div className="font-display text-3xl font-extralight text-aqua/70">0{i+1}</div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">{p.sub}</div>
                    <div className="font-display text-lg mt-1 group-hover:text-aqua transition-colors">{p.label}</div>
                    <div className="text-sm text-foreground/60 mt-2 font-light">{p.impact}</div>
                  </div>
                  <div className="text-aqua opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }} viewport={{ once: true }}
          className="mt-24 text-center space-y-4"
        >
          <p className="font-display text-2xl md:text-3xl font-extralight text-foreground/80 italic text-balance max-w-3xl mx-auto">
            "Grandes obras não são construídas apenas com concreto e aço."
          </p>
          <p className="font-display text-xl md:text-2xl font-extralight text-aqua text-balance">
            São construídas com decisões técnicas que permanecem por décadas.
          </p>
          <div className="font-display text-4xl md:text-5xl tracking-[0.4em] font-extralight pt-6">FLÁVIO</div>
        </motion.div>
      </div>

      {/* Side panel */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-end"
          onClick={() => setActive(null)}
        >
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl h-full bg-card overflow-y-auto"
          >
            <div className="relative aspect-[16/10]">
              <img src={active.img} alt={active.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 w-10 h-10 border border-border bg-background/60 backdrop-blur text-foreground/80 hover:text-aqua">×</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="text-aqua text-xs uppercase tracking-[0.4em]">{active.sub}</div>
              <h3 className="font-display text-3xl font-extralight">{active.label}</h3>
              <p className="text-foreground/70 leading-relaxed font-light">{active.desc}</p>
              <div className="border-t border-border pt-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mb-2">Impacto</div>
                <p className="text-aqua text-lg font-light italic">{active.impact}</p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </section>
  );
}
