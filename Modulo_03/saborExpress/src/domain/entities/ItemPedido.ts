//Entidade e metodos ItemPedido
//Retorna um Prato
import { Combo } from "./Combo";
import { Prato } from "./Prato";
import type { PratoDTO } from "./Prato";
import { PratoFactory } from "./PratoFactory";

export type DescricaoItem = {
  nome: string;
  observacao?: string;
};

export type ItemPedidoDTO = {
  quantidade: number;
  original: PratoDTO;
  personalizado: PratoDTO;
};

export class ItemPedido {
  private quantidade: number;
  public readonly original: Prato;
  public readonly personalizado: Prato;

  constructor(original: Prato, personalizado: Prato, quantidade: number = 1) {
    this.quantidade = quantidade;
    this.original = original;
    this.personalizado = personalizado;
  }

  aumentarQuantidade() {
    this.quantidade++;
  }

  diminuirQuantidade() {
    this.quantidade--;
  }

  getQuantidade() {
    return this.quantidade;
  }

  isVazio() {
    return this.quantidade <= 0;
  }

  getPrato() {
    return this.personalizado;
  }

  getTotal(): number {
    return this.personalizado.getPreco() * this.quantidade;
  }

  getResumo() {
    return `${this.personalizado.getNome()} (x${this.quantidade})`;
  }

  getDescricao(): DescricaoItem {
    // COMBO
    if (this.personalizado instanceof Combo && this.original instanceof Combo) {
      const detalhes = this.personalizado.getResumoPersonalizacao(
        this.original
      );

      return {
        nome: this.personalizado.nome,
        observacao: detalhes || undefined,
      };
    }

    // PRATO SIMPLES
    const removidos = this.personalizado.ingredientesRemovidos(this.original);

    return {
      nome: this.personalizado.nome,
      observacao:
        removidos.length > 0 ? `sem ${removidos.join(", ")}` : undefined,
    };
  }

  toJSON(): ItemPedidoDTO {
    return {
      quantidade: this.quantidade,
      original: this.original.toJSON(),
      personalizado: this.personalizado.toJSON(),
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
