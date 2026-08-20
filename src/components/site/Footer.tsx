import { Leaf, Recycle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full gradient-leaf text-leaf-foreground">
            <Leaf className="size-5" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold">CicloVivo</p>
            <p className="text-sm text-muted-foreground">
              Educação para reduzir, reutilizar e reciclar · ODS 12 da ONU
            </p>
          </div>
        </div>
        <a
          href="#topo"
          className="inline-flex items-center gap-2 self-start rounded-full border border-leaf/30 bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary sm:self-auto"
        >
          <Recycle className="size-4 text-leaf" /> Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
