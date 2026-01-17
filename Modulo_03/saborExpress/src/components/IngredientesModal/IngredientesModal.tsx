import { useEffect, useState } from "react";
import type { Prato } from "../../domain/entities/Prato";
import Button from "../Button";
import IngredienteItem from "./IngredienteItem";
import { Combo } from "../../domain/entities/Combo";

type Props = {
  prato: Prato;
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (prato: Prato) => void;
};

export default function IngredientesModal({
  prato,
  aberto,
  onFechar,
  onSalvar,
}: Props) {
  const [pratoEditado, setPratoEditado] = useState<Prato | null>(null);
  const [pratosCombo, setPratosCombo] = useState<Prato[]>([]);
  const [pratoSelecionadoId, setPratoSelecionadoId] = useState<string | null>(
    null
  );

  const pratoSelecionado =
    pratosCombo.find((p) => p.getId() === pratoSelecionadoId) ?? null;

  useEffect(() => {
    if (!aberto) return;

    if (prato instanceof Combo) {
      const clones = prato.getPratos().map((p) => p.clonar());
      setPratosCombo(clones);
      setPratoSelecionadoId(clones[0]?.getId() ?? null);
      setPratoEditado(null);
    } else {
      setPratoEditado(prato.clonar());
    }
  }, [prato, aberto]);

  if (!aberto) return null;

  function ToggleIngrediente(id: string) {
    if (pratoEditado) {
      setPratoEditado((prev) => prev!.toggleIngrediente(id));
    }

    if (pratoSelecionadoId) {
      setPratosCombo((prev) =>
        prev.map((p) =>
          p.getId() === pratoSelecionadoId ? p.toggleIngrediente(id) : p
        )
      );
    }
  }

  function salvar() {
    if (pratoEditado) {
      onSalvar(pratoEditado);
      return;
    }

    if (prato instanceof Combo) {
      const comboPersonalizado = prato.clonarComPratos(pratosCombo);
      onSalvar(comboPersonalizado);
    }
  }

  const ingredientesVisiveis =
    pratoEditado?.ingredientes ?? pratoSelecionado?.ingredientes ?? [];

  const pratoParaResumo = pratoEditado ?? pratoSelecionado ?? prato;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h2>{prato.nome}</h2>
          <p>
            {prato instanceof Combo
              ? "Personalize os ingredientes do Combo"
              : "Personalize do seu jeito"}
          </p>
          <button onClick={onFechar}>X</button>
        </header>

        {prato instanceof Combo && (
          <section className="abas-pratos">
            {pratosCombo.map((p) => (
              <button
                key={p.getId()}
                className={
                  pratoSelecionado?.getId() === pratoSelecionadoId
                    ? "ativo"
                    : ""
                }
                onClick={() => setPratoSelecionadoId(p.getId())}
              >
                {p.nome}
              </button>
            ))}
          </section>
        )}

        <section className="resumo">
          <span>🔥 {pratoParaResumo.calcularKcalTotal()} kcal</span>
          <span>
            🧾 {pratoParaResumo.totalIngredientesSelecionados()} ingredientes
          </span>
        </section>

        <section className="lista">
          {ingredientesVisiveis.map((ingrediente) => (
            <IngredienteItem
              key={ingrediente.id}
              ingrediente={ingrediente}
              onToggle={() => ToggleIngrediente(ingrediente.id)}
            />
          ))}
        </section>

        <footer>
          <Button onClick={salvar}>Salvar personalização</Button>
        </footer>
      </div>
    </div>
  );
}
