import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { TopBar } from "@/components/site/TopBar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ThreeRs } from "@/components/site/ThreeRs";
import { SortGame } from "@/components/site/SortGame";
import { Impact } from "@/components/site/Impact";
import { Habits } from "@/components/site/Habits";
import { Ods12 } from "@/components/site/Ods12";
import { Quiz } from "@/components/site/Quiz";
import { Footer } from "@/components/site/Footer";

const title = "CicloVivo — Reduzir, Reutilizar e Reciclar com a ODS 12";
const description =
  "Site interativo para aprender os 3 Rs na prática: jogo da coleta seletiva, calculadora de impacto, quiz e as metas da ODS 12 da ONU.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  return (
    <main>
      <TopBar />
      <Hero />
      <Marquee />
      <ThreeRs />
      <SortGame />
      <Impact />
      <Habits />
      <Ods12 />
      <Quiz />
      <Footer />
    </main>
  );
}
