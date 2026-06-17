import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Knowledge } from "@/components/Knowledge";
import { Partners } from "@/components/Partners";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flávio Lamounier · Especialista em Válvulas Industriais" },
      { name: "description", content: "Especialista em válvulas industriais aplicadas em saneamento, ETA, ETE e sistemas críticos de controle de fluxo. Trajetória em grandes obras como ETA São Lourenço e ETA Guandu." },
      { property: "og:title", content: "Flávio Lamounier · Válvulas Industriais para Sistemas Críticos" },
      { property: "og:description", content: "Autoridade em válvulas industriais para saneamento, ETA, ETE e controle de fluxo." },
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
          <Projects />
          <Knowledge />
          <Partners />
          <FinalCTA />
        </motion.div>
      )}
    </main>
  );
}
