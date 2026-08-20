import { useState } from "react";
import { Check } from "lucide-react";

const habits = [
  "Levo garrafa reutilizável para fora de casa",
  "Uso sacola retornável nas compras",
  "Separo o lixo seco do orgânico",
  "Conserto antes de comprar de novo",
  "Planejo as refeições da semana",
  "Doo ou troco o que não uso mais",
  "Composto restos de comida",
  "Recuso brindes e embalagens desnecessárias",
];

export function Habits() {
  const [checked, setChecked] = useState<number[]>([]);
  const pct = Math.round((checked.length / habits.length) * 100);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="reveal grid gap-8 rounded-[2rem] border border-border bg-card p-8 shadow-soft lg:grid-cols-[1fr_260px] lg:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Dinâmica 04</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
            Marque os hábitos que já fazem parte da sua rotina
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {habits.map((h, i) => {
              const on = checked.includes(i);
              return (
                <button
                  key={h}
                  onClick={() =>
                    setChecked((c) => (on ? c.filter((x) => x !== i) : [...c, i]))
                  }
                  aria-pressed={on}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                    on
                      ? "border-leaf/50 bg-leaf/10"
                      : "border-border bg-background hover:-translate-y-0.5 hover:border-leaf/30"
                  }`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-lg border transition-colors ${
                      on ? "gradient-leaf border-transparent text-leaf-foreground" : "border-border"
                    }`}
                  >
                    {on && <Check className="size-4" />}
                  </span>
                  {h}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-secondary/60 p-6 text-center">
          <div
            className="grid size-40 place-items-center rounded-full transition-all duration-500"
            style={{
              background: `conic-gradient(var(--leaf) ${pct * 3.6}deg, color-mix(in oklab, var(--muted) 90%, transparent) 0deg)`,
            }}
          >
            <span className="grid size-32 place-items-center rounded-full bg-card font-display text-3xl font-semibold text-leaf">
              {pct}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {pct === 100
              ? "Rotina circular completa! Compartilhe com quem está começando."
              : "Cada hábito marcado é uma meta da ODS 12 acontecendo na prática."}
          </p>
        </div>
      </div>
    </section>
  );
}
