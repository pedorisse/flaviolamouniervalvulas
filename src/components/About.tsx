import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import portraitAsset from "@/assets/flavio-portrait.jpg.asset.json";
const portrait = portraitAsset.url;

function Counter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("pt-BR") + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => { if (inView) animate(mv, value, { duration: 2.2, ease: "easeOut" }); }, [inView, value, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { v: 40, l: "Projetos Estratégicos" },
  { v: 25, l: "Obras de Infraestrutura" },
  { v: 60, l: "Sistemas de Saneamento" },
  { v: 120, l: "Aplicações Industriais" },
];

export function About() {
  return (
    <section id="sobre" className="relative py-32 md:py-48 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:col-span-5 relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={portrait} alt="Flávio Lamounier" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 border-l-2 border-aqua">
              <div className="text-aqua text-[10px] uppercase tracking-[0.4em] mb-1">Consultor de Negócios</div>
              <div className="font-display text-2xl">Flávio Lamounier</div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 border border-aqua/30 -z-10" />
        </motion.div>

        <div className="md:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-aqua" />Quem é Flávio
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance">
              Mais do que fornecer equipamentos.<br/>
              <span className="italic text-aqua">Conectar soluções.</span>
            </h2>
            <div className="mt-8 space-y-5 text-foreground/70 text-base md:text-lg font-light leading-relaxed max-w-2xl">
              <p>Uma trajetória construída dentro de canteiros, estações de tratamento e plantas industriais — onde decisões técnicas precisam permanecer por décadas.</p>
              <p>Participação direta em projetos que abastecem milhões de pessoas, atravessam canais, conectam cidades e sustentam operações críticas em ambientes farmacêuticos e industriais.</p>
              <p>Relacionamento técnico, escuta de campo e especificação correta — o ponto de encontro entre engenharia, fabricante e obra.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-px bg-border pt-8 mt-12 border-t border-border">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 md:p-8"
              >
                <div className="font-display text-4xl md:text-5xl font-extralight text-aqua">
                  <Counter value={s.v} />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 mt-2">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
