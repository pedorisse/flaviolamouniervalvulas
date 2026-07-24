import { motion } from "motion/react";
import horizon from "@/assets/horizon-pipe.jpg";

export function FinalCTA() {
  return (
    <section className="relative h-[100vh] min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      <img src={horizon} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center max-w-5xl px-6 space-y-10 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }} viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight text-balance drop-shadow-lg"
        >
          A solução certa começa com a especificação correta.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }} viewport={{ once: true }}
          className="font-body text-lg md:text-2xl text-foreground/90 font-light text-balance max-w-3xl leading-relaxed drop-shadow"
        >
          Válvulas industriais para saneamento, ETA, ETE e aplicações críticas. Vamos discutir a solução mais adequada para o seu projeto.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }} viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 pt-6"
        >
          <a
            href="https://wa.me/5511983894242?text=Ol%C3%A1%2C%20Fl%C3%A1vio.%20Tenho%20interesse%20em%20uma%20solu%C3%A7%C3%A3o%20com%20v%C3%A1lvulas."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar uma reunião técnica com Flávio Lamounier pelo WhatsApp"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-aqua text-primary-foreground uppercase tracking-[0.25em] text-xs font-medium overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Agendar uma Reunião Técnica</span>
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity delay-200 uppercase tracking-[0.25em] text-xs font-medium">Agendar uma Reunião Técnica</span>
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
