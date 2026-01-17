//Entidade e metodos ItemPedido
//Prato + quantidade
import { Prato } from "./Prato";
import type { PratoDTO } from "./Prato";
import { PratoFactory } from "./PratoFactory";

export type ItemPedidoDTO = {
    quantidade: number;
    original: PratoDTO;
    personalizado: PratoDTO;
};

export class ItemPedido {
    private quantidade: number;
    public readonly original: Prato;
    public readonly personalizado: Prato

    constructor(
        original: Prato, 
        personalizado: Prato, 
        quantidade: number = 1
    ) {
        this.quantidade = quantidade;
        this.original = original;
        this.personalizado = personalizado;
    }

    aumentarQuantidade() {
        this.quantidade++;
    }

    diminuirQuantidade() {
        if (this.quantidade > 1) {
            this.quantidade--;
        }
    }

    getTotal(): number {
        return this.personalizado.getPreco() * this.quantidade;
    }

    getResumo() {
        return `${this.personalizado.getNome()} (x${this.quantidade})`;
    }

    toJSON(): ItemPedidoDTO {
        return {
            quantidade: this.quantidade,
            original: this.original.toJSON(),
            personalizado: this.personalizado.toJSON()
        };
    }

    static fromJSON(json: ItemPedidoDTO): ItemPedido {
        return new ItemPedido(
          PratoFactory.fromJSON(json.original),
          PratoFactory.fromJSON(json.personalizado),
          json.quantidade
        );
      }
}

//Encapsulado
//Resolve lógica de quantidade