import { Combo } from "../../domain/entities/Combo";
import { Prato } from "../../domain/entities/Prato";
import Button from "../Button";
import Card from "../Card";

type Props = {
    prato: Prato;
    onAdd: (prato: Prato) => void;
    onVerIngredientes: (prato: Prato) => void;
};

export default function MenuItem({ prato, onAdd, onVerIngredientes }: Props) {
    const isCombo = prato instanceof Combo;

    return (
        <Card>
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
                        {(prato as Combo).getPratos().map(item => (
                            <li key={item.getId()}>{item.getNome()}</li>
                        ) )}
                    </ul>
                </>
            )}
            {/* Quando clicar no botao ver ingredientes abrir o ingredienteModal*/}
            <Button variant="secondary" onClick={() => onVerIngredientes(prato)}>Ver Ingredientes</Button>
            <Button onClick={() => onAdd(prato)}>Adicionar</Button>
        
        </Card>
    );
}
