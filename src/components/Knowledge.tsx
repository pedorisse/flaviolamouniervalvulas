import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import valve from "@/assets/valve.mp4.asset.json";
import presenter from "@/assets/presenter.mp4.asset.json";
import drone from "@/assets/drone.mp4.asset.json";
import heli from "@/assets/helicopter.mp4.asset.json";

const filters = [
  "Todos",
  "Válvulas Industriais",
  "Tubulações PEAD",
  "Visitas Técnicas",
  "Obras",
  "Saneamento",
  "Indústria",
] as const;
type F = typeof filters[number];

const items: { id: number; title: string; subtitle: string; cat: F[]; src: string }[] = [
  { id: 1, title: "Funcionamento de válvulas borboleta", subtitle: "Princípio mecânico", cat: ["Válvulas Industriais", "Indústria"], src: valve.url },
  { id: 2, title: "Aplicação de PEAD em saneamento", subtitle: "Campo e especificação", cat: ["Tubulações PEAD", "Saneamento"], src: presenter.url },
  { id: 3, title: "Obras de grande porte", subtitle: "Escala e logística", cat: ["Obras", "Saneamento"], src: drone.url },
  { id: 4, title: "Usinas e infraestrutura", subtitle: "Operação crítica", cat: ["Obras", "Indústria"], src: heli.url },
  { id: 5, title: "Casos reais de instalação", subtitle: "Visitas técnicas", cat: ["Visitas Técnicas", "Válvulas Industriais"], src: presenter.url },
  { id: 6, title: "Inspeção em válvula DN200", subtitle: "Visita técnica", cat: ["Visitas Técnicas", "Válvulas Industriais", "Indústria"], src: valve.url },
  { id: 7, title: "Drone · obra de saneamento", subtitle: "Aérea técnica", cat: ["Obras", "Saneamento"], src: drone.url },
  { id: 8, title: "Visita técnica · tubulação PEAD", subtitle: "Acompanhamento", cat: ["Visitas Técnicas", "Tubulações PEAD"], src: presenter.url },
];

export function Knowledge() {
  const [f, setF] = useState<F>("Todos");
  const [open, setOpen] = useState<typeof items[0] | null>(null);
  const filtered = f === "Todos" ? items : items.filter((i) => i.cat.includes(f));

  return (
    <section className="relative py-32 bg-deep grain overflow-hidden">
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12">
        <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-aqua" />Conhecimento de Campo
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance max-w-2xl">
          Autoridade construída <span className="italic text-aqua">na prática.</span>
        </h2>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => setF(x)}
              className={`text-[10px] uppercase tracking-[0.3em] px-4 py-2 border transition-colors ${
                f === x
                  ? "border-aqua text-aqua bg-aqua/5"
                  : "border-border text-foreground/50 hover:text-foreground"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => (
              <motion.button
                layout
                key={it.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpen(it)}
                className="group relative aspect-[4/5] overflow-hidden bg-card border border-border hover:border-aqua/60 transition-colors text-left"
              >
                <video
                  src={it.src}
                  muted
                  playsInline
                  loop
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 border border-aqua/60 flex items-center justify-center text-aqua bg-background/30 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  ▶
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-aqua">{it.subtitle}</div>
                  <div className="font-display text-xl md:text-2xl font-extralight leading-tight">{it.title}</div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {it.cat.slice(0, 2).map((c) => (
                      <span key={c} className="text-[9px] uppercase tracking-[0.25em] text-foreground/50 border border-border px-2 py-0.5">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-card border border-aqua/30"
            >
              <video src={open.src} controls autoPlay className="w-full aspect-video object-cover" />
              <div className="p-6 flex items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-aqua">{open.cat.join(" · ")}</div>
                  <div className="font-display text-xl mt-1">{open.title}</div>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="px-4 py-2 border border-border text-xs uppercase tracking-[0.3em] hover:border-aqua"
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
