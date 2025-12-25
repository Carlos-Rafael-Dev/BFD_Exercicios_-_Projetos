import { Prato } from "../../domain/entities/Prato";
import MenuItem from "../../components/MenuItem";
import { cardapio } from "../../data/cardapio";
import { usePedido } from "../../hooks/usePedido";

export default function Menu() {
    const { adicionarPrato } = usePedido();

    function handleAddPrato(prato: Prato) {
        adicionarPrato(prato);
    }

    return (
        <section>
            <h2>Cardápio</h2>

            {cardapio.map(prato => (
                <MenuItem
                    key={prato.getId()}
                    prato={prato}
                    onAdd={handleAddPrato}
                />
            ))}
        </section>
    );
}