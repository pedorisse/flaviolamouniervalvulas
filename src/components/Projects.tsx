import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import sao from "@/assets/project-saolourenco.jpg";
import guandu from "@/assets/project-guandu.jpg";
import saoVideo from "@/assets/eta-saolourenco.mp4.asset.json";
import guanduVideo from "@/assets/eta-guandu.mp4.asset.json";

type P = { n: string; title: string; loc: string; img: string; video?: string; headline: string; body: string; tags: string[] };

const projects: P[] = [
  { n: "01", title: "ETA São Lourenço", loc: "São Paulo · SP", img: sao, video: saoVideo.url,
    headline: "Uma das maiores obras de saneamento da história do Brasil.",
    body: "Sistema produtor responsável pelo abastecimento de milhões de pessoas na região metropolitana de São Paulo. Infraestrutura crítica operando continuamente.",
    tags: ["Saneamento", "Captação", "Tratamento", "Distribuição"] },
  { n: "02", title: "ETA Guandu", loc: "Rio de Janeiro · RJ", img: guandu, video: guanduVideo.url,
    headline: "A maior estação de tratamento de água potável do mundo.",
    body: "Escala monumental e controle operacional em um dos sistemas hídricos mais importantes do planeta.",
    tags: ["Tratamento", "Escala", "Confiabilidade"] },
];

function ProjectPanel({ p, idx }: { p: P; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const reverse = idx % 2 === 1;

  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-24 px-6 md:px-16 overflow-hidden">
      <div className={`relative grid md:grid-cols-12 gap-10 md:gap-20 max-w-7xl mx-auto w-full items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
        <motion.div style={{ y, opacity }} className={`md:col-span-8 relative ${reverse ? "md:order-2" : ""}`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            {p.video ? (
              <video src={p.video} className="w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label={p.title} />
            ) : (
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 font-display text-7xl md:text-9xl font-extralight text-foreground/90 mix-blend-overlay">{p.n}</div>
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
      {projects.map((p, i) => <ProjectPanel key={p.n} p={p} idx={i} />)}
    </section>
  );
}
