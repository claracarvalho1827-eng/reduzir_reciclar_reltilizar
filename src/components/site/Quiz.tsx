import { useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";

const questions = [
  {
    q: "Qual é o primeiro e mais eficiente dos 3 Rs?",
    options: ["Reciclar", "Reduzir", "Reutilizar", "Recuperar"],
    answer: 1,
    why: "Reduzir evita que o resíduo exista — nenhum processo é mais eficiente que não gerar.",
  },
  {
    q: "A ODS 12 da ONU trata de:",
    options: [
      "Educação de qualidade",
      "Consumo e produção responsáveis",
      "Energia limpa",
      "Vida na água",
    ],
    answer: 1,
    why: "A ODS 12 busca garantir padrões de produção e de consumo sustentáveis.",
  },
  {
    q: "Restos de frutas e borra de café devem ir para:",
    options: ["Lixeira azul", "Lixeira amarela", "Composteira / orgânico", "Rejeito"],
    answer: 2,
    why: "Compostados, viram adubo em vez de gerar metano no aterro.",
  },
  {
    q: "Transformar um pote de vidro em porta-temperos é um exemplo de:",
    options: ["Reciclagem", "Reutilização", "Redução", "Descarte correto"],
    answer: 1,
    why: "O objeto mantém a forma e ganha nova função: reutilização.",
  },
  {
    q: "Qual meta da ODS 12 fala em reduzir pela metade o desperdício de alimentos?",
    options: ["12.3", "12.6", "12.8", "12.2"],
    answer: 0,
    why: "A meta 12.3 trata da redução do desperdício de alimentos até 2030.",
  },
] as const;

export function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[step]!;
  const progress = ((step + (selected !== null ? 1 : 0)) / questions.length) * 100;

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section id="quiz" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
      <div className="reveal text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Dinâmica 03</p>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Quiz do consumo consciente</h2>
        <p className="mt-4 text-muted-foreground">
          Cinco perguntas para checar o que ficou. Cada resposta vem com a explicação.
        </p>
      </div>

      <div className="reveal mt-10 rounded-[2rem] border border-border bg-card p-8 shadow-lift">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full gradient-leaf transition-all duration-500"
            style={{ width: `${finished ? 100 : progress}%` }}
          />
        </div>

        {finished ? (
          <div className="animate-pop mt-8 text-center">
            <p className="font-display text-6xl font-semibold text-gradient-leaf">
              {score}/{questions.length}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold">
              {score === questions.length
                ? "Impecável! Você domina os 3 Rs."
                : score >= 3
                  ? "Muito bom! Falta pouco para o ciclo completo."
                  : "Bom começo — revise os 3 Rs e tente de novo."}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Consumo consciente é prática diária: reduzir primeiro, reutilizar sempre que possível e
              reciclar o que sobrar.
            </p>
            <button
              onClick={restart}
              className="mt-8 inline-flex items-center gap-2 rounded-full gradient-leaf px-6 py-3 font-semibold text-leaf-foreground shadow-soft transition-transform hover:scale-105"
            >
              <RotateCcw className="size-4" /> Jogar novamente
            </button>
          </div>
        ) : (
          <div key={step} className="animate-pop mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pergunta {step + 1} de {questions.length}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{current.q}</h3>

            <div className="mt-6 grid gap-3">
              {current.options.map((o, i) => {
                const isAnswer = i === current.answer;
                const isPicked = selected === i;
                const state =
                  selected === null
                    ? "border-border bg-background hover:-translate-y-1 hover:border-leaf/40 hover:shadow-soft"
                    : isAnswer
                      ? "border-leaf bg-leaf/10 text-foreground"
                      : isPicked
                        ? "border-destructive bg-destructive/10"
                        : "border-border bg-background opacity-60";
                return (
                  <button
                    key={o}
                    onClick={() => choose(i)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left font-medium transition-all ${state}`}
                  >
                    {o}
                    {selected !== null && isAnswer && <Check className="size-5 text-leaf" />}
                    {selected !== null && isPicked && !isAnswer && (
                      <X className="size-5 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="animate-pop mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary/70 p-5">
                <p className="max-w-md text-sm text-muted-foreground">{current.why}</p>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full gradient-leaf px-5 py-2.5 font-semibold text-leaf-foreground transition-transform hover:scale-105"
                >
                  {step + 1 === questions.length ? "Ver resultado" : "Próxima"}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
