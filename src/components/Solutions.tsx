import { motion } from "motion/react";
import valvesAsset from "@/assets/solution-valves.png.asset.json";
import peadAsset from "@/assets/solution-pead.png.asset.json";
import projectsAsset from "@/assets/solution-projects.jpg.asset.json";

const cards = [
  {
    n: "01",
    title: "Válvulas Industriais",
    desc: "Soluções para saneamento, ETA, ETE, indústria e sistemas críticos de controle de fluxo.",
    img: valvesAsset.url,
  },
  {
    n: "02",
    title: "Tubulações PEAD",
    desc: "Sistemas para adutoras, travessias especiais, abastecimento de água e infraestrutura hídrica.",
    img: peadAsset.url,
  },
  {
    n: "03",
    title: "Grandes Projetos",
    desc: "Participação em obras estratégicas de saneamento, infraestrutura e aplicações industriais.",
    img: projectsAsset.url,
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative py-32 md:py-48 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-16 md:mb-24"
      >
        <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />Soluções em Campo
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance max-w-3xl">
          Onde a engenharia <span className="italic text-aqua">encontra a obra.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((c, i) => (
          <motion.article
            key={c.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="group relative overflow-hidden border border-border bg-card/40 cursor-default"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-aqua/0 via-transparent to-aqua/0 group-hover:from-aqua/10 transition-colors duration-700" />

              <div className="absolute top-5 left-5 text-aqua text-[10px] uppercase tracking-[0.4em]">
                {c.n}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="w-10 h-px bg-aqua mb-5 transition-all duration-500 group-hover:w-20" />
                <h3 className="font-display text-2xl md:text-3xl font-light mb-3 leading-tight">
                  {c.title}
                </h3>
                <p className="text-foreground/70 text-sm font-light leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
