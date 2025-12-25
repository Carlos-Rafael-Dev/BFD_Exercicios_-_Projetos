import { Combo } from "../../domain/entities/Combo";
import { Prato } from "../../domain/entities/Prato";
import Button from "../Button";
import Card from "../Card";

type Props = {
    prato: Prato;
    onAdd: (prato: Prato) => void;
};

export default function MenuItem({ prato, onAdd }: Props) {
    const isCombo = prato instanceof Combo;
    
    return (
        <Card>
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
            
            <Button onClick={() => onAdd(prato)}>Adicionar</Button>
        </Card>
    );
}
