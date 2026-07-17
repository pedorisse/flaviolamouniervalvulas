import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import sao from "@/assets/project-saolourenco.jpg";
import guandu from "@/assets/project-guandu.jpg";
import saoVideo from "@/assets/eta-saolourenco.mp4.asset.json";
import guanduVideo from "@/assets/eta-guandu.mp4.asset.json";
import saoDemo from "@/assets/eta-saolourenco-final.mp4.asset.json";
import guanduDemo from "@/assets/eta-guandu-demo.mp4.asset.json";

type P = {
  n: string;
  title: string;
  loc: string;
  img: string;
  video?: string;
  demoVideo?: string;
  headline: string;
  body: string;
  tags: string[];
};

const projects: P[] = [
  { n: "01", title: "ETA São Lourenço", loc: "São Paulo · SP", img: sao, video: saoVideo.url, demoVideo: saoDemo.url,
    headline: "Uma das maiores obras de saneamento da história do Brasil.",
    body: "Sistema produtor responsável pelo abastecimento de milhões de pessoas na região metropolitana de São Paulo. Infraestrutura crítica operando continuamente.",
    tags: ["Saneamento", "Captação", "Tratamento", "Distribuição"] },
  { n: "02", title: "ETA Guandu", loc: "Rio de Janeiro · RJ", img: guandu, video: guanduVideo.url, demoVideo: guanduDemo.url,
    headline: "A maior estação de tratamento de água potável do mundo.",
    body: "Escala monumental e controle operacional em um dos sistemas hídricos mais importantes do planeta.",
    tags: ["Tratamento", "Escala", "Confiabilidade"] },
];

function ProjectPanel({ p, idx, onOpenDemo }: { p: P; idx: number; onOpenDemo: (src: string, title: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const reverse = idx % 2 === 1;
  const hasDemo = !!p.demoVideo;

  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-24 px-6 md:px-16 overflow-hidden">
      <div className={`relative grid md:grid-cols-12 gap-10 md:gap-20 max-w-7xl mx-auto w-full items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
        <motion.div style={{ y, opacity }} className={`md:col-span-8 relative ${reverse ? "md:order-2" : ""}`}>
          <div
            className={`relative aspect-[16/10] overflow-hidden group ${hasDemo ? "cursor-pointer" : ""}`}
            onClick={hasDemo ? () => onOpenDemo(p.demoVideo!, p.title) : undefined}
            role={hasDemo ? "button" : undefined}
            tabIndex={hasDemo ? 0 : undefined}
            onKeyDown={hasDemo ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenDemo(p.demoVideo!, p.title); } } : undefined}
            aria-label={hasDemo ? `Ver demonstração de ${p.title}` : undefined}
          >
            {p.video ? (
              <video
                src={p.video}
                className={`w-full h-full object-cover transition-all duration-[400ms] ${hasDemo ? "group-hover:brightness-105 group-hover:scale-[1.01]" : ""}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={p.title}
              />
            ) : (
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-6 left-6 font-display text-7xl md:text-9xl font-extralight text-foreground/90 mix-blend-overlay pointer-events-none">{p.n}</div>

            {hasDemo && (
              <>
                {/* Pulsing center play icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
                    <span className="absolute inset-0 rounded-full bg-aqua/20 animate-ping" />
                    <span className="absolute inset-2 rounded-full bg-background/40 backdrop-blur-sm border border-white/30" />
                    <svg viewBox="0 0 24 24" className="relative w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>

              </>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`md:col-span-4 space-y-6 ${reverse ? "md:order-1" : ""}`}
        >
          <div className="flex items-center gap-4 text-aqua text-[10px] uppercase tracking-[0.4em]">
            <span className="font-display text-2xl text-aqua/60 font-light">{p.n}</span>
            <span className="w-8 h-px bg-aqua" />
            {p.loc}
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-extralight leading-tight text-balance">{p.title}</h3>
          <p className="text-aqua/90 text-lg md:text-xl italic font-light text-balance">{p.headline}</p>
          <p className="text-foreground/65 leading-relaxed font-light">{p.body}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {p.tags.map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 border border-border text-foreground/60">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Projects() {
  const [demo, setDemo] = useState<{ src: string; title: string } | null>(null);
  const [isVertical, setIsVertical] = useState(false);

  return (
    <section id="projetos" className="relative bg-deep grain">
      <div className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-aqua" />Trajetória
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-extralight leading-[1.05] text-balance">
            Obras que <span className="italic text-aqua">marcaram</span> minha trajetória.
          </h2>
        </motion.div>
      </div>
      {projects.map((p, i) => (
        <ProjectPanel key={p.n} p={p} idx={i} onOpenDemo={(src, title) => { setIsVertical(false); setDemo({ src, title }); }} />
      ))}

      <AnimatePresence>
        {demo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center gap-4 max-w-[95vw]"
            >
              <div className="flex items-center justify-center bg-black border border-aqua/30 overflow-hidden">
                <video
                  src={demo.src}
                  controls
                  autoPlay
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    setIsVertical(v.videoHeight > v.videoWidth);
                  }}
                  className="block object-contain"
                  style={
                    isVertical
                      ? { maxHeight: "85vh", maxWidth: "min(90vw, 480px)" }
                      : { maxHeight: "85vh", maxWidth: "90vw" }
                  }
                />
              </div>
              <div className="w-full bg-card border border-border p-5 flex items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-aqua">Demonstração</div>
                  <div className="font-display text-xl mt-1">{demo.title}</div>
                </div>
                <button
                  onClick={() => setDemo(null)}
                  className="px-4 py-2 border border-border text-xs uppercase tracking-[0.3em] hover:border-aqua shrink-0"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
