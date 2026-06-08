import { useState } from "react";
import { motion } from "motion/react";
import saneamentoAsset from "@/assets/exp-saneamento.jpg.asset.json";
import industriaAsset from "@/assets/exp-industria.jpg.asset.json";
import travessiaAsset from "@/assets/exp-travessia.jpg.asset.json";
import hidricaAsset from "@/assets/exp-hidrica.jpg.asset.json";

const panels = [
  {
    n: "01",
    title: "Saneamento",
    desc: "Atuação em estações de tratamento de água e esgoto, garantindo controle de fluxo em sistemas críticos.",
    tags: ["ETA", "ETE", "Controle de Fluxo"],
    img: saneamentoAsset.url,
  },
  {
    n: "02",
    title: "Indústria",
    desc: "Válvulas e soluções aplicadas em plantas industriais de alta exigência operacional.",
    tags: ["Válvulas", "Processo", "Alta Pressão"],
    img: industriaAsset.url,
  },
  {
    n: "03",
    title: "Travessias Especiais",
    desc: "Engenharia em travessias subaquáticas e obras de grande complexidade, como Santos–Guarujá.",
    tags: ["Subaquática", "PEAD", "Lastro"],
    img: travessiaAsset.url,
  },
  {
    n: "04",
    title: "Infraestrutura Hídrica",
    desc: "Adutoras e sistemas de transporte de água em larga escala para abastecimento estratégico.",
    tags: ["Adutoras", "Abastecimento", "Larga Escala"],
    img: hidricaAsset.url,
  },
];

export function ExperienceAreas() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="experiencia" className="relative py-32 md:py-48 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="px-6 md:px-16 max-w-7xl mx-auto mb-16 md:mb-24"
      >
        <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />Onde minha experiência é aplicada
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance max-w-3xl">
          Quatro frentes, <span className="italic text-aqua">uma só engenharia.</span>
        </h2>
      </motion.div>

      <div
        className="flex flex-col md:flex-row w-full h-auto md:h-[640px] overflow-hidden border-y border-border"
        onMouseLeave={() => setActive(null)}
      >
        {panels.map((p, i) => {
          const isActive = active === i;
          const anyActive = active !== null;
          const flex = isActive ? 3 : anyActive ? 0.7 : 1;

          return (
            <motion.article
              key={p.n}
              onMouseEnter={() => setActive(i)}
              animate={{ flexGrow: flex }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-1 h-80 md:h-full overflow-hidden cursor-pointer border-r border-border last:border-r-0 group"
              style={{ flexBasis: 0 }}
            >
              <motion.img
                src={p.img}
                alt={p.title}
                loading="lazy"
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
              <motion.div
                animate={{ opacity: isActive ? 0.15 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-aqua to-transparent"
              />

              <div className="absolute top-6 left-6 text-aqua text-[10px] uppercase tracking-[0.4em]">
                {p.n}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <motion.div
                  animate={{ width: isActive ? 80 : 32 }}
                  transition={{ duration: 0.6 }}
                  className="h-px bg-aqua mb-5"
                />
                <h3 className="font-display text-2xl md:text-3xl font-light mb-3 leading-tight">
                  {p.title}
                </h3>

                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: isActive ? 0.15 : 0 }}
                  className="space-y-4"
                >
                  <p className="text-foreground/70 text-sm font-light leading-relaxed max-w-sm">
                    {p.desc}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="text-[10px] uppercase tracking-[0.25em] text-aqua/90 border border-aqua/30 px-3 py-1"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
