import { Prato } from "./Prato";

export class Combo {
    constructor(
        private readonly id: number,
        private nome: string,
        private descricao: string,
        private pratos: Prato[],
        private preco: number
    ) {
        if (pratos.length === 0) {
            throw new Error("Um combo deve possuir ao menos um prato.");
        }
    }

    getId(): number {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getPratos(): Prato[] {
        return [...this.pratos];
    }

    getPreco(): number {
        return this.preco;
    }

    /**
     * Preço original (soma dos pratos)
    */

    getPrecoOriginal(): number {
        return this.pratos.reduce(
            (total, prato) => total + prato.getPreco(),
            0
        );
    }

    /**
     * Valor economizado no combo
    */
    getDesconto(): number {
        return this.getPrecoOriginal() - this.preco;
    }
}