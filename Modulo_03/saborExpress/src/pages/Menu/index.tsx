import { Prato } from "../../domain/entities/Prato";
import { Combo } from "../../domain/entities/Combo";

import MenuItem from "../../components/MenuItem";
import ComboItem from "../../components/MenuItem/ComboItem";

import { cardapio } from "../../data/Cardapio";
import { combos } from "../../data/combos";

export default function Menu() {
    function handleAddPrato(prato: Prato) {
        console.log("Adicionar ao pedido:", prato.getNome());
    }

    function handleAddCombo(combo: Combo) {
        console.log("Adicionar Combo:", combo.getNome());
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

            <h3>Combos</h3>

            {combos.map(combo => (
                <ComboItem
                    key={combo.getId()}
                    combo={combo}
                    onAdd={handleAddCombo}
                />
            ))}
        </section>
    );
}