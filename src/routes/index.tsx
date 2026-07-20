import { createFileRoute } from "@tanstack/react-router";
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
