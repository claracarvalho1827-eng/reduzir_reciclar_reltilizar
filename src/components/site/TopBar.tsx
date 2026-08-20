import { Leaf } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-reveal";

const links = [
  { href: "#tres-rs", label: "3 Rs" },
  { href: "#jogo", label: "Jogo da lixeira" },
  { href: "#impacto", label: "Impacto" },
  { href: "#ods12", label: "ODS 12" },
  { href: "#quiz", label: "Quiz" },
];

export function TopBar() {
  const progress = useScrollProgress();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#topo" className="group flex items-center gap-2 font-display text-lg font-semibold">
            <span className="grid size-9 place-items-center rounded-full gradient-leaf text-leaf-foreground transition-transform group-hover:rotate-[20deg]">
              <Leaf className="size-5" />
            </span>
            Ciclo<span className="-ml-2 text-gradient-leaf">Vivo</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#quiz"
            className="rounded-full gradient-leaf px-4 py-2 text-sm font-semibold text-leaf-foreground shadow-soft transition-transform hover:scale-105"
          >
            Testar meus hábitos
          </a>
        </div>
      </div>
      <div
        className="h-1 origin-left gradient-leaf transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </header>
  );
}
