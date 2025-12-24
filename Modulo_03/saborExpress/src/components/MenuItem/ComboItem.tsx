import type { Combo } from "../../domain/entities/Combo";

interface Props {
    combo: Combo;
    onAdd: (combo: Combo) => void;
}

export default function ComboItem({ combo, onAdd }: Props) {
    return (
        <div className="combo-item">
            <h3>{combo.getNome()}</h3>
            <p>{combo.getDescricao()}</p>

            <ul>
                {combo.getPratos().map(prato => (
                    <li key={prato.getId()}>
                        {prato.getNome()} 
                    </li>
                ))}
            </ul>

            <strong>R$ {combo.getPreco().toFixed(2)}</strong>

            <button onClick={() => onAdd(combo)}>
                Adicionar Combo
            </button>
        </div>
    )
}