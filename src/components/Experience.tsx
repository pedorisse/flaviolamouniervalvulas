import { motion } from "motion/react";
import { useState } from "react";
import saneamento from "@/assets/exp-saneamento.jpg.asset.json";
import industria from "@/assets/exp-industria.jpg.asset.json";
import travessias from "@/assets/exp-travessias.jpg.asset.json";
import hidrica from "@/assets/exp-hidrica.jpg.asset.json";

const panels = [
  {
    n: "01",
    title: "Saneamento",
    desc: "Captação, tratamento e distribuição de água para milhões de pessoas.",
    img: saneamento.url,
  },
  {
    n: "02",
    title: "Indústria",
    desc: "Processos críticos que exigem confiabilidade contínua.",
    img: industria.url,
  },
  {
    n: "03",
    title: "Travessias Especiais",
    desc: "Projetos complexos executados com métodos não destrutivos.",
    img: travessias.url,
  },
  {
    n: "04",
    title: "Infraestrutura Hídrica",
    desc: "Sistemas responsáveis por movimentar grandes volumes de água diariamente.",
    img: hidrica.url,
  },
];

export function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experiencia" className="relative py-32 md:py-48 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-16 md:mb-24 max-w-3xl"
      >
        <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />Onde minha experiência é aplicada
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance mb-6">
          Infraestruturas diferentes. <span className="italic text-aqua">A mesma responsabilidade.</span>
        </h2>
        <p className="text-foreground/60 text-base md:text-lg font-light leading-relaxed">
          Da água que abastece cidades inteiras aos processos que mantêm indústrias em operação.
        </p>
      </motion.div>

      {/* Desktop: interactive horizontal expanding panels */}
      <div
        className="hidden md:flex w-full h-[560px] gap-3"
        onMouseLeave={() => setActive(0)}
      >
        {panels.map((p, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={p.n}
              onMouseEnter={() => setActive(i)}
              animate={{ flexGrow: isActive ? 4 : 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden cursor-pointer border border-border min-w-0"
              style={{ flexBasis: 0 }}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out"
                style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.35) 60%, rgba(5,10,20,0.4) 100%)"
                    : "linear-gradient(to top, rgba(5,10,20,0.85) 0%, rgba(5,10,20,0.75) 100%)",
                }}
              />

              {/* Active blue border line */}
              {isActive && (
                <>
                  <motion.span
                    layoutId="exp-border-top"
                    className="absolute top-0 left-0 right-0 h-px bg-aqua"
                  />
                  <motion.span
                    layoutId="exp-border-bottom"
                    className="absolute bottom-0 left-0 right-0 h-px bg-aqua"
                  />
                  <motion.span
                    layoutId="exp-border-left"
                    className="absolute top-0 bottom-0 left-0 w-px bg-aqua"
                  />
                  <motion.span
                    layoutId="exp-border-right"
                    className="absolute top-0 bottom-0 right-0 w-px bg-aqua"
                  />
                </>
              )}

              <div className="absolute top-6 left-6 text-aqua text-[10px] uppercase tracking-[0.4em]">
                {p.n}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div
                  className="h-px bg-aqua mb-5 transition-all duration-700"
                  style={{ width: isActive ? "80px" : "32px" }}
                />
                <h3
                  className={`font-display font-light leading-tight transition-all duration-500 ${
                    isActive ? "text-3xl lg:text-4xl mb-4" : "text-xl mb-0"
                  }`}
                  style={{
                    writingMode: isActive ? "horizontal-tb" : "horizontal-tb",
                  }}
                >
                  {p.title}
                </h3>
                <motion.p
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: isActive ? 0.25 : 0 }}
                  className="text-foreground/75 text-sm font-light leading-relaxed max-w-md"
                >
                  {p.desc}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden flex flex-col gap-5">
        {panels.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            className="relative overflow-hidden border border-border aspect-[4/5]"
          >
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
            <div className="absolute top-5 left-5 text-aqua text-[10px] uppercase tracking-[0.4em]">
              {p.n}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="w-10 h-px bg-aqua mb-4" />
              <h3 className="font-display text-2xl font-light mb-3 leading-tight">
                {p.title}
              </h3>
              <p className="text-foreground/70 text-sm font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
