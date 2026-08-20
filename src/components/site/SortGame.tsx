import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";

type BinId = "papel" | "plastico" | "vidro" | "metal" | "organico";

const bins: { id: BinId; label: string; hint: string; className: string }[] = [
  { id: "papel", label: "Papel", hint: "azul", className: "bg-water/25 border-water/50" },
  { id: "plastico", label: "Plástico", hint: "vermelho", className: "bg-clay/25 border-clay/50" },
  { id: "vidro", label: "Vidro", hint: "verde", className: "bg-leaf/20 border-leaf/50" },
  { id: "metal", label: "Metal", hint: "amarelo", className: "bg-sun/30 border-sun/60" },
  { id: "organico", label: "Orgânico", hint: "marrom", className: "bg-moss/20 border-moss/40" },
];

const allItems: { id: string; label: string; bin: BinId; emoji: string }[] = [
  { id: "jornal", label: "Jornal", bin: "papel", emoji: "📰" },
  { id: "caixa", label: "Caixa de papelão", bin: "papel", emoji: "📦" },
  { id: "garrafa-pet", label: "Garrafa PET", bin: "plastico", emoji: "🧴" },
  { id: "sacola", label: "Sacola plástica", bin: "plastico", emoji: "🛍️" },
  { id: "pote-vidro", label: "Pote de vidro", bin: "vidro", emoji: "🫙" },
  { id: "garrafa-vidro", label: "Garrafa de vidro", bin: "vidro", emoji: "🍾" },
  { id: "lata", label: "Lata de alumínio", bin: "metal", emoji: "🥫" },
  { id: "tampinha", label: "Tampinha de metal", bin: "metal", emoji: "🔩" },
  { id: "casca", label: "Casca de banana", bin: "organico", emoji: "🍌" },
  { id: "borra", label: "Borra de café", bin: "organico", emoji: "☕" },
];

export function SortGame() {
  const [placed, setPlaced] = useState<Record<string, BinId>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [hovered, setHovered] = useState<BinId | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);

  const remaining = useMemo(() => allItems.filter((i) => !placed[i.id]), [placed]);
  const score = Object.keys(placed).length;
  const done = remaining.length === 0;

  const drop = (bin: BinId, itemId: string | null) => {
    setHovered(null);
    setDragging(null);
    if (!itemId) return;
    const item = allItems.find((i) => i.id === itemId);
    if (!item) return;
    if (item.bin === bin) {
      setPlaced((p) => ({ ...p, [item.id]: bin }));
      setWrong(null);
    } else {
      setWrong(item.id);
      window.setTimeout(() => setWrong((w) => (w === item.id ? null : w)), 900);
    }
  };

  return (
    <section id="jogo" className="relative scroll-mt-24 overflow-hidden bg-secondary/40 py-24">
      <div className="pointer-events-none absolute inset-0 grain opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Dinâmica 01</p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Jogo da lixeira certa</h2>
            <p className="mt-4 text-muted-foreground">
              Arraste cada resíduo até a lixeira correta da coleta seletiva. No celular, toque no
              item e depois na lixeira.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl border border-border bg-card px-6 py-4 shadow-soft">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Acertos</p>
              <p className="font-display text-3xl font-semibold text-leaf">
                {score}
                <span className="text-lg text-muted-foreground">/{allItems.length}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setPlaced({});
                setWrong(null);
              }}
              className="grid size-11 place-items-center rounded-full bg-secondary text-foreground transition-transform hover:rotate-[-45deg]"
              aria-label="Reiniciar jogo"
            >
              <RotateCcw className="size-5" />
            </button>
          </div>
        </div>

        <div className="reveal mt-10 rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <div className="min-h-24 flex flex-wrap items-center gap-3">
            {done ? (
              <p className="flex items-center gap-2 font-display text-xl font-semibold text-leaf">
                <Check className="size-6" /> Você separou tudo! Isso é economia circular na prática.
              </p>
            ) : (
              remaining.map((item) => (
                <button
                  key={item.id}
                  draggable
                  onDragStart={() => setDragging(item.id)}
                  onDragEnd={() => setDragging(null)}
                  onClick={() => setDragging(dragging === item.id ? null : item.id)}
                  className={`flex cursor-grab items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                    dragging === item.id
                      ? "border-leaf bg-secondary scale-105 shadow-lift"
                      : "border-border bg-background hover:-translate-y-1 hover:shadow-soft"
                  } ${wrong === item.id ? "border-destructive text-destructive" : ""}`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  {item.label}
                  {wrong === item.id && <X className="size-4" />}
                </button>
              ))
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {bins.map((bin) => {
              const items = allItems.filter((i) => placed[i.id] === bin.id);
              return (
                <div
                  key={bin.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHovered(bin.id);
                  }}
                  onDragLeave={() => setHovered((h) => (h === bin.id ? null : h))}
                  onDrop={(e) => {
                    e.preventDefault();
                    drop(bin.id, dragging);
                  }}
                  onClick={() => drop(bin.id, dragging)}
                  className={`flex min-h-44 cursor-pointer flex-col rounded-3xl border-2 border-dashed p-4 transition-all ${bin.className} ${
                    hovered === bin.id || (dragging && "ring-2 ring-leaf/40")
                      ? "scale-[1.03] shadow-lift"
                      : ""
                  }`}
                >
                  <p className="font-display text-lg font-semibold">{bin.label}</p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {bin.hint}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {items.map((i) => (
                      <span
                        key={i.id}
                        title={i.label}
                        className="animate-pop grid size-9 place-items-center rounded-xl bg-card text-lg shadow-soft"
                      >
                        {i.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
