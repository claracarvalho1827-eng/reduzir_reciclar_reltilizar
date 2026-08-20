import { useState } from "react";
import { Recycle, RefreshCw, TrendingDown } from "lucide-react";

const rs = [
  {
    id: "reduzir",
    title: "Reduzir",
    order: "1º passo",
    icon: TrendingDown,
    tone: "leaf",
    pitch: "Consumir menos e melhor é o R mais poderoso: evita o resíduo antes que ele exista.",
    actions: [
      "Faça lista antes de comprar e evite o excesso por impulso",
      "Prefira produtos a granel e com menos embalagem",
      "Leve sacola, garrafa e pote reutilizáveis",
      "Planeje refeições para reduzir desperdício de alimentos",
    ],
    impact: "Cada 1 kg de comida não desperdiçada evita ~2,5 kg de CO₂e.",
  },
  {
    id: "reutilizar",
    title: "Reutilizar",
    order: "2º passo",
    icon: RefreshCw,
    tone: "lime",
    pitch: "Antes de descartar, pergunte: isso ainda pode servir para alguma coisa?",
    actions: [
      "Potes de vidro viram organizadores, copos e porta-temperos",
      "Conserte roupas, eletrônicos e móveis em vez de trocar",
      "Doe, troque ou venda o que você não usa mais",
      "Use papel dos dois lados e caixas como divisórias",
    ],
    impact: "Reutilizar um item por 9 meses a mais reduz sua pegada em até 30%.",
  },
  {
    id: "reciclar",
    title: "Reciclar",
    order: "3º passo",
    icon: Recycle,
    tone: "water",
    pitch: "O último recurso: transformar o material descartado em matéria-prima nova.",
    actions: [
      "Separe seco, orgânico e rejeito; lave o que estiver sujo",
      "Amasse latas e caixas para ocupar menos espaço",
      "Leve pilhas, óleo e eletrônicos a pontos de entrega",
      "Composte restos de frutas, legumes e borra de café",
    ],
    impact: "Reciclar 1 t de alumínio economiza cerca de 95% da energia de produzi-lo.",
  },
] as const;

export function ThreeRs() {
  const [active, setActive] = useState(0);
  const current = rs[active];
  const Icon = current.icon;

  return (
    <section id="tres-rs" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <div className="reveal max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">A hierarquia</p>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Os 3 Rs têm ordem — e ela muda tudo
        </h2>
        <p className="mt-4 text-muted-foreground">
          Clique em cada etapa para ver o que fazer no dia a dia. A ordem importa: reciclar é
          importante, mas reduzir é sempre melhor.
        </p>
      </div>

      <div className="reveal mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col gap-3">
          {rs.map((r, i) => {
            const RIcon = r.icon;
            const isActive = i === active;
            return (
              <button
                key={r.id}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group flex items-center gap-4 rounded-3xl border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-leaf/40 bg-card shadow-lift lg:translate-x-2"
                    : "border-border bg-card/50 hover:border-leaf/30 hover:bg-card"
                }`}
              >
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-transform group-hover:scale-110 ${
                    isActive ? "gradient-leaf text-leaf-foreground" : "bg-secondary text-leaf"
                  }`}
                >
                  <RIcon className="size-6" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {r.order}
                  </span>
                  <span className="font-display text-xl font-semibold">{r.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          key={current.id}
          className="animate-pop overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl font-semibold">{current.title}</h3>
              <p className="mt-2 max-w-xl text-muted-foreground">{current.pitch}</p>
            </div>
            <span className="grid size-16 shrink-0 place-items-center rounded-full gradient-leaf text-leaf-foreground">
              <Icon className="size-8" />
            </span>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {current.actions.map((a, i) => (
              <li
                key={a}
                className="animate-pop rounded-2xl bg-secondary/70 p-4 text-sm font-medium transition-transform hover:-translate-y-1 hover:bg-secondary"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {a}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-2xl border border-leaf/25 bg-background p-4 text-sm font-semibold text-leaf">
            {current.impact}
          </p>
        </div>
      </div>
    </section>
  );
}
