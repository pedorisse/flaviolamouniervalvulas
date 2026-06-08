import { motion } from "motion/react";
import horizon from "@/assets/horizon-pipe.jpg";

export function FinalCTA() {
  return (
    <section className="relative h-[100vh] min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      <img src={horizon} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

      <div className="relative z-10 text-center max-w-4xl px-6 space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }} viewport={{ once: true }}
          className="font-display text-4xl md:text-7xl font-extralight leading-tight text-balance"
        >
          Infraestrutura não aparece para a maioria das pessoas.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }} viewport={{ once: true }}
          className="font-display text-2xl md:text-4xl text-aqua italic font-extralight text-balance"
        >
          Mas ela move cidades inteiras.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }} viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 pt-8"
        >
          <a href="#" className="group relative px-10 py-4 bg-aqua text-primary-foreground uppercase tracking-[0.25em] text-xs font-medium overflow-hidden">
            <span className="relative z-10">Falar com Flávio</span>
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity delay-200 uppercase tracking-[0.25em] text-xs font-medium">Falar com Flávio</span>
          </a>
          <a href="#projetos" className="px-10 py-4 border border-foreground/30 text-foreground uppercase tracking-[0.25em] text-xs hover:border-aqua hover:text-aqua transition-colors">
            Ver Portfólio Completo
          </a>
        </motion.div>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-6 md:px-16 text-[10px] uppercase tracking-[0.4em] text-foreground/40">
        <div>Flávio · Portfólio 2026</div>
        <div>Engenharia · Infraestrutura · Saneamento</div>
      </footer>
    </section>
  );
}
