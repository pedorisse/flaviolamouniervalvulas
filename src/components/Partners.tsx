import { motion } from "motion/react";

const partners = [
  { name: "InterAtiva", role: "Válvulas industriais", desc: "Soluções aplicadas em projetos críticos de saneamento e indústria." },
  { name: "Politejo", role: "Tubulações PEAD", desc: "Sistemas em polietileno de alta densidade para infraestrutura hídrica." },
];

export function Partners() {
  return (
    <section className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mb-16"
      >
        <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />Parceiros & Soluções
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance">
          Tecnologias utilizadas em <span className="italic text-aqua">projetos relevantes.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-px bg-border">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="group relative bg-background p-10 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aqua/0 to-aqua/0 group-hover:from-aqua/5 group-hover:to-transparent transition-all duration-700" />
            <div className="relative space-y-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-aqua">{p.role}</div>
              <div className="font-display text-5xl md:text-6xl font-extralight tracking-tight">{p.name}</div>
              <p className="text-foreground/65 leading-relaxed font-light max-w-md">{p.desc}</p>
              <div className="pt-4 w-12 h-px bg-aqua group-hover:w-32 transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
