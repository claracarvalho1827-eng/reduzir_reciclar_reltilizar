import { useEffect, useRef, useState } from "react";
import { Droplets, Leaf, Trash2, Zap } from "lucide-react";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

const stats = [
  { icon: Trash2, value: 1200, suffix: " kg", label: "de resíduo evitado por família em um ano de hábitos conscientes" },
  { icon: Droplets, value: 20000, suffix: " L", label: "de água poupados ao reduzir o consumo de roupas novas" },
  { icon: Zap, value: 95, suffix: "%", label: "de energia economizada ao reciclar alumínio em vez de extrair" },
  { icon: Leaf, value: 2030, suffix: "", label: "ano-meta da Agenda da ONU para consumo e produção sustentáveis" },
];

function StatCard({ stat, active }: { stat: (typeof stats)[number]; active: boolean }) {
  const n = useCountUp(stat.value, active);
  const Icon = stat.icon;
  return (
    <div className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-2 hover:shadow-lift">
      <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-leaf transition-transform group-hover:scale-110">
        <Icon className="size-6" />
      </span>
      <p className="mt-5 font-display text-4xl font-semibold text-gradient-leaf">
        {Math.round(n).toLocaleString("pt-BR")}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [bottles, setBottles] = useState(3);
  const [meals, setMeals] = useState(2);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const plasticYear = bottles * 365 * 0.025;
  const co2Year = meals * 52 * 2.5;

  return (
    <section id="impacto" ref={ref} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <div className="reveal max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Dinâmica 02</p>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Pequenas escolhas, números grandes
        </h2>
        <p className="mt-4 text-muted-foreground">
          Mexa nos controles e veja a sua economia anual mudar em tempo real.
        </p>
      </div>

      <div className="reveal mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
          <label className="flex items-baseline justify-between font-display text-lg font-semibold">
            Garrafas plásticas que você troca por reutilizável (por dia)
            <span className="text-leaf">{bottles}</span>
          </label>
          <input
            type="range"
            min={0}
            max={8}
            value={bottles}
            onChange={(e) => setBottles(Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-leaf"
          />
          <p className="mt-6 font-display text-4xl font-semibold text-gradient-leaf">
            {plasticYear.toFixed(1)} kg
          </p>
          <p className="text-sm text-muted-foreground">de plástico fora do meio ambiente por ano</p>

          <div className="mt-8 h-px bg-border" />

          <label className="mt-8 flex items-baseline justify-between font-display text-lg font-semibold">
            Refeições que você deixa de desperdiçar (por semana)
            <span className="text-leaf">{meals}</span>
          </label>
          <input
            type="range"
            min={0}
            max={14}
            value={meals}
            onChange={(e) => setMeals(Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-leaf"
          />
          <p className="mt-6 font-display text-4xl font-semibold text-gradient-leaf">
            {co2Year.toFixed(0)} kg CO₂e
          </p>
          <p className="text-sm text-muted-foreground">de emissões evitadas por ano</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
