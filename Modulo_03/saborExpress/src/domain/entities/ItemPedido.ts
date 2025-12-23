//Entidade e metodos ItemPedido
//Prato + quantidade
import type { Prato } from "./Prato";

export class ItemPedido {
    constructor(
        private prato: Prato,
        private quantidade: number = 1
    ) {}

    aumentarQuantidade() {
        this.quantidade++;
    }

    diminuirQuantidade() {
        if (this.quantidade > 1) {
            this.quantidade--;
        }
    }

    getTotal(): number {
        return this.prato.getPreco() * this.quantidade;
    }

    getResumo() {
        return `${this.prato.getNome()} (x${this.quantidade})`;
    }
}

//Encapsulado
//Resolve lógica de quantidade