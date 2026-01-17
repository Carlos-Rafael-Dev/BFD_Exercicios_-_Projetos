import type { Ingrediente } from "../../domain/valueObjects/Ingrediente";

type Props = {
  ingrediente: Ingrediente;
  onToggle: () => void;
};

export default function IngredienteItem({ ingrediente, onToggle }: Props) {
  const isObrigatorio = ingrediente.obrigatorio;
  const isRemovido = !ingrediente.selecionado && !ingrediente.obrigatorio;

  return (
    <div className={`ingrediente-item ${isRemovido ? "removido" : ""}`}>
      <img
        className="ingrediente-imagem"
        src={ingrediente.imagem}
        alt={ingrediente.nome}
      />

      <div className="ingrediente-info">
        <strong
          style={{
            textDecoration: ingrediente.selecionado ? "none" : "line-through",
            opacity: ingrediente.selecionado ? 1 : 0.6,
          }}
        >
          {ingrediente.nome}
        </strong>
        <span
          style={{
            textDecoration: ingrediente.selecionado ? "none" : "line-through",
            opacity: ingrediente.selecionado ? 1 : 0.6,
          }}
        >
          {ingrediente.quantidade}
        </span>
      </div>

      <div className="check-selecao">
        {isObrigatorio && <span className="tag obrigatorio">Obrigatório</span>}

        {isRemovido && <span className="tag removido">Removido</span>}

        <input
          type="checkbox"
          checked={ingrediente.selecionado}
          disabled={ingrediente.obrigatorio}
          onChange={onToggle}
        />
      </div>
    </div>
  );
}
