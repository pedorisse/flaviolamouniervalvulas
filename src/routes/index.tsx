import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Solutions } from "@/components/Solutions";
import { Projects } from "@/components/Projects";


import { Knowledge } from "@/components/Knowledge";
import { ValveScroll } from "@/components/ValveScroll";
import { Partners } from "@/components/Partners";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flávio Lamounier · Consultor de Negócios em Válvulas Industriais e Tubulações PEAD" },
      { name: "description", content: "Portfólio digital de autoridade. Participação em grandes projetos de saneamento, infraestrutura e indústria no Brasil — ETA São Lourenço, Travessia Santos–Guarujá, Biolab, ETA Guandu." },
      { property: "og:title", content: "Flávio · Portfólio de Engenharia & Infraestrutura" },
      { property: "og:description", content: "Por trás de grandes obras, existem grandes decisões. Conheça a trajetória." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "auto" : "hidden";
  }, [entered]);

  return (
    <main className="bg-background text-foreground">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <LoadingScreen onEnter={() => { setLoading(false); setTimeout(() => setEntered(true), 100); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <Hero />
          <About />
          <Solutions />
          <Projects />
          
          
          <Knowledge />
          <ValveScroll />
          <Partners />
          <FinalCTA />
        </motion.div>
      )}
    </main>
  );
}
