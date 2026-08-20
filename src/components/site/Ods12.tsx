import { useState } from "react";
import { ChevronDown, Globe2 } from "lucide-react";

const metas = [
  {
    code: "12.2",
    title: "Uso eficiente dos recursos naturais",
    text: "Até 2030, alcançar a gestão sustentável e o uso eficiente dos recursos naturais. Reduzir é exatamente isso: extrair menos para viver bem.",
  },
  {
    code: "12.3",
    title: "Metade do desperdício de alimentos",
    text: "Reduzir pela metade o desperdício de alimentos per capita, incluindo perdas ao longo da cadeia de produção. Planejar compras e aproveitar integralmente os alimentos é ação direta nessa meta.",
  },
  {
    code: "12.5",
    title: "Reduzir a geração de resíduos",
    text: "Diminuir substancialmente a geração de resíduos por meio da prevenção, redução, reciclagem e reutilização — os 3 Rs escritos dentro da ODS.",
  },
  {
    code: "12.6",
    title: "Empresas mais responsáveis",
    text: "Incentivar empresas a adotar práticas sustentáveis e a divulgar essas informações. Como consumidor, sua escolha pressiona a produção.",
  },
  {
    code: "12.8",
    title: "Informação e consciência",
    text: "Garantir que as pessoas tenham informação e consciência sobre desenvolvimento sustentável e estilos de vida em harmonia com a natureza.",
  },
];

export function Ods12() {
  const [open, setOpen] = useState<string | null>("12.5");

  return (
    <section id="ods12" className="relative scroll-mt-24 overflow-hidden gradient-deep py-24 text-moss-foreground">
      <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-lime/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-moss-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Globe2 className="size-3.5" /> Agenda 2030
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold md:text-5xl">
            ODS 12: consumo e produção responsáveis
          </h2>
          <p className="mt-5 text-moss-foreground/80">
            O 12º Objetivo de Desenvolvimento Sustentável da ONU busca garantir padrões de produção e
            de consumo sustentáveis: produzir mais e melhor usando menos recursos, e consumir de
            forma que não comprometa as próximas gerações.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { k: "17", v: "objetivos na Agenda 2030" },
              { k: "11", v: "metas dentro da ODS 12" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-moss-foreground/10 p-5">
                <p className="font-display text-3xl font-semibold text-lime">{s.k}</p>
                <p className="mt-1 text-sm text-moss-foreground/80">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid size-28 place-items-center rounded-3xl bg-clay text-clay-foreground shadow-lift">
            <span className="font-display text-5xl font-bold">12</span>
          </div>
        </div>

        <div className="reveal space-y-3">
          {metas.map((m) => {
            const isOpen = open === m.code;
            return (
              <div
                key={m.code}
                className={`overflow-hidden rounded-3xl border transition-colors ${
                  isOpen ? "border-lime/50 bg-moss-foreground/12" : "border-moss-foreground/15 bg-moss-foreground/5"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : m.code)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span className="rounded-xl bg-lime px-3 py-1 font-display text-sm font-bold text-lime-foreground">
                    {m.code}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold">{m.title}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <p className="overflow-hidden px-5 pb-5 text-sm leading-relaxed text-moss-foreground/85">
                    {m.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
