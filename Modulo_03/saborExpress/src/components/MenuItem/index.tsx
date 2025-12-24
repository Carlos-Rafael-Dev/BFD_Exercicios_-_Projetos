import { Prato } from "../../domain/entities/Prato";
import Button from "../Button";
import Card from "../Card";

type Props = {
    prato: Prato;
    onAdd: (prato: Prato) => void;
};

export default function MenuItem({ prato, onAdd }: Props) {
    return (
        <Card>
            <h3>{prato.getNome()}</h3>
            <p>{prato.getDescricao()}</p>
            <p>R$ {prato.getPreco().toFixed(2)}</p>
            <Button onClick={() => onAdd(prato)}>Adicionar</Button>
        </Card>
    );
}
