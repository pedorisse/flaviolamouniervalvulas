import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import valve from "@/assets/valve.mp4.asset.json";
import presenter from "@/assets/presenter.mp4.asset.json";
import drone from "@/assets/drone.mp4.asset.json";
import heli from "@/assets/helicopter.mp4.asset.json";

const filters = ["Todos", "Vídeos", "Visitas Técnicas", "Válvulas", "Tubulações PEAD", "Obras"] as const;
type F = typeof filters[number];

const items = [
  { id: 1, title: "Operação de válvula borboleta", cat: ["Vídeos", "Válvulas"] as F[], src: valve.url },
  { id: 2, title: "Conhecimento de campo", cat: ["Vídeos", "Visitas Técnicas"] as F[], src: presenter.url },
  { id: 3, title: "Drone · obra de saneamento", cat: ["Vídeos", "Obras"] as F[], src: drone.url },
  { id: 4, title: "Aproximação aérea · usina", cat: ["Vídeos", "Obras"] as F[], src: heli.url },
  { id: 5, title: "Inspeção em válvula DN200", cat: ["Vídeos", "Válvulas", "Visitas Técnicas"] as F[], src: valve.url },
  { id: 6, title: "Visita técnica · tubulação PEAD", cat: ["Vídeos", "Tubulações PEAD", "Visitas Técnicas"] as F[], src: presenter.url },
];

export function Gallery() {
  const [f, setF] = useState<F>("Todos");
  const [open, setOpen] = useState<typeof items[0] | null>(null);
  const filtered = f === "Todos" ? items : items.filter(i => i.cat.includes(f));

  return (
    <section className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-2xl">
          <div className="text-aqua text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-aqua" />Galeria Técnica
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extralight leading-tight text-balance">
            Conteúdo produzido <span className="italic text-aqua">em campo.</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(x => (
            <button key={x} onClick={() => setF(x)}
              className={`text-[10px] uppercase tracking-[0.3em] px-4 py-2 border transition-colors ${f === x ? "border-aqua text-aqua bg-aqua/5" : "border-border text-foreground/50 hover:text-foreground"}`}>
              {x}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((it, i) => (
            <motion.button
              layout key={it.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setOpen(it)}
              className="group relative aspect-video overflow-hidden bg-card border border-border"
            >
              <video src={it.src} muted playsInline loop
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute top-4 right-4 w-12 h-12 border border-aqua/60 flex items-center justify-center text-aqua bg-background/30 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">▶</div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-aqua">{it.cat[0]}</div>
                <div className="font-display text-lg mt-1">{it.title}</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-card border border-aqua/30"
            >
              <video src={open.src} controls autoPlay className="w-full aspect-video object-cover" />
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-aqua">{open.cat.join(" · ")}</div>
                  <div className="font-display text-xl mt-1">{open.title}</div>
                </div>
                <button onClick={() => setOpen(null)} className="px-4 py-2 border border-border text-xs uppercase tracking-[0.3em] hover:border-aqua">Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
