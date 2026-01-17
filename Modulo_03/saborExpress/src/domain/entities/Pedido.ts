//Entidade e metodos Pedido (coração do sistema)
//Carrinho + regras
import { StatusPedido } from "../enums/StatusPedido";
import { Combo } from "./Combo";
import { ItemPedido } from "./ItemPedido";
import type { ItemPedidoDTO } from "./ItemPedido";

export type PedidoDTO = {
  itens: ItemPedidoDTO[];
};

export class Pedido {
  private itens: ItemPedido[] = [];
  private status: StatusPedido = StatusPedido.ABERTO;

  adicionarItem(item: ItemPedido) {
    this.itens.push(item);
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }

  calcularTotal(): number {
    return this.itens.reduce((total, item) => total + item.getTotal(), 0);
  }

  listarResumo(): string {
    if (this.itens.length === 0) return "";

  return this.itens
    .map(item => {
      // COMBO
      if (item.personalizado instanceof Combo &&
          item.original instanceof Combo) {

        const detalhes =
          item.personalizado.getResumoPersonalizacao(item.original);

        if (!detalhes) {
          return item.personalizado.nome;
        }

        return `${item.personalizado.nome}: ${detalhes}`;
      }

      // PRATO SIMPLES
      const removidos =
        item.personalizado.ingredientesRemovidos(item.original);

      if (removidos.length === 0) {
        return item.personalizado.nome;
      }

      return `${item.personalizado.nome} (sem ${removidos.join(", ")})`;
    })
    .join("\n");
  }


  finalizarPedido() {
    this.status = StatusPedido.ENVIADO;
  }

  getStatus() {
    return this.status;
  }

  toJSON(): PedidoDTO {
    return {
      itens: this.itens.map((item) => item.toJSON()),
    };
  }

  static fromJSON(json: PedidoDTO): Pedido {
    const pedido = new Pedido();
    pedido.itens = json.itens.map((item: any) => ItemPedido.fromJSON(item));
    return pedido;
  }
}

//Resolve lógica de carrinho
