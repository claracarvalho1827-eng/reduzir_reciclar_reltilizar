import { useEffect, useRef, useState } from "react";
import { ArrowDown, Recycle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-3r.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <section
      id="topo"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] gradient-glow opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf/25 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-leaf shadow-soft">
            <Sparkles className="size-3.5" /> ODS 12 · ONU
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-semibold md:text-7xl">
            Reduzir, reutilizar
            <br />
            e <span className="text-gradient-leaf">reciclar</span> —
            <br />
            na prática.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Um site para aprender fazendo: arraste, deslize, responda e descubra como o consumo
            consciente sustenta o 12º Objetivo de Desenvolvimento Sustentável, que busca garantir
            padrões de produção e consumo sustentáveis.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#tres-rs"
              className="group inline-flex items-center gap-2 rounded-full gradient-leaf px-6 py-3 font-semibold text-leaf-foreground shadow-lift transition-transform hover:scale-105"
            >
              Começar pelos 3 Rs
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#jogo"
              className="inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-card px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Recycle className="size-4 text-leaf" /> Jogar agora
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              { k: "2,1 bi t", v: "de resíduos por ano no mundo" },
              { k: "1/3", v: "dos alimentos produzidos é desperdiçado" },
              { k: "12", v: "objetivo da Agenda 2030" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border bg-card/70 p-4 shadow-soft">
                <dt className="font-display text-2xl font-semibold text-leaf">{s.k}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-lift"
            style={{
              transform: `perspective(1100px) rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 8}deg) translateY(${scroll * -0.04}px)`,
              transition: "transform 200ms ease-out",
            }}
          >
            <img
              src={heroImg}
              alt="Vidros, papéis e uma planta crescendo em lata reaproveitada sobre fundo branco"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="absolute -left-6 top-10 animate-float rounded-2xl border border-border bg-card px-4 py-3 shadow-lift"
            style={{ transform: `translate(${tilt.x * -26}px, ${tilt.y * -18}px)` }}
          >
            <p className="font-display text-sm font-semibold">Reduzir</p>
            <p className="text-xs text-muted-foreground">o que não entra, não vira lixo</p>
          </div>
          <div
            className="absolute -right-4 bottom-12 animate-float rounded-2xl border border-border bg-card px-4 py-3 shadow-lift [animation-delay:1.2s]"
            style={{ transform: `translate(${tilt.x * 30}px, ${tilt.y * 22}px)` }}
          >
            <p className="font-display text-sm font-semibold text-leaf">Reutilizar</p>
            <p className="text-xs text-muted-foreground">dê uma segunda vida</p>
          </div>
          <div className="absolute -bottom-6 left-1/2 grid size-20 -translate-x-1/2 place-items-center rounded-full gradient-deep text-moss-foreground shadow-lift">
            <Recycle className="size-9 animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}
