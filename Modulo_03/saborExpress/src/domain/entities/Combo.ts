import type { CategoriaPrato } from "../enums/CategoriaPrato";
import { Prato } from "./Prato";

export class Combo extends Prato {
    constructor(
        id: string,
        nome: string,
        descricao: string,
        preco: number,
        categoria: CategoriaPrato,
        private pratos: Prato[],
    ) {
        super(id, nome, descricao, preco, categoria);

        if (pratos.length === 0) {
            throw new Error("Um combo deve possuir ao menos um prato.");
        }
    }

    getPratos(): Prato[] {
        return [...this.pratos];
    }

    // Preço original (soma dos pratos)
    getPrecoOriginal(): number {
        return this.pratos.reduce(
            (total, prato) => total + prato.getPreco(),
            0
        );
    }

    // Valor economizado no combo
    getDesconto(): number {
        return this.getPrecoOriginal() - this.getPreco();
    }
}