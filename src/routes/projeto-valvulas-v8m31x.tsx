import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Knowledge } from "@/components/Knowledge";
import { Partners } from "@/components/Partners";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/projeto-valvulas-v8m31x")({
  head: () => ({
    meta: [
      { title: "Flávio Lamounier · Especialista em Válvulas Industriais" },
      {
        name: "description",
        content:
          "Especialista em válvulas industriais aplicadas em saneamento, ETA, ETE e sistemas críticos de controle de fluxo.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow, noarchive" },
      {
        property: "og:title",
        content: "Flávio Lamounier · Válvulas Industriais para Sistemas Críticos",
      },
      {
        property: "og:description",
        content:
          "Autoridade em válvulas industriais para saneamento, ETA, ETE e controle de fluxo.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProjetoValvulasPage,
});

function ProjetoValvulasPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Hero />
      <About />
      <Projects />
      <Knowledge />
      <Partners />
      <FinalCTA />
    </main>
  );
}
