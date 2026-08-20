const words = [
  "consumo consciente",
  "menos desperdício",
  "compostagem",
  "economia circular",
  "reparar antes de trocar",
  "compra a granel",
  "coleta seletiva",
  "produção responsável",
];

export function Marquee() {
  return (
    <div className="gradient-deep py-4 text-moss-foreground">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg font-medium">
            {w}
            <span className="size-1.5 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}
