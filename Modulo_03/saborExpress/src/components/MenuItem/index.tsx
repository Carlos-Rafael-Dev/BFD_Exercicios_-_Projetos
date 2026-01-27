import { Combo } from "../../domain/entities/Combo";
import { Prato } from "../../domain/entities/Prato";
import Button from "../Button";
import Card from "../Card";

type Props = {
  prato: Prato;
  onAdd: (prato: Prato) => void;
  onVerIngredientes: (prato: Prato) => void;
  ativo: boolean;
  quantidade: number;
};

export default function MenuItem({
  prato,
  onAdd,
  onVerIngredientes,
  ativo,
  quantidade,
}: Props) {
  const isCombo = prato instanceof Combo;

  return (
    <Card>
      <div className={`menu-item ${ativo ? "ativo" : ""}`}>
        <img src={prato.getImagem()} alt={prato.getNome()} />
        <h3>{prato.getNome()}</h3>
        <p>{prato.getDescricao()}</p>

        <p>R$ {prato.getPreco().toFixed(2)}</p>

        {/*quando o prato for combo, exibir os pratos inclusos */}
        {/*solução instanceof*/}
        {isCombo && (
          <>
            <strong>Itens inclusos:</strong>
            <ul>
              {(prato as Combo).getPratos().map((item) => (
                <li key={item.getId()}>{item.getNome()}</li>
              ))}
            </ul>
          </>
        )}
        {/* Quando clicar no botao ver ingredientes abrir o ingredienteModal*/}
        <Button variant="secondary" onClick={() => onVerIngredientes(prato)}>
          Ver Ingredientes
        </Button>

        <Button
          onClick={() => onAdd(prato)}
          active={ativo}
        >
          {ativo ? `Já adicionei (${quantidade})` : "Adicionar"}
        </Button>
      </div>
    </Card>
  );
}
